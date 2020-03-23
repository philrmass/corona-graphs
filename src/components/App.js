import React from 'react';
import Header from './Header';
import Footer from './Footer';
import styles from '../styles/App.module.css';
import data from '../data/cases.json';

function App() {
  return (
    <div className={styles.page}>
      <Header/>
      <div className={styles.main}>
        {`${JSON.stringify(data)}`}
      </div>
      <Footer/>
    </div>
  );
}

export default App;
