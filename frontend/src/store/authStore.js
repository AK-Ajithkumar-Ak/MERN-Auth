import axios from 'axios';
import {create} from 'zustand';

const API_URL= import.meta.env.MODE==="development"? "http://localhost:5000/api/auth": "/api/auth"
axios.defaults.withCredentials= true


export const UseAuthStore= create((set=> ({
    user: null,
	isAuthenticated: false,
	error: null,
	isLoading: false,
	isCheckingAuth: true,
	message: null,

    signup: async(email, password, name)=>{
        set({isLoading: true, error: null})
        try {
            const res= (await axios.post(`${API_URL}/signup`, {email, password, name})).data
            set({user: res.user, isAuthenticated: true, isLoading: false})
        } catch (error) {
            console.log(error.name);
            console.log(error.message);
            return set({error: error.message || "Error signing up", isLoading: false})
            // throw error
        }
    },
    
    login: async(email, password)=> {
        set({isLoading: true, error: null})
        try {
            const res= (await axios.post(`${API_URL}/login`, {email, password})).data
            return set({isAuthenticated : true, user: res.user, error: null, isLoading: false, })

        } catch (error) {
            console.log(error);
            console.log(error.name);
            console.log(error.message);
            return set({error: error?.message || "Error login", isLoading: false})
        }
    },

    logout: async () => {
        set({isLoading: true, error: null})
        try {
            const res= (await axios.post(`${API_URL}/logout`)).data
            set({ user: null, isAuthenticated: false, error: null, isLoading: false, message: res.message });
        } catch (error) {
            set({error: "Error logging out", isLoading: false})
            // throw error
        }
    },

    verifyEmail: async (code) => {
        set({isLoading: true, error: null})
        try {
            const res= (await axios.post(`${API_URL}/verify-email`, { code})).data
            set({ user: res.user, isAuthenticated: true, isLoading: false });
            return res
        } catch (error) {
            set({error: error || "Error verifyEmail", isLoading: false})
            // throw error
        }
    },

    checkAuth: async () => {
        set({ isCheckingAuth: true, error: null });
        try {
            const res= (await axios.get(`${API_URL}/check-auth`)).data
            set({ user: res.user, isAuthenticated: true, isCheckingAuth: false });
        } catch (error) {
            set({error: null, isAuthenticated:false, isCheckingAuth:false})
        }
    },

    forgotpassword: async (email) => {
        set({isLoading: true, error: null})
        try {
            const res= (await axios.post(`${API_URL}/forgot-password`, {email})).data
            console.log("res: ", res);
            return set({ message: res.message, isLoading: false });
        } catch (error) {
            console.log(error);
            
            set({error: error?.response?.data?.message || "Error forgotpassword", isLoading: false,})
            // throw error
        }
    },
    
    resetpassword: async (token, password) => {
        set({isLoading: true, error: null})
        try {
            const res= (await axios.post(`${API_URL}/reset-password/${token}`, {password})).data
            console.log(res);
            
            set({ message: res.message, isLoading: false });
        } catch (error) {
            console.log(error);
            
            set({error: error.message || "Error resetpassword", isLoading: false})
            // throw error
        }
    },
})))


