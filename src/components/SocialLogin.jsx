import React, { useContext } from "react";
import { FcGoogle } from "react-icons/fc"; // Google icon
import { AuthContext } from "../Context/AuthProvider";
import { useNavigate } from "react-router-dom";

const SocialLogin = () => {
    const navigate=useNavigate();

   const {singInWithGoogle}=useContext(AuthContext)

    const handleGoogleSignIn=()=>{
           singInWithGoogle()
           .then(result=>{
            console.log(result.user);
            
           })
           .catch(error=>{
            console.error(error)
           })
    }

  return (
    <div >
<div className="flex items-center mb-6">
        <div className="flex-grow h-px bg-gray-300"></div>
        <span className="px-4 text-gray-500 font-medium">or</span>
        <div className="flex-grow h-px bg-gray-300"></div>
      </div>
      <button
      onClick={handleGoogleSignIn}
        type="button"
        className="w-full flex items-center justify-center gap-3 border border-gray-300 bg-lime-500 text-white font-semibold py-3 rounded-xl shadow-md hover:shadow-lg hover:bg-lime-600 transition duration-300 ease-in-out"
      >
        <FcGoogle className="text-2xl" />
        <span className="text-base">Continue with Google</span>
      </button>
    </div>
  );
};

export default SocialLogin;