    import { createPortal } from "react-dom";
import CloseIcon from "./CloseIcon";
import ImageCropper from "./ImageCropper";

const UpdateModal = ({ updateAvatar, closeModal }) => {
  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      aria-labelledby="crop-image-dialog"
      role="dialog"
      aria-modal="true"
    >
      <div className="absolute inset-0 bg-gray-700/30 transition-opacity"></div>

      <div className="relative min-w-[90%] sm:min-w-[50%] min-h-[60vh] rounded-2xl bg-gray-50 text-gray-800 shadow-xl border border-gray-200 p-6 z-10">
        <div className="relative">
          <button
            type="button"
            className="absolute top-2 right-2 text-gray-500 hover:text-green-600 hover:bg-gray-200 p-2 rounded-full"
            onClick={closeModal}
          >
            <span className="sr-only">Close menu</span>
            <CloseIcon />
          </button>

          <ImageCropper
              updateAvatar={updateAvatar}
              closeModal={closeModal}
          />
        </div>
      </div>
    </div>,
    document.getElementById("imageUploadPortal")
  );
};

export default UpdateModal;


