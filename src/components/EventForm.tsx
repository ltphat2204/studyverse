'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { FiPlus, FiTrash, FiSend, FiX } from 'react-icons/fi';
import { motion } from 'framer-motion';

interface Event {
  subject: string;
  type: string;
  dueDateTime: string;
}

export default function EventForm({ onClose }: { onClose: () => void }) {
  const { control, handleSubmit } = useForm<{ events: Event[] }>({
    defaultValues: { events: [{ subject: '', type: '', dueDateTime: '' }] },
  });
  const [events, setEvents] = useState<Event[]>([{ subject: '', type: '', dueDateTime: '' }]);

  const addEvent = () => {
    setEvents([...events, { subject: '', type: '', dueDateTime: '' }]);
  };

  const removeEvent = (index: number) => {
    setEvents(events.filter((_, i) => i !== index));
  };

  const onSubmit = (data: { events: Event[] }) => {
    console.log('Submitted Data:', data);
  };

  return (
    <div onClick={onClose} className='w-screen h-screen flex flex-col items-center justify-center fixed top-0 left-0 bg-black/60 backdrop-blur-sm z-50'>
        <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
            className="max-w-3xl w-full mx-4 p-8 bg-white shadow-2xl rounded-2xl"
        >
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent flex items-center gap-2">
                    📝 Thêm sự kiện học tập
                </h2>
                <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={onClose}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                >
                    <FiX size={28} />
                </motion.button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {events.map((_, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="flex items-center space-x-3 p-4 bg-sky-50 rounded-xl border-2 border-sky-100"
                >
                    <Controller
                        name={`events.${index}.subject` as const}
                        control={control}
                        render={({ field }) => (
                            <input
                                {...field}
                                type="text"
                                placeholder="📚 Môn học"
                                className="flex-1 p-3 border-2 border-sky-200 rounded-lg bg-white text-sky-950 focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all"
                            />
                        )}
                    />
                    <Controller
                        name={`events.${index}.type` as const}
                        control={control}
                        render={({ field }) => (
                            <select
                                {...field}
                                className="flex-1 p-3 border-2 border-sky-200 rounded-lg bg-white text-sky-950 focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all"
                            >
                                <option value="">🏷️ Chọn loại</option>
                                <option value="Exam">📝 Kiểm tra</option>
                                <option value="Homework">📖 Bài tập</option>
                            </select>
                        )}
                    />
                    <Controller
                        name={`events.${index}.dueDateTime` as const}
                        control={control}
                        render={({ field }) => (
                            <input
                                {...field}
                                type="datetime-local"
                                className="flex-1 p-3 border-2 border-sky-200 rounded-lg bg-white text-sky-950 focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all"
                            />
                        )}
                    />
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        type="button"
                        onClick={() => removeEvent(index)}
                        className="p-3 bg-red-100 text-red-600 hover:bg-red-200 rounded-lg transition-colors"
                    >
                        <FiTrash size={20} />
                    </motion.button>
                </motion.div>
                ))}
                
                <div className="flex gap-3 pt-4">
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="button"
                        onClick={addEvent}
                        className="flex cursor-pointer items-center gap-2 bg-gradient-to-r from-sky-500 to-blue-600 text-white px-6 py-3 rounded-full hover:from-sky-600 hover:to-blue-700 shadow-lg transition-all font-semibold"
                    >
                        <FiPlus /> Thêm sự kiện
                    </motion.button>
                    
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="ml-auto flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 px-8 rounded-full hover:from-green-600 hover:to-emerald-700 shadow-lg transition-all font-semibold"
                    >
                        <FiSend /> Lưu tất cả
                    </motion.button>
                </div>
            </form>
        </motion.div>
    </div>
  );
}
