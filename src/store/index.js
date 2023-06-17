import { configureStore } from "@reduxjs/toolkit";
import PostsSlice from "./PostsSlice";
import authSlice from "./authSlice";

export const store = configureStore({
    reducer: {
        posts: PostsSlice,
        auth:authSlice,
    }
});