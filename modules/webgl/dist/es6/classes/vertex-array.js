import Accessor from './accessor';
import Buffer from './buffer';
import VertexArrayObject from './vertex-array-object';
import { log, assert, stubRemovedMethods } from '../utils';
const ERR_ATTRIBUTE_TYPE = 'VertexArray: attributes must be Buffers or constants (i.e. typed array)';
const MULTI_LOCATION_ATTRIBUTE_REGEXP = /^(.+)__LOCATION_([0-9]+)$/;
const DEPRECATIONS_V6 = ['setBuffers', 'setGeneric', 'clearBindings', 'setLocations', 'setGenericValues', 'setDivisor', 'enable', 'disable'];
export default class VertexArray {
  constructor(gl) {
    let opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    const id = opts.id || opts.program && opts.program.id;
    this.id = id;
    this.gl = gl;
    this.configuration = null;
    this.elements = null;
    this.elementsAccessor = null;
    this.values = null;
    this.accessors = null;
    this.unused = null;
    this.drawParams = null;
    this.buffer = null;
    this.vertexArrayObject = VertexArrayObject.isSupported(gl) ? new VertexArrayObject(gl) : VertexArrayObject.getDefaultArray(gl);
    stubRemovedMethods(this, 'VertexArray', 'v6.0', DEPRECATIONS_V6);
    this.initialize(opts);
    Object.seal(this);
  }

  delete() {
    if (this.buffer) {
      this.buffer.delete();
    }
  }

  initialize() {
    let props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    this.reset();
    this.configuration = null;
    this.bindOnUse = false;
    return this.setProps(props);
  }

  reset() {
    this.elements = null;
    this.elementsAccessor = null;
    const MAX_ATTRIBUTES = this.vertexArrayObject.MAX_ATTRIBUTES;
    this.values = new Array(MAX_ATTRIBUTES).fill(null);
    this.accessors = new Array(MAX_ATTRIBUTES).fill(null);
    this.unused = {};
    this.drawParams = null;
    return this;
  }

  setProps(props) {
    if ('program' in props) {
      this.configuration = props.program && props.program.configuration;
    }

    if ('configuration' in props) {
      this.configuration = props.configuration;
    }

    if ('attributes' in props) {
      this.setAttributes(props.attributes);
    }

    if ('elements' in props) {
      this.setElementBuffer(props.elements);
    }

    if ('bindOnUse' in props) {
      props = props.bindOnUse;
    }

    return this;
  }

  clearDrawParams() {
    this.drawParams = null;
  }

  getDrawParams(appParameters) {
    this.drawParams = this.drawParams || this._updateDrawParams();
    return Object.assign({}, this.drawParams, appParameters);
  }

  setAttributes(attributes) {
    this.vertexArrayObject.bind(() => {
      for (const locationOrName in attributes) {
        const value = attributes[locationOrName];

        this._setAttribute(locationOrName, value);
      }

      this.gl.bindBuffer(34962, null);
    });
    return this;
  }

  setElementBuffer() {
    let elementBuffer = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    let accessor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    this.elements = elementBuffer;
    this.elementsAccessor = accessor;
    this.clearDrawParams();

    if (!this.vertexArrayObject.isDefaultArray) {
      this.vertexArrayObject.setElementBuffer(elementBuffer, accessor);
    }

    return this;
  }

  setBuffer(locationOrName, buffer) {
    let appAccessor = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    if (buffer.target === 34963) {
      return this.setElementBuffer(buffer, appAccessor);
    }

    const _this$_resolveLocatio = this._resolveLocationAndAccessor(locationOrName, buffer, buffer.accessor, appAccessor),
          location = _this$_resolveLocatio.location,
          accessor = _this$_resolveLocatio.accessor;

    if (location >= 0) {
      this.values[location] = buffer;
      this.accessors[location] = accessor;
      this.clearDrawParams();

      if (!this.vertexArrayObject.isDefaultArray) {
        this.vertexArrayObject.setBuffer(location, buffer, accessor);
      }
    }

    return this;
  }

