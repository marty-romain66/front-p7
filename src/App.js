import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Test from "./components/Test";
import SignIn from "./components/SignIn";
import Header from "./components/Header";
import { UserContext } from "./context/UserContext";
import Home from "./components/Home";
import AddPost from "./components/AddPost";
import "./sass/index.scss";
import { PostContext } from "./context/PostContext";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "./feature/post.slice";
import { auths } from "./feature/auth.slice";
import { getUser } from "./feature/admin.slice";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Profil from "./pages/profil";

function App() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.data);
  const auth = useSelector((state) => state.auth.auth);
  const user = JSON.parse(localStorage.getItem("user"));
  

  const authHeader = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.token) {
      return { authorization: `bearer ${user.token}` };
    } else {
      return {};
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        await axios
          .get(`http://82.223.139.193:3001/api/auth/user/${user.userId}`, {
            headers: authHeader(),
          })

          .then((response) => {
            dispatch(auths(response.data));
          })
          .catch((err) => {
            console.log(err);
            dispatch(auths(false));
          });
      }
    };
    fetchData();
  }, []);
 

  if (auth.token) {
    axios({
      method: "get",
      url: "http://82.223.139.193:3001/api/posts/",
      headers: authHeader(),
    })
      .then((res) => {
        dispatch(getPosts(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }
  if(auth.isAdmin === true){
    axios({
      method: "get",
      url: "http://82.223.139.193:3001/api/auth/admin/users/"+ auth.userId,
      headers: authHeader(),
    })

      .then((res) => {
        dispatch(getUser(res.data));
      }
      ).catch((err) => {
        console.log(err);
      }
      )
  }
  console.log(auth.isAdmin)

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/profil" element={<Profil />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
