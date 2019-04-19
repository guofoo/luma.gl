"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clear = clear;
exports.clearBuffer = clearBuffer;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _context = require("../context");

var _webglUtils = require("../webgl-utils");

var _utils = require("../utils");

var GL_DEPTH_BUFFER_BIT = 0x00000100;
var GL_STENCIL_BUFFER_BIT = 0x00000400;
var GL_COLOR_BUFFER_BIT = 0x00004000;
var GL_COLOR = 0x1800;
var GL_DEPTH = 0x1801;
var GL_STENCIL = 0x1802;
var GL_DEPTH_STENCIL = 0x84f9;
var ERR_ARGUMENTS = 'clear: bad arguments';

function clear(gl) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$framebuffer = _ref.framebuffer,
      framebuffer = _ref$framebuffer === void 0 ? null : _ref$framebuffer,
      _ref$color = _ref.color,
      color = _ref$color === void 0 ? null : _ref$color,
      _ref$depth = _ref.depth,
      depth = _ref$depth === void 0 ? null : _ref$depth,
      _ref$stencil = _ref.stencil,
      stencil = _ref$stencil === void 0 ? null : _ref$stencil;

  var parameters = {};

  if (framebuffer) {
    parameters.framebuffer = framebuffer;
  }

  var clearFlags = 0;

  if (color) {
    clearFlags |= GL_COLOR_BUFFER_BIT;

    if (color !== true) {
      parameters.clearColor = color;
    }
  }

  if (depth) {
    clearFlags |= GL_DEPTH_BUFFER_BIT;

    if (depth !== true) {
      parameters.clearDepth = depth;
    }
  }

  if (stencil) {
    clearFlags |= GL_STENCIL_BUFFER_BIT;

    if (depth !== true) {
      parameters.clearStencil = depth;
    }
  }

  (0, _utils.assert)(clearFlags !== 0, ERR_ARGUMENTS);
  (0, _context.withParameters)(gl, parameters, function () {
    gl.clear(clearFlags);
  });
}

function clearBuffer(gl) {
  var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref2$framebuffer = _ref2.framebuffer,
      framebuffer = _ref2$framebuffer === void 0 ? null : _ref2$framebuffer,
      _ref2$buffer = _ref2.buffer,
      buffer = _ref2$buffer === void 0 ? GL_COLOR : _ref2$buffer,
      _ref2$drawBuffer = _ref2.drawBuffer,
      drawBuffer = _ref2$drawBuffer === void 0 ? 0 : _ref2$drawBuffer,
      _ref2$value = _ref2.value,
      value = _ref2$value === void 0 ? [0, 0, 0, 0] : _ref2$value;

  (0, _webglUtils.assertWebGL2Context)(gl);
  (0, _context.withParameters)(gl, {
    framebuffer: framebuffer
  }, function () {
    switch (buffer) {
      case GL_COLOR:
        switch (value.constructor) {
          case Int32Array:
            gl.clearBufferiv(buffer, drawBuffer, value);
            break;

          case Uint32Array:
            gl.clearBufferuiv(buffer, drawBuffer, value);
            break;

          case Float32Array:
          default:
            gl.clearBufferfv(buffer, drawBuffer, value);
        }

        break;

      case GL_DEPTH:
        gl.clearBufferfv(GL_DEPTH, 0, [value]);
        break;

      case GL_STENCIL:
        gl.clearBufferiv(GL_STENCIL, 0, [value]);
        break;

      case GL_DEPTH_STENCIL:
        var _value = (0, _slicedToArray2["default"])(value, 2),
            depth = _value[0],
            stencil = _value[1];

        gl.clearBufferfi(GL_DEPTH_STENCIL, 0, depth, stencil);
        break;

      default:
        (0, _utils.assert)(false, ERR_ARGUMENTS);
    }
  });
}
//# sourceMappingURL=clear.js.map