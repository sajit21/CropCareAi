import {create} from 'zustand'
import axios from '../lib/axios'
import {toast} from 'react-hot-toast'


export const useUserStore=create((set,get)=>({
    user:null,
    loading:false,
    checkingAuth:true,
    isModalOpen:true,
    isAuthChecking:true,
    isUserProfileEditing:false,
    isSendingVerification:false,
    isEmailVerificationLinkSent:false,
    isVerifyingEmail:false,
    isResettingPassword:false,
    isresetLinkSending:false,
    isGoogleOauthLoading:false,
    isSignUpLoading:false,
    isLogInLoading:false,
    setIsModalOpen:(isOpen)=>set({isModalOpen:isOpen}),
    signup:async({fullName:Fullname,email:Email,password:Password,confirmPassword})=>{

        set({loading:true,isSignUpLoading:true});

        if(Password !== confirmPassword){
            set({loading:false,isSignUpLoading:false})
            return toast.error('passwords do not match');
        }
        try {
            const response=await axios.post("/auth/signup",{Fullname,Email,Password})
            set({user:response.data.user,loading:false,isSignUpLoading:false})
            if(response.status===201){
            toast.success('account created successfully')
            set({isModalOpen:false})
            }
        } catch (error) {
            // toast.error('hello form neapal')
            toast.error(error.response.data.message || "an error occured");
            console.log(error)
            set({loading:false,isSignUpLoading:false})
        }
        },
    login:async({email:Email,password:Password})=>{
            set({loading:true,isLogInLoading:true})
            try {
                const response=await axios.post('/auth/login',{Email,Password})
                if(response.status===200){
                set({user:response.data.user,loading:false,isLogInLoading:false})
                toast.success(response.data.message|| "user logged in successfully")
                set({isModalOpen:false})
            }
        } catch (error) {
            console.log(error)
            set({loading:false,isLogInLoading:false})
            toast.error(error?.response?.data?.error || error?.response?.data?.message || "Login Failed")
        }
    },
    authCheck:async()=>{
        set({isAuthChecking:true})
        try {
            const response=await axios.get('/auth/profile')
            set({isAuthChecking:false,user:response.data})
        } catch (error) {
            set({isAuthChecking:false,user:null})
        }
    },
    logout:async()=>{
        try{
            await axios.get('/auth/logout')
            set({user:null,isModalOpen:true})
            toast.success('Logout successfully')

        }catch(err){
            toast.error('Logout Error')
        }
    },
    refreshToken: async () => { 
        // console.log('hello boy')
        //         console.log(get().checkingAuth)
		// Prevent multiple simultaneous refresh attempts
        // useEffect(()=>{

        //     if (get().checkingAuth) return;
        // })

		set({ checkingAuth: true });
		try {
			const response = await axios.post("/auth/refresh-token");
            console.log(response)
			set({ checkingAuth: false });
			return response.data;
		} catch (error) {
            console.log('i am here')
			set({ user: null, checkingAuth: false });
			throw error;
		}
	},
    editProfile:async({userName,userProfileImg,currentPassword,newPassword,confirmPassword})=>{
        if(newPassword !== confirmPassword){
            return toast.error('passwords do not match');
        }
        set({isUserProfileEditing:true})
        try{
            const response=await axios.post('/auth/Uprofile',{userName,userProfileImg,currentPassword,newPassword,confirmPassword})
            if(response.status===200){
                console.log(response)
                set({user:response.data.user,isUserProfileEditing:false})
                toast.success(response.data.message || 'Profile updated successfully')
            }
        }catch(error){
             console.log(error)
            set({isUserProfileEditing:false})
            toast.error(error?.response?.data?.error || error?.response?.data?.message || "something went wrong")
        }
    },
    googleAuth:async(code)=>{
        set({isGoogleOauthLoading:true})
        try{
         const response= await axios.get(`/auth/googleUp?code=${code}`)
         set({user:response.data.user,isGoogleOauthLoading:false})
         return response;
        }catch(error){
            console.log(error);
            set({isGoogleOauthLoading:false})
            toast.error(error?.response?.data?.error || error?.response?.data?.message || "Google Authentication Failed")
        }
    },
    resendVerificationEmail:async()=>{
        set({isSendingVerification:true,isEmailvefificationlinksent:false})
        try{
            const response=await axios.get('/auth/verify-emailLink')
            if(response.status===200){
                toast.success('verification link sent to your email')
                set({isEmailVerificationLinkSent:true,isSendingVerification:false})
            }
            return response;
        }catch(error){
            console.log(error)
            set({isSendingVerification:false})
            toast.error(error?.response?.data?.error || error?.response?.data?.message || "Failed to send verification email")
        }
    },
    verifyEmail:async(code)=>{
        set({isVerifyingEmail:true})
        try{
            const response=await axios.post('/auth/verify-email',{code})
            if(response.status===200){
                toast.success('Email verified successfully')
                set({isVerifyingEmail:false,user:response.data.user})
            }
            return response;
        }catch(error){
            console.log(error)
            set({isVerifyingEmail:false})
            toast.error(error?.response?.data?.error || error?.response?.data?.message || "Failed to verify email")
        }
    },
    forgetPassword:async(email)=>{
        set({isresetLinkSending:true})
        try{
            const response=await axios.post('/auth/forget-password',{email})
            if(response.status===200){
                toast.success('Password reset link sent to your email')
                set({isresetLinkSending:false})
            }
            return response;
        }catch(error){
            console.log(error)
            set({isresetLinkSending:false})
            toast.error(error?.response?.data?.error || error?.response?.data?.message || "Failed to send password reset link")
        }
    },
    resetPassword:async(token,newPassword,confirmPassword)=>{
        if(newPassword !== confirmPassword){
            return toast.error('passwords do not match');
        }
        set({isResettingPassword:true})

        try{
            const response=await axios.post(`/auth/reset-password/${token}`,{newPassword})
            if(response.status===200){
                toast.success('Password reset successfully')
                set({isResettingPassword:false})
            }
            return response;
        }catch(error){
            console.log(error)
            set({isResettingPassword:false})
            toast.error(error?.response?.data?.error || error?.response?.data?.message || "Failed to reset password")
        }
    },

    // oAuthSignUp:async()=>{
    //     // console.log('i am here')
    //     // const response=await axios.get('/auth/google');
    //     // console.log(response)
    //      window.location.href = 'http://localhost:3000/api/auth/google';
    // },
}))

// TODO: Implement the axios interceptors for refreshing access token

// Axios interceptor for token refresh
// let refreshPromise = null;

// axios.interceptors.response.use(
// 	(response) => response,
// 	async (error) => {

// 		const originalRequest = error.config;
//         console.log(error)
// 		if (error.response?.status === 401 && !originalRequest._retry) {
// 			originalRequest._retry = true;

// 			try {
// 				// If a refresh is already in progress, wait for it to complete
// 				if (refreshPromise) {
// 					await refreshPromise;
//                     console.log('hey i am here')
// 					return axios(originalRequest);
// 				}
//                 console.log('why i am not calling');
// 				// Start a new refresh process
// 				refreshPromise = useUserStore.getState().refreshToken();
//                 console.log(refreshPromise)
// 				const response=await refreshPromise;
//                 console.log(response)
// 				refreshPromise = null;

// 				return axios(originalRequest);
// 			} catch (refreshError) {
//                 console.log(refreshError)
// 				// If refresh fails, redirect to login or handle as needed
// 				useUserStore.getState().logout();
// 				return Promise.reject(refreshError);
// 			}
// 		}
// 		return Promise.reject(error);
// 	}
// );