"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.ATTRIBUTE_COMPONENT_TYPE_TO_ARRAY = exports.ATTRIBUTE_TYPE_TO_COMPONENTS = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _core = require("@luma.gl/core");

var _math = require("math.gl");

var ATTRIBUTE_TYPE_TO_COMPONENTS = {
  SCALAR: 1,
  VEC2: 2,
  VEC3: 3,
  VEC4: 4,
  MAT2: 4,
  MAT3: 9,
  MAT4: 16
};
exports.ATTRIBUTE_TYPE_TO_COMPONENTS = ATTRIBUTE_TYPE_TO_COMPONENTS;
var ATTRIBUTE_COMPONENT_TYPE_TO_ARRAY = {
  5120: Int8Array,
  5121: Uint8Array,
  5122: Int16Array,
  5123: Uint16Array,
  5125: Uint32Array,
  5126: Float32Array
};
exports.ATTRIBUTE_COMPONENT_TYPE_TO_ARRAY = ATTRIBUTE_COMPONENT_TYPE_TO_ARRAY;

function accessorToJsArray(accessor) {
  if (!accessor._animation) {
    var ArrayType = ATTRIBUTE_COMPONENT_TYPE_TO_ARRAY[accessor.componentType];
    var components = ATTRIBUTE_TYPE_TO_COMPONENTS[accessor.type];
    var length = components * accessor.count;
    var _accessor$bufferView$ = accessor.bufferView.data,
        buffer = _accessor$bufferView$.buffer,
        byteOffset = _accessor$bufferView$.byteOffset;
    var array = new ArrayType(buffer, byteOffset + (accessor.byteOffset || 0), length);

    if (components === 1) {
      accessor._animation = Array.from(array);
    } else {
      var slicedArray = [];

      for (var i = 0; i < array.length; i += components) {
        slicedArray.push(Array.from(array.slice(i, i + components)));
      }

      accessor._animation = slicedArray;
    }
  }

  return accessor._animation;
}

var helperMatrix = new _math.Matrix4();

function applyTranslationRotationScale(gltfNode, node) {
  node.matrix.identity();

  if (gltfNode.translation) {
    node.matrix.translate(gltfNode.translation);
  }

  if (gltfNode.rotation) {
    var rotationMatrix = helperMatrix.fromQuaternion(gltfNode.rotation);
    node.matrix.multiplyRight(rotationMatrix);
  }

  if (gltfNode.scale) {
    node.matrix.scale(gltfNode.scale);
  }
}

var quaternion = new _math.Quaternion();

function linearInterpolate(target, path, start, stop, ratio) {
  if (path === 'rotation') {
    quaternion.slerp({
      start: start,
      target: stop,
      ratio: ratio
    });

    for (var i = 0; i < quaternion.length; i++) {
      target[path][i] = quaternion[i];
    }
  } else {
    for (var _i = 0; _i < start.length; _i++) {
      target[path][_i] = ratio * stop[_i] + (1 - ratio) * start[_i];
    }
  }
}

function cubicsplineInterpolate(target, path, _ref) {
  var p0 = _ref.p0,
      outTangent0 = _ref.outTangent0,
      inTangent1 = _ref.inTangent1,
      p1 = _ref.p1,
      tDiff = _ref.tDiff,
      t = _ref.ratio;

  for (var i = 0; i < target[path].length; i++) {
    var m0 = outTangent0[i] * tDiff;
    var m1 = inTangent1[i] * tDiff;
    target[path][i] = (2 * Math.pow(t, 3) - 3 * Math.pow(t, 2) + 1) * p0[i] + (Math.pow(t, 3) - 2 * Math.pow(t, 2) + t) * m0 + (-2 * Math.pow(t, 3) + 3 * Math.pow(t, 2)) * p1[i] + (Math.pow(t, 3) - Math.pow(t, 2)) * m1;
  }
}

function stepInterpolate(target, path, value) {
  for (var i = 0; i < value.length; i++) {
    target[path][i] = value[i];
  }
}

