"use client";
import { createzkDoc, storeFile } from "@/lib/firebase/CRUD";
import { getFileName } from "@/lib/functions/fileName";
import { button_blue } from "@/public/style/buttonStyle";
import { generateProof } from "@/reinforced-concrete/functions/generate_proof";
import { hashFile } from "@/reinforced-concrete/functions/hash";
import { verify_proof } from "@/reinforced-concrete/functions/verify_proof";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Button, Input } from "@nextui-org/react";
import { saveAs } from "file-saver";
import { ChangeEvent, ReactNode, useRef, useState } from "react";
import { FiUpload } from "react-icons/fi";
// import fs from 'fs';

const UploadPanel = (): ReactNode => {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(false);

  const handleChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    console.log("uploaded file:", e.target.files);
    if (!e.target.files) return;
    setFile(e.target.files[0]);

    // setFileValue(e.target.files[0].name);
  };

  const handleUpload = async () => {
    if (!file) {
      console.log("no file uploaded!");
      return;
    }
    setLoading(true);
    const date = new Date();

    //store file to the storage and return url
    const url = await storeFile(file, getFileName(date, title));
    if (!url) return;

    //hash the given document
    const hash = await hashFile(url);

    // //create a proof for the given document
    const { proof, public_ } = await generateProof(url);
    if (!proof || !public_) {
      console.log("something went wrong!");
      return;
    }
    var blob = new Blob([proof]);
    saveAs(blob, `${file.name}-key.json`);

    //store document and the hash to the db
    const uploadReq = await createzkDoc(title, url, hash, public_, date);
    if (!uploadReq) return;

    //clear inputs
    setTitle("");
    setFile(null);
    setLoading(false);
    window.location.reload();
  };

  return (
    <>
      <form
        typeof="file"
        name="img"
        encType="multipart/form-data"
        className="flex flex-col items-center"
      >
        <label
          htmlFor="file-upload-button"
          className={`${button_blue} flex flex-col mt-18 mb-18 p-4 px-8 rounded-2xl`}
        >
          <FiUpload className="flex flex-col" />
          문서를 첨부하세요
          <input
            type="file"
            id="file-upload-button"
            onChange={handleChangeFile}
            style={{ display: "none" }}
          />
        </label>
        <p className="min-h-8 w-44 bg-[#f5f5f8] rounded-md my-4 p-1 pl-2">{file?.name}</p> 
      </form>
      <Input
        className="w-44"
        value={title}
        placeholder="문서 제목을 입력해주세요."
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setTitle(e.target.value)
        }
      />
      <Button 
        className="w-36 mt-16 border-3 border-solid border-[#7879B5] bg-white text-[#7879B5] font-bold hover:bg-[#7879B5] hover:text-white" 
        onClick={handleUpload}>
        {isLoading ? 
        <AiOutlineLoading3Quarters className="w-6 h-6 animate-spin"/>
        :"업로드하기"}
      </Button>
    </>
  );
};

export default UploadPanel;
