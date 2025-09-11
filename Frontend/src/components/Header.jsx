import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ChevronDown, ChevronUp, Earth, Image, LayoutDashboard, LogIn, LogOut, Menu, Search, Text, User, X } from "lucide-react";
import Auth from "./Auth";
import { useTranslation } from "react-i18next";
import { useUserStore } from "../store/useUserStore";
import SideMenu from "./SideMenu";

const Header = () => {
  const { t, i18n } = useTranslation("header");

  const user=useUserStore((state)=>state.user);
  const logout=useUserStore((state)=>state.logout);

  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const [uploadMenuOpen,setUploadMenuOpen]=useState(false)
  const [userProfileMenuOpen, setUserProfileMenuOpen] = useState(false);


  const toggleLanguageMenu = () => setLanguageMenuOpen(!languageMenuOpen);
  const toggleUploadMenu = () => setUploadMenuOpen(!uploadMenuOpen);
  const toggleProfileMenu = () => setUserProfileMenuOpen(!userProfileMenuOpen);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setLanguageMenuOpen(false);
  };

const languageMenuRef=useRef(null);
const uploadMenuRef=useRef(null);
const userProfileMenuRef=useRef(null);
const navigate=useNavigate();

   useEffect(() => {
     const handleClickOutside = (e) => {

       if (languageMenuRef.current && !languageMenuRef.current.contains(e.target)) {
      setLanguageMenuOpen(false);
    }
     
    if(uploadMenuRef.current && !uploadMenuRef.current.contains(e.target)){
      setUploadMenuOpen(false)
    }
    if(userProfileMenuRef.current && !userProfileMenuRef.current.contains(e.target)){
      setUserProfileMenuOpen(false);
    }

    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const navItems = [
    { name: t("home"), to: "/" },
    { name: t("upload"), to: "/upload", icon: ChevronDown,hasDropdown:true },
    { name: t("catalog"), to: "/catalog" },
    { name: t("review"), to: "/review" },
    { name: t("contactUs"), to: "/contact" }
  ];

    
  return (
    <header className="w-full bg-white drop-shadow-md sticky top-0 z-50">
      <div className="w-full max-w-screen-2xl mx-auto px-1 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        <button
          onClick={()=>setMenuOpen(true)}
          className="lg:hidden text-gray-700 focus:outline-none ml-2 cursor-pointer"
        >
           <Menu className="w-6 h-6" />
        </button>
        <SideMenu sideBarIsOpen={menuOpen} setSideBarIsOpen={setMenuOpen}  setIsLoginOpen={setIsLoginOpen} />
        <div>
          <Link to="/">
            <img src="/finall.svg" alt="Logo" className="h-64 w-auto " />
          </Link>
        </div>

        <nav className="hidden  lg:flex items-center justify-center gap-10 text-gray-700 text-sm relative">
          {navItems.map((item) => {
  if (item.hasDropdown) {
    return (
      <div  ref={uploadMenuRef} key={item.to} className="relative group">
        <button 
         onClick={(e)=>{
          e.stopPropagation();
          toggleUploadMenu();
         }} 
          className="flex items-center gap-1 cursor-pointer hover:text-orange-500 transition-colors"
        >
          {item.name} {uploadMenuOpen
            ? <ChevronUp  className="cursor-pointer" size={16}/>
            : <item.icon  className="cursor-pointer" size={16} />}
        </button>
       
          <div className={`absolute px-3 py-1 top-full left-[50%] transition-all duration-300 transform ${
              uploadMenuOpen
                ? "opacity-100 scale-100 translate-y-0"
                : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
            } -translate-x-1/2 mt-2 w-fit bg-white shadow-lg rounded-md z-50 border border-gray-100`}>
            <ul className="text-sm text-gray-700 p-2 space-y-2">
              <li className="hover:text-green-600 cursor-pointer flex items-center gap-2">
                <Link onClick={()=>setUploadMenuOpen(false)} className="flex items-center justify-center gap-1" to={'/upload'}>
                <Image size={16}/>
                <span>{t("image")}</span> </Link>
              </li>
              {/* <li className="hover:text-green-600 cursor-pointer flex items-center gap-2">
                <Link onClick={()=>setUploadMenuOpen(false)} className="flex items-center justify-center gap-1">
                <Text size={16} />  
                <span>{t("text")}</span>
                </Link>
              </li> */}
            </ul>
          </div>
        
      </div>
    );
  }

  return (
    <NavLink
      key={item.to}
      to={item.to}
      className={({ isActive }) =>
        isActive
          ? "text-green-500"
          : "hover:text-orange-500 transition-colors"
      }
    >
      {item.name}
    </NavLink>
  );
})}
        </nav>
{/* right side part of the header */}
        <div className="flex relative items-center space-x-2  pr-2 sm:pr-0 sm:space-x-4 ">
        {user?.role=='admin' && (
          <Link to='/admin'><LayoutDashboard
           className="text-green-500 cursor-pointer"
           size={24} /></Link>
        )}
        {user?.role=='admin' && (
          <div className="h-5 border-l border-green-500 hidden sm:block"></div>
        )}
         { user? <LogOut
            onClick={() => {logout();navigate('/')}}
            className="text-green-500 hidden sm:block cursor-pointer"
            size={24}
          />:<LogIn
            onClick={() => setIsLoginOpen(true)}
            className="text-green-500 hidden sm:block cursor-pointer"
            size={24}
          />}
          <Auth setIsLoginOpen={setIsLoginOpen} isLoginOpen={isLoginOpen} />
          <div className="h-5 border-l border-green-500 hidden sm:block"></div>

          <div className="relative">
            <Earth
            onClick={(e)=>{
              e.stopPropagation()
              toggleLanguageMenu()
              setUserProfileMenuOpen(false)

            }}
            className="text-green-500 cursor-pointer"
            size={24}
          />
          
          <div
          ref={languageMenuRef}
            className={`bg-white languagedropdown shadow-lg absolute top-[110%] ${user?'-right-8':'right-0'} rounded-md px-4 py-3 transition-all duration-300 ease-in-out transform ${
              languageMenuOpen
                ? "opacity-100 scale-100 translate-y-0"
                : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
            }`}
          >
            <ul className="text-gray-800 text-sm space-y-2">
              <li
                className="flex items-center gap-2 hover:text-green-500 transition-colors cursor-pointer"
                onClick={() => changeLanguage("en")}
              >
                🇺🇸 <span>{t("english")}</span>
              </li>
              <li
                className="flex items-center gap-2 hover:text-green-500 transition-colors cursor-pointer"
                onClick={() => changeLanguage("ne")}
              >
                🇳🇵 <span>{t("nepali")}</span>
              </li>
            </ul>
          </div>
          </div>
          {user && (
            <div className="h-5 border-l border-green-500"></div>
          )}
          {user && ( <div  ref={userProfileMenuRef} className=" relative  h-7 w-7 rounded-full  cursor-pointer">
           {/* user profile image section */}
           <div className="w-full h-full overflow-hidden rounded-full">
             <img onClick={toggleProfileMenu}   src={user?.Photo || `https://ui-avatars.com/api/?name=${userName || 'User'}&background=a5d6a7&color=1b5e20`} alt="user profile" className="w-full h-full object-cover " />
           </div>

            {/* profile user dropdown */}
             <div className={`absolute px-3 py-1 top-full left-[0%] transition-all duration-300 transform ${
              userProfileMenuOpen
                ? "opacity-100 scale-100 translate-y-0"
                : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
            } -translate-x-1/2 mt-2 w-fit bg-white shadow-lg rounded-md z-50 border border-gray-100`}>
            <ul className="text-sm text-gray-700 p-2 space-y-2">
              <li className="hover:text-green-600 cursor-pointer flex items-center gap-2">
                <Link onClick={()=>setUserProfileMenuOpen(false)} className="flex items-center justify-center gap-1" to={'/profile/1'}>
                <span className="whitespace-nowrap">{t("editProfile")}</span> </Link>
              </li>
              <li className="hover:text-green-600 cursor-pointer flex items-center gap-2">
                <Link to={'/history'} onClick={()=>setUserProfileMenuOpen(false)} className="flex items-center justify-center gap-1">
                <span>{t("history")}</span>
                </Link>
              </li>
            </ul>
          </div>
        
          </div>)}
           

        </div>
      </div>
    </header>
  );
};

export default Header;