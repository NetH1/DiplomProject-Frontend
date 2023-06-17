import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';

import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, fetchTags } from '../store/PostsSlice';
import { Link } from 'react-router-dom';

export const Home = () => {
  const dispatch = useDispatch();
  const userId = useSelector(state => state.auth.user);
  const { posts, tags } = useSelector(state => state.posts);
  const isPostsLoading = posts.status === 'loading';
  const isTagsLoading = tags.status === 'loading';

  React.useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchTags());
  }, []);
  return (
    <>
      <Tabs style={{ marginBottom: 15 }} value={0} aria-label="basic tabs example">
        <Link to={'/'}><Tab label="Новые" /></Link>
        <Link to={'/popular'}><Tab label="Популярные" /></Link>
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
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
                commentsCount={item.comments.length}
                tags={item.tags}
                isEditable={userId?._id === item.user._id}
              />
            )
          )}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock key={tags} items={tags.items} isLoading={isTagsLoading} />
        </Grid>
      </Grid>
    </>
  );
};
