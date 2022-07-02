import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import Card from './Card';
import Header from "./Header"
import  {PostContext} from '../context/PostContext';
import {useDispatch, useSelector} from "react-redux";
import { getPosts } from "../feature/post.slice";
import AddPost from './AddPost';
import SignIn from './SignIn';

const Home = () => {
  const posts = useSelector(state => state.posts);
  const auth = useSelector(state => state.auth.auth);


    const dispatch = useDispatch();
return (
    <>
        {auth !== false?
        
        <><Header /><AddPost /><>


                {posts.posts?.map((post) => (<Card post= {post} />))}
            </></> : <SignIn />}
        </>
);
};

export default Home;