"use client";

import Image from "next/image";
import Link from "next/link";
import { PiStudentLight } from "react-icons/pi";
import { BsPerson } from "react-icons/bs";
import { LuBrain } from "react-icons/lu";
import { RiEmotionHappyLine } from "react-icons/ri";
import { PiTarget } from "react-icons/pi";
import { motion } from "framer-motion";
import { FiArrowRight, FiZap } from "react-icons/fi";

export default function Home() {
  return (
    <div className="min-h-screen bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section - Eye-catching header with animations */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 mb-20">
            <div className="flex-1 space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold mb-6">
                  <FiZap />
                  <span>Nền tảng học tập thông minh với AI</span>
                </div>
                <h1 className="text-6xl md:text-7xl font-black text-gray-900 mb-6 leading-tight">
                  StudyVerse
                </h1>
                <p className="text-xl text-gray-700 leading-relaxed mb-4">
                  Một nền tảng học tập thông minh được hỗ trợ bởi <span className="font-bold text-blue-600">AI</span> giúp học sinh duy trì sự tập trung, quản lý thời gian học tập hiệu quả và phát triển kỹ năng <span className="font-bold text-blue-600">tư duy phản biện</span>. 
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  StudyVerse phát hiện cảm xúc và mức độ căng thẳng của học sinh, cung cấp các đề xuất nghỉ ngơi được cá nhân hóa và mẹo chăm sóc sức khỏe để đảm bảo sự cân bằng giữa học tập và cuộc sống lành mạnh.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="space-y-4"
              >
                <p className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <FiArrowRight className="text-blue-600" />
                  Dùng thử ngay
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href="/student" className="group bg-blue-600 text-white py-4 px-8 rounded-xl hover:bg-blue-700 hover:shadow-xl transition-all duration-300 flex gap-3 items-center">
                    <span className="font-bold text-lg">Với tư cách Học sinh</span>
                    <PiStudentLight className='text-2xl' />
                  </Link>
                  <Link href="/parent" className="group border-2 border-gray-900 text-gray-900 py-4 px-8 rounded-xl hover:bg-gray-900 hover:text-white hover:shadow-xl transition-all duration-300 flex gap-3 items-center">
                    <span className="font-bold text-lg">Với tư cách Phụ huynh</span>
                    <BsPerson className='text-2xl' />
                  </Link>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex-1"
            >
              <Image src="/bot.png" width={784} height={198} alt="StudyVerse" className="h-auto w-full" />
            </motion.div>
          </div>
        </motion.div>
        {/* Problems Section - Modern card grid with hover effects */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="text-5xl md:text-6xl font-black text-gray-900 mb-4"
            >
              Vấn đề
            </motion.h1>
            <p className="text-xl text-gray-600">Những thách thức học sinh đang đối mặt</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { title: "Lạm dụng AI", img: "/overliance.png", delay: 0.1 },
              { title: "Bỏ qua Cảm xúc", img: "/overlooked.png", delay: 0.2 },
              { title: "Thiếu Tập trung", img: "/focus.png", delay: 0.3 },
              { title: "Quản lý Thời gian Kém", img: "/time.png", delay: 0.4 }
            ].map((problem, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: problem.delay }}
                whileHover={{ y: -8 }}
                className="group bg-gray-50 p-8 rounded-2xl hover:shadow-lg transition-all duration-300 border border-gray-200"
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-6">{problem.title}</h2>
                <div className="overflow-hidden rounded-xl">
                  <Image src={problem.img} width={700} height={700} alt={problem.title} className="h-auto w-full" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        {/* Objectives Section - Split layout with gradient cards */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex-1 space-y-8"
            >
              <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-12">
                Mục tiêu
              </h1>

              <motion.div
                whileHover={{ x: 5 }}
                className="bg-white p-8 rounded-2xl border-2 border-gray-200 hover:border-blue-600 hover:shadow-lg transition-all duration-300 mb-6"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-blue-600 p-4 rounded-xl">
                    <LuBrain className="text-white text-3xl" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Thúc đẩy Tư duy Phản biện</h2>
                </div>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Hướng dẫn học sinh với các gợi ý từng bước từ AI thay vì cung cấp câu trả lời trực tiếp.
                </p>
              </motion.div>

              <motion.div
                whileHover={{ x: 5 }}
                className="bg-white p-8 rounded-2xl border-2 border-gray-200 hover:border-blue-600 hover:shadow-lg transition-all duration-300 mb-6"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-blue-600 p-4 rounded-xl">
                    <RiEmotionHappyLine className="text-white text-3xl" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Hỗ trợ Sức khỏe Tinh thần</h2>
                </div>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Phát hiện mức độ căng thẳng và động lực để đề xuất nghỉ ngơi kịp thời và hỗ trợ sức khỏe tinh thần.
                </p>
              </motion.div>

              <motion.div
                whileHover={{ x: 5 }}
                className="bg-white p-8 rounded-2xl border-2 border-gray-200 hover:border-blue-600 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-blue-600 p-4 rounded-xl">
                    <PiTarget className="text-white text-3xl" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Tăng cường Khả năng Tập trung</h2>
                </div>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Hướng dẫn học sinh với các gợi ý từng bước từ AI thay vì cung cấp câu trả lời trực tiếp.
                </p>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex-1"
            >
              <Image src="/objective.png" width={784} height={198} alt="StudyVerse" className="h-auto w-full rounded-2xl" />
            </motion.div>
          </div>
        </motion.div>
        {/* Target Customers Section - Modern 3-column grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="text-5xl md:text-6xl font-black text-gray-900 mb-4"
            >
              Khách hàng mục tiêu
            </motion.h1>
            <p className="text-xl text-gray-600">Giải pháp cho mọi đối tượng trong hệ thống giáo dục</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Học sinh", img: "/student.png", delay: 0.1 },
              { title: "Phụ huynh", img: "/parent.png", delay: 0.2 },
              { title: "Trường học", img: "/school.png", delay: 0.3 }
            ].map((customer, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: customer.delay }}
                whileHover={{ y: -8 }}
                className="group bg-white p-8 rounded-2xl hover:shadow-lg transition-all duration-300 border-2 border-gray-200"
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-6">{customer.title}</h2>
                <div className="overflow-hidden rounded-xl">
                  <Image 
                    src={customer.img} 
                    width={700} 
                    height={700} 
                    alt={customer.title} 
                    className="h-auto w-full" 
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action Footer */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center bg-gray-900 rounded-2xl p-12"
        >
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Sẵn sàng bắt đầu hành trình học tập?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Tham gia StudyVerse ngay hôm nay và trải nghiệm cách học thông minh hơn!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/student" className="group bg-blue-600 text-white py-4 px-8 rounded-xl hover:bg-blue-700 transition-all duration-300 flex gap-3 items-center font-bold text-lg">
              <span>Bắt đầu ngay</span>
              <FiArrowRight className="group-hover:translate-x-2 transition-transform duration-300" />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 
