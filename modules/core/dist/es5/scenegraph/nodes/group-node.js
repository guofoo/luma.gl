"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/get"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _math = require("math.gl");

var _utils = require("../../utils");

var _scenegraphNode = _interopRequireDefault(require("./scenegraph-node"));

var GroupNode = function (_ScenegraphNode) {
  (0, _inherits2["default"])(GroupNode, _ScenegraphNode);

  function GroupNode() {
    var _this;

    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck2["default"])(this, GroupNode);
    props = Array.isArray(props) ? {
      children: props
    } : props;
    var _props = props,
        _props$children = _props.children,
        children = _props$children === void 0 ? [] : _props$children;
    children.every(function (child) {
      return (0, _utils.assert)(child instanceof _scenegraphNode["default"]);
    });
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(GroupNode).call(this, props));
    _this.children = children;
    return _this;
  }

  (0, _createClass2["default"])(GroupNode, [{
    key: "add",
    value: function add() {
      for (var _len = arguments.length, children = new Array(_len), _key = 0; _key < _len; _key++) {
        children[_key] = arguments[_key];
      }

      for (var _i = 0, _children = children; _i < _children.length; _i++) {
        var child = _children[_i];

        if (Array.isArray(child)) {
          this.add.apply(this, (0, _toConsumableArray2["default"])(child));
        } else {
          this.children.push(child);
        }
      }

      return this;
    }
  }, {
    key: "remove",
    value: function remove(child) {
      var children = this.children;
      var indexOf = children.indexOf(child);

      if (indexOf > -1) {
        children.splice(indexOf, 1);
      }

      return this;
    }
  }, {
    key: "removeAll",
    value: function removeAll() {
      this.children = [];
      return this;
    }
  }, {
    key: "delete",
    value: function _delete() {
      this.children.forEach(function (child) {
        return child["delete"]();
      });
      this.removeAll();
      (0, _get2["default"])((0, _getPrototypeOf2["default"])(GroupNode.prototype), "delete", this).call(this);
    }
  }, {
    key: "traverse",
    value: function traverse(visitor) {
      var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          _ref$worldMatrix = _ref.worldMatrix,
          worldMatrix = _ref$worldMatrix === void 0 ? new _math.Matrix4() : _ref$worldMatrix;

      var modelMatrix = new _math.Matrix4(worldMatrix).multiplyRight(this.matrix);
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var child = _step.value;

          if (child instanceof GroupNode) {
            child.traverse(visitor, {
              worldMatrix: modelMatrix
            });
          } else {
            visitor(child, {
              worldMatrix: modelMatrix
            });
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }, {
    key: "traverseReverse",
    value: function traverseReverse(visitor, opts) {
      _utils.log.warn('traverseReverse is not reverse')();

      return this.traverse(visitor, opts);
    }
  }]);
  return GroupNode;
}(_scenegraphNode["default"]);

exports["default"] = GroupNode;
//# sourceMappingURL=group-node.js.map