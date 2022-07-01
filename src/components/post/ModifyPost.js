import axios from "axios";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePosts } from "../../feature/post.slice";
import { getPosts } from "../../feature/post.slice";

const ModifyPost = ({ post, modal }) => {
  const [modals, setModals] = React.useState(modal);
  const auth = useSelector((state) => state.auth.auth);
  const dispatch = useDispatch();
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const [image, setImage] = useState("");
  const [imageBack, setImageBack] = useState("");

  const handleImage = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
    setImageBack(e.target.files[0]);
  };

  const update = (e) => {
    e.preventDefault();
    setModals(false);
    axios({
      method: "put",
      url: `http://82.223.139.193:3001/api/posts/${post.id}`,
      data: {
        title,
        content,
        userId: auth.userId,
        image: imageBack,
        imageStore: image,
      },
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${auth.token}`,
      },
    })
      .then((res) => {
       

        axios({
          method: "get",
          url: "http://82.223.139.193:3001/api/posts/" + post.id,
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${auth.token}`,
          },
        }).then((res) => {
          console.log(res.data);
          dispatch(updatePosts(res.data));
          // dispatch(getPosts(res.data));
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      {modals ? (
        <form>
          <input
            type="text"
            placeholder={post.title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder={post.content}
            onChange={(e) => setContent(e.target.value)}
          />
          <input onChange={handleImage} type="file" name="file" />
          <button onClick={update}>modifié le post</button>
        </form>
      ) : null}
    </div>
  );
};

export default ModifyPost;
