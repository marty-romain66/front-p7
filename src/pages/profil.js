import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getPosts} from "../feature/post.slice";
import {
    Routes,
    Route,
    Link,
    Navigate,
  } from 'react-router-dom';
  import Header from "../components/Header"
import CardProfil from '../components/CardProfil';
import Container from '@mui/material/Container';

const Profil = () => {
 
const headerTrue = true
    
    const auth = useSelector(state => state.auth);
 
    return (
        <Container maxWidth="sm" sx={{
            display: "flex",
            flexDirection: "column",
            gap: "10px"
        }}>

            {auth ==false  &&   <Navigate replace to="/" />}
            <Header  headerTrue={ headerTrue} />
         <CardProfil/>
            
        </Container>
    );
};

export default Profil;