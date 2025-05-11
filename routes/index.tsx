import { Header } from "../components/Header.tsx";
import HomeIsland from "../islands/HomeIsland.tsx";

export default function Home() {
  return (
    <div class="min-h-screen bg-[#86efac]">
      <Header />
      <main class="px-4 py-8 mx-auto">
        <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
          <HomeIsland />
        </div>
      </main>
    </div>
  );
}
