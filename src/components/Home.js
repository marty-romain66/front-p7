import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import Card from './Card';
import Header from "./Header"
import  {PostContext} from '../context/PostContext';
import {useDispatch, useSelector} from "react-redux";
import { getPosts } from "../feature/post.slice";
import AddPost from './AddPost';
import SignIn from './SignIn';
import Container from '@mui/material/Container';
const Home = () => {
  const posts = useSelector(state => state.posts);
  const auth = useSelector(state => state.auth.auth);


    const dispatch = useDispatch();
return (
    <Container maxWidth="sm">

        {auth !== false?
        
        <><Header /><AddPost /><>


                {posts.posts?.map((post) => (<Card post= {post} />))}
            </></> : <SignIn />}
    </Container>
);
};

export default Home;