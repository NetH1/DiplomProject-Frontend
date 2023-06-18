import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';

import { useDispatch, useSelector } from 'react-redux';
import { fetchMyPosts, fetchTags } from '../../store/PostsSlice';
import { TagsBlock } from '../TagsBlock';
import { Post } from '../Post';

export const MyPosts = () => {
  const dispatch = useDispatch();
  const { posts, tags } = useSelector(state => state.posts);
  const isPostsLoading = posts.status === 'loading';
  const isTagsLoading = tags.status === 'loading';

  React.useEffect(() => {
    dispatch(fetchMyPosts());
    dispatch(fetchTags());
  }, []);
  return (
    <>
      <Grid container spacing={4} justifyContent="center" alignItems="center">
        <Grid xs={8} item direction="column" justifyContent="center" alignItems="center">
          {(isPostsLoading ? [...Array(5)] : posts.items).map((item, index) => isPostsLoading
            ? <Post key={index} isLoading={true} />
            : (
              <Post
                id={item._id}
                title={item.title}
                imageUrl={item.imageUrl ? `http://localhost:5000${item.imageUrl}` : ''}
                user={item.user}
                createdAt={item.createdAt}
                viewsCount={item.viewsCount}
                commentsCount={3}
                tags={item.tags}
                isEditable
              />
            )
          )}
        </Grid>
      </Grid>
    </>
  );
};
