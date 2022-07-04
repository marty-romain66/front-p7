import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import DeleteComment from './DeleteComment';

const Comments = ({post}) => {
    
    const auth = useSelector((state) => state.auth.auth);
    const comments = post.Comments;

    

    return (
        <div>
            {/* {comment?.map((comment) => <p> {comment.content} </p>)} */}
            {comments &&
        comments.map((comment) => ( <div className='user'  > <img  src={comment.User.profilePicture} alt="" /> <span> {auth.name} :    </span>
           {comment.content}  {comment.userId === auth.userId || auth.isAdmin==true?(< DeleteComment post={post} comment={comment} />) :null} </div>))}
        </div>
    );
};

export default Comments;