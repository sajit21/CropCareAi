import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useUserStore } from '../../../store/useUserStore';

const PrivilegeChangeModal = ({ user, onConfirm, onClose }) => {
  const {user:currentUser}=useUserStore();
  console.log(currentUser.Fullname)
  const [inputValue, setInputValue] = useState('');
  const [sameUserError, setSameUserError] = useState(false);

  const isActionRevoke = user.role === 'admin';
  const title = isActionRevoke ? 'Revoke Admin Privileges' : 'Grant Admin Privileges';
  const actionDescription = isActionRevoke ? 'demote' : 'promote';
  const confirmButtonText = isActionRevoke ? 'Yes, Revoke Access' : 'Yes, Promote User';


  const isMatch = inputValue === user.name

  

  const handleSubmit = (e) => {
    e.preventDefault();
    if(user.name === currentUser.Fullname) {
      setSameUserError(true);
      return;
    }
      if (isMatch) {
        onConfirm(); 
      }
  
  };

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  return createPortal(
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/60  p-4"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        <form onSubmit={handleSubmit}>
          {/* Modal Header */}
          <div className="p-6 text-center">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              You are about to {actionDescription}{' '}
              <strong className="text-gray-900 dark:text-gray-200">{user.name}</strong>. This is a
              sensitive action.
            </p>
          </div>

          {/* Modal Body */}
          <div className="px-6 pb-6">
            <label
              htmlFor="confirmation-input"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              To confirm, please type the user's full name below:
            </label>
            <div className="my-2 p-2 bg-gray-100 dark:bg-gray-700 rounded-md text-center font-mono font-semibold text-gray-800 dark:text-gray-200">
              {user.name}
            </div>
            <input
              id="confirmation-input"
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="mt-1 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
              placeholder="Type the name to confirm"
              autoFocus
            />
            {sameUserError && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                You cannot change privileges for yourself.
              </p>
            )}
          </div>

          {/* Modal Footer (with action buttons) */}
          <div className="bg-gray-50 dark:bg-gray-800/50 px-6 py-4 rounded-b-2xl flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto justify-center rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-2 text-base font-medium text-gray-700 dark:text-gray-200 shadow-sm hover:bg-gray-100 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 dark:focus:ring-offset-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!isMatch}
              className={`w-full sm:w-auto inline-flex justify-center rounded-lg border border-transparent px-4 py-2 text-base font-semibold text-white shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800 ${
                isMatch
                  ? isActionRevoke
                    ? 'bg-red-600 hover:bg-red-700 focus:ring-red-500' 
                    : 'bg-green-600 hover:bg-green-700 focus:ring-green-500' 
                  : 'bg-gray-400 dark:bg-gray-500 cursor-not-allowed' 
              }`}
            >
              {confirmButtonText}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.getElementById('privilege-change-portal')
  );
};

export default PrivilegeChangeModal;