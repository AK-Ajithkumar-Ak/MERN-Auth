import { useEffect } from 'react'
import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import {FloatingShape} from "./components/FloatingShape";
import {LoadingSpinner} from "./components/LoadingSpinner";
import { ErrorBoundary } from "./components/ErrorBoundary";

import {SignUpPage} from "./pages/SignUpPage";
import {LoginPage} from "./pages/LoginPage";
import {EmailVerificationPage} from "./pages/EmailVerificationPage";
import {DashboardPage} from "./pages/DashboardPage";
import {ForgotPasswordPage} from "./pages/ForgotPasswordPage";
import {ResetPasswordPage} from "./pages/ResetPasswordPage";
import { UseAuthStore } from './store/authStore';

// import 'bootstrap/dist/css/bootstrap.min.css';


// protect routes that require authentication
const ProtectedRoute = ({ children }) => {
	const { isAuthenticated, user } = UseAuthStore();

	if (!isAuthenticated) {
		return <Navigate to='/login' replace />;
	}

	if (!user.isVerified) {
		return <Navigate to='/verify-email' replace />;
	}

	return children;
};

const IsVerified= ({children})=>{
const { isAuthenticated, user } = UseAuthStore();
		if (isAuthenticated && user?.isVerified) {
			return <Navigate to={`/`} replace />;
		}

		if (isAuthenticated && !user?.isVerified) {
			return <Navigate to='/verify-email' replace />;
		}

		if (!isAuthenticated) {
			return <Navigate to='/login' replace />;
		}
	return children
}

// redirect authenticated users to the home page
const RedirectAuthenticatedUser = ({ children }) => {
	const { isAuthenticated, user } = UseAuthStore();

	if (isAuthenticated && user.isVerified) {
		return <Navigate to='/' replace />;
	}
	return children;
};


function App() {
const { isCheckingAuth, checkAuth } = UseAuthStore();

useEffect(() => {
	checkAuth();
}, [checkAuth]);

if (isCheckingAuth) return <LoadingSpinner />;

  return (
	<>
    <ErrorBoundary>
	<div className='container-fluid min-vh-100 bg-success bg-opacity-50'>
   <div className=' col-12 d-flex align-items-center justify-content-center position-relative overflow-hidden'> 
			<FloatingShape color='bg-success bg-opacity-10' size='' top='-5%' left='10%' delay={0} />
			<FloatingShape color='bg-success bg-opacity-10' size='' top='40%' left='50%' delay={5} />
			<FloatingShape color='bg-success bg-opacity-25' size='' top='60%' left='15%' delay={2} />

    <Routes>
      <Route path='/' element={<ProtectedRoute><DashboardPage/></ProtectedRoute>}/>
      <Route path='/signup' element={<RedirectAuthenticatedUser><SignUpPage/></RedirectAuthenticatedUser>}/>
      <Route path='/login' element={<RedirectAuthenticatedUser><LoginPage/></RedirectAuthenticatedUser>}/>
      <Route path='/verify-email' element={<IsVerified><EmailVerificationPage/></IsVerified>}/>
      <Route path='/forgot-password' element={<RedirectAuthenticatedUser><ForgotPasswordPage/></RedirectAuthenticatedUser>}/>
      <Route path='/reset-password/:token' element={<RedirectAuthenticatedUser><ResetPasswordPage/></RedirectAuthenticatedUser>}/>

      {/* catch all routes */}
      <Route path='*' element={<Navigate to={"/"} replace />}/>
    </Routes>
    <Toaster/>
    </div>
	</div>
    </ErrorBoundary>
	</>
  )
}

export default App
