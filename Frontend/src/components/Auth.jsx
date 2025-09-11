import React, { useState } from "react";
import { createPortal } from "react-dom";
import Login from "./Modal/Login";
import Signup from "./Modal/Signup";
import { useUserStore } from "../store/useUserStore";

const Auth = ({ setIsLoginOpen, isLoginOpen }) => {
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  const isModalOpen=useUserStore((state)=>state.isModalOpen)

  return createPortal(
    isLoginOpen &&isModalOpen || isSignupOpen&&isModalOpen ? (
      <div onClick={(e)=>e.stopPropagation()} className="fixed inset-0 flex items-center justify-center bg-black/50 bg-opacity-50 z-[999] pointer-events-auto">
        {/* Login Modal */}
        {isLoginOpen && <Login setIsLoginOpen={setIsLoginOpen} setIsSignupOpen={setIsSignupOpen} />}

        {/* Signup Modal */}
        {isSignupOpen && <Signup setIsLoginOpen={setIsLoginOpen} setIsSignupOpen={setIsSignupOpen} />}
      </div>
    ) : null,
    document.getElementById("portal")
  );
};

export default Auth;