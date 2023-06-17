import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { AddPost, FullPost, Home, Login, Registration, HomePopular, PostTags, MyPosts, MyProfile } from './pages';
import { useSelector } from 'react-redux';

const Router = () => {
  const { user } = useSelector(state => state.auth);
  const token = window.localStorage.getItem('token');
  return (
    <Routes>

      {!user && !token && (
        <>
          <Route path='/*' element={<Login />} />
          <Route path='/registration' element={<Registration />} />
        </>
      )}
      {user && (
        <>
          <Route path='/' element={<Home />} />
          <Route path='/tags/:name' element={<PostTags />} />
          <Route path='/popular' element={<HomePopular />} />
          <Route path='/posts/:id' element={<FullPost />} />
          <Route path='/add-post' element={<AddPost />} />
          <Route path='/posts/:id/edit' element={<AddPost />} />
          <Route path='/my-post' element={<MyPosts />} />
          <Route path='/myprofile' element={<MyProfile />} />
        </>
      )}
    </Routes>
  );
};


export default Router;