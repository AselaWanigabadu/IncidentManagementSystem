import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { LoginSocialFacebook } from "reactjs-social-login";
import { FacebookLoginButton } from "react-social-login-buttons";
import bgPoto from "../../Assets/bdDash4.jpeg";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const clientId = "346768134358-plvhkl1bjjvt7b39uvekv2qg5cno5091.apps.googleusercontent.com";

function Login() {
  const history = useNavigate();
  const [user, setUser] = useState({
    full_name: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleInputsChange = (e) => {
    setUser((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await sendRequest();
      if (response.status === "ok") {
        localStorage.setItem("userEmail", user.email);
        if (response.role === "Admin") {
          history("/adminDashboard");
        } else {
          history("/userHome");
        }
      }
    } catch (err) {
      alert("Login Error: " + err.message);
    }
  };

  const sendRequest = async () => {
    try {
      const res = await axios.post("http://localhost:5000/login", {
        email: user.email,
        password: user.password,
      });
      return res.data;
    } catch (err) {
      throw new Error(err.response?.data?.error || "Login failed");
    }
  };

  const onGoogleSuccess = (response) => {
    console.log("Google Login Successful! Current User: ", response);

    // Save Google user details to localStorage
    localStorage.setItem("userEmail", response.profileObj.email);
    localStorage.setItem("userImage", response.profileObj.imageUrl);
    localStorage.setItem("userName", response.profileObj.name);

    // Navigate to Home page
    toast.success("Login Successful!");
    history("/");
  };

  const onGoogleFailure = (error) => {
    console.log("Google Login failed!", error);
    toast.error("Login Failed! Please try again.");
  };

  const onFacebookSuccess = (response) => {
    console.log("Facebook Login Successful!", response);

    // Save Facebook user details to localStorage
    localStorage.setItem("userEmail", response.data.email);
    localStorage.setItem("userImage", response.data.picture.data.url);
    localStorage.setItem("userName", response.data.name);

    // Navigate to Home page
    history("/");
  };

  const onFacebookFailure = (error) => {
    console.log("Facebook Login Failed!", error);
  };

  // Load Google API script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/platform.js";
    script.async = true;
    script.onload = () => {
      window.gapi.load("auth2", () => {
        window.gapi.auth2.init({
          client_id: clientId,
        });
      });
    };
    document.body.appendChild(script);
  }, []);

  const handleGoogleLogin = () => {
    const auth2 = window.gapi.auth2.getAuthInstance();
    auth2.signIn().then(
      (googleUser) => {
        onGoogleSuccess(googleUser);
      },
      (error) => {
        onGoogleFailure(error);
      }
    );
  };

  return (
    <div>
      <Header />
      <div
        className="signup-login-content-container"
        style={{
          backgroundImage: `url(${bgPoto})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          margin: "10px",
          marginLeft: "200px",
          height: "541px",
          width: "1024px",
        }}
      >
        <form className="signup-login-container" onSubmit={handleSubmit}>
          <div className="LoginTopic">Login</div>
          <table>
            <thead>
              <tr>
                <th className="trLogin">Field</th>
                <th className="trLogin">Input</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Username : </td>
                <td>
                  <input
                    type="email"
                    name="email"
                    placeholder="johndoe@gmail.com"
                    required
                    value={user.email}
                    onChange={handleInputsChange}
                  />
                </td>
              </tr>
              <tr>
                <td>Password : </td>
                <td>
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                    value={user.password}
                    onChange={handleInputsChange}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <button type="submit">Login</button>
          <div className="signup-login-container-login-link">
            <p>
              Don't have an Account? <a href="/signup">Sign Up</a>
            </p>
          </div>

          <div className="signInButton">
            <button onClick={handleGoogleLogin}>Login With Google</button>
            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
          </div>

          <div className="signInButton">
            <LoginSocialFacebook
              appId="8339108906212055"
              onResolve={onFacebookSuccess}
              onReject={onFacebookFailure}
            >
              <FacebookLoginButton />
            </LoginSocialFacebook>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default Login;
