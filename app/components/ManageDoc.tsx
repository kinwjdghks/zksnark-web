"use client";
import { deleteData } from "@/lib/functions/deleteData";
import { downLoadData } from "@/lib/functions/fetchData";
import { button_blue, button_blue_rev } from "@/public/style/buttonStyle";
import { verify_proof } from "@/reinforced-concrete/functions/verify_proof";
import { zkdoc } from "@/template/doc";
import { Button } from "@nextui-org/react";
import { ChangeEvent, ReactNode, useState } from "react";
import { FiUpload } from "react-icons/fi";

type ManageDocProps = {
  doc: zkdoc;
};
const MSG  = { "default" : "", "success": "인증에 성공했습니다." , "fail": "인증에 실패했습니다." ,"fileError": "유효한 파일형식이 아닙니다." }

const ManageDoc = ({ doc }: ManageDocProps): ReactNode => {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [message, setMessage] = useState<string>(MSG.default);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleDelete = async () => await deleteData(doc);

  const handleDownload = async () => {
    console.log(doc);
    await downLoadData(doc.url, doc.title)};

  const handlefileInput = (e:ChangeEvent<HTMLInputElement>) => {
    if(e.target?.files && e.target.files[0]){
        const file = e.target.files[0];
        console.log(file.type);
        if(file.type != "application/json"){
            setMessage(MSG.fileError);
            return;
        }
        const reader = new FileReader();

        let proofString:string;
        reader.onload = async function(e) {
            proofString = e.target?.result as string;
            const isVerified = await verify_proof(doc, proofString);
            if(isVerified) {
                setMessage(MSG.success);
                setIsVerified(true);
            }
            else setMessage(MSG.fail);
        };
        reader.readAsText(file);
    }
  }


  return (
    <>
      {!isOpened && <Button className={`${button_blue} `} onClick={()=>{setIsOpened(true)}}>
        문서 관리하기</Button>}
      
      {isOpened && <div className="w-full my-2 h-24 flex flex-col justify-center">
        <form
        typeof="file"
        name="proof"
        encType="multipart/form-data"
        className="flex flex-col items-center"
      >
        <label
          htmlFor="proof-upload"
          className={`${button_blue} flex flex-col mt-18 mb-18 p-4 px-4 rounded-2xl`}
        >
          <FiUpload className="flex flex-col" />
          JSON 파일을 첨부하세요
          <input
            type="file"
            id="proof-upload"
            onChange={handlefileInput}
            style={{ display: "none" }}
          />
        </label>
        {!isVerified && <p className="mt-2 text-stone-400 cursor-pointer hover:underline underline-offset-2" onClick={()=>setIsOpened(false)}>취소</p>}
        <p className={`${message == MSG.fail && "text-red-500"} ${message == MSG.success && "text-blue-500"} h-8 m-2`}>{message}</p>
      </form>
        </div>}
      {isVerified && <div className="flex w-full justify-between px-6">
        <p
          className={`${button_blue_rev} p-1 px-2 rounded-lg`}
          onClick={handleDownload} >
          Download
        </p>
        <p
          className={`${button_blue_rev} p-1 px-2 rounded-lg`}
          onClick={handleDelete} >
          Delete
        </p>
        </div>}
    </>
  );
};

export default ManageDoc;
