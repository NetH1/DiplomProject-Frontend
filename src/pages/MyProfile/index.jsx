import React from 'react';
import styles from './MyProfile.module.scss';
import { axiosUrl } from '../../API';
import { useSelector } from 'react-redux';
import { Button, Paper, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { MyPosts } from '../../components/MyPosts';

const MyProfile = () => {
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth);

  const [avatarUrl, setAvatarUrl] = React.useState('');
  const [fullName, setFullName] = React.useState('');
  const [initialFullName, setInitialFullName] = React.useState('');
  const [initialAvatarUrl, setInitialAvatarUrl] = React.useState('');
  const [isEdit, setIsEdit] = React.useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = React.useState(true);
  const avatarFileref = React.useRef(null);

  const handleChangeFile = async (e) => {
    try {
      const formData = new FormData();
      const imageFile = e.target.files[0];
      formData.append('image', imageFile);
      const { data } = await axiosUrl.post('/avatarUp', formData);
      setAvatarUrl(data.url);
      setIsButtonDisabled(false);
    } catch (error) {
      alert(error);
    }
  };

  const deleteImage = () => {
    setAvatarUrl('');
    setIsButtonDisabled(false);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const userInfo = { fullName, avatarUrl };
    await axiosUrl.patch('/update/user', userInfo);
    window.location.reload();
  };

  const handleInputChange = (e) => {
    setFullName(e.target.value);
    setIsButtonDisabled(false);
  };

  const handleCancel = () => {
    setFullName(initialFullName);
    setAvatarUrl(initialAvatarUrl);
    setIsButtonDisabled(true);
    setIsEdit(false);
  };

  React.useEffect(() => {
    setAvatarUrl(user.avatarUrl);
    setFullName(user.fullName);
    setInitialFullName(user.fullName);
    setInitialAvatarUrl(user.avatarUrl);
  }, [user]);

  return (
    <>
      <Paper style={{ padding: 30 }}>
      <form className={styles.wrapper} onSubmit={onSubmit} encType="multipart/form-data">
        <div className={styles.profile_info}>
          {isEdit ? (
            <TextField variant='standard' type="text" value={fullName} label="fullName" onChange={handleInputChange} />
          ) : (
            <span className={styles.fullName}>{fullName}</span>
          )}
          <input ref={avatarFileref} onChange={handleChangeFile} type="file" hidden />
          {avatarUrl && <img className={styles.avatar} src={`http://localhost:5000${avatarUrl}`} alt="" />}
        </div>
        {isEdit && (
          <>
            {!avatarUrl && (
              <Button variant='contained' size='medium' onClick={() => avatarFileref.current.click()}>загрузить картину</Button>
            )}
            {avatarUrl && (
              <Button variant='contained' size='medium' color='error' onClick={deleteImage}>Удалить картину</Button>
            )}
            <div className={styles.buttons}>
              <Button type='submit' variant='contained' size='large' disabled={isButtonDisabled}>Сохранить</Button>
              <Button variant='contained' color='error' size='large' onClick={handleCancel}>Отмена</Button>
            </div>
          </>
        )}
        {!isEdit && (
          <Button variant='contained' size='large' onClick={() => setIsEdit(true)}>Изменить</Button>
        )}
      </form>
    </Paper>

    <div style={{background:'#fff'}}>
      <MyPosts />
    </div>
    </>
  );
};

export default MyProfile;
