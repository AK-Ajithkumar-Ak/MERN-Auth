import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { UseAuthStore } from "../store/authStore";
import {Input} from "../components/Input";
import { ArrowLeft, Loader, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";


export const ForgotPasswordPage = () => {
    const [email, setEmail] = useState("");
	const [isSubmitted, setIsSubmitted] = useState(false);

    const { isLoading, forgotpassword, message, error } = UseAuthStore();

	const handleSubmit = async (e) => {
		e.preventDefault();
		await forgotpassword(email);
		console.log("message: ", message);
		console.log("error: ", error);
		if(!error &&  message!==null){
			 setIsSubmitted(true);
				return setTimeout(() => {
					console.log("message success: ", message);
					toast.success("hot coded Password reset link sent to your email")
				}, 500);
		}
	};
	
  return (
    <motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
		>
			<div className='p-5 '>
				<h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text'>
					Forgot Password
				</h2>

				{!isSubmitted ? (
					<form onSubmit={handleSubmit}>
						<p className='text-gray-300 mb-6 text-center'>
							Enter your email address and we'll send you a link to reset your password.
						</p>
						<Input
							icon={Mail}
							type='email'
							placeholder='Email Address'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
						<motion.button
							whileHover={{ scale: 1.02 }}
							whileTap={{ scale: 0.98 }}
							className='btn btn-success mt-4'
							type='submit'
						>
							{isLoading ? <Loader className='size-6 animate-spin mx-auto' /> : "Send Reset Link"}
						</motion.button>
						<p>{error}</p>
					</form>
				) : (
					<div className='text-center'>
						<motion.div
							initial={{ scale: 0 }}
							animate={{ scale: 1 }}
							transition={{ type: "spring", stiffness: 500, damping: 30 }}
							className='w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4'
						>
							<Mail className='h-8 w-8 text-white' />
						</motion.div>
						<p className='text-gray-300 mb-6'>
							If an account exists for {email}, you will receive a password reset link shortly.
						</p>
						<p>{message}</p>
					</div>
				)}

			<div className='px-4 py-4  '>
				<Link to={"/login"} className=' '>
					<ArrowLeft className='h-4 w-4 mr-2' /> Back to Login
				</Link>
			</div>
			</div>
		</motion.div>
  )
}
