let superagent = require('superagent');

export default {

  getItems() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(['Item 1', 'Item 2', 'Item 3'].map((item, i) => {
          return {
            id: i,
            label: item
          };
        }));
      }, 500);
    });
  },

  getTemperature() {
    return new Promise((resolve, reject) => {
      superagent
        .get('/atmosphere')
        .end(function (err, res) {
          if (err || !res.ok) {
            let data = {temp: -9, humid: -9};
            console.log("REJECT", data);
            reject(data);
          }
          else {
            let data = res.text;
            resolve(data);
          }
        });
    });
  }
}
