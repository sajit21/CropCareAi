import React, { useEffect, useState } from 'react';
import { User, Camera, Lock, Eye, EyeOff, Loader, MailWarning } from 'lucide-react';
import UpdateModal from '../components/Modal/UpdateModal';
import { useUserStore } from '../store/useUserStore';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';



function isTokenValid(expirationTime) {
  const now = new Date();
  const expiresAt = new Date(expirationTime);

  return now < expiresAt;
}


export default function EditProfilePage() {
  const { t } = useTranslation('editProfile');
  const user = useUserStore((state) => state.user);
  const { isUserProfileEditing, editProfile, isSendingVerification,isEmailVerificationLinkSent, resendVerificationEmail } = useUserStore();
console.log(isEmailVerificationLinkSent)
console.log(user)
  const [userName, setUserName] = useState('');
  const [userProfileImg, setUserProfileImg] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [updateModal, setUpdateModal] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.Fullname) {
      setUserName(user.Fullname);
    }
  }, [user?.Fullname]);

  const handleResendVerification = () => {
    if (resendVerificationEmail && user?.Email) {
      resendVerificationEmail(user.Email);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    editProfile({ userName, userProfileImg, currentPassword, newPassword, confirmPassword });
    handleCancel();
  };
// 
  const handleCancel = () => {
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const inputStyle = "w-full p-2.5 bg-gray-50 border border-gray-300 rounded-md text-gray-700 focus:ring-1 focus:ring-green-500 focus:border-green-500 placeholder-gray-400";
  const labelStyle = "block text-sm font-medium text-gray-700 mb-1";

  // A simple loading state for the whole page if user data isn't available yet
  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <Loader size={50} className="animate-spin text-green-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto w-full max-w-4xl space-y-8">
        
        {/* --- Box 1: Email Verification Notice --- */}
        {!user?.isVerified && (
          <div className="bg-white p-5 rounded-xl shadow-lg border-l-4 border-orange-500">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0">
                  <MailWarning className="h-8 w-8 text-orange-500" />
                </div>
                <div className="text-center sm:text-left">
                  <h3 className="font-bold text-gray-800 text-lg">Verify Your Email Address</h3>
                  <p className="text-sm text-gray-600">Please check your inbox to verify your email and activate your account.</p>
                </div>
              </div>
              {isEmailVerificationLinkSent || isTokenValid(user?.verificationTokenExpiresAt) ?(<button
                onClick={() => navigate('/verify-email')}
                disabled={isSendingVerification}
                className="bg-orange-500 hover:bg-orange-600 w-full sm:w-auto flex items-center justify-center text-white font-semibold py-2 px-5 rounded-lg text-sm whitespace-nowrap transition-colors disabled:bg-orange-300 disabled:cursor-not-allowed"
              >
              verify Email now
              </button>):(
                <button
                onClick={handleResendVerification}
                disabled={isSendingVerification}
                className="bg-orange-500 hover:bg-orange-600 w-full sm:w-auto flex items-center justify-center text-white font-semibold py-2 px-5 rounded-lg text-sm whitespace-nowrap transition-colors disabled:bg-orange-300 disabled:cursor-not-allowed"
              >
                {isSendingVerification ? (
                  <>
                    <Loader className='mr-2 h-4 w-4 animate-spin' />
                    <span>Sending...</span>
                  </>
                ) : (
                  'Resend Email'
                )}
              </button>
              )}
              
            </div>
          </div>
        )}

        {/* --- Box 2: Profile Edit Form --- */}
        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg">
          <header className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-3">
              <User size={28} className="text-green-700" />
              <span>{t('editProfile.profile')}</span>
            </h1>
          </header>
          
          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            
            {/* Left Column: Profile Image */}
            <div className="lg:col-span-1 flex flex-col items-center text-center">
              <div className="relative mb-4">
                <img
                  src={userProfileImg || user?.Photo || `https://ui-avatars.com/api/?name=${userName || 'User'}&background=a5d6a7&color=1b5e20`}
                  alt="Profile"
                  className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover border-4 border-gray-100 shadow-md"
                />
              </div>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2">{userName}</h2>
              <button onClick={() => setUpdateModal(true)}
                type="button"
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm py-2 px-4 rounded-lg flex items-center justify-center gap-2 w-full max-w-xs"
              >
                <Camera size={16} />
                {t('editProfile.change_photo')}
              </button>
              {updateModal && (<UpdateModal closeModal={() => setUpdateModal(false)} updateAvatar={setUserProfileImg} />)}
            </div>

            {/* Right Column: Form Fields */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <label htmlFor="name" className={labelStyle}>{t('editProfile.name')}</label>
                <input
                  type="text" id="name" onChange={(e) => setUserName(e.target.value)}
                  value={userName} autoComplete='username' className={inputStyle}
                />
              </div>
              <div>
                <label htmlFor="email" className={labelStyle}>{t('editProfile.email')}</label>
                <div className="relative">
                  <input
                    type="email" id="email" value={user?.Email} readOnly
                    className={`${inputStyle} bg-gray-100 cursor-not-allowed pr-10`} autoComplete='email'
                  />
                  <Lock size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
              </div>

              {/* Change Password Section */}
              <div className="pt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-1">{t('editProfile.change_password')}</h3>
                <p className="text-xs text-gray-500 mb-4">{t('editProfile.password_note')}</p>
                <div className='space-y-4'>
                  {['currentPassword', 'newPassword', 'confirmPassword'].map((field) => (
                    <div key={field}>
                      <label htmlFor={field} className={labelStyle}>
                        {t(`editProfile.${field.replace('P', '_p').toLowerCase()}`)}
                      </label>
                      <div className="relative">
                        <input
                          type={
                            (field === 'currentPassword' && showCurrentPassword) ||
                            (field === 'newPassword' && showNewPassword) ||
                            (field === 'confirmPassword' && showConfirmPassword)
                            ? "text" : "password"
                          }
                          id={field}
                          value={
                            field === 'currentPassword' ? currentPassword :
                            field === 'newPassword' ? newPassword : confirmPassword
                          }
                          onChange={(e) => {
                            if (field === 'currentPassword') setCurrentPassword(e.target.value);
                            else if (field === 'newPassword') setNewPassword(e.target.value);
                            else setConfirmPassword(e.target.value);
                          }}
                          className={`${inputStyle} pr-10`}
                          placeholder="••••••••"
                          autoComplete={field === 'currentPassword' ? 'current-password' : 'new-password'}
                        />
                        <button
                          type="button"
                          onClick={() => {
                            if (field === 'currentPassword') setShowCurrentPassword(!showCurrentPassword);
                            else if (field === 'newPassword') setShowNewPassword(!showNewPassword);
                            else setShowConfirmPassword(!showConfirmPassword);
                          }}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                           {(field === 'currentPassword' && showCurrentPassword) || (field === 'newPassword' && showNewPassword) || (field === 'confirmPassword' && showConfirmPassword) ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                <button type="submit" className="w-full sm:w-auto bg-green-600 flex items-center justify-center whitespace-nowrap cursor-pointer hover:bg-green-700 text-white font-semibold py-2.5 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition duration-150">
                  {isUserProfileEditing ? (
                    <>
                      <Loader className='mr-2 h-5 w-5 animate-spin' />
                      <span>{t('editProfile.updating')}</span>
                    </>
                  ) : t('editProfile.save')}
                </button>
                <button type="button" onClick={handleCancel} className="w-full sm:w-auto bg-gray-200 cursor-pointer hover:bg-gray-300 text-gray-800 font-semibold py-2.5 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 transition duration-150">
                  {t('editProfile.cancel')}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

