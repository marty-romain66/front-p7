import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  getPosts,
  addComment,
  updatePosts,
  updateComment,
} from "../../feature/post.slice";
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { IconButton, Input } from '@mui/material';
const AddComm = ({ post, modal }) => {
  const auth = useSelector((state) => state.auth.auth);
  const dispatch = useDispatch();

  const [comment, setComment] = useState("");
  const [modalComment, setModalComment] = useState(modal);

  const handleComment = (e) => {
    console.log(e.target.value);
    setComment(e.target.value);
  };

  const handlePost = (e) => {
    e.preventDefault();
    let data = [];
    if (post.comments === null) {
      data = [{ comment, userId: auth.userId }];
    } else {
      data = [
        ...post.Comments,
        { content: comment, userId: auth.userId, User: { name: auth.name } },
      ];
    }

    console.log(data);
    axios
      .post(`http://82.223.139.193:3001/api/posts/${post.id}/comments`, {
        content: comment,
        userId: auth.userId,
      })
      .then((res) => {
        dispatch(addComment([post.id, data]));
        setModalComment(false);

        axios({
          method: "get",
          url: `http://82.223.139.193:3001/api/posts/${post.id}/comments/`,
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${auth.token}`,
          },
        }).then((res) => {
          console.log(res.data);
          dispatch(addComment([post.id, res.data]));
          // dispatch(getPosts(res.data));
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      {modalComment ? (
        <>
          <label htmlFor="contained-button-file" onSubmit={handlePost}>
          
            <Input onChange={handleComment} type="text" value={comment} />
            <Button variant="contained" component="span" onClick={handlePost} > Envoyer </Button>
         
          </label>
        </>
      ) : null}
    </div>
  );
};

export default AddComm;
