// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/main.js":[function(require,module,exports) {
var dataSets = {
  solarData: [0, 0, 0, 0, 0, 0, 25, 194, 136375, 29865, 42375, 482675, 423425, 2725, 94475, 4375, 0, 0, 0, 0, 0, 0, 0],
  windData: [400675, 357375, 314525, 28285, 260875, 2541, 238375, 2490, 2429, 241825, 22465, 204725, 20575, 2096, 229375, 305625, 379025, 4397, 48415, 5026, 520225, 567675, 532825],
  biomassData: [50865, 50775, 5061, 504525, 5064, 50645, 50635, 50805, 5076, 511125, 510475, 510775, 511475, 513625, 5143, 515625, 51485, 51405, 513675, 516975, 5175, 51615, 514225],
  hydroData: [119625, 1164, 117925, 1155, 11455, 11605, 11575, 115225, 11635, 115875, 115975, 116975, 117125, 116625, 1168, 119425, 120975, 120425, 11815, 119775, 12235, 1228, 122275],
  coalData: [146475, 1482575, 15190, 1510825, 15436, 158875, 154245, 15523, 152545, 146655, 143015, 1405675, 1402525, 13931, 143045, 14572, 1509425, 1504625, 1509325, 1488525, 14443, 1421875, 1392375],
  gasData: [5409, 5312, 5127, 4993, 50575, 5094, 516925, 556925, 60525, 65155, 714425, 74455, 74115, 758675, 79345, 83475, 838875, 846475, 847875, 841225, 84095, 810275, 72475],
  nuclearData: [815025, 81565, 815375, 81505, 815025, 81545, 815275, 81575, 8160, 816125, 816025, 8153, 81535, 815475, 815675, 8156, 8151, 815075, 815475, 815225, 814875, 8141, 814175]
};
var colors = {
  wind: "#4ba3c3",
  solar: "#ffb703",
  biomass: "#397367",
  hydro: "#00b5cf",
  coal: "#36311f",
  gas: "#d6e5e3",
  nuclear: "#7cdf64"
};
var labelTimes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
new Chart(document.getElementById("energyProductionLine"), {
  type: 'line',
  data: {
    labels: labelTimes,
    datasets: [{
      data: dataSets.coalData,
      label: "Coal",
      borderColor: colors.coal,
      fill: false
    }, {
      data: dataSets.gasData,
      label: "Gas",
      borderColor: colors.gas,
      fill: false
    }, {
      data: dataSets.windData,
      label: "Wind",
      borderColor: colors.wind,
      fill: false
    }, {
      data: dataSets.solarData,
      label: "Solar",
      borderColor: colors.solar,
      fill: false
    }, {
      data: dataSets.biomassData,
      label: "Biomass",
      borderColor: colors.biomass,
      fill: false
    }, {
      data: dataSets.hydroData,
      label: "Hydro",
      borderColor: colors.hydro,
      fill: false
    }, {
      label: 'Nuclear',
      borderColor: colors.nuclear,
      data: dataSets.nuclearData,
      fill: false
    }]
  },
  options: {
    title: {
      display: true,
      text: 'Energy Production by Sector'
    },
    legend: {
      position: 'bottom'
    }
  }
});
new Chart(document.getElementById("energyProductionLineStacked"), {
  type: 'line',
  data: {
    labels: labelTimes,
    datasets: [{
      data: dataSets.coalData,
      label: "Coal",
      borderColor: colors.coal,
      fill: false
    }, {
      data: dataSets.gasData,
      label: "Gas",
      borderColor: colors.gas,
      fill: false
    }, {
      data: dataSets.windData,
      label: "Wind",
      borderColor: colors.wind,
      fill: false
    }, {
      data: dataSets.solarData,
      label: "Solar",
      borderColor: colors.solar,
      fill: false
    }, {
      data: dataSets.biomassData,
      label: "Biomass",
      borderColor: colors.biomass,
      fill: false
    }, {
      data: dataSets.hydroData,
      label: "Hydro",
      borderColor: colors.hydro,
      fill: false
    }, {
      label: 'Nuclear',
      borderColor: colors.nuclear,
      data: dataSets.nuclearData,
      fill: false
    }]
  },
  options: {
    title: {
      display: true,
      text: 'Energy Production by Sector'
    },
    scales: {
      yAxes: [{
        stacked: true
      }]
    },
    legend: {
      position: 'bottom'
    }
  }
});
new Chart(document.getElementById("energyProductionBar"), {
  type: 'bar',
  data: {
    labels: labelTimes,
    datasets: [{
      label: 'Wind',
      backgroundColor: colors.wind,
      data: dataSets.windData,
      stack: 'renewable'
    }, {
      label: 'Solar',
      backgroundColor: colors.solar,
      data: dataSets.solarData,
      stack: 'renewable'
    }, {
      label: 'Biomass',
      backgroundColor: colors.biomass,
      data: dataSets.biomassData,
      stack: 'renewable'
    }, {
      label: 'Hydro',
      backgroundColor: colors.hydro,
      data: dataSets.hydroData,
      stack: 'renewable'
    }, {
      label: 'Nuclear',
      backgroundColor: colors.nuclear,
      data: dataSets.nuclearData,
      stack: 'renewable'
    }, {
      label: 'Coal',
      backgroundColor: colors.coal,
      data: dataSets.coalData,
      stack: 'fossil'
    }, {
      label: 'Gas',
      backgroundColor: colors.gas,
      data: dataSets.gasData,
      stack: 'fossil'
    }]
  },
  options: {
    title: {
      display: true,
      text: 'Energy Production by Sector'
    },
    tooltips: {
      displayColors: true,
      callbacks: {
        mode: 'x'
      }
    },
    scales: {
      xAxes: [{
        stacked: true,
        gridLines: {
          display: false
        }
      }],
      yAxes: [{
        stacked: true,
        ticks: {
          beginAtZero: true
        },
        type: 'linear'
      }]
    },
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      position: 'bottom'
    }
  }
});
},{}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "59795" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/main.js"], null)
//# sourceMappingURL=/main.fb6bbcaf.js.map