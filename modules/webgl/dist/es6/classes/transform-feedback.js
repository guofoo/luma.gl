import Resource from './resource';
import Buffer from './buffer';
import { isWebGL2, assertWebGL2Context } from '../webgl-utils';
import { log, isObjectEmpty } from '../utils';
export default class TransformFeedback extends Resource {
  static isSupported(gl) {
    return isWebGL2(gl);
  }

  constructor(gl) {
    let props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    assertWebGL2Context(gl);
    super(gl, props);
    this.initialize(props);
    this.stubRemovedMethods('TransformFeedback', 'v6.0', ['pause', 'resume']);
    Object.seal(this);
  }

  initialize() {
    let props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    this.buffers = {};
    this.unused = {};
    this.configuration = null;
    this.bindOnUse = true;

    if (!isObjectEmpty(this.buffers)) {
      this.bind(() => this._unbindBuffers());
    }

    this.setProps(props);
    return this;
  }

  setProps(props) {
    if ('program' in props) {
      this.configuration = props.program && props.program.configuration;
    }

    if ('configuration' in props) {
      this.configuration = props.configuration;
    }

    if ('bindOnUse' in props) {
      props = props.bindOnUse;
    }

    if ('buffers' in props) {
      this.setBuffers(props.buffers);
    }
  }

  setBuffers() {
    let buffers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    this.bind(() => {
      for (const bufferName in buffers) {
        this.setBuffer(bufferName, buffers[bufferName]);
      }
    });
    return this;
  }

  setBuffer(locationOrName, bufferOrParams) {
    const location = this._getVaryingIndex(locationOrName);

    const _this$_getBufferParam = this._getBufferParams(bufferOrParams),
          buffer = _this$_getBufferParam.buffer,
          byteSize = _this$_getBufferParam.byteSize,
          byteOffset = _this$_getBufferParam.byteOffset;

    if (location < 0) {
      this.unused[locationOrName] = buffer;
      log.warn(() => "".concat(this.id, " unused varying buffer ").concat(locationOrName))();
      return this;
    }

    this.buffers[location] = bufferOrParams;

    if (!this.bindOnUse) {
      this._bindBuffer(location, buffer, byteOffset, byteSize);
    }

    return this;
  }

  begin() {
    let primitiveMode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    this.gl.bindTransformFeedback(36386, this.handle);

    this._bindBuffers();

    this.gl.beginTransformFeedback(primitiveMode);
    return this;
  }

  end() {
    this.gl.endTransformFeedback();

    this._unbindBuffers();

    this.gl.bindTransformFeedback(36386, null);
    return this;
  }

  _getBufferParams(bufferOrParams) {
    let byteOffset;
    let byteSize;
    let buffer;

    if (bufferOrParams instanceof Buffer === false) {
      buffer = bufferOrParams.buffer;
      byteSize = bufferOrParams.byteSize;
      byteOffset = bufferOrParams.byteOffset;
    } else {
      buffer = bufferOrParams;
    }

    if (byteOffset !== undefined || byteSize !== undefined) {
      byteOffset = byteOffset || 0;
      byteSize = byteSize || buffer.byteLength - byteOffset;
    }

    return {
      buffer,
      byteOffset,
      byteSize
    };
  }

  _getVaryingInfo(locationOrName) {
    return this.configuration && this.configuration.getVaryingInfo(locationOrName);
  }

  _getVaryingIndex(locationOrName) {
    if (this.configuration) {
      return this.configuration.getVaryingInfo(locationOrName).location;
    }

    const location = Number(locationOrName);
    return Number.isFinite(location) ? location : -1;
  }

  _bindBuffers() {
    if (this.bindOnUse) {
      for (const bufferIndex in this.buffers) {
        const _this$_getBufferParam2 = this._getBufferParams(this.buffers[bufferIndex]),
              buffer = _this$_getBufferParam2.buffer,
              byteSize = _this$_getBufferParam2.byteSize,
              byteOffset = _this$_getBufferParam2.byteOffset;

        this._bindBuffer(bufferIndex, buffer, byteOffset, byteSize);
      }
    }
  }

  _unbindBuffers() {
    if (this.bindOnUse) {
      for (const bufferIndex in this.buffers) {
        this._bindBuffer(bufferIndex, null);
      }
    }
  }

  _bindBuffer(index, buffer) {
    let byteOffset = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    let byteSize = arguments.length > 3 ? arguments[3] : undefined;
    const handle = buffer && buffer.handle;

    if (!handle || byteSize === undefined) {
      this.gl.bindBufferBase(35982, index, handle);
    } else {
      this.gl.bindBufferRange(35982, index, handle, byteOffset, byteSize);
    }

    return this;
  }

  _createHandle() {
    return this.gl.createTransformFeedback();
  }

  _deleteHandle() {
    this.gl.deleteTransformFeedback(this.handle);
  }

  _bindHandle(handle) {
    this.gl.bindTransformFeedback(36386, this.handle);
  }

}
//# sourceMappingURL=transform-feedback.js.map