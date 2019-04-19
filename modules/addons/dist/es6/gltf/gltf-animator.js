import { assert, log } from '@luma.gl/core';
import { Matrix4, Quaternion } from 'math.gl';
export const ATTRIBUTE_TYPE_TO_COMPONENTS = {
  SCALAR: 1,
  VEC2: 2,
  VEC3: 3,
  VEC4: 4,
  MAT2: 4,
  MAT3: 9,
  MAT4: 16
};
export const ATTRIBUTE_COMPONENT_TYPE_TO_ARRAY = {
  5120: Int8Array,
  5121: Uint8Array,
  5122: Int16Array,
  5123: Uint16Array,
  5125: Uint32Array,
  5126: Float32Array
};

function accessorToJsArray(accessor) {
  if (!accessor._animation) {
    const ArrayType = ATTRIBUTE_COMPONENT_TYPE_TO_ARRAY[accessor.componentType];
    const components = ATTRIBUTE_TYPE_TO_COMPONENTS[accessor.type];
    const length = components * accessor.count;
    const _accessor$bufferView$ = accessor.bufferView.data,
          buffer = _accessor$bufferView$.buffer,
          byteOffset = _accessor$bufferView$.byteOffset;
    const array = new ArrayType(buffer, byteOffset + (accessor.byteOffset || 0), length);

    if (components === 1) {
      accessor._animation = Array.from(array);
    } else {
      const slicedArray = [];

      for (let i = 0; i < array.length; i += components) {
        slicedArray.push(Array.from(array.slice(i, i + components)));
      }

      accessor._animation = slicedArray;
    }
  }

  return accessor._animation;
}

const helperMatrix = new Matrix4();

function applyTranslationRotationScale(gltfNode, node) {
  node.matrix.identity();

  if (gltfNode.translation) {
    node.matrix.translate(gltfNode.translation);
  }

  if (gltfNode.rotation) {
    const rotationMatrix = helperMatrix.fromQuaternion(gltfNode.rotation);
    node.matrix.multiplyRight(rotationMatrix);
  }

  if (gltfNode.scale) {
    node.matrix.scale(gltfNode.scale);
  }
}

const quaternion = new Quaternion();

function linearInterpolate(target, path, start, stop, ratio) {
  if (path === 'rotation') {
    quaternion.slerp({
      start,
      target: stop,
      ratio
    });

    for (let i = 0; i < quaternion.length; i++) {
      target[path][i] = quaternion[i];
    }
  } else {
    for (let i = 0; i < start.length; i++) {
      target[path][i] = ratio * stop[i] + (1 - ratio) * start[i];
    }
  }
}

function cubicsplineInterpolate(target, path, _ref) {
  let p0 = _ref.p0,
      outTangent0 = _ref.outTangent0,
      inTangent1 = _ref.inTangent1,
      p1 = _ref.p1,
      tDiff = _ref.tDiff,
      t = _ref.ratio;

  for (let i = 0; i < target[path].length; i++) {
    const m0 = outTangent0[i] * tDiff;
    const m1 = inTangent1[i] * tDiff;
    target[path][i] = (2 * Math.pow(t, 3) - 3 * Math.pow(t, 2) + 1) * p0[i] + (Math.pow(t, 3) - 2 * Math.pow(t, 2) + t) * m0 + (-2 * Math.pow(t, 3) + 3 * Math.pow(t, 2)) * p1[i] + (Math.pow(t, 3) - Math.pow(t, 2)) * m1;
  }
}

function stepInterpolate(target, path, value) {
  for (let i = 0; i < value.length; i++) {
    target[path][i] = value[i];
  }
}

function interpolate(time, _ref2, target, path) {
  let input = _ref2.input,
      interpolation = _ref2.interpolation,
      output = _ref2.output;
  const maxTime = input[input.length - 1];
  const animationTime = time % maxTime;
  const nextIndex = input.findIndex(t => t >= animationTime);
  const previousIndex = Math.max(0, nextIndex - 1);

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
        log.warn("Bad animation path ".concat(path))();
    }
  }

  assert(target[path].length === output[previousIndex].length);
  const previousTime = input[previousIndex];
  const nextTime = input[nextIndex];

  switch (interpolation) {
    case 'STEP':
      stepInterpolate(target, path, output[previousIndex]);
      break;

    case 'LINEAR':
      if (nextTime > previousTime) {
        const ratio = (animationTime - previousTime) / (nextTime - previousTime);
        linearInterpolate(target, path, output[previousIndex], output[nextIndex], ratio);
      }

      break;

    case 'CUBICSPLINE':
      if (nextTime > previousTime) {
        const ratio = (animationTime - previousTime) / (nextTime - previousTime);
        const tDiff = nextTime - previousTime;
        const p0 = output[3 * previousIndex + 1];
        const outTangent0 = output[3 * previousIndex + 2];
        const inTangent1 = output[3 * nextIndex + 0];
        const p1 = output[3 * nextIndex + 1];
        cubicsplineInterpolate(target, path, {
          p0,
          outTangent0,
          inTangent1,
          p1,
          tDiff,
          ratio
        });
      }

      break;

    default:
      log.warn("Interpolation ".concat(interpolation, " not supported"))();
      break;
  }
}

class GLTFAnimation {
  constructor(props) {
    this.startTime = 0;
    this.playing = true;
    this.speed = 1;
    Object.assign(this, props);
  }

  animate(timeMs) {
    if (!this.playing) {
      return;
    }

    const absTime = timeMs / 1000;
    const time = (absTime - this.startTime) * this.speed;
    this.channels.forEach((_ref3) => {
      let sampler = _ref3.sampler,
          target = _ref3.target,
          path = _ref3.path;
      interpolate(time, sampler, target, path);
      applyTranslationRotationScale(target, target._node);
    });
  }

}

export default class GLTFAnimator {
  constructor(gltf) {
    this.animations = gltf.animations.map((animation, index) => {
      const name = animation.name || "Animation-".concat(index);
      const samplers = animation.samplers.map((_ref4) => {
        let input = _ref4.input,
            _ref4$interpolation = _ref4.interpolation,
            interpolation = _ref4$interpolation === void 0 ? 'LINEAR' : _ref4$interpolation,
            output = _ref4.output;
        return {
          input: accessorToJsArray(gltf.accessors[input]),
          interpolation,
          output: accessorToJsArray(gltf.accessors[output])
        };
      });
      const channels = animation.channels.map((_ref5) => {
        let sampler = _ref5.sampler,
            target = _ref5.target;
        return {
          sampler: samplers[sampler],
          target: gltf.nodes[target.node],
          path: target.path
        };
      });
      return new GLTFAnimation({
        name,
        channels
      });
    });
  }

  animate(timeMs) {
    this.animations.forEach(animation => animation.animate(timeMs));
  }

  getAnimations() {
    return this.animations;
  }

}
//# sourceMappingURL=gltf-animator.js.map