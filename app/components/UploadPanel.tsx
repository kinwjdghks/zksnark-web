"use client";
import { createzkDoc } from "@/lib/firebase/CRUD";
import { readFileAsArrayBuffer } from "@/lib/functions/encode";
import { getHash } from "@/reinforced-concrete/functions/hash";
import { Button, Input } from "@nextui-org/react";
import { ChangeEvent, ReactNode, useRef, useState } from "react";

const UploadPanel = ():ReactNode => {
    const [file, setFile] = useState<File|null>(null);
    const titleRef = useRef<HTMLInputElement>(null);

    const handleChangeFile = (e:ChangeEvent<HTMLInputElement>) => {
        console.log("uploaded file:", e.target.files)
        if(!e.target.files) return;
        setFile(e.target.files[0]);
    }

    const handleUpload = async () => {
        if(!file) {
            console.log("no file uploaded!");
            return;
        }
        
        //encode file into string
        const arrayBuffer = await readFileAsArrayBuffer(file);
        console.log("arrayBuffer: ",arrayBuffer);

        //hash the given document
        const hash = getHash(file);

        //store document and the hash to the db
        const title = titleRef.current!!.value;
        const upload = await createzkDoc(title, file, hash);
        if(!upload) return;
        
        //create a proof for the given document
        
    }

    return <>
        <input className="w-full" type="file" onChange={(e:ChangeEvent<HTMLInputElement>)=>handleChangeFile(e)}/>
        <p className="w-full">{file?.name}</p>
        <Input ref={titleRef}/>
        <Button className=""
          onClick={handleUpload}>Upload Doc</Button>
    </>
}

export default UploadPanel;