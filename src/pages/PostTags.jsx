import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';

import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import TagIcon from "@mui/icons-material/Tag";
import { useDispatch, useSelector } from 'react-redux';
import { fetchPostsTag, fetchTags } from '../store/PostsSlice';
import { Link, useParams } from 'react-router-dom';
import { SideBlock } from '../components';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Skeleton } from '@mui/material';

export const PostTags = () => {
  const dispatch = useDispatch();
  const {name} = useParams();
  const userId = useSelector(state => state.auth.user);
  const { postsTag, tags } = useSelector(state => state.posts);
  const isPostsLoading = postsTag.status === 'loading';
  const isTagsLoading = tags.status === 'loading';
  const window_width = window.innerWidth;

  React.useEffect(() => {
    dispatch(fetchPostsTag(name));
  }, [name]);
  return (
    <>
      <Tabs style={{ marginBottom: 15 }} value={0} aria-label="basic tabs example">
      <Tab label={`Посты с тегом ${name}`} />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={12} sm={8} md={8} item>
          {(isPostsLoading ? [...Array(5)] : postsTag.items).map((item, index) => isPostsLoading
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
        {window_width > 450 
        ? (
          <Grid xs={4} item>
        <SideBlock title="Тэги">
      <List>
        {(isTagsLoading ? [...Array(5)] : tags.items).map((name, i) => (
          <Link replace
            style={{ textDecoration: "none", color: "black" }}
            to={`${name}`}
          >
            <ListItem key={i} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <TagIcon />
                </ListItemIcon>
                {isTagsLoading ? (
                  <Skeleton width={100} />
                ) : (
                  <ListItemText primary={name} />
                )}
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </SideBlock>
        </Grid>
        )
        : ''
        }
      </Grid>
    </>
  );
};
