# 프로젝트 설명

### zksnark-web은 zero-knowlege(영지식) 특성을 띄는 SNARK(zero-knowledge Succinct Non-interactive Argument of Knowledge)인 zkSNARK를 활용한 문서 인증서 서비스 데모입니다.

## 구현 기능

* 데이터베이스에 문서 업로드, 인증서(증명서) 발급 (proof generation)
* 인증서를 이용한 영지식 증명 (proof verification) 후 문서 다운로드 및 삭제

## Reference

[1] https://dl.acm.org/doi/10.1145/3548606.3560686</br>
[2] https://github.com/iden3/snarkjs</br>
[3] https://github.com/rymnc/reinforced-concrete-impls

## 영지식 증명, SNARK란? (초간단 설명)

영지식 증명이란 특정한 수학적 사실에 대한 지식을 갖고 있다는 것을 증명하는 과정입니다. 단, 증명자는 그 지식에 대한 어떤 정보도 노출하지 않아야 합니다. 
예를 들어, 통장 잔액을 노출하지 않고서 특정 액수를 이상이라는 것이라거나, 특정한 해시함수에 대해 원문을 보여주지 않고서 특정 해시값을 만드는 원문을 알고 있다는 것을 증명할 수 있습니다. 

하지만 모든 상황(여기서는 함수)에 대한 프로토콜을 매번 만드는 것은 어려우므로, 임의의 수학적 함수에 대한 영지식 증명을 생성할 수 있는 가제트인 zkSNARK로 이 문제를 해결할 수 있습니다.

zkSNARK는 세 가지 과정을 통해 이루어집니다.

1. 키 생성 단계
이 단계는 특정 함수에 대해 한 번만 이루어지며, program code(또는 circuit)와 random secret parameter를 이용해 proving key와 verification key를 만들어냅니다.

2. 증명 생성 단계
이 단계는 증명자(prover)가 수행하며, proving key, public input, private input(witness)를 이용해 proof를 생성합니다.

3. 증명 검증 단계
이 단계는 검증자(verifier)가 수행하며, verification key, public input, proof를 이용해 참/거짓을 판별합니다.

본 프로젝트는 zkSNARK-friendly한 reinforced-concrete 해쉬 함수[1]을 사용하여 개발했습니다. 

## 사용 방법

1. 사용자가 문서를 업로드하면 업로드와 동시에 json형식의 증명서가 생성됩니다.
생성된 증명은 사용자의 컴퓨터에 저장되며 문서 대신에 안전한 곳에 보관해야 합니다.

2. 저장한 문서를 다시 내려받거나 데이터베이스에서 삭제하고 싶을 때, 증명서를 해당 문서의 첨부란에 첨부하면 증명 검증이 이루어집니다.
검증이 성공하면 삭제/다운로드가 가능하며 실패하면 문서에 접근할 수 없습니다.


# 프로젝트 실행 방법

1. 깃 레포지토리 clone</br>
$ git clone https://github.com/kinwjdghks/zksnark-web

2. dependency 설치</br>
$ npm run install-all (이 단계에서 key generation도 함께 수행됩니다.)

3. google firebase project 생성</br>
https://console.firebase.google.com/u/0/?hl=ko

4. 환경변수 생성</br>
생성한 firebase configuation을 복사하여 하단에 붙여넣고, 루트 경로에 내용을 .env.local 이름의 파일에 저장

NEXT_PUBLIC_FIREBASE_APIKEY=</br>
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=</br>
NEXT_PUBLIC_FIREBASE_PROJECTID=</br>
NEXT_PUBLIC_FIREBASE_STORAGEBUCKET=</br>
NEXT_PUBLIC_FIREBASE_MESSAGINGSENDERID=</br>
NEXT_PUBLIC_FIREBASE_APPID=</br>

5. next app 실행</br>
$ npm run dev

## 핵심 코드 설명

### api/proof/route.ts
```javascript
  const url = req.nextUrl.searchParams.get("url") as string;
  const buffer = await fetchAsBuffer(url);
  if(!buffer) {
    console.log("read as buffer failed.");
    return;
  }
  const { chunks, nonpadBitSize } = parseState(buffer);
  state1 = chunks[0];
  state2 = chunks[1];
  const myHash = new ReinforcedConcreteHash().hash(chunks, nonpadBitSize);
```
사용자의 문서를 일정한 비트 단위로 쪼개어 해시합니다. 이 chunk들은 proof generation에서도 사용됩니다.

```javascript
  const snarkPromise = promisify(exec);
  try {
    await snarkPromise(
      `snarkjs groth16 fullprove ${inputPath} ${wasmPath} ${zkeyPath} ${proofFilePath} ${publicFilePath}`
    );
    const proof = fs.readFileSync(proofFilePath, "utf-8");
    return NextResponse.json({
      message: "prove successfully generated.",
      proof: proof,
      public_: myHash, //replace with my hash output.
    });
  } catch (error) {
    return NextResponse.json({ message: "prove generation failed." });
```
snarkjs groth16 프로토콜을 사용하여 proof를 생성합니다. 이 때 input에 대한 해시 결과인 public output은 직접 구현한 해시값과 값이 같으므로 대체합니다.</br>
database에는 문서 identifier, 문서 이름, 해시값(public), 문서가 저장된 storage url만이 저장됩니다. 

### api/verify/route.ts
```javascript
    const snarkPromise = promisify(exec);
    const publicJSON = JSON.stringify([public_]);
    try{
      const { stderr, stdout} = await snarkPromise(`snarkjs groth16 verify ${verificationKeyPath} ${publicFilePath} ${proofFilePath}`);
      return NextResponse.json({ message: "verified successfully.", success: "true" })
    
    } catch (error) {
      console.error("verification error:",error);
      return NextResponse.json({ message: "verification failed.", success: "false"})
    }
```
특정 document에 대해, db에서 가져온 해시값(public), 사용자가 첨부한 proof, 그리고 verification key를 이용해 유효햔 proof인지 판단합니다.

