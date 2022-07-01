import React from "react";
import { getPosts } from "../feature/post.slice";
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import AddCommentIcon from "@mui/icons-material/AddComment";
import axios from "axios";
import AddComm from "../AddComm";
import Comments from "../Comments";
import { deletePosts, updatePosts,postComment } from "../../feature/post.slice";
import EditIcon from "@mui/icons-material/Edit";
import ModifyPost from "./ModifyPost";
const Card = ({ post }) => {
  console.log(post);
  const [modal, setModal] = React.useState(false);
  const [modalComment, setModalComment] = React.useState(false);

  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);
  const auth = useSelector((state) => state.auth.auth);
  const modalCom = useSelector(
    (state) => state.modalCommantaireChange.modalCommantaireChange
  );

  const deleteCard = (e) => {
    e.preventDefault();
let adminUrl = ""
if(auth.admin === true){
  adminUrl = `http://localhost:3000/api/posts/${post.id}`
}
else{
  adminUrl = `http://localhost:3000/api/posts/${post.id}/user/${auth.userId}`
}



    
    if (auth.userId === post.userId) {
      axios
        .delete("http://localhost:3000/api/posts/" + post.id, {
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
    e.preventDefault();
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
    url: `http://localhost:3000/api/posts/${post.id}/comments/`,
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
      {auth.isAdmin==true || auth.admin==true ? (
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
            src="https://yt3.ggpht.com/a/AGF-l7-0J1G0Ue0mcZMw-99kMeVuBmRxiPjyvIYONg=s900-c-k-c0xffffffff-no-rj-mo"
            alt="user"
          />
          <div className="user-info">
            <h5> posté par : {post.User.name} </h5>
          </div>
        </div>

        {modalComment !== true ? (
          <div className="btnCommantaire">
            <AddCommentIcon
              style={{ cursor: "pointer" }}
              onClick={modalCommantaire}
            >
              Ajouter un commantaire
            </AddCommentIcon>
          </div>
        ) : null}
        {modalComment? <AddComm post={post} modal={modalComment} /> : null}
      </div>
      <Comments post={post} />
      
    </div>
  );
};

export default Card;
