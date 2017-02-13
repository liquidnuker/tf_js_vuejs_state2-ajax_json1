import {where} from "underscore";
const Vue = require("./js/vendor/vue.min.js");

const ajaxUrl = "src/js/ajax/bonsai.json";
let loaded = false;

// 
// ======================================================/
const store = {
  debug: true,
  state: {
    message: ""
  },
  ajaxLoader: () => {
    // var self = this; 
    let request = new XMLHttpRequest();
    request.open("GET", ajaxUrl, true);
    request.onload = () => {
      if (request.status >= 200 && request.status < 400) {
        // success
        let data = JSON.parse(request.responseText);
        store.state.message = data.bonsai;
        loaded = true;

      } else {
        // console.log();
      }
    };
    request.onerror = () => {
      // console.log();
    };
    request.send();
  },

  filter: () => {
    store.state.message = where(store.state.message, {
      species: "Jukan"
    });
  }
};

// 
// ======================================================/
const vmA = new Vue({
  el: "#app",
  data: {
    privateState: {},
    sharedState: store.state
  }
});

const vmB = new Vue({
  el: "#app2",
  data: {
    privateState: {},
    sharedState: store.state
  }
});

// 
// ======================================================/
store.ajaxLoader();
document.getElementById("results").onclick = store.filter;