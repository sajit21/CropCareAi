import { Loader } from "lucide-react";

const LoadingSpinner = () => {
	return (
      <div className="h-screen w-full bg-[#8FF7A7]">
        <div className="flex justify-center items-center w-full h-full">
          <Loader className='animate-spin text-baseColor size-10 ' />
        </div>
      </div>
	);
};

export default LoadingSpinner;