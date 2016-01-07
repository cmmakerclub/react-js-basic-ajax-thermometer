import AppDispatcher from '../dispatcher/AppDispatcher';
import WebAPI from '../util/WebAPI';
let superagent  = require ('superagent');

import {
  ITEMS_GET_SUCCESS,
  ITEMS_GET_ERROR,
  TEMPERATURE_GET_SUCCESS
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
    console.log("superagent", superagent.get);
    let count = 0;

    setInterval(() => {
      //let temp = ((Math.random()*10000)%50).toFixed(2);
      //data : {temp: temp, humid: temp},
      console.log("INTERVAL: ", count++, " = ");
      superagent
        .get('/atmosphere')
        .end(function(err, res){
          if (!err) {
            let data = res.text || { temp: -9, humid: -9 };
            console.log("OK", data);
            AppDispatcher.dispatch({
              actionType: TEMPERATURE_GET_SUCCESS,
              data : JSON.parse(data),
            });
          }
        });
    }, 1500);
  }

};
