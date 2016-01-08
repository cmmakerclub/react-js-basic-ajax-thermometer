import AppDispatcher from '../dispatcher/AppDispatcher';
import WebAPI from '../util/WebAPI';

import {
  TEMPERATURE_GET_SUCCESS,
  TEMPERATURE_GET_ERROR
} from '../constants/AppConstants';

export default {
  getItems() {
    WebAPI.getItems()
      .then((items) => {
        AppDispatcher.dispatch({
          actionType: ITEMS_GET_SUCCESS,
          items: items
        });
      })
      .catch(() => {
        AppDispatcher.dispatch({
          actionType: ITEMS_GET_ERROR
        });
      });
  },

  getTemperature() {
    console.log("getTemperatureAction has been fired!");
    let count = 0;

    setInterval(() => {
      //let temp = ((Math.random()*10000)%50).toFixed(2);
      //data : {temp: temp, humid: temp},
      console.log("INTERVAL: ", count++, " = ");
      WebAPI.getTemperature()
        .then((data) => {
          AppDispatcher.dispatch({
            actionType: TEMPERATURE_GET_SUCCESS,
            data: JSON.parse(data),
          });
        })
        .catch(() => {
          let data = { temp: NaN, humid: NaN };
          AppDispatcher.dispatch({
            // TODO: must be GET_ERROR
            actionType: TEMPERATURE_GET_SUCCESS,
            data: data,
          });
        });
    }, 1 * 1000);
  }

};
