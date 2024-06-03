import MainPage from "./components/MainPage";
import Sidebar from "./components/Sidebar";

export default function Home() {
  return (
    <main className="flex min-h-screen w-screen">    
      <Sidebar/>
      <MainPage/>
    </main>
  );
}
