import Lottie from "lottie-react";
import React, { useContext, useState } from "react";
import registerLottieData from "../../assets/lottie/register.json"
import AuthContext from "../../context/AuthContext/AuthContext";
import SocialLogin from "../shared/SocialLogin";

const Register = () => {

    const [error, setError] = useState({});

    const {createUser} = useContext(AuthContext);

    const validatePassword = (password) => {
        const errors = [];
        if (!/[A-Z]/.test(password)) {
          errors.push("Password must have an uppercase letter.");
        }
        if (!/[a-z]/.test(password)) {
          errors.push("Password must have a lowercase letter.");
        }
        if (password.length < 6) {
          errors.push("Password must be at least 6 characters long.");
        }
        return errors;
    };
  
  const handleRegister = e =>{
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);

    //password validation
    const passwordErrors = validatePassword(password);
    if (passwordErrors.length > 0) {
      setError({ ...error, password: passwordErrors.join(" ") });
      return;
    }
     
    createUser(email, password)
    .then(result =>{
      console.log(result.user)
    })
    .catch(error=>{
      console.log(error.message)
    })

  }

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left w-96">
         <Lottie animationData={registerLottieData}></Lottie>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <h1 className="ml-8 mt-4 text-5xl font-bold">Register now!</h1>
          <form onSubmit={handleRegister} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                name="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                name="password"
                className="input input-bordered"
                required
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Register</button>
            </div>
          </form>
            <SocialLogin></SocialLogin>
        </div>
      </div>
    </div>
  );
};

export default Register;
