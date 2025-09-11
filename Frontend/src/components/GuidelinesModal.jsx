import { createPortal } from 'react-dom';
import { CheckCircle, XCircle, X as CloseIcon } from 'lucide-react';

const GuidelineCard = ({ type, title, imagePlaceholder, guidelines }) => {
  const isGood = type === 'good';
  const theme = {
    icon: isGood ? <CheckCircle className="w-8 h-8 text-green-500 mr-3" /> : <XCircle className="w-8 h-8 text-red-500 mr-3" />,
    titleColor: isGood ? 'text-green-600' : 'text-red-600',
    borderColor: isGood ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50',
    bulletIcon: isGood ? <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" /> : <XCircle className="w-5 h-5 text-red-500 mr-3 flex-shrink-0" />,
  };
  return (
    <div className={`rounded-lg p-4 sm:p-5 border-2 ${theme.borderColor}`}>
      <div className="flex items-center mb-4">
        {theme.icon}
        <h3 className={`text-xl font-semibold ${theme.titleColor}`}>{title}</h3>
      </div>
      <div className="w-[100px] h-[100px] sm:w-[200px] sm:h-[200px] overflow-hidden bg-slate-200 rounded-md flex items-center justify-center border-2 border-dashed border-slate-400 mb-4">
        <img src={imagePlaceholder} alt={title} className="object-contain" />
      </div>
      <ul className="space-y-3">
        {guidelines.map((text, index) => (
          <li key={index} className="flex items-start">
            {theme.bulletIcon}
            <span className="text-slate-700">{text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};


const GuidelinesModal = ({ closeModal }) => {
  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      aria-labelledby="photo-guidelines-dialog"
      role="dialog"
      aria-modal="true"
      onClick={closeModal}
    >
      <div className="absolute inset-0 bg-black/60 transition-opacity"></div>

     
      <div
        className="relative flex flex-col w-full max-w-4xl max-h-[90vh] rounded-2xl bg-white text-gray-800 shadow-xl border border-gray-200 z-10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* --- Header Section --- */}
        <div className="p-6 pb-4 border-b border-gray-200">
          <button
            type="button"
            className="absolute top-3 right-3 text-gray-500 hover:text-red-600 hover:bg-gray-200 p-2 rounded-full z-20"
            onClick={closeModal}
          >
            <span className="sr-only">Close guidelines</span>
            <CloseIcon size={24} />
          </button>
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">Photo Guidelines</h2>
            <p className="text-slate-600 mt-2">Follow these tips to improve prediction accuracy.</p>
          </div>
        </div>
        
       
        <div className="overflow-y-auto review-dialog p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <GuidelineCard
              type="good"
              title="Do This"
              imagePlaceholder='/correctImage.png'
              guidelines={[
                "Use a clear, focused image of the leaf.",
                "Ensure good, even lighting without harsh shadows.",
                "Capture a close-up against a plain background.",
              ]}
            />
            <GuidelineCard
              type="bad"
              title="Don't Do This"
              imagePlaceholder="/incorrectimage.png"
              guidelines={[
                "Avoid blurry or out-of-focus pictures.",
                "Don't include multiple leaves or the whole plant.",
                "Avoid dark, shadowy, or overexposed photos.",
              ]}
            />
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("photo-guideline-portal") 
  );
};

export default GuidelinesModal;