  setConstant(locationOrName, arrayValue) {
    let appAccessor = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    const _this$_resolveLocatio2 = this._resolveLocationAndAccessor(locationOrName, arrayValue, appAccessor),
          location = _this$_resolveLocatio2.location,
          accessor = _this$_resolveLocatio2.accessor;

    if (location >= 0) {
      arrayValue = this.vertexArrayObject._normalizeConstantArrayValue(arrayValue, accessor);
      this.values[location] = arrayValue;
      this.accessors[location] = accessor;
      this.clearDrawParams();

      if (!this.vertexArrayObject.isDefaultArray) {
        this.vertexArrayObject.enable(location, false);
      }
    }

    return this;
  }

  unbindBuffers() {
    this.vertexArrayObject.bind(() => {
      if (this.elements) {
        this.setElementBuffer(null);
      }

      this.buffer = this.buffer || new Buffer(this.gl, {
        size: 4
      });

      for (let location = 0; location < this.vertexArrayObject.MAX_ATTRIBUTES; location++) {
        if (this.values[location] instanceof Buffer) {
          this.gl.disableVertexAttribArray(location);
          this.gl.bindBuffer(34962, this.buffer.handle);
          this.gl.vertexAttribPointer(location, 1, 5126, false, 0, 0);
        }
      }
    });
    return this;
  }

  bindBuffers() {
    this.vertexArrayObject.bind(() => {
      if (this.elements) {
        this.setElementBuffer(this.elements);
      }

      for (let location = 0; location < this.vertexArrayObject.MAX_ATTRIBUTES; location++) {
        const buffer = this.values[location];

        if (buffer instanceof Buffer) {
          this.setBuffer(location, buffer);
        }
      }
    });
    return this;
  }

  bindForDraw(vertexCount, instanceCount, func) {
    let value;
    this.vertexArrayObject.bind(() => {
      this._setConstantAttributes(vertexCount, instanceCount);

      if (!this.vertexArrayObject.hasVertexArrays) {
        this.bindBuffers();
      }

      value = func();

      if (!this.vertexArrayObject.hasVertexArrays) {
        this.unbindBuffers();
      }
    });
    return value;
  }

  _resolveLocationAndAccessor(locationOrName, value, valueAccessor, appAccessor) {
    const _this$_getAttributeIn = this._getAttributeIndex(locationOrName),
          location = _this$_getAttributeIn.location,
          name = _this$_getAttributeIn.name;

    if (!Number.isFinite(location) || location < 0) {
      this.unused[locationOrName] = value;
      log.once(3, () => "unused value ".concat(locationOrName, " in ").concat(this.id))();
      return this;
    }

    const accessInfo = this._getAttributeInfo(name || location);

    if (!accessInfo) {
      return {
        location: -1,
        accessor: null
      };
    }

    const accessor = Accessor.resolve(accessInfo.accessor, valueAccessor, appAccessor);
    const size = accessor.size,
          type = accessor.type;
    assert(Number.isFinite(size) && Number.isFinite(type));
    return {
      location,
      accessor
    };
  }

  _getAttributeInfo(attributeName) {
    return this.configuration && this.configuration.getAttributeInfo(attributeName);
  }

  _getAttributeIndex(locationOrName) {
    const location = Number(locationOrName);

    if (Number.isFinite(location)) {
      return {
        location
      };
    }

    const multiLocation = MULTI_LOCATION_ATTRIBUTE_REGEXP.exec(locationOrName);
    const name = multiLocation ? multiLocation[1] : locationOrName;
    const locationOffset = multiLocation ? Number(multiLocation[2]) : 0;

    if (this.configuration) {
      return {
        location: this.configuration.getAttributeLocation(name) + locationOffset,
        name
      };
    }

    return {
      location: -1
    };
  }

