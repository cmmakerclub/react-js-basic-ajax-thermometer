import styles from './_Thermometer.scss';
import React from 'react';
import TemperatureStore from '../../stores/TemperatureStore'
import AppAction from '../../actions/AppActions'

import "../../assets/thermometer0.png"


let { Component, PropTypes } = React;

export default class Thermometer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      temperature: 50
    };
  }

  static defaultProps = {
    items: []
  };

  static propTypes = {
    items: PropTypes.array.isRequired
  };

  componentWillMount() {
    TemperatureStore.addChangeListener(this.onChange.bind(this));
  }

  componentDidMount() {
    AppAction.getTemperature();
  };

  onChange() {
    this.setState({temperature: TemperatureStore.getTemp()});
  }

  render() {
    let structure = (
      <div className={styles.container}>
        <div className={styles.leftContainer}>
          <img className={styles.image} ref="img" src="../assets/thermometer0.png"/>
        </div>
        <div className={styles.rightContainer}>
          <div className={styles.childTemperatureTextContainer}>
            <span className={styles.temperatureText}>{this.state.temperature}</span>
            <span className={styles.temperatureUnitText}>&deg;C</span>
          </div>
        </div>
      </div>
    );
    return (structure);
  }


}
