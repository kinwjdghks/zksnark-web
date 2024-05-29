export interface zkdoc {
  title: string;
  hash: string;
  uploader: string;
  timestamp: Date;
}

export const dummyDocs:zkdoc[] = [
    {
        title: "doc1",
        hash: "fhkwf38of3infk3f3fsfKF3n",
        uploader: "somebody1",
        timestamp: new Date()
    },
    {
        title: "doc2",
        hash: "og93j9fj3owj3f9jdivifvdf",
        uploader: "somebody2",
        timestamp: new Date()
    },
    {
        title: "doc3",
        hash: "f3n8woo3w8hwo8fh3ow8hwfh",
        uploader: "somebody3",
        timestamp: new Date()
    },
    {
        title: "doc4",
        hash: "hmeowgj94wgw39gj3etj39oj",
        uploader: "somebody4",
        timestamp: new Date()
    }
]