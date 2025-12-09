'use client';

import EmotionProbabilityChart from "@/components/EmotionProbabilityChart";
import FocusTimeChart from "@/components/FocusChart";
import SentenceTable from "@/components/SentenceEmotionTable";
import { motion } from "framer-motion";
import { FiActivity, FiClock, FiSmile, FiTrendingUp } from "react-icons/fi";

export default function ParentPage() {
    return (
        <div className="min-h-full bg-gradient-to-br from-slate-50 via-gray-50 to-stone-50 p-8 rounded-xl">
            {/* Header Section - Professional and clear for parents */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-8"
            >
                <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-3 rounded-xl">
                            <FiActivity className="text-white text-2xl" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800">
                                Bảng điều khiển Phụ huynh
                            </h1>
                            <p className="text-gray-600 text-lg mt-1">
                                Theo dõi tiến độ và tình trạng học tập của con bạn
                            </p>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Main Content - Larger text and spacing for parent readability */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6"
            >
                <div className="lg:col-span-1">
                    <SentenceTable />
                </div>
                <div className="lg:col-span-1 flex flex-col gap-6">
                    {/* KPI Measures Section */}
                    <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100">
                        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <FiTrendingUp className="text-blue-600" />
                            Chỉ số quan trọng
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                            {/* Average Focus Time */}
                            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border-2 border-blue-200">
                                <div className="flex items-center gap-2 mb-2">
                                    <FiClock className="text-blue-600 text-xl" />
                                    <p className="text-sm font-medium text-gray-700">Tập trung TB</p>
                                </div>
                                <p className="text-3xl font-bold text-blue-700">3.2 <span className="text-lg">giờ</span></p>
                                <p className="text-xs text-gray-600 mt-1">↑ 12% so với tuần trước</p>
                            </div>

                            {/* Positive Emotion Rate */}
                            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border-2 border-green-200">
                                <div className="flex items-center gap-2 mb-2">
                                    <FiSmile className="text-green-600 text-xl" />
                                    <p className="text-sm font-medium text-gray-700">Cảm xúc +</p>
                                </div>
                                <p className="text-3xl font-bold text-green-700">72<span className="text-lg">%</span></p>
                                <p className="text-xs text-gray-600 mt-1">↑ 5% so với tuần trước</p>
                            </div>

                            {/* Total Study Sessions */}
                            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 border-2 border-purple-200">
                                <div className="flex items-center gap-2 mb-2">
                                    <FiActivity className="text-purple-600 text-xl" />
                                    <p className="text-sm font-medium text-gray-700">Buổi học</p>
                                </div>
                                <p className="text-3xl font-bold text-purple-700">24 <span className="text-lg">buổi</span></p>
                                <p className="text-xs text-gray-600 mt-1">Trong 14 ngày qua</p>
                            </div>

                            {/* Average Session Duration */}
                            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4 border-2 border-orange-200">
                                <div className="flex items-center gap-2 mb-2">
                                    <FiClock className="text-orange-600 text-xl" />
                                    <p className="text-sm font-medium text-gray-700">Thời lượng TB</p>
                                </div>
                                <p className="text-3xl font-bold text-orange-700">45 <span className="text-lg">phút</span></p>
                                <p className="text-xs text-gray-600 mt-1">Mỗi buổi học</p>
                            </div>
                        </div>
                    </div>

                    {/* Emotion Chart */}
                    <EmotionProbabilityChart />
                </div>
            </motion.div>

            {/* Focus Time Chart - Full Width */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
            >
                <FocusTimeChart />
            </motion.div>

            {/* Help Section for Parents */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border-2 border-blue-100"
            >
                <h3 className="text-xl font-bold text-gray-800 mb-3">💡 Hướng dẫn sử dụng</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
                    <div className="flex items-start gap-2">
                        <span className="text-2xl">📊</span>
                        <div>
                            <p className="font-semibold">Biểu đồ cảm xúc:</p>
                            <p className="text-sm">Hiển thị trạng thái tâm lý của con bạn trong quá trình học tập</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-2">
                        <span className="text-2xl">⏰</span>
                        <div>
                            <p className="font-semibold">Thời gian tập trung:</p>
                            <p className="text-sm">Theo dõi số giờ học tập hiệu quả của con trong 14 ngày qua</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-2">
                        <span className="text-2xl">💬</span>
                        <div>
                            <p className="font-semibold">Tin nhắn:</p>
                            <p className="text-sm">Xem nội dung và cảm xúc trong các cuộc trò chuyện với AI</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-2">
                        <span className="text-2xl">📈</span>
                        <div>
                            <p className="font-semibold">Xu hướng:</p>
                            <p className="text-sm">Phát hiện thay đổi trong hành vi và tâm trạng học tập</p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}