import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import axios from 'axios';
import { toast } from "sonner";
import { setUser } from '../slices/userSlice';
import { useDispatch } from 'react-redux';
import Loading from '../components/Loading';


export default function LoginPage() {

const REACT_APP_BASE_API_URL = process.env.REACT_APP_BASE_API_URL
const [loading, setLoading] = useState(true);


  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onChange",
  });

  const password = watch("password");
  const dispatch = useDispatch()

  const onSubmit = async (data) => {
    console.log("data: ", data)
    try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const response = await axios.post(`${REACT_APP_BASE_API_URL}/accounts/login/`,{
            data
        }, { withCredentials: true })
        if (response.status === 200){
            toast.success("User Logged In Successfully!")
            console.log("response.data: ", response.data)
            dispatch(setUser({user_id:response.data.user_id, email:response.data.email}))

            navigate('home/')
        }else{
            console.error("error response: ", response)
            toast.error("something went wrong")
        }

          } catch (err) {
        if (err.response && err.response.status === 400) {
            
            const errorData = err.response.data;
            console.error("Error response data: ", errorData);
    
            
            if (errorData.email) {
                toast.error(`${errorData.email[0]}`);
            }else if (errorData.password) {
                toast.error(`${errorData.password[0]}`);
            } else {
              console.log("errror data: ", errorData)
                toast.error("Something went wrong with your request.");
            }
        } else {
            console.error("Unexpected error: ", err);
            toast.error("An unexpected error occurred.");
        }
    }
    
  };

  useEffect(() => {
    axios.get(`${REACT_APP_BASE_API_URL}/accounts/check-auth/`, { withCredentials: true })
        .then(response => {
            if (response.data.is_authenticated) {
                navigate("/home");
            } else {
                setLoading(false);
            }
        })
        .catch(error => {
            setLoading(false);
        });
}, [navigate]);

if (loading) {
    return <Loading loading={loading} />; 
}

  

  return (
    <div className="min-h-screen bg-[#f5f5f3] flex flex-col">
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Welcome back</h1>
            <p className="text-gray-600">Sign in to continue to Spotlight</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                className={`w-full p-3 border rounded-lg focus:ring-1 focus:ring-fifth outline-none ${
                    errors.email ? "border-red-500" : ""
                  }`}
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}         
                  />
                {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                className={`w-full p-3 border rounded-lg focus:ring-1 focus:ring-fifth outline-none ${
                    errors.password ? "border-red-500" : ""
                  }`}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
                      message:
                        "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character",
                    },
                  })}
              />
                            {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 text-sm">
                <input type="checkbox" className="rounded border-gray-300 text-primary focus:primary" />
                <span>Remember me</span>
              </label>
              <button className="text-sm text-secondary hover:text-primary">
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              className={`w-full bg-indigo-600 text-white py-3 rounded-full hover:bg-primaryhover transition-colors ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Loading..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
