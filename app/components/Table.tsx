"use client";
import { zkdoc } from "@/template/doc";
import {
  Pagination,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  getKeyValue,
} from "@nextui-org/react";
import { Key, ReactNode, useState } from "react";
import ManageDoc from "./ManageDoc";
import { decimalToHex } from "@/lib/functions/decimalToHex";
import { button_blue } from "@/public/style/buttonStyle";

type TableProps = {
  docs: zkdoc[];
  isLoading: boolean;
};

const DocTable = ({ docs, isLoading }: TableProps):ReactNode => {
  const loadingState = "idle";

  const renderCell = (
    doc: zkdoc,
    columnKey: Key
  ) => {
    const cellValue = doc[columnKey as "timestamp" | "title" | "hash"];
  
    switch (columnKey) {
      case "timestamp":
        const date = cellValue as Date;
        return (
          <p className="w-full text-center" suppressHydrationWarning>
             {date.toDateString() +" "+ date.toTimeString().slice(0, 8)}
          </p>
        );
      case "hash":
        return <div>{decimalToHex(cellValue as string).slice(0,20)}...
          <div className={`${button_blue} absolute z-10 top-0 w-full overflow-hidden p-1 rounded-lg opacity-0 hover:opacity-100 hover:w-fit hover:-left-[10rem]`}>{decimalToHex(cellValue as string)}</div>
        </div>;
      case "manage":
        return <ManageDoc doc={doc}/>
      default:
        return <p>{cellValue as string}</p>;
    }
  };

  return (
    <Table aria-label="zk Docs List" className="h-full" isHeaderSticky >
      <TableHeader>
        <TableColumn 
          key="timestamp"
          className="w-56 h-16 text-[1.2rem] text-center ">Date</TableColumn>
        <TableColumn 
          key="title"
          className="h-16 text-[1.2rem] text-center">Title</TableColumn>
        <TableColumn 
          key="hash"
          className="w-60 h-16 text-[1.2rem] text-center">Hash</TableColumn>
        <TableColumn 
          key="manage"
          className="w-60 h-16 text-[1.2rem] text-center">Manage</TableColumn>
      </TableHeader>
      <TableBody
        items={docs}
        loadingContent={<Spinner />}
        loadingState={loadingState}
      >
        {(doc) => (
          <TableRow key={doc.hash} className="text-center">
            {(columnKey) => <TableCell>{renderCell(doc, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default DocTable;
