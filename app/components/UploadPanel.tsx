"use client";
import { createzkDoc, storeFile } from "@/lib/firebase/CRUD";
import { getFileName } from "@/lib/functions/fileName";
import { generateProof } from "@/reinforced-concrete/functions/generate_proof";
import { hashFile } from "@/reinforced-concrete/functions/hash";
import { verify_proof } from "@/reinforced-concrete/functions/verify_proof";
import { dummyDocs } from "@/template/doc";
import { Button, Input } from "@nextui-org/react";
import { saveAs } from "file-saver";
import { ChangeEvent, ReactNode, useRef, useState } from "react";
// import fs from 'fs';

const UploadPanel = (): ReactNode => {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState<string>("");
  // const [fileValue,setFileValue] = useState<string>("")

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
    const date = new Date();

    //store file to the storage and return url
    const url = await storeFile(file, getFileName(date, title));
    if (!url) return;

    //hash the given document
    const hash = await hashFile(url);

    // //create a proof for the given document
    const { proof, public_} = await generateProof("");
    const fileType = "text";
    var blob = new Blob([proof]);
    saveAs(blob, `${file.name}-key.json`);
    
    //store document and the hash to the db
    const uploadReq = await createzkDoc(title, url, hash, public_);
    if (!uploadReq) return;

    //clear inputs
    setTitle("");
    setFile(null);
  };

  const testVerify = async () => {
    verify_proof( dummyDocs[0], "");
  }

  return (
    <>
      <input
        className="w-full"
        type="file"
        onChange={(e: ChangeEvent<HTMLInputElement>) => handleChangeFile(e)}
      />
      <p className="w-full">{file?.name}</p>
      <Input
        value={title}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setTitle(e.target.value)
        }
      />
      <Button className="" onClick={handleUpload}>
        Upload Doc
      </Button>
      <Button className="" onClick={testVerify}>
        Verify
      </Button>
    </>
  );
};

export default UploadPanel;
