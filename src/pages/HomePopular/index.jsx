import React from 'react';
import styles from './homePopular.module.scss'
import Grid from '@mui/material/Grid';

import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPopularPosts, fetchTags } from '../../store/PostsSlice';
import { Post, TagsBlock } from '../../components';

export const HomePopular = ({variant = 'popular'}) => {
  const dispatch = useDispatch();
  const userId = useSelector(state => state.auth.user);
  const { posts, tags } = useSelector(state => state.posts);
  const isPostsLoading = posts.status === 'loading';
  const isTagsLoading = tags.status === 'loading';

  React.useEffect(() => {
    dispatch(fetchPopularPosts());
    dispatch(fetchTags());
  }, []);
  return (
    <>
      <div className={styles.div_buttons}>
        <button className={styles.button}><Link className={styles.link} to={'/'}>Новые</Link></button>
        <button className={styles.button}><Link className={` ${styles.link} ${variant === 'popular' ? styles.active : '' } `} to={'/popular'}>Популярные</Link></button>
      </div>
      <Grid container spacing={4}>
        <Grid xs={12} sm={8} md={8} item>
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
                isEditable={userId?._id === item.user._id}
              />
            )
          )}
        </Grid>
        <Grid className={styles.mobile} xs={4} item>
          <TagsBlock key={tags} items={tags.items} isLoading={isTagsLoading} />
        </Grid>
      </Grid>
    </>
  );
};
