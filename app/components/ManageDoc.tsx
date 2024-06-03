"use client";
import { deleteData } from "@/lib/functions/deleteData";
import { downLoadData } from "@/lib/functions/fetchData";
import { verify_proof } from "@/reinforced-concrete/functions/verify_proof";
import { zkdoc } from "@/template/doc";
import { ChangeEvent, ReactNode, useState } from "react";

type ManageDocProps = {
  doc: zkdoc;
};
const MSG  = { "default" : "", "success": "인증에 성공했습니다." , "fail": "인증에 실패했습니다." ,"fileError": "유효한 파일형식이 아닙니다." }

const ManageDoc = ({ doc }: ManageDocProps): ReactNode => {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [message, setMessage] = useState<string>(MSG.default);

  const handleDelete = async () => await deleteData(doc);

  const handleDownload = async () => {
    // console.log(doc);
    await downLoadData(doc.url, doc.title)};

  const handlefileInput = (e:ChangeEvent<HTMLInputElement>) => {
    if(e.target?.files && e.target.files[0]){
        const file = e.target.files[0];
        // console.log(file.type);
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
    <div>
      <div className="w-full">
        <p
          className={`${isOpened == true && "underline"}`}
          onClick={() => setIsOpened(prev => !prev)} >
          Manage Document
        </p>
      </div>

      {isOpened && <div className="w-full h-20 flex flex-col justify-center">
        <p>.json 파일을 첨부해주세요.</p>
        <input className="" type="file" onChange={(e:ChangeEvent<HTMLInputElement>) => handlefileInput(e)} />
        <p className={`${message == MSG.fail && "text-red-500"} ${message == MSG.success && "text-blue-500"}`}>{message}</p>
        </div>}
      {isVerified && <div className="flex w-full justify-between px-8">
        <p
          className={`${isOpened == true && "underline"}`}
          onClick={handleDownload} >
          Download
        </p>
        <p
          className={`${isOpened == true && "underline"}`}
          onClick={handleDelete} >
          Delete
        </p>
        </div>}
    </div>
  );
};

export default ManageDoc;
