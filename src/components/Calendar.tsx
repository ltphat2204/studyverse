'use client';

import { useState, ReactElement } from "react";
import { addMonths, subMonths, format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isSameDay } from "date-fns";
import { vi } from "date-fns/locale";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { motion } from "framer-motion";
import Link from "next/link";

const daysOfWeek: string[] = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];

interface Task {
  date: Date;
  title: string;
  color: string;
}

const mockTasks: Task[] = [
  // Tuần này (9-15 Tháng 12, 2025)
  { date: new Date("2025-12-09"), title: "BTVN Toán", color: "bg-sky-500" },
  { date: new Date("2025-12-09"), title: "Ôn Văn học", color: "bg-sky-500" },
  { date: new Date("2025-12-10"), title: "Nộp Toán", color: "bg-orange-500" },
  { date: new Date("2025-12-10"), title: "BTVN Hóa học", color: "bg-sky-500" },
  { date: new Date("2025-12-11"), title: "Thi Văn học", color: "bg-red-500" },
  { date: new Date("2025-12-11"), title: "Ôn Vật lý", color: "bg-sky-500" },
  { date: new Date("2025-12-12"), title: "BTVN Sinh học", color: "bg-sky-500" },
  { date: new Date("2025-12-12"), title: "Nộp Hóa học", color: "bg-orange-500" },
  { date: new Date("2025-12-13"), title: "Thi Vật lý", color: "bg-red-500" },
  { date: new Date("2025-12-13"), title: "BTVN Lịch sử", color: "bg-sky-500" },
  { date: new Date("2025-12-14"), title: "Nộp Sinh học", color: "bg-orange-500" },
  { date: new Date("2025-12-15"), title: "Ôn Tiếng Anh", color: "bg-sky-500" },
  { date: new Date("2025-12-15"), title: "Nộp Lịch sử", color: "bg-orange-500" },
  
  // Tuần tới (16-22 Tháng 12, 2025)
  { date: new Date("2025-12-16"), title: "BTVN Địa lý", color: "bg-sky-500" },
  { date: new Date("2025-12-17"), title: "Thi Tiếng Anh", color: "bg-red-500" },
  { date: new Date("2025-12-18"), title: "Nộp Địa lý", color: "bg-orange-500" },
  { date: new Date("2025-12-18"), title: "BTVN Tin học", color: "bg-sky-500" },
  { date: new Date("2025-12-19"), title: "Ôn Toán", color: "bg-sky-500" },
  { date: new Date("2025-12-20"), title: "Nộp Tin học", color: "bg-orange-500" },
  { date: new Date("2025-12-20"), title: "Thi Toán", color: "bg-red-500" },
];


export default function Calendar(): ReactElement {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const prevMonth = (): void => setCurrentDate(subMonths(currentDate, 1));
  const nextMonth = (): void => setCurrentDate(addMonths(currentDate, 1));

  const monthStart: Date = startOfMonth(currentDate);
  const monthEnd: Date = endOfMonth(monthStart);
  const startDate: Date = startOfWeek(monthStart);
  const endDate: Date = endOfWeek(monthEnd);
  
  const days: Date[] = eachDayOfInterval({ start: startDate, end: endDate });

  return (
    <div className="w-full bg-white rounded-2xl p-6 shadow-xl border-2 border-sky-100">
      {/* Month Navigation */}
      <div className="flex justify-between items-center mb-6">
        <motion.button
          whileHover={{ scale: 1.1, x: -3 }}
          whileTap={{ scale: 0.9 }}
          onClick={prevMonth}
          className="p-3 rounded-full bg-gradient-to-br from-sky-100 to-blue-100 hover:from-sky-200 hover:to-blue-200 cursor-pointer transition-all shadow-md"
        >
          <FaChevronLeft className="text-sky-700" />
        </motion.button>
        
        <motion.h2
          key={format(currentDate, "MMMM yyyy")}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent"
        >
          {format(currentDate, "'Tháng' M yyyy", { locale: vi })}
        </motion.h2>
        
        <motion.button
          whileHover={{ scale: 1.1, x: 3 }}
          whileTap={{ scale: 0.9 }}
          onClick={nextMonth}
          className="p-3 rounded-full bg-gradient-to-br from-sky-100 to-blue-100 hover:from-sky-200 hover:to-blue-200 cursor-pointer transition-all shadow-md"
        >
          <FaChevronRight className="text-sky-700" />
        </motion.button>
      </div>

      {/* Day Headers */}
      <div className="grid grid-cols-7 text-center font-bold mb-2">
        {daysOfWeek.map((day, index) => (
          <div
            key={day}
            className={`p-3 uppercase text-sm ${
              index === 0 || index === 6 
                ? "text-red-500" 
                : "text-sky-700"
            }`}
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => {
          const isToday = isSameDay(day, new Date());
          const isSelected = isSameDay(day, selectedDate);
          const isWeekend = day.getDay() === 0 || day.getDay() === 6;
          const tasksForDay = mockTasks.filter(task => isSameDay(task.date, day));
          
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.01 }}
              whileHover={{ scale: 1.05, zIndex: 10 }}
              onClick={() => setSelectedDate(day)}
              className={`
                relative p-2 min-h-[100px] flex flex-col items-start justify-start cursor-pointer 
                rounded-xl transition-all duration-200
                ${!isSameMonth(day, monthStart) ? "opacity-40" : ""}
                ${isToday ? "ring-2 ring-blue-500 ring-offset-2" : ""}
                ${isSelected ? "bg-gradient-to-br from-sky-100 to-blue-100 shadow-md" : "bg-sky-50/50"}
                ${!isSelected && isSameMonth(day, monthStart) ? "hover:bg-gradient-to-br hover:from-sky-50 hover:to-blue-50 hover:shadow" : ""}
              `}
            >
              {/* Date number */}
              <span className={`
                text-sm font-bold mb-1 px-2 py-1 rounded-full
                ${isToday ? "bg-blue-500 text-white" : ""}
                ${isWeekend && !isToday ? "text-red-500" : !isToday ? "text-sky-900" : ""}
              `}>
                {format(day, "d")}
              </span>

              {/* Tasks */}
              <div className="w-full space-y-1">
                {tasksForDay.map((task, i) => (
                  <Link
                    href={`/student/focus/${encodeURIComponent(task.title)}`}
                    key={i}
                  >
                    <motion.div
                      whileHover={{ scale: 1.05, x: 2 }}
                      className={`${task.color} text-white text-xs rounded-lg px-2 py-1 truncate shadow-sm hover:shadow-md transition-all font-medium`}
                    >
                      {task.title}
                    </motion.div>
                  </Link>
                ))}
              </div>

              {/* Task count indicator */}
              {tasksForDay.length > 0 && (
                <div className="absolute bottom-1 right-1 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold shadow">
                  {tasksForDay.length}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-6 pt-4 border-t border-sky-100 flex flex-wrap gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-sky-500 rounded"></div>
          <span className="text-gray-600">Bài tập về nhà</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-orange-500 rounded"></div>
          <span className="text-gray-600">Hạn nộp</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-500 rounded"></div>
          <span className="text-gray-600">Kiểm tra</span>
        </div>
      </div>
    </div>
  );
}
