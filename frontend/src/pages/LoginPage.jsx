import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Loader } from "lucide-react";
import { Link } from "react-router-dom";
import {Input} from "../components/Input";
import { useNavigate } from "react-router-dom";
import { UseAuthStore } from "../store/authStore";


export const LoginPage = () => {

	let nav= useNavigate()
    const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const { login, isLoading, error } = UseAuthStore();

	const handleLogin = async (e) => {
		e.preventDefault();
		if (await login(email, password)) {
			nav("/")
		}
		console.log("no redirect");
	};

  return (
	<>
    <motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className=' '
		>
			<div className='p-5 '>
				<h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text'>
					Welcome Back
				</h2>

				<form onSubmit={handleLogin}>

					<div className="mb-3 row">
						<div className="col-sm-10">
							<Input 
							icon={Mail}
							type='text'
							placeholder='Email Address'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
							/>
						</div>
					</div>

					<div className="mb-3 row">
					<div className="col-sm-10">
						<Input 
						icon={Lock}
						type='password'
						placeholder='Password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
						/>
					</div>
					</div>

					<div className='flex items-center mb-6'>
						<Link to='/forgot-password' className='text-sm text-green-400 hover:underline'>
							Forgot password?
						</Link>
					</div>
					{error && <p className='text-red-500 font-semibold mb-2'>{error}</p>}

					<motion.button
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.98 }}
						className='btn btn-success'
						type='submit'
						disabled={isLoading}
					>
						{isLoading ? <Loader className='w-25 h-25 spinner-border text-success mx-auto' /> : "Login"}
					</motion.button>
				</form>
			<div className='px-5 py-4 bg-gray-900 bg-opacity-50 flex justify-center'>
				<p className='text-sm text-gray-400'>
					Don't have an account?{" "}
					<Link to='/signup' className='text-green-400 hover:underline'>
						Sign up
					</Link>
				</p>
			</div>
			</div>
		</motion.div>
		</>
  )
}
