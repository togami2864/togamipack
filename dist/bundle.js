
  (function(modules){
    function require(id){
      const [fn,mapping] = modules[id]
      function localRequire(relativePath){
        return require(mapping[relativePath])
      }
      const module = {exports:{}};
      fn(localRequire,module,module.exports);
      return module.exports;
    }
    require(0)
  })({0:[
      function(require,module,exports){
        "use strict";

var _add = require("./add");

console.log("Hello");
console.log((0, _add.add)(1, 1));
      },
      {"./add":1},
    ],1:[
      function(require,module,exports){
        "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.add = void 0;

var add = function add(x, y) {
  return x + y;
};

exports.add = add;
      },
      {},
    ],})
  