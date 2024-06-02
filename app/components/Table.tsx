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
import { Key, ReactNode, useMemo, useState } from "react";
import ManageDoc from "./ManageDoc";

type TableProps = {
  docs: zkdoc[];
  isLoading: boolean;
};

const DocTable = ({ docs, isLoading }: TableProps): ReactNode => {
  const rowsPerPage = 10;
  const [page, setPage] = useState<number>(1);

  const pages = useMemo(() => {
    return docs?.length ? Math.ceil(docs.length / rowsPerPage) : 0;
  }, [docs?.length, rowsPerPage]);

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
          <p className="w-full text-center">
            {new Date(date).toDateString() + "\n"}
            {new Date(date).toTimeString().slice(0, 8)}
          </p>
        );
      case "hash":
        return <p>{(cellValue as string).slice(0,20)}...</p>;
      case "manage":
        return <ManageDoc doc={doc}/>
      default:
        return <p>{cellValue as string}</p>;
    }
  };

  return (
    <Table
      aria-label="zk Docs List"
      bottomContent={
        pages > 0 ? (
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="primary"
              page={page}
              total={pages}
              onChange={(page) => setPage(page)}
            />
          </div>
        ) : null
      }
      //   {...args}
    >
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
