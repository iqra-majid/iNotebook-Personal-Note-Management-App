import React, { useState } from "react";
import {useNavigate} from 'react-router-dom';

const Login = (props) => {

    const [credentials,setCredentials ] = useState({email:"",password:""});
    let navigate = useNavigate();

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const response = await fetch("http://localhost:5000/api/auth/login", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({email: credentials.email ,password: credentials.password}),
  //   });
  //   const json = await response.json();
  //   console.log(json);
  //   if(json.success){
  //       // Save the authtoken and redirect
  //       localStorage.setItem('token',json.authtoken);
  //       // navigate between routes in your React application
  //       navigate("/");
  //     props.showAlert("Loged in successfully" , "success")

        
  //   }else{
  //       props.showAlert("Invalid credentials" , "danger")
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      localStorage.setItem('token', json.authToken);
      navigate("/");
      props.showAlert("Logged in successfully", "success");
    } else {
      props.showAlert("Invalid credentials", "danger");
    }
  };
  
  

  const onChange=(e)=>{
    // spread operator
    // the values in the note state are same but the succeeded properties are overwrite or add    
    setCredentials({...credentials, [e.target.name]:e.target.value ,});
  }

  return (
    <div className="mt-3">
      <h2>Login to continue to iNoteBook</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            onChange={onChange}
            value={credentials.email}
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            onChange={onChange}
            value={credentials.password}
            type="password"
            className="form-control"
            id="password"
            name="password"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
