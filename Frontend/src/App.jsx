import { useEffect } from 'react'
import Header from './components/Header'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import "react-image-crop/dist/ReactCrop.css";
import HomePage from './pages/HomePage'
import UploadPage from './pages/UploadPage'
import Footer from './components/Footer'
import CatalogPage from './pages/CatalogPage'
import { Toaster } from 'react-hot-toast'
import { useUserStore } from './store/useUserStore'
import LoadingSpinner from './components/LoadingSpinner'
import ContactPage from './pages/ContactPage'
import HistoryPage from './pages/HistoryPage'
import ErrorPage from './pages/ErrorPage'
import EditProfilePage from './pages/EditProfilePage'
import ReviewPage from './pages/ReviewPage'
import UpdateModal from './components/Modal/UpdateModal'
import AdminLayout from './Admin/component/AdminLayout'  
import Home from './Admin/component/Home'
import Catalog from './Admin/component/Catalog'
import AddCatalog from './Admin/component/AddCatalog'
import Users from './Admin/component/Users'
import UserDetail from './Admin/component/UserDetail'
import ReviewAdmin from './Admin/component/ReviewAdmin';
import EmailVerificationPage from './pages/EmailVerificationPage';
import ForgetPasswordPage from './pages/ForgetPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import AdminModel from './Admin/component/AdminModel';
import ErrorForReview from './pages/ErrorForReview';


const App = () => {
   const {user,authCheck,isAuthChecking}=useUserStore()
     const location = useLocation();
     
 useEffect(()=>{
  authCheck()
 },[authCheck])



 const isAdminRoute = location.pathname.startsWith('/admin');

  if(isAuthChecking) return <LoadingSpinner/>

  return (
    <div className='w-full bg-customBackground'>
        <Toaster position="top-center"  reverseOrder={false} />
     {!isAdminRoute && <Header />}
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/home' element={<HomePage />} />
          <Route path='/upload' element={<UploadPage />} />
          <Route path='/catalog' element={<CatalogPage/>} />
          <Route path='/contact' element={<ContactPage />} />
          <Route path='/history' element={user?<HistoryPage />:<Navigate to='/error' />} />
          <Route path='/error' element={user ?<Navigate to='/' />:<ErrorPage />} />
          <Route path='/profile/:id' element={user?<EditProfilePage/> : <Navigate to="/error" />} />
          <Route path='/review' element={user?<ReviewPage />:<ErrorForReview />} />  
          <Route path='/avatar' element={<UpdateModal />} />  
          <Route path='/*' element={<ErrorPage />} />
          <Route path='/verify-email' element={<EmailVerificationPage/>} />
          <Route path='/forgot-password' element={<ForgetPasswordPage/>} />
          <Route path='/reset-password/:token' element={<ResetPasswordPage/>} />

          {/* for admin pages */}
    <Route path='/admin' element={<AdminLayout/>} >
    <Route index element={<Home />}/>
    <Route path="catalog" element={<Catalog />} />
    <Route path="catalog/new" element={<AddCatalog />} />
    <Route path="users" element={<Users />} />
    <Route path="reviews" element={<ReviewAdmin />} />
    <Route path="users/:name" element={<UserDetail />} />
    <Route path="model" element={<AdminModel />} />
    </Route>
        </Routes>
        <Footer />
        {/* <Toaster /> */}
    </div>
  )
}

export default App