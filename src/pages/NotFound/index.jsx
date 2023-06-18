import React from 'react';
import { Link } from 'react-router-dom';
import styles from './notFound.module.scss'

const NotFound = () => {
    return (
        <div className={styles.wrapper}>
           <span className={styles.span404}>404</span>
           <p className={styles.page}>СТРАНИЦА НЕ НАЙДЕНА</p>
           <button className={styles.button}><Link className={styles.link} to='/'>На Главную</Link></button>
        </div>
    );
};


export default NotFound;