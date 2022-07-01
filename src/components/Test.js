import React, { useState, useRef } from "react";
import axios from "axios";




const Test = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const login = (username, password, email) => {
        return axios
          .post("http://localhost:8080/api/auth/signin",{
            username,
            password,
            
          }) 
          .then((response) => {
            if (response.data.accessToken) {
              localStorage.setItem("user", JSON.stringify(response.data));
            }
      
            return response.data;
          });
      };

    const onChangeUsername = (e) => {
        const username = e.target.value;
        setUsername(username);
      };
    
      const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
      };

      const onChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
      };
      const handleLogin = (e) => {
        e.preventDefault();  
        console.log(username, password, email);
        login(username, password).then(
            () => {
              
              window.location.reload();
            }
            );
    
    
    }
    


    return (
        <div>
            <form onSubmit={handleLogin}>
                <input onChange={onChangeUsername} value={username} type="text" name="" id="" />
                <input onChange={onChangePassword}  value={password} type="password" />
                <input onChange={onChangeEmail}  value={email} type="email" />
                <button>Submit</button>
            </form>
            
        </div>
    );
};

export default Test;