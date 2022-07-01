import React from "react";
import { getPosts } from "../feature/post.slice";
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import AddCommentIcon from "@mui/icons-material/AddComment";
import axios from "axios";
import { modalCommantaireChange } from "../feature/modalCommentaire";
import AddComm from "./AddComm";
import Comments from "./Comments";
import { deletePosts } from "../feature/post.slice";
import { updatePosts } from "../feature/post.slice";
import { postComment } from "../feature/post.slice";
import EditIcon from "@mui/icons-material/Edit";
import ModifyPost from "./post/ModifyPost";
const Card = ({ post }) => {
  const [modal, setModal] = React.useState(false);
  const [modalComment, setModalComment] = React.useState(false);
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);
  const auth = useSelector((state) => state.auth.auth);
  const modalCom = useSelector(
    (state) => state.modalCommantaireChange.modalCommantaireChange
  );

let adminUrl = ""
if(auth.isAdmin === true || auth.admin === true){
  adminUrl = "admin/"
}


  const deleteCard = (e) => {
    e.preventDefault();

    if (auth.userId === post.userId || auth.isAdmin === true|| auth.admin === true) {
      axios
        .delete(`http://82.223.139.193:3001/api/posts/${adminUrl}${post.id}` , {
          data: {
            userId: auth.userId,
          },
          params: {
            id: post.id,
          },
        })
        .then((res) => {
          dispatch(deletePosts(post.id));
        });
    }
  };

  const modalCommantaire = (e) => {
    
    if (modalComment === false) {
      setModalComment(true);
    } else {
      setModalComment(false);
    }
  };
  const image = () => {
    if (post.imageUrl) {
      return <img src={post.imageUrl} alt="post" />;
    } else {
      return null;
    }
  };

  axios({
    method: "get",
    url: `http://82.223.139.193:3001/api/posts/${post.id}/comments/`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${auth.token}`,
    },
  })
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });

  return (
    <div className="card postion-relative">
      {auth.userId === post.userId || auth.isAdmin === true ? (
        <div className="card__action">
          <CloseIcon onClick={deleteCard} className="close" />
          <EditIcon
            onClick={() => setModal(!modal)}
            style={{ cursor: "pointer" }}
          />
        </div>
      ) : null}

      {modal ? <ModifyPost post={post} modal={modal} /> : null}
      <div className="card-header">
        {post.imageStore ? <img src={post.imageStore} alt="" /> : image()}
      </div>
      <div className="card-body">
        <h4>{post.title}</h4>
        <p>{post.content}</p>
        <div className="user">
          <img
            src={post.User.profilePicture}
            alt="user"
          />
          <div className="user-info">
            <h5> posté par : {post.User.name} </h5>
          </div>
        </div>

        
          <div className="btnCommantaire">
            <AddCommentIcon
              style={{ cursor: "pointer" }}
              onClick={modalCommantaire}
            >
              Ajouter un commantaire
            </AddCommentIcon>
          </div>
        
        {modalComment ?  <AddComm post={post} modal={modalComment}  /> : null}
      </div>
      <Comments post={post} />
    </div>
  );
};

export default Card;
