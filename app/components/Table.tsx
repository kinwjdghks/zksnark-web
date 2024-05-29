"use client"
import { zkdoc } from "@/template/doc";
import { Pagination, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, getKeyValue } from "@nextui-org/react";
import { ReactNode, useMemo, useState } from "react";

type TableProps = {
    docs: zkdoc[]
    isLoading: boolean
}

const DocTable = ({docs, isLoading}:TableProps):ReactNode => {
  const rowsPerPage = 10;
  const [page, setPage] = useState<number>(1)


  const pages = useMemo(() => {
    return docs?.length ? Math.ceil(docs.length / rowsPerPage) : 0;
  }, [docs?.length, rowsPerPage]);

  const loadingState = isLoading || docs?.length === 0 ? "loading" : "idle";

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
        <TableColumn key="date">Date</TableColumn>
        <TableColumn key="title">Title</TableColumn>
        <TableColumn key="uploader">Uploader</TableColumn>
        <TableColumn key="id">Id</TableColumn>
      </TableHeader>
      <TableBody
        items={docs}
        loadingContent={<Spinner />}
        loadingState={loadingState}
      >
        {doc => (
          <TableRow key={doc.hash}>
            {(columnKey) => <TableCell>{getKeyValue(doc, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}


export default DocTable;