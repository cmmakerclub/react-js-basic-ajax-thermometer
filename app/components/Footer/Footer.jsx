import styles from './_Footer.scss';
import React from 'react';

export default class Footer extends React.Component {
  render() {
    var year = (new Date()).getFullYear();
    return (
      <footer className={styles.footer}>
        &copy; Nat Weerawan&nbsp;{year}
      </footer>
    );
  }
}
