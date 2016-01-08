import styles from './_App.scss';

import React from 'react';
import AppActions from '../../actions/AppActions';
import Body from '../Body/Body';
import Footer from '../Footer/Footer';

function getAppState() {
  return { };
}

export default class App extends React.Component {

  state = getAppState()

  componentDidMount() {
    AppActions.getItems();
  }

  componentWillUnmount() {
  }

  onChange = () => {
    this.setState(getAppState());
  }

  render() {
    return (
      <div className={styles.app}>
        <Body items={this.state.items} />
        <Footer />
      </div>
    );
  }
}
