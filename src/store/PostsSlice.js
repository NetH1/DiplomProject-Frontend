import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosUrl } from "../API";



export const fetchPosts = createAsyncThunk(
    'posts/fetchPosts', async () => {
        const { data } = await axiosUrl.get('/posts');
        const newPosts = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return newPosts;
    }
);

export const fetchPopularPosts = createAsyncThunk(
    'posts/fetchPopularPosts', async () => {
        const { data } = await axiosUrl.get('/posts');
        const newPosts = data.sort((a, b) => b.viewsCount - a.viewsCount);
    return newPosts;
    }
);

export const fetchPostsTag = createAsyncThunk(
    'posts/fetchPostsTag', async (tag) => {
        const { data } = await axiosUrl.get(`/posts/tag/${tag}`);
        return data;
    }
);


export const deletePosts = createAsyncThunk(
    'posts/deletePosts', async (id) => {
        await axiosUrl.delete(`/posts/${id}`);
    }
);

export const fetchTags = createAsyncThunk(
    'posts/fetchTags', async () => {
        const { data } = await axiosUrl.get('/tags');
        return data;
    }
);

export const fetchComments = createAsyncThunk(
    'posts/fetchComments', async (id) => {
        const { data } = await axiosUrl.get(`/comments/${id}`);
        return data;
    }
);





const initialState = {
    posts: {
        items: [],
        status: 'loading'
    },
    tags: {
        items: [],
        status: 'loading'
    },
    comments: {
        items: [],
        status: 'loading'
    },
    postsTag: {
        items: [],
        status: 'loading'
    }
};




const PostsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchPosts.pending]: (state) => {
            state.posts.status = 'loading';
        },
        [fetchPosts.rejected]: (state) => {
            state.posts.status = 'error';
            state.posts.items = [];
        },
        [fetchPosts.fulfilled]: (state, action) => {
            state.posts.status = 'loaded';
            state.posts.items = action.payload;
        },

        [fetchPopularPosts.fulfilled]: (state, action) => {
            state.posts.status = 'loaded';
            state.posts.items = action.payload;
        },

        [fetchPostsTag.pending]: (state) => {
            state.postsTag.status = 'loading';
        },
        [fetchPostsTag.rejected]: (state) => {
            state.postsTag.status = 'error';
            state.postsTag.items = [];
        },
        [fetchPostsTag.fulfilled]: (state, action) => {
            state.postsTag.status = 'loaded';
            state.postsTag.items = action.payload;
        },

        [deletePosts.pending]: (state, action) => {
            state.posts.items = state.posts.items.filter((item) => item._id !== action.meta.arg);
        },
        [deletePosts.rejected]: (state) => {
            state.posts.status = 'error';
        },


        //Tags

        [fetchTags.pending]: (state) => {
            state.tags.status = 'loading';
        },
        [fetchTags.rejected]: (state) => {
            state.tags.status = 'error';
            state.tags.items = [];
        },
        [fetchTags.fulfilled]: (state, action) => {
            state.tags.status = 'loaded';
            state.tags.items = action.payload;
        },


        [fetchComments.pending]: (state) => {
            state.comments.status = 'loading';
        },
        [fetchComments.rejected]: (state) => {
            state.comments.status = 'error';
            state.comments.items = [];
        },
        [fetchComments.fulfilled]: (state, action) => {
            state.comments.status = 'loaded';
            state.comments.items = action.payload;
        },


        // [createComment.fulfilled]: (state, action) => {
        //     state.comments = action.payload;
        // },
        // [fetchComments.fulfilled]: (state, action) => {
        //     state.comments = action.payload;
        // },
    }
});


export default PostsSlice.reducer;