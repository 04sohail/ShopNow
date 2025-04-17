import React, { useRef, useState, useEffect } from 'react';
import { Eye, EyeOff, ShoppingBag, Mail, Phone, User, CheckCircle, X } from 'lucide-react';
import { useFormik } from "formik";
import { useNavigate } from 'react-router-dom';
import { signupSchema, login_schema } from '../utils/validations';
import { register_user } from '../services/user/registration_controller';
import { login_user } from '../services/user/login_controller';
import { useUser } from '../contexts/user/useUser';


const loginInitialValues = {
  email_address: "",
  password: "",
  rememberMe: false
};

const signupInitialValues = {
  first_name: "",
  last_name: "",
  email_address: "",
  password: "",
  mobile_number: "",
  agreeTerms: false
};

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);
  const navigate = useNavigate();
  const errorRef = useRef(null);
  // Login form handling
  const loginFormik = useFormik({
    initialValues: loginInitialValues,
    validationSchema: login_schema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        setSubmitError(null);
        const response = await login_user(values);
        sessionStorage.setItem("logged_in_user", JSON.stringify(response.data.data));
        if (response.data.data.user_type === "free_user") {
          navigate("/");
        }
        else if (response.data.data.user_type === "admin") {
          navigate("/admin");
        }
        else {
          console.log("Invalid user");
        }
        resetForm();
      } catch (error) {
        console.error("Error during login:", error);
        // Handle backend error messages
        if ((error as { response?: { data?: { detail?: string } } }).response?.data?.detail) {
          setSubmitError((error as { response?: { data?: { detail?: string } } }).response?.data?.detail || "An unexpected error occurred."); // Set backend message
        } else {
          setSubmitError("An unexpected error occurred. Please try again.");
        }
      } finally {
        setSubmitting(false);
      }
    }
  });


  // Signup form handling
  const signupFormik = useFormik({
    initialValues: signupInitialValues,
    validationSchema: signupSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        setSubmitError(null);
        // API CALL
        await register_user(values);

        // Show success notification at the top
        setShowSuccessNotification(true);
        resetForm();

        // Notification will automatically close and switch to login after timeout
      } catch (error) {
        console.error("Error during login:", error);
        // Handle backend error messages
        if ((error as { response?: { data?: { detail?: string } } }).response?.data?.detail) {
          setSubmitError((error as { response?: { data?: { detail?: string } } }).response?.data?.detail || "An unexpected error occurred."); // Set backend message
        } else {
          setSubmitError("An unexpected error occurred. Please try again.");
        }
      } finally {
        setSubmitting(false);
      }
    }
  });

  // Effect to handle notification auto-close and switching to login
  useEffect(() => {
    let timer;
    if (showSuccessNotification) {
      // First timer: wait a bit to make sure the notification is visible
      timer = setTimeout(() => {
        // Second timer: auto close the notification and switch to login
        const switchTimer = setTimeout(() => {
          setShowSuccessNotification(false);
          setIsLogin(true); // Switch to login view
        }, 2000); // 2 seconds display time for notification

        return () => clearTimeout(switchTimer);
      }, 200); // Small delay to ensure animation runs properly
    }
    return () => clearTimeout(timer);
  }, [showSuccessNotification]);

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setSubmitError(null);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleCloseNotification = () => {
    setShowSuccessNotification(false);
    setIsLogin(true);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginFormik.setTouched({
      email_address: true,
      password: true
    });

    // Add a small delay to ensure touched state is updated
    setTimeout(() => {
      loginFormik.handleSubmit();
    }, 0);
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    signupFormik.setTouched({
      first_name: true,
      last_name: true,
      email_address: true,
      password: true,
      mobile_number: true,
      agreeTerms: true
    });

    // Add a small delay to ensure touched state is updated
    setTimeout(() => {
      signupFormik.handleSubmit();
    }, 0);
  };




  return (
    <div className="min-h-screen bg-gradient-to-br flex flex-col items-center justify-center p-6 relative">
      {/* Success Notification at the top */}
      {showSuccessNotification && (
        <div className="fixed top-4 left-0 right-0 mx-auto w-full max-w-md z-50 transform transition-all duration-300 ease-in-out">
          <div className="bg-green-50 border-l-4 border-green-500 rounded-lg shadow-md p-4 mx-4 flex items-center">
            <CheckCircle className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" />
            <div className="flex-grow">
              <p className="font-medium text-green-800">Registration Successful!</p>
              <p className="text-green-700 text-sm">Your account has been created. Redirecting to login...</p>
            </div>
            <button
              onClick={handleCloseNotification}
              className="text-green-500 hover:text-green-700 ml-2 focus:outline-none"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-xl overflow-hidden w-full max-w-4xl flex flex-col md:flex-row">
        {/* Left Side - Banner */}
        <div className="bg-indigo-600 text-white p-8 md:w-2/5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-8">
              <ShoppingBag className="h-8 w-8" />
              <h1 className="text-2xl font-bold">ShopNow</h1>
            </div>
            <h2 className="text-3xl font-bold mb-4">{isLogin ? 'Welcome Back!' : 'Join Our Community'}</h2>
            <p className="mb-4 text-indigo-100">
              {isLogin
                ? 'Sign in to access your account, view your orders, and continue shopping.'
                : 'Create an account to enjoy a personalized shopping experience, track orders, and more.'}
            </p>
          </div>
          <div className="mt-auto">
            <p className="text-indigo-200 text-sm">
              {isLogin
                ? "Don't have an account?"
                : "Already have an account?"}
              <button
                onClick={toggleAuthMode}
                className="text-white font-semibold ml-1 underline focus:outline-none cursor-pointer"
              >
                {isLogin ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="p-8 md:p-12 md:w-3/5">
          <h2 className="text-2xl font-bold text-gray-800 mb-8">
            {isLogin ? 'Sign In' : 'Create Account'}
          </h2>

          {/* Error message display */}
          {submitError && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {submitError}
            </div>
          )}

          {isLogin ? (
            /* Login Form */
            <form className="space-y-6" onSubmit={handleLoginSubmit}>
              <div>
                <label htmlFor="email_address" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email_address"
                    name="email_address"
                    type="text"
                    autoComplete="email"
                    className={`pl-10 block w-full rounded-lg border ${loginFormik.touched.email_address && loginFormik.errors.email_address
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:ring-indigo-500'
                      } py-3 text-gray-900 focus:outline-none focus:ring-2`}
                    placeholder="Email Address"
                    value={loginFormik.values.email_address}
                    onChange={loginFormik.handleChange}
                    onBlur={loginFormik.handleBlur}
                  />
                </div>
                {loginFormik.touched.email_address && loginFormik.errors.email_address && (
                  <p className="mt-1 text-sm text-red-600">{loginFormik.errors.email_address}</p>
                )}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    className={`pl-10 block w-full rounded-lg border ${loginFormik.touched.password && loginFormik.errors.password
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:ring-indigo-500'
                      } py-3 text-gray-900 focus:outline-none focus:ring-2`}
                    placeholder="Password"
                    value={loginFormik.values.password}
                    onChange={loginFormik.handleChange}
                    onBlur={loginFormik.handleBlur}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
                {loginFormik.touched.password && loginFormik.errors.password && (
                  <p className="mt-1 text-sm text-red-600">{loginFormik.errors.password}</p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="rememberMe"
                    name="rememberMe"
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 cursor-pointer"
                    checked={loginFormik.values.rememberMe}
                    onChange={loginFormik.handleChange}
                  />
                  <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                    Forgot your password?
                  </a>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loginFormik.isSubmitting}
                  className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow transition duration-150 ease-in-out cursor-pointer disabled:opacity-70"
                >
                  {loginFormik.isSubmitting ? "Signing In..." : "Sign In"}
                </button>
              </div>
            </form>
          ) : (
            /* Signup Form */
            <form className="space-y-6" onSubmit={handleSignupSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input
                    id="first_name"
                    name="first_name"
                    type="text"
                    className={`block w-full rounded-lg border ${signupFormik.touched.first_name && signupFormik.errors.first_name
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:ring-indigo-500'
                      } py-2 px-3 text-gray-900 focus:outline-none focus:ring-2`}
                    placeholder="First Name"
                    value={signupFormik.values.first_name}
                    onChange={signupFormik.handleChange}
                    onBlur={signupFormik.handleBlur}
                  />
                  {signupFormik.touched.first_name && signupFormik.errors.first_name && (
                    <p className="mt-1 text-sm text-red-600">{signupFormik.errors.first_name}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="last_name" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input
                    id="last_name"
                    name="last_name"
                    type="text"
                    className={`block w-full rounded-lg border ${signupFormik.touched.last_name && signupFormik.errors.last_name
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:ring-indigo-500'
                      } py-2 px-3 text-gray-900 focus:outline-none focus:ring-2`}
                    placeholder="Last Name"
                    value={signupFormik.values.last_name}
                    onChange={signupFormik.handleChange}
                    onBlur={signupFormik.handleBlur}
                  />
                  {signupFormik.touched.last_name && signupFormik.errors.last_name && (
                    <p className="mt-1 text-sm text-red-600">{signupFormik.errors.last_name}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="email_address" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email_address"
                    name="email_address"
                    type="text"
                    autoComplete="email"
                    className={`pl-10 block w-full rounded-lg border ${signupFormik.touched.email_address && signupFormik.errors.email_address
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:ring-indigo-500'
                      } py-2 text-gray-900 focus:outline-none focus:ring-2`}
                    placeholder="Email Address"
                    value={signupFormik.values.email_address}
                    onChange={signupFormik.handleChange}
                    onBlur={signupFormik.handleBlur}
                  />
                </div>
                {signupFormik.touched.email_address && signupFormik.errors.email_address && (
                  <p className="mt-1 text-sm text-red-600">{signupFormik.errors.email_address}</p>
                )}
                <p className="text-red-600 text-sm mt-1 hidden" ref={errorRef}>User Already Exists</p>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    className={`block w-full rounded-lg border ${signupFormik.touched.password && signupFormik.errors.password
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:ring-indigo-500'
                      } py-2 px-3 text-gray-900 focus:outline-none focus:ring-2`}
                    placeholder="Password"
                    value={signupFormik.values.password}
                    onChange={signupFormik.handleChange}
                    onBlur={signupFormik.handleBlur}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
                {signupFormik.touched.password && signupFormik.errors.password && (
                  <p className="mt-1 text-sm text-red-600">{signupFormik.errors.password}</p>
                )}
              </div>

              <div>
                <label htmlFor="mobile_number" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="mobile_number"
                    name="mobile_number"
                    type="tel"
                    maxLength={10}
                    pattern="[0-9]*"
                    inputMode="numeric"
                    className={`pl-10 block w-full rounded-lg border ${signupFormik.touched.mobile_number && signupFormik.errors.mobile_number
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:ring-indigo-500'
                      } py-2 text-gray-900 focus:outline-none focus:ring-2`}
                    placeholder="Phone Number"
                    value={signupFormik.values.mobile_number}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '');
                      signupFormik.setFieldValue('mobile_number', value);
                    }}
                    onBlur={signupFormik.handleBlur}
                  />
                </div>
                {signupFormik.touched.mobile_number && signupFormik.errors.mobile_number && (
                  <p className="mt-1 text-sm text-red-600">{signupFormik.errors.mobile_number}</p>
                )}
              </div>
              <div className="flex items-center">
                <input
                  id="agreeTerms"
                  name="agreeTerms"
                  type="checkbox"
                  className={`h-4 w-4 ${signupFormik.touched.agreeTerms && signupFormik.errors.agreeTerms
                    ? 'border-red-500 text-red-600'
                    : 'border-gray-300 text-indigo-600'
                    } rounded focus:ring-indigo-500 cursor-pointer`}
                  checked={signupFormik.values.agreeTerms}
                  onChange={signupFormik.handleChange}
                  onBlur={signupFormik.handleBlur}
                />
                <label htmlFor="agreeTerms" className="ml-2 block text-sm text-gray-700">
                  I agree to the <a href="#" className="text-indigo-600 hover:text-indigo-500">Terms of Service</a> and <a href="#" className="text-indigo-600 hover:text-indigo-500">Privacy Policy</a>
                </label>
              </div>
              {signupFormik.touched.agreeTerms && signupFormik.errors.agreeTerms && (
                <p className="mt-1 text-sm text-red-600">{signupFormik.errors.agreeTerms}</p>
              )}

              <div>
                <button
                  type="submit"
                  disabled={signupFormik.isSubmitting}
                  className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow transition duration-150 ease-in-out cursor-pointer disabled:opacity-70"
                >
                  {signupFormik.isSubmitting ? "Creating Account..." : "Create Account"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}