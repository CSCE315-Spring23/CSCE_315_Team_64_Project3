import React, { useState } from "react"
import { GoogleLogin } from '@react-oauth/google';
import {Link} from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'

function HomePage() {
  let [authMode, setAuthMode] = useState("signin")

  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin")
  }
  
  return (
    <MainLayout>
        <div className='bg-light p-5 mt-4 rounded-3'>
          <h1>Smoothie King Server Login</h1>
          <div className="Auth-form-container">
          <form className="Auth-form">
            <div className="Auth-form-content">
              <h3 className="Auth-form-title">Sign In</h3>
              <div className="text-center">
                Not registered yet?{" "}
                <span className="link-primary" onClick={changeAuthMode}>
                  Sign Up
                </span>
              </div>
              <div className="form-group mt-3">
                <label>Email address</label>
                <input
                  type="email"
                  className="form-control mt-1"
                  placeholder="Enter email"
                />
              </div>
              <div className="form-group mt-3">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control mt-1"
                  placeholder="Enter password"
                />
              </div>
              <div className="d-grid gap-2 mt-3">
                  <Link to='/pos' className='btn btn-primary'>Login</Link>
              </div>
              <p className="text-center mt-2">
                Forgot <a href="#">password?</a>
              </p>
            </div>
            <div className="d-grid gap-2 mt-3">
              <GoogleLogin className = 'form-control mt-1'
                onSuccess={credentialResponse => {
                  console.log(credentialResponse);
                }}
                onError={() => {
                  console.log('Login Failed');
                }}
              />
            </div>
          </form>
          
        </div>
      </div>
    </MainLayout>
  )
}



export default HomePage