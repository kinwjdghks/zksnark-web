export interface zkdoc {
  id?: string;
  title: string;
  hash: string;
  url:string;
  timestamp: Date;
  public: string;
}

export const dummyDocs:zkdoc[] = [
    {
        id: "123",
        title: "doc1",
        hash: "fhkwf38of3infk3f3fsfKF3n",
        url:"",
        timestamp: new Date(),
        public: ""
    },
    {
        id:"234",
        title: "doc2",
        hash: "og93j9fj3owj3f9jdivifvdf",
        url:"",
        timestamp: new Date(),
        public: ""
    },
    {
        id:"345",
        title: "doc3",
        hash: "f3n8woo3w8hwo8fh3ow8hwfh",
        url:"",
        timestamp: new Date(),
        public: ""
    },
    {
        id:"456",
        title: "doc4",
        hash: "hmeowgj94wgw39gj3etj39oj",
        url:"",
        timestamp: new Date(),
        public: ""
    }
]