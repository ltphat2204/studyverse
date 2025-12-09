'use client';

import { useEffect, useState } from 'react';
import { FiHome } from 'react-icons/fi';
import { PiStudentLight } from "react-icons/pi";
import { BsPerson } from "react-icons/bs";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function SideTab() {
    const [activeTab, setActiveTab] = useState('home');
    const pathname = usePathname();

    useEffect(() => {
        const path = pathname.split('/')[1];
        setActiveTab(path || 'home');
    }, [pathname]);

    const menuItems = [
        { id: 'home', label: 'Trang chủ', icon: FiHome },
        { id: 'student', label: 'Học sinh', icon: PiStudentLight },
        { id: 'parent', label: 'Phụ huynh', icon: BsPerson },
    ];
    
    return (
        <aside 
            className="flex w-56 h-full"
            style={{ flexBasis: '14rem' }}
        >
            <div className="bg-white rounded w-full p-4">
              <ul className="space-y-2">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.id}>
                      <Link href={`/${
                        item.id === 'home' ? '' : item.id
                        }`}
                        onClick={() => setActiveTab(item.id)}
                        className={`flex items-center w-full p-3 px-4 cursor-pointer
                        ${
                          activeTab === item.id
                            ? 'bg-sky-600 text-white'
                            : 'hover:bg-sky-700 hover:text-sky-100'
                        } transition-colors duration-200 rounded-lg`}
                      >
                        <Icon className={`mr-3 text-xl`} />
                        <span>{item.label}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
        </aside>
    );
}