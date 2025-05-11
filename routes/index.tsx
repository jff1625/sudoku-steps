import { Header } from "../components/Header.tsx";
import HomeIsland from "../islands/HomeIsland.tsx";

export default function Home() {
  return (
    <div class="min-h-screen bg-[#86efac] flex flex-col">
      <Header />
      <main class="flex-1 flex flex-col items-center justify-start">
        <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center w-full">
          <HomeIsland />
        </div>
      </main>
    </div>
  );
}
