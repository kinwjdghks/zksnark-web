import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic"; // defaults to auto

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const {
    
  } = req.body!!
  
  
  // try {
  //   const data = await getAllNotices();
  //   if (!data) return NextResponse.json({ data: [], totalPages: 0 });
  //   return NextResponse.json({
  //     data: data,
  //     totalPages: Math.ceil(data.length / DATA_PER_PAGE),
  //   });
  // } catch (error) {
  //   console.log(`error fetching data: ${error}`);
  //   return NextResponse.json({ data: [], totalPages: 0 });
  // }
}
