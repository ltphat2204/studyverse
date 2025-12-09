'use client';

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { FaPlay, FaPause, FaRedo, FaCog } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const FocusPage = ({ event }: { event: string }) => {
  // Default Pomodoro timer duration (25 minutes)
  const defaultTime = 25 * 60; // 25 minutes in seconds
  const [timeLeft, setTimeLeft] = useState(defaultTime);
  const [isActive, setIsActive] = useState(false);
  const [showCustomize, setShowCustomize] = useState(false);
  const [customMinutes, setCustomMinutes] = useState(25);
  const [sessionCount, setSessionCount] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && interval) {
      clearInterval(interval);
      setIsActive(false);
      setSessionCount((prev) => prev + 1);
      // Show a more user-friendly notification
      const audio = new Audio('/notification.mp3');
      audio.play().catch(() => {});
      alert("🎉 Tuyệt vời! Bạn đã hoàn thành một phiên học tập!");
    }

    return () => {
        if (interval) {
            clearInterval(interval);
        }
    }
  }, [isActive, timeLeft]);

  const startTimer = () => setIsActive(true);
  const stopTimer = () => setIsActive(false);
  const resetTimer = () => {
    setTimeLeft(defaultTime);
    setIsActive(false);
  };

  const applyCustomTime = () => {
    const newTime = customMinutes * 60;
    setTimeLeft(newTime);
    setShowCustomize(false);
    setIsActive(false);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const getProgressPercentage = () => {
    return ((defaultTime - timeLeft) / defaultTime) * 100;
  };

  const getMotivationalMessage = () => {
    const percentage = getProgressPercentage();
    if (percentage === 0) return "Hãy bắt đầu hành trình học tập của bạn! 💪";
    if (percentage < 25) return "Khởi đầu tuyệt vời! Tiếp tục nào! 🚀";
    if (percentage < 50) return "Bạn đang làm rất tốt! 🌟";
    if (percentage < 75) return "Gần đến đích rồi! Cố lên! 🎯";
    if (percentage < 100) return "Sắp hoàn thành! Nỗ lực cuối nào! 🏆";
    return "Xuất sắc! Bạn đã hoàn thành! 🎉";
  };

  return (
    <div className="h-screen w-screen fixed top-0 left-0 bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 p-8 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-sky-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      {/* Close button */}
      <Link href="/student">
        <motion.div
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          className="absolute right-8 top-8 z-10 bg-white rounded-full p-3 shadow-lg cursor-pointer hover:bg-red-50 transition-colors"
        >
          <RxCross1 className="text-2xl text-sky-600 hover:text-red-500" />
        </motion.div>
      </Link>

      <div className="max-w-5xl mx-auto text-center flex items-center justify-center h-full flex-col pb-16 relative z-10">
        {/* Event title with badge */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="inline-block bg-white rounded-full px-8 py-4 shadow-lg">
            <h1 className="text-sky-950 text-3xl font-bold">
              📚 {event || "Đang tải..."}
            </h1>
          </div>
        </motion.div>

        {/* Session counter */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="mb-6 bg-gradient-to-r from-sky-500 to-blue-500 text-white px-6 py-2 rounded-full shadow-md"
        >
          <span className="text-sm font-semibold">Phiên học tập hôm nay: {sessionCount} 🔥</span>
        </motion.div>

        {/* Bot mascot with animation */}
        <motion.div
          animate={{
            y: isActive ? [0, -10, 0] : 0,
          }}
          transition={{
            duration: 2,
            repeat: isActive ? Infinity : 0,
            ease: "easeInOut"
          }}
        >
          <Image 
            className="mb-8 drop-shadow-2xl" 
            src="/bot.png" 
            alt="StudyVerse Bot" 
            width={180} 
            height={180} 
          />
        </motion.div>

        {/* Timer display with gradient background */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative mb-8"
        >
          {/* Progress ring */}
          <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#e0f2fe"
              strokeWidth="8"
            />
            <motion.circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 45}`}
              strokeDashoffset={`${2 * Math.PI * 45 * (1 - getProgressPercentage() / 100)}`}
              transition={{ duration: 0.5 }}
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0ea5e9" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
            </defs>
          </svg>

          <div className="relative bg-white rounded-full p-12 shadow-2xl">
            <p className={`font-bold transition-all ${isActive ? 'text-7xl text-sky-600' : 'text-8xl text-sky-900'}`}>
              {formatTime(timeLeft)}
            </p>
          </div>
        </motion.div>

        {/* Motivational message */}
        <motion.p
          key={getMotivationalMessage()}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="text-xl text-sky-700 font-medium mb-8 h-8"
        >
          {getMotivationalMessage()}
        </motion.p>

        {/* Control buttons with icons */}
        <div className="flex justify-center gap-4 flex-wrap">
          {!isActive ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={startTimer}
              className="bg-gradient-to-r from-green-500 to-emerald-600 cursor-pointer text-white py-4 px-8 rounded-full hover:from-green-600 hover:to-emerald-700 transition duration-300 shadow-lg font-semibold text-lg flex items-center gap-3"
            >
              <FaPlay /> Bắt đầu
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={stopTimer}
              className="bg-gradient-to-r from-orange-500 to-red-600 cursor-pointer text-white py-4 px-8 rounded-full hover:from-orange-600 hover:to-red-700 transition duration-300 shadow-lg font-semibold text-lg flex items-center gap-3"
            >
              <FaPause /> Tạm dừng
            </motion.button>
          )}
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={resetTimer}
            className="bg-gradient-to-r from-sky-500 to-blue-600 cursor-pointer text-white py-4 px-8 rounded-full hover:from-sky-600 hover:to-blue-700 transition duration-300 shadow-lg font-semibold text-lg flex items-center gap-3"
          >
            <FaRedo /> Đặt lại
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowCustomize(!showCustomize)}
            className="bg-gradient-to-r from-purple-500 to-pink-600 cursor-pointer text-white py-4 px-8 rounded-full hover:from-purple-600 hover:to-pink-700 transition duration-300 shadow-lg font-semibold text-lg flex items-center gap-3"
          >
            <FaCog /> Tùy chỉnh
          </motion.button>
        </div>

        {/* Customize panel */}
        <AnimatePresence>
          {showCustomize && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mt-8 bg-white rounded-2xl p-6 shadow-xl"
            >
              <h3 className="text-xl font-bold text-sky-900 mb-4">⏱️ Đặt thời gian học tập</h3>
              <div className="flex items-center gap-4 justify-center">
                <button
                  onClick={() => setCustomMinutes(Math.max(5, customMinutes - 5))}
                  className="bg-sky-100 hover:bg-sky-200 text-sky-900 font-bold py-2 px-4 rounded-full transition"
                >
                  -5
                </button>
                <div className="bg-sky-50 px-8 py-3 rounded-xl">
                  <span className="text-3xl font-bold text-sky-900">{customMinutes}</span>
                  <span className="text-lg text-sky-600 ml-2">phút</span>
                </div>
                <button
                  onClick={() => setCustomMinutes(Math.min(120, customMinutes + 5))}
                  className="bg-sky-100 hover:bg-sky-200 text-sky-900 font-bold py-2 px-4 rounded-full transition"
                >
                  +5
                </button>
              </div>
              <button
                onClick={applyCustomTime}
                className="mt-4 bg-gradient-to-r from-sky-500 to-blue-600 text-white py-2 px-6 rounded-full hover:from-sky-600 hover:to-blue-700 transition font-semibold"
              >
                Áp dụng
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default FocusPage;
