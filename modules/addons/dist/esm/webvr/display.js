import _objectSpread from "@babel/runtime/helpers/esm/objectSpread";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import { withParameters } from '@luma.gl/core';

var Display = function () {
  function Display() {
    _classCallCheck(this, Display);
  }

  _createClass(Display, [{
    key: "getViews",
    value: function getViews(options) {
      var width = options.width,
          height = options.height;
      return [{
        params: {
          viewport: [0, 0, width, height],
          scissor: [0, 0, width, height],
          scissorTest: true
        }
      }];
    }
  }, {
    key: "submitFrame",
    value: function submitFrame() {
      return true;
    }
  }, {
    key: "requestAnimationFrame",
    value: function requestAnimationFrame(renderFrame) {
      return false;
    }
  }, {
    key: "delete",
    value: function _delete() {}
  }, {
    key: "_renderFrame",
    value: function _renderFrame(options) {
      var _this = this;

      var views = this.getViews(options);

      if (!views) {
        return false;
      }

      var gl = this.animationLoop.gl;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        var _loop = function _loop() {
          var view = _step.value;
          withParameters(gl, view.params, function () {
            return _this.animationLoop.onRender(_objectSpread({}, options, view));
          });
        };

        for (var _iterator = views[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          _loop();
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

      this.submitFrame();
      return true;
    }
  }]);

  return Display;
}();

export { Display as default };
//# sourceMappingURL=display.js.map