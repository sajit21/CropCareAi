import React, { use, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight, X } from 'lucide-react';
import { createPortal } from 'react-dom';
import { useUserStore } from '../store/useUserStore';
import { useTranslation } from 'react-i18next';



const SideMenu = ({ sideBarIsOpen, setSideBarIsOpen,setIsLoginOpen }) => {
    const { t } = useTranslation('sideMenu');
    const {user,logout}=useUserStore();

    const categories = [
    {
        name: t('sideMenu.home'),
        link: '/home',
    },
    {
        name: t('sideMenu.upload'),
        link: '/upload',
        sub: [
            { name: t('sideMenu.image'), link: '/upload' },
            { name: t('sideMenu.text'), link: '/upload' }
        ],
    },
    {
        name: t('sideMenu.review'),
        link: '/review',
    },
    {
        name: t('sideMenu.contact'),
        link: '/contact',
    },
];
      const [openCategory, setOpenCategory] = useState(null);
      const navigate=useNavigate();

    return createPortal(
        <div
            className={`fixed inset-0 z-[9999] md:relative md:inset-auto md:z-auto transition-all duration-500 ${
                sideBarIsOpen ? '' : 'pointer-events-none'
            }`}
        >
            {/* Overlay for mobile */}
            <div
                className={`fixed inset-0 bg-black transition-opacity  duration-500 ${
                    sideBarIsOpen ? 'opacity-50' : 'opacity-0 pointer-events-none'
                }`}
                onClick={() => setSideBarIsOpen(false)}
            ></div>

            {/* Menu Panel */}
            <div
                className={`fixed top-0 left-0 h-full w-64 bg-[#02C39A] text-white p-5 shadow-xl transform transition-transform duration-500 ease-in-out ${
                    sideBarIsOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
                style={{
                    overflowY: 'auto',
                    scrollbarWidth: 'none', 
                    msOverflowStyle: 'none', 
                }}
            >
                {/* Hide scrollbar for Chrome, Safari and Opera */}
                <style>
                    {`
                    .hide-scrollbar::-webkit-scrollbar {
                        display: none;
                    }
                    `}
                </style>
                <div className="flex justify-end mb-6">
                    <button
                        onClick={() => setSideBarIsOpen(false)}
                        className="text-white hover:text-gray-200 transition-colors"
                        aria-label="Close menu"
                    >
                        <X size={30} strokeWidth={2.5} />
                    </button>
                </div>
                             <nav>
                    <ul className="space-y-2.5 hide-scrollbar">
                        {categories.map((cat, idx) => (
                            <li key={cat.name}>
                                <div
                                    className="flex items-center justify-between py-3 px-3 rounded-md hover:bg-green-500 transition-colors duration-150 ease-in-out group cursor-pointer"
                                >
                                    <span
                                        className="text-sm font-light group-hover:font-bold"
                                        onClick={() => {
                                            if(cat.sub && cat.sub.length > 0) {
                                                setOpenCategory(openCategory === idx ? null : idx);
                                            }else{
                                                navigate(cat.link);
                                                setSideBarIsOpen(false)
                                            }
                                        }}
                                    >
                                        {cat.name}
                                    </span>
                                    {cat.sub && cat.sub.length > 0 ? (
                                        <ChevronRight
                                            size={22}
                                            className="opacity-80 group-hover:opacity-100"
                                        />
                                    ) : (
                                        <Link
                                            to={cat.link}
                                            onClick={() => setSideBarIsOpen(false)}
                                            className="ml-2 flex items-center"
                                        >
                                            <ChevronRight
                                                size={22}
                                                className="opacity-80 group-hover:opacity-100"
                                            />
                                        </Link>
                                    )}
                                </div>
                                {/* Subcategories */}
                                <div
                                    className={`transition-all duration-300 ease-in-out overflow-hidden ${
                                        openCategory === idx
                                            ? 'max-h-40 opacity-100'
                                            : 'max-h-0 opacity-0'
                                    }`}
                                >
                                    <ul className="ml-5 space-y-1 text-white text-sm font-normal">
                                        {cat?.sub?.map((sub, subIdx) => (
                                            <li key={subIdx}>
                                                <Link
                                                    to={sub.link}
                                                    onClick={() => setSideBarIsOpen(false)}
                                                    className="block py-1 px-2 rounded hover:bg-green-300 hover:text-sky-900 transition-colors"
                                                >
                                                    {sub.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </li>
                        ))}
                    </ul>
                </nav>

                        <div className='w-full flex items-center justify-center'>

                            {user ? (
                                <button onClick={() => {logout();setSideBarIsOpen(false)}} className='px-6 cursor-pointer bg-[#002820] py-2 text-center rounded-md mt-5'>{t('sideMenu.logout')}</button>
                            ) : (
                                <button onClick={() =>{ setIsLoginOpen(true)
                    setSideBarIsOpen(false)}} className='px-6 bg-[#002820] cursor-pointer py-2 text-center rounded-md mt-5'>{t('sideMenu.login')}</button>
                            )}
                </div>

                        
            </div>
        </div>,
        document.getElementById('sideMenuPortal')
    );
};

export default SideMenu;