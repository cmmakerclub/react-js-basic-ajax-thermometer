import styles from './_Thermometer.scss';
import React from 'react';
import TemperatureStore from '../../stores/TemperatureStore'
import AppAction from '../../actions/AppActions'
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

import "../../assets/thermometer0.png"


let { Component, PropTypes } = React;

export default class Thermometer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      temperature: 50,
      bar: {
        height: 100,
      }
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
    let temp = TemperatureStore.getTemp();
    let data = {
      temperature: temp,
      bar: {
        height: temp/60*300,
      }
    };
    this.setState(data);
    console.log("STATE: ", this.state);
  }

  render() {
    let structure = (
      <div className={styles.container}>
        <div className={styles.leftContainer}>
          <div className={styles.imageWrapper}>
            <ReactCSSTransitionGroup transitionName="example" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
              <div style={this.state.bar} className={styles.imageBar}></div>
            </ReactCSSTransitionGroup>
            <img className={styles.image} ref="img" src="../assets/thermometer0.png"/>
          </div>
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
