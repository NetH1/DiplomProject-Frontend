import React from "react";

import styles from "./AddComment.module.scss";

import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { axiosUrl } from "../../API";

export const AddComment = () => {
  const { id } = useParams();
  const [text, setText] = React.useState('');

  const {user} = useSelector(state => state.auth);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const commentData = {
      text
    };

    try {
      await axiosUrl.post(`/comments/${id}`, commentData);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className={styles.root}>
        <Avatar
          classes={{ root: styles.avatar }}
          src={`http://localhost:5000${user.avatarUrl}`}
        />
        <div className={styles.form}>
          <TextField
            onChange={(e) => setText(e.target.value)}
            label="Написать комментарий"
            variant="outlined"
            maxRows={10}
            multiline
            fullWidth
          />
          <Button variant="contained" onClick={handleSubmit}>Отправить</Button>
        </div>
      </div>
    </>
  );
};
