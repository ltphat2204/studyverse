import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import "./globals.css";
import SideTab from "@/components/SideTab";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "StudyVerse",
  description: "StudyVerse là nền tảng học tập thông minh được hỗ trợ bởi AI giúp học sinh duy trì sự tập trung, quản lý thời gian học tập hiệu quả và phát triển kỹ năng tư duy phản biện. Với lịch trình thông minh, hướng dẫn từng bước và quản lý khối lượng công việc cân bằng, nền tảng này biến việc học thành trải nghiệm hiệu quả và hấp dẫn. Ngoài ra, StudyVerse phát hiện cảm xúc và mức độ căng thẳng của học sinh, cung cấp các đề xuất nghỉ ngơi được cá nhân hóa và mẹo chăm sóc sức khỏe để đảm bảo sự cân bằng giữa học tập và cuộc sống lành mạnh.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={`${inter.className} bg-sky-100 text-sky-950`}>
        <Header/>
        <div
          style={{ height: `calc(100vh - 120px)` }}
          className="flex w-screen space-x-4 p-4"
        >
        <SideTab/>
        <main 
            className="p-4 bg-white w-full h-full rounded overflow-y-auto"
            style={{ flexBasis: 'calc(100vw - 14rem)' }}>
          {children}
        </main>

        </div>
      </body>
    </html>
  );
}
