'use client';

import Calendar from "@/components/Calendar";
import { FiPlus } from 'react-icons/fi';
import EventForm from "@/components/EventForm";
import { useState } from "react";
import { motion } from "framer-motion";

export default function StudentPage() {
    const [showEventForm, setShowEventForm] = useState(false);

    return (
        <div className="min-h-full bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 p-6 rounded-xl">
            {showEventForm && <EventForm onClose={()=>setShowEventForm(false)} />}
            
            {/* Header Section */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-6"
            >
                <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-sky-900 mb-2 flex items-center gap-2">
                            📅 Lịch học tập của tôi
                        </h1>
                        <p className="text-sky-600">Quản lý thời gian học tập hiệu quả</p>
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={()=>setShowEventForm(true)}
                        className="bg-gradient-to-r from-sky-500 to-blue-600 text-white px-6 py-3 rounded-full flex items-center gap-2 cursor-pointer shadow-lg hover:shadow-xl transition-all font-semibold"
                    >
                        <FiPlus className="text-xl"/> Thêm sự kiện mới
                    </motion.button>
                </div>
            </motion.div>

            {/* Calendar with animation */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <Calendar />
            </motion.div>
        </div>
    );
}