function interpolate(time, _ref2, target, path) {
  var input = _ref2.input,
      interpolation = _ref2.interpolation,
      output = _ref2.output;
  var maxTime = input[input.length - 1];
  var animationTime = time % maxTime;
  var nextIndex = input.findIndex(function (t) {
    return t >= animationTime;
  });
  var previousIndex = Math.max(0, nextIndex - 1);

  if (!Array.isArray(target[path])) {
    switch (path) {
      case 'translation':
        target[path] = [0, 0, 0];
        break;

      case 'rotation':
        target[path] = [0, 0, 0, 1];
        break;

      case 'scale':
        target[path] = [1, 1, 1];
        break;

      default:
        _core.log.warn("Bad animation path ".concat(path))();

    }
  }

  (0, _core.assert)(target[path].length === output[previousIndex].length);
  var previousTime = input[previousIndex];
  var nextTime = input[nextIndex];

  switch (interpolation) {
    case 'STEP':
      stepInterpolate(target, path, output[previousIndex]);
      break;

    case 'LINEAR':
      if (nextTime > previousTime) {
        var ratio = (animationTime - previousTime) / (nextTime - previousTime);
        linearInterpolate(target, path, output[previousIndex], output[nextIndex], ratio);
      }

      break;

    case 'CUBICSPLINE':
      if (nextTime > previousTime) {
        var _ratio = (animationTime - previousTime) / (nextTime - previousTime);

        var tDiff = nextTime - previousTime;
        var p0 = output[3 * previousIndex + 1];
        var outTangent0 = output[3 * previousIndex + 2];
        var inTangent1 = output[3 * nextIndex + 0];
        var p1 = output[3 * nextIndex + 1];
        cubicsplineInterpolate(target, path, {
          p0: p0,
          outTangent0: outTangent0,
          inTangent1: inTangent1,
          p1: p1,
          tDiff: tDiff,
          ratio: _ratio
        });
      }

      break;

    default:
      _core.log.warn("Interpolation ".concat(interpolation, " not supported"))();

      break;
  }
}

var GLTFAnimation = function () {
  function GLTFAnimation(props) {
    (0, _classCallCheck2["default"])(this, GLTFAnimation);
    this.startTime = 0;
    this.playing = true;
    this.speed = 1;
    Object.assign(this, props);
  }

  (0, _createClass2["default"])(GLTFAnimation, [{
    key: "animate",
    value: function animate(timeMs) {
      if (!this.playing) {
        return;
      }

      var absTime = timeMs / 1000;
      var time = (absTime - this.startTime) * this.speed;
      this.channels.forEach(function (_ref3) {
        var sampler = _ref3.sampler,
            target = _ref3.target,
            path = _ref3.path;
        interpolate(time, sampler, target, path);
        applyTranslationRotationScale(target, target._node);
      });
    }
  }]);
  return GLTFAnimation;
}();

var GLTFAnimator = function () {
  function GLTFAnimator(gltf) {
    (0, _classCallCheck2["default"])(this, GLTFAnimator);
    this.animations = gltf.animations.map(function (animation, index) {
      var name = animation.name || "Animation-".concat(index);
      var samplers = animation.samplers.map(function (_ref4) {
        var input = _ref4.input,
            _ref4$interpolation = _ref4.interpolation,
            interpolation = _ref4$interpolation === void 0 ? 'LINEAR' : _ref4$interpolation,
            output = _ref4.output;
        return {
          input: accessorToJsArray(gltf.accessors[input]),
          interpolation: interpolation,
          output: accessorToJsArray(gltf.accessors[output])
        };
      });
      var channels = animation.channels.map(function (_ref5) {
        var sampler = _ref5.sampler,
            target = _ref5.target;
        return {
          sampler: samplers[sampler],
          target: gltf.nodes[target.node],
          path: target.path
        };
      });
      return new GLTFAnimation({
        name: name,
        channels: channels
      });
    });
  }

  (0, _createClass2["default"])(GLTFAnimator, [{
    key: "animate",
    value: function animate(timeMs) {
      this.animations.forEach(function (animation) {
        return animation.animate(timeMs);
      });
    }
  }, {
    key: "getAnimations",
    value: function getAnimations() {
      return this.animations;
    }
  }]);
  return GLTFAnimator;
}();

exports["default"] = GLTFAnimator;
//# sourceMappingURL=gltf-animator.js.map