  _setAttribute(locationOrName, value) {
    if (value instanceof Buffer) {
      this.setBuffer(locationOrName, value);
    } else if (Array.isArray(value) && value.length && value[0] instanceof Buffer) {
      const buffer = value[0];
      const accessor = value[1];
      this.setBuffer(locationOrName, buffer, accessor);
    } else if (ArrayBuffer.isView(value) || Array.isArray(value)) {
      const constant = value;
      this.setConstant(locationOrName, constant);
    } else if (value.buffer instanceof Buffer) {
      const accessor = value;
      this.setBuffer(locationOrName, accessor.buffer, accessor);
    } else {
      throw new Error(ERR_ATTRIBUTE_TYPE);
    }
  }

  _setConstantAttributes(vertexCount, instanceCount) {
    const elementCount = Math.max(vertexCount | 0, instanceCount | 0);
    let constant = this.values[0];

    if (ArrayBuffer.isView(constant)) {
      this._setConstantAttributeZero(constant, elementCount);
    }

    for (let location = 1; location < this.vertexArrayObject.MAX_ATTRIBUTES; location++) {
      constant = this.values[location];

      if (ArrayBuffer.isView(constant)) {
        this._setConstantAttribute(location, constant);
      }
    }
  }

  _setConstantAttributeZero(constant, elementCount) {
    if (VertexArrayObject.isSupported(this.gl, {
      constantAttributeZero: true
    })) {
      this._setConstantAttribute(0, constant);

      return;
    }

    const buffer = this.vertexArrayObject.getConstantBuffer(elementCount, constant);
    this.vertexArrayObject.setBuffer(0, buffer, this.accessors[0]);
  }

  _setConstantAttribute(location, constant) {
    VertexArrayObject.setConstant(this.gl, location, constant);

    if (this.vertexArrayObject.isDefault) {
      this.vertexArrayObject.enable(location, false);
    }
  }

  _updateDrawParams() {
    const drawParams = {
      isIndexed: false,
      isInstanced: false,
      indexCount: Infinity,
      vertexCount: Infinity,
      instanceCount: Infinity
    };

    for (let location = 0; location < this.vertexArrayObject.MAX_ATTRIBUTES; location++) {
      this._updateDrawParamsForLocation(drawParams, location);
    }

    if (this.elements) {
      drawParams.elementCount = this.elements.getElementCount(this.elements.accessor);
      drawParams.isIndexed = true;
      drawParams.indexType = this.elementsAccessor.type || this.elements.accessor.type;
      drawParams.indexOffset = this.elementsAccessor.offset || 0;
    }

    if (drawParams.indexCount === Infinity) {
      drawParams.indexCount = 0;
    }

    if (drawParams.vertexCount === Infinity) {
      drawParams.vertexCount = 0;
    }

    if (drawParams.instanceCount === Infinity) {
      drawParams.instanceCount = 0;
    }

    return drawParams;
  }

  _updateDrawParamsForLocation(drawParams, location) {
    const value = this.values[location];
    const accessor = this.accessors[location];

    if (!value) {
      return;
    }

    const divisor = accessor.divisor;
    const isInstanced = divisor > 0;
    drawParams.isInstanced = drawParams.isInstanced || isInstanced;

    if (value instanceof Buffer) {
      const buffer = value;

      if (isInstanced) {
        const instanceCount = buffer.getVertexCount(accessor);
        drawParams.instanceCount = Math.min(drawParams.instanceCount, instanceCount);
      } else {
        const vertexCount = buffer.getVertexCount(accessor);
        drawParams.vertexCount = Math.min(drawParams.vertexCount, vertexCount);
      }
    }
  }

  setElements() {
    let elementBuffer = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    let accessor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    log.deprecated('setElements', 'setElementBuffer')();
    return this.setElementBuffer(elementBuffer, accessor);
  }

}
//# sourceMappingURL=vertex-array.js.map