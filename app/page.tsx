import { proof_generator } from "@/reinforced-concrete/functions/generate_proof";
import Image from "next/image";
import TestButton from "./components/TestButton";
export default function Home() {

  // proof_generator("123")

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <TestButton/>
    </main>
  );
}
