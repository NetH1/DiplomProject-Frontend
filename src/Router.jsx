import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { AddPost, FullPost, Home, Login, Registration, HomePopular, PostTags, MyProfile, NotFound } from './pages';
import { useSelector } from 'react-redux';

const Router = () => {
  const { user } = useSelector(state => state.auth);
  const token = window.localStorage.getItem('token');
  return (
    <Routes>

      {!user && !token && (
        <>
          <Route path='/' element={<Login />} />
          <Route path='/login' element={<Login />} />
          <Route path='/registration' element={<Registration />} />
        </>
      )}
      {user && (
        <>
          <Route path='/' element={<Home />} />
          <Route path='/popular' element={<HomePopular />} />
          <Route path='popular/tags' element={<PostTags />}>
            <Route path=':name' element={<PostTags />} />
          </Route>
          <Route path='/tags' element={<PostTags />}>
            <Route path=':name' element={<PostTags />} />
          </Route>
          <Route path='/posts/:id' element={<FullPost />} />
          <Route path='/add-post' element={<AddPost />} />
          <Route path='/posts/:id/edit' element={<AddPost />} />
          <Route path='/myprofile' element={<MyProfile />} />
        </>
      )}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};


export default Router;