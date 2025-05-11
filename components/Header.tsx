export const Header = () => {
  return (
    <header class="w-full bg-green-600 text-white py-4 shadow-md">
      <div class="max-w-screen-md mx-auto flex items-center justify-between px-4">
        <div class="flex items-center space-x-2">
          <img src="/logo.svg" alt="Sudoku Steps Logo" class="h-8 w-8" />
          <span class="font-bold text-xl tracking-wide">Sudoku Steps</span>
        </div>
        <nav class="space-x-4">
          <a href="/" class="hover:underline">Home</a>
          <a href="/options" class="hover:underline">Options</a>
          <a href="/about" class="hover:underline">About</a>
        </nav>
      </div>
    </header>
  );
};
