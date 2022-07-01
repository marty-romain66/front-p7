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
  

const Profil = () => {
 
const headerTrue = true
    
    const auth = useSelector(state => state.auth);
 
    return (
        <div>
            {auth ==false  &&   <Navigate replace to="/" />}
            <Header  headerTrue={ headerTrue} />
         <CardProfil/>
            
        </div>
    );
};

export default Profil;