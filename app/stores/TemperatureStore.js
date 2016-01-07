import BaseStore from './BaseStore';
import AppDispatcher from '../dispatcher/AppDispatcher';

import {
  TEMPERATURE_GET_SUCCESS
} from '../constants/AppConstants';

class TemperatureStore extends BaseStore {

  emitChange() {
    this.emit(TEMPERATURE_GET_SUCCESS);
  }

  addChangeListener(callback) {
    this.on(TEMPERATURE_GET_SUCCESS, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(TEMPERATURE_GET_SUCCESS, callback);
  }

  getTemp() {
    return this.getAll()[0].temp;
  }

  getHumid() {
    return this.getAll()[0].humid;
  }
}

let store = new TemperatureStore();

AppDispatcher.register((action) => {
  switch (action.actionType) {
    case TEMPERATURE_GET_SUCCESS:
      store.setAll([action.data]);
      break;
    default:
  }
});

export default store;
