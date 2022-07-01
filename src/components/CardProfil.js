import axios from "axios";
import React, { useRef, useState, useParams, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser } from "../feature/admin.slice";
import { getUser } from "../feature/admin.slice";
import { modifyUser } from "../feature/auth.slice";
import { auths } from "../feature/auth.slice";
import { IconButton, Input } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

const CardProfil = () => {
  const Input = styled('input')({
    display: 'none',
  });
  const [userList, setUserList] = useState([]);
  const [imageBack, setImageBack] = useState("");
  const [image, setImage] = useState("");
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const admin = useSelector((state) => state.admin);

  const deleteCompte = () => {
    if(auth.auth.isAdmin===true){
      return alert("Vous n'avez pas le droit de supprimer un compte admin"); 
    }
    axios
      .delete("http://82.223.139.193:3001/api/auth/user/" + auth.auth.userId, {})
      .then((res) => {
        console.log(res);
        dispatch(auths(false));
        document.location.href="/"
      
      })
      .catch((err) => {
        console.log(err);
      });
    dispatch(auths(false));
  };

  const deleteUser = (user) => {
 
    axios({
      method: "put",
      url: "http://82.223.139.193:3001/api/auth/admin/users/" + user.id,
      data: {
        isAdmin: true,
      },
      headers: {
        authorization: `bearer ${auth.auth.token}`,
      },
    })
      .then((res) => {
        console.log(res);
        alert(`Utilisateur :${user.name} promu administrateur`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleImage = (e) => {
    setImageBack(e.target.files[0]);
    setImage(URL.createObjectURL(e.target.files[0]));
  };
  const updateUser = (e) => {
    e.preventDefault();
    axios({
      method: "put",
      url: `http://82.223.139.193:3001/api/auth/user/${auth.auth.userId}`,
      data: {
        image: imageBack,
      },
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${auth.auth.token}`,
      },
    })
      .then((res) => {
        console.log(res.data);
        const user = {
          ...auth.auth,
          profilePicture: image,
        };
        dispatch(modifyUser(user));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="cardProfile">
      <div className="User">
        <h1>Bienvenue {auth.auth.name}</h1>
        {auth.auth.profilePicture!==null?(
        <img className="imageProfile" src={auth.auth.profilePicture} alt="" /> ):null}
      </div>
      <div>
        {auth.auth.profilePicture===null?(
            <p>Ajouter une photo de profile : </p> ) :  <p>Modifier sa photo de profile</p>}
            <label htmlFor="icon-button-file">
  <Input onChange={handleImage} accept="image/*" id="icon-button-file" type="file" />
  <IconButton  color="primary" aria-label="upload picture" component="span">
    <PhotoCamera />
  </IconButton>
</label>
<label htmlFor="contained-button-file">
        <Input accept="image/*" id="contained-button-file" multiple type="file" />
        <Button onClick={updateUser} variant="contained" component="span">
          Télécharger
        </Button>
      </label>
      <p onClick={deleteCompte} style={{cursor : "pointer"}}>Supprimer mon Compte</p>
          </div>
      <div>
        {/* {auth.auth.isAdmin ? null : (
        <li onClick={deleteCompte} className="deleteCompte">
          Je souhaite supprimer mon compte
        </li>
      )}
      {auth.auth.isAdmin === true ? (
        <li>je suis admin</li>
      ) : (
        <li>je suis pas admin</li>
      )} */}
        {/* {auth.auth.isAdmin === true ? (
        <div>
          {admin.admin.map((user) => (
            <li style={{ cursor: "pointer" }} onClick={() => deleteUser(user)}>
              Je souhaite suprimmer l'utilsateur : {user.name}
            </li>
          ))}

          <div>
            <p>Ajouter une photo de profil</p>
            <form enctype='multipart/form-data'action='/upload_files' method="post" onSubmit={updateUser} >
              <input onChange={handleImage} type="file" />
              <button type="submit">Ajouter une photo de profil</button>
            </form>
          </div>
        </div>
      ) : null} */}
      </div>
    </div>
  );
};

export default CardProfil;
