"use client";

import axios from "axios";
import { useEffect, useState } from "react";

interface SentenceData {
  sentence: string;
  emotion: string;
}

const COLORS: { [key: string]: string } = {
  Happy: "#16a34a",
  Tired: "#7c3aed",
  Angry: "#dc2626",
  Sad: "#3b82f6",
  Anxious: "#ea580c",
  Neutral: "#c3c3c3",
};

const EMOTION_TRANSLATION: { [key: string]: string } = {
  Happy: "Vui vẻ",
  Tired: "Mệt mỏi",
  Angry: "Tức giận",
  Sad: "Buồn bã",
  Anxious: "Lo lắng",
  Neutral: "Trung tính",
};

export default function SentenceTable() {
  const [sentences, setSentences] = useState<SentenceData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Số dòng mỗi trang

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          "https://script.google.com/macros/s/AKfycbwveizmxcCSjHsYqWwTgmc6y9XzVnsqOZ7MjY62dxc7LN7BwhYt2bSfSUiuDmDCC6MjFw/exec?a=true"
        );
        const data = response.data as SentenceData[];
        setSentences(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Fetch ngay khi component được mount
    getData();
    // Thiết lập interval fetch dữ liệu mỗi 3 giây
    const intervalId = setInterval(() => {
      getData();
    }, 3000);

    // Cleanup interval khi component unmount
    return () => clearInterval(intervalId);
  }, []);

  // Đảo ngược mảng để hiển thị theo thứ tự mới nhất trước
  const reversedSentences = sentences.slice().reverse();
  // Tính toán chỉ số bắt đầu và kết thúc cho trang hiện tại
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = reversedSentences.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sentences.length / itemsPerPage);

  return (
    <div className="p-6 shadow-lg border-2 border-gray-200 bg-white rounded-2xl hover:shadow-xl transition-shadow h-full flex flex-col">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          💬 Tin nhắn & Cảm xúc
        </h2>
        <p className="text-gray-600 text-base">
          Nội dung trò chuyện với AI và trạng thái cảm xúc
        </p>
      </div>
      <div className="overflow-x-auto flex-1">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100 sticky top-0">
            <tr className="border-b-2 border-gray-300">
              <th className="px-4 py-3 w-3/4 text-left text-base font-bold text-gray-700">Tin nhắn</th>
              <th className="px-4 py-3 w-1/4 text-left text-base font-bold text-gray-700">Cảm xúc</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } border-b border-gray-300 hover:bg-gray-100 transition-colors`}
              >
                <td className="px-4 py-3 flex items-start gap-1">
                  <span className="break-words text-base text-gray-800">{item.sentence}</span>
                </td>
                <td
                  className="px-4 py-3 font-semibold text-base"
                  style={{ color: COLORS[item.emotion] }}
                >
                  {EMOTION_TRANSLATION[item.emotion] || item.emotion}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Phân trang */}
      <div className="mt-6 flex justify-center gap-2">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`px-4 py-2 rounded-lg font-medium text-base transition-all ${
              currentPage === index + 1
                ? "bg-gray-700 text-white shadow-md"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <div className="mt-4 text-sm text-gray-600 text-center">
        💡 <span className="font-medium">Mẹo:</span> Theo dõi cảm xúc của con qua các tin nhắn với AI chatbot
      </div>
    </div>
  );
}
