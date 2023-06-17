import React from "react";

import { Post } from "../components/Post";
import { AddComment } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import { useParams } from "react-router-dom";
import { axiosUrl } from "../API";
import { useDispatch, useSelector } from 'react-redux';
import ReactMarkdown from "react-markdown";
import { fetchComments } from "../store/PostsSlice";

export const FullPost = () => {
  const [post, setPost] = React.useState();
  const dispatch = useDispatch();
  const { comments } = useSelector(state => state.posts);
  const userId = useSelector(state => state.auth.user);
  const [isLoading, setIsLoading] = React.useState(true);
  const { id } = useParams();

  React.useEffect(() => {
    axiosUrl.get(`/posts/${id}`).then((res) => { setPost(res.data); setIsLoading(false); }).catch((err) => alert(err));
    dispatch(fetchComments(id))
  }, []);

  if (isLoading) return <Post isLoading={isLoading} isFullPost />
  return (
    <>
      <Post
        id={post._id}
        title={post.title}
        imageUrl={post.imageUrl ? `http://localhost:5000${post.imageUrl}` : ''}
        user={post.user}
        createdAt={post.createdAt}
        viewsCount={post.viewsCount}
        commentsCount={3}
        tags={post.tags}
        isFullPost
      >
        <ReactMarkdown children={post.text} />
      </Post>
      <CommentsBlock
        items={comments.items}
        isLoading={false}
        isAddComment = {userId._id !== post.user._id}
      >
        <AddComment />
      </CommentsBlock>
    </>
  );
};
