export const BITRATE = 508;
export const BITRATEh = 254;

export const parseState = (buffer: ArrayBuffer) => {
    let binaryString = '';
    const byteArray = new Uint8Array(buffer);
    for (let byte of byteArray) {
        binaryString += byte.toString(2).padStart(8, '0');
    }

    const nonpadBitSize = binaryString.length;
    console.log("nonpadBitSize: %d",nonpadBitSize);
    // Pad the input with zeros to make it multiple of 2*BITRATE bits
    while (binaryString.length % BITRATE == 0) {
        binaryString = '0' + binaryString;
    }

    // Split the input into two 254-bit strings
    const chunks:string[] = [];
    for (let i = 0; i < binaryString.length; i += BITRATEh) {
        chunks.push(binaryString.slice(i, i + BITRATEh));
      }
    
    return {
        chunks,
        nonpadBitSize,
    };
}
