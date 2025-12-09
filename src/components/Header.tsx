import Image from "next/image";

export default function Header() {
    return (
      <header className="p-4 w-screen">
        <div className="rounded p-4 bg-white flex items-center justify-center">
          <Image src="/logo.png" width={784} height={198} alt="StudyVerse" className="h-14 w-auto" />
        </div>
      </header>
    );
}