import React from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';

import 'easymde/dist/easymde.min.css';
import styles from './AddPost.module.scss';
import { axiosUrl } from '../../API';
import { Link, useNavigate, useParams } from 'react-router-dom';

export const AddPost = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const [fields, setFields] = React.useState({
    text: '',
    imageUrl: '',
    title: '',
    tags: ['']
  })

  const { text, imageUrl, tags, title } = fields

  const onChangeFields = (e) => {
    setFields((prevFields) => {
      if (e.target.name === 'tags') {
        return { ...prevFields, [e.target.name]: e.target.value.split(',') };
      } else {
        return { ...prevFields, [e.target.name]: e.target.value };
      }
    });
  }

  // const [text, setText] = React.useState('');
  // const [imageUrl, setImageUrl] = React.useState('');
  // const [title, setTitle] = React.useState('');
  // const [tags, setTags] = React.useState(['']);
  const imageFileRef = React.useRef(null);

  const handleChangeFile = async (e) => {
    try {
      const formData = new FormData();
      const imageFile = e.target.files[0];
      formData.append('image', imageFile);
      const { data } = await axiosUrl.post('/upload', formData);
      setFields((prevFields) => ({ ...prevFields, imageUrl: data.url }));
    } catch (error) {
      alert(error)
    }
  };

  const onClickRemoveImage = () => { setFields((prevFields) => ({ ...prevFields, imageUrl: '' }))};

  const onSubmit = async () => {
    try {
      const postData = {
        text, title, imageUrl, tags
      }
      const { data } = isEdit 
      ? await axiosUrl.patch(`/posts/${id}`, postData)
      : await axiosUrl.post('/posts', postData)
      navigate('/');
    } catch (error) {
      alert(error)
    }
  };

  React.useEffect(() => {
    if (id) {
      axiosUrl.get(`/posts/${id}`).then(({data}) => {
        setFields((prev) => ({
          ...prev,
          title: data.title,
          text: data.text,
          tags: data.tags,
          imageUrl: data.imageUrl,
        }));
      });
    }
  }, []);

  const onChange = React.useCallback((value) => {
    setFields((prevFields) => ({ ...prevFields, text: value }));
  }, []);

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'Введите текст...',
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    [],
  );


  return (
    <Paper style={{ padding: 30 }}>
      <Button onClick={() => imageFileRef.current.click()} variant="outlined" size="large">
        Загрузить превью
      </Button>
      <input ref={imageFileRef} type="file" onChange={handleChangeFile} name='imageUrl' hidden />
      {imageUrl && (
        <>
          <Button variant="contained" color="error" onClick={onClickRemoveImage}>
            Удалить
          </Button>
          <img className={styles.image} src={`http://localhost:5000${imageUrl}`} alt="Uploaded" />
        </>
      )}
      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Заголовок статьи..."
        value={title}
        name='title'
        onChange={onChangeFields}
        fullWidth
      />
      <TextField classes={{ root: styles.tags }} variant="standard" name='tags' placeholder="Тэги" value={tags} onChange={onChangeFields} fullWidth />
      <SimpleMDE className={styles.editor} value={text} name="text" onChange={onChange} options={options} />
      <div className={styles.buttons}>
        <Button onClick={onSubmit} size="large" variant="contained">
          {
            isEdit ? 'Сохранить' : 'Опубликовать'
          }
        </Button>
        <Link to="/">
          <Button size="large">Отмена</Button>
        </Link>
      </div>
    </Paper>
  );
};
