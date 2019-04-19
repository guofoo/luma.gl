import Resource from './resource';
import Texture from './texture';
import Framebuffer from './framebuffer';
import { parseUniformName, getUniformSetter } from './uniforms';
import { VertexShader, FragmentShader } from './shader';
import ProgramConfiguration from './program-configuration';
import { checkUniformValues, areUniformsEqual, getUniformCopy } from './uniforms';
import { withParameters } from '../context';
import { assertWebGL2Context, isWebGL2, getKey } from '../webgl-utils';
import { getPrimitiveDrawMode } from '../webgl-utils/attribute-utils';
import { log, uid, assert } from '../utils';
const LOG_PROGRAM_PERF_PRIORITY = 4;
const GL_SEPARATE_ATTRIBS = 0x8c8d;
const V6_DEPRECATED_METHODS = ['setVertexArray', 'setAttributes', 'setBuffers', 'unsetBuffers', 'use', 'getUniformCount', 'getUniformInfo', 'getUniformLocation', 'getUniformValue', 'getVarying', 'getFragDataLocation', 'getAttachedShaders', 'getAttributeCount', 'getAttributeLocation', 'getAttributeInfo'];
export default class Program extends Resource {
  constructor(gl) {
    let props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    super(gl, props);
    this.stubRemovedMethods('Program', 'v6.0', V6_DEPRECATED_METHODS);
    this._isCached = false;
    this.initialize(props);
    Object.seal(this);

    this._setId(props.id);
  }

  initialize() {
    let props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    const vs = props.vs,
          fs = props.fs,
          varyings = props.varyings,
          _props$bufferMode = props.bufferMode,
          bufferMode = _props$bufferMode === void 0 ? GL_SEPARATE_ATTRIBS : _props$bufferMode;
    this.vs = typeof vs === 'string' ? new VertexShader(this.gl, {
      id: "".concat(props.id, "-vs"),
      source: vs
    }) : vs;
    this.fs = typeof fs === 'string' ? new FragmentShader(this.gl, {
      id: "".concat(props.id, "-fs"),
      source: fs
    }) : fs;
    assert(this.vs instanceof VertexShader);
    assert(this.fs instanceof FragmentShader);
    this.uniforms = {};

    if (varyings) {
      assertWebGL2Context(this.gl);
      this.varyings = varyings;
      this.gl.transformFeedbackVaryings(this.handle, varyings, bufferMode);
    }

    this._compileAndLink();

    this._readUniformLocationsFromLinkedProgram();

    this.configuration = new ProgramConfiguration(this);
    return this.setProps(props);
  }

  delete() {
    let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    if (this._isCached) {
      return this;
    }

    return super.delete(options);
  }

  setProps(props) {
    if ('uniforms' in props) {
      this.setUniforms(props.uniforms);
    }

    return this;
  }

  draw(_ref) {
    let logPriority = _ref.logPriority,
        _ref$drawMode = _ref.drawMode,
        drawMode = _ref$drawMode === void 0 ? 4 : _ref$drawMode,
        vertexCount = _ref.vertexCount,
        _ref$offset = _ref.offset,
        offset = _ref$offset === void 0 ? 0 : _ref$offset,
        start = _ref.start,
        end = _ref.end,
        _ref$isIndexed = _ref.isIndexed,
        isIndexed = _ref$isIndexed === void 0 ? false : _ref$isIndexed,
        _ref$indexType = _ref.indexType,
        indexType = _ref$indexType === void 0 ? 5123 : _ref$indexType,
        _ref$isInstanced = _ref.isInstanced,
        isInstanced = _ref$isInstanced === void 0 ? false : _ref$isInstanced,
        _ref$instanceCount = _ref.instanceCount,
        instanceCount = _ref$instanceCount === void 0 ? 0 : _ref$instanceCount,
        _ref$vertexArray = _ref.vertexArray,
        vertexArray = _ref$vertexArray === void 0 ? null : _ref$vertexArray,
        transformFeedback = _ref.transformFeedback,
        framebuffer = _ref.framebuffer,
        _ref$parameters = _ref.parameters,
        parameters = _ref$parameters === void 0 ? {} : _ref$parameters,
        uniforms = _ref.uniforms,
        samplers = _ref.samplers;

    if (uniforms || samplers) {
      log.deprecated('Program.draw({uniforms})', 'Program.setUniforms(uniforms)')();
      this.setUniforms(uniforms || {});
    }

    if (logPriority !== undefined) {
      const fb = framebuffer ? framebuffer.id : 'default';
      const message = "mode=".concat(getKey(this.gl, drawMode), " verts=").concat(vertexCount, " ") + "instances=".concat(instanceCount, " indexType=").concat(getKey(this.gl, indexType), " ") + "isInstanced=".concat(isInstanced, " isIndexed=").concat(isIndexed, " ") + "Framebuffer=".concat(fb);
      log.log(logPriority, message)();
    }

    assert(vertexArray);
    this.gl.useProgram(this.handle);

    if (!this._areTexturesRenderable()) {
      return false;
    }

    vertexArray.bindForDraw(vertexCount, instanceCount, () => {
      if (framebuffer !== undefined) {
        parameters = Object.assign({}, parameters, {
          framebuffer
        });
      }

      if (transformFeedback) {
        const primitiveMode = getPrimitiveDrawMode(drawMode);
        transformFeedback.begin(primitiveMode);
      }

      this._bindTextures();

      withParameters(this.gl, parameters, () => {
        if (isIndexed && isInstanced) {
          this.gl.drawElementsInstanced(drawMode, vertexCount, indexType, offset, instanceCount);
        } else if (isIndexed && isWebGL2(this.gl) && !isNaN(start) && !isNaN(end)) {
          this.gl.drawRangeElements(drawMode, start, end, vertexCount, indexType, offset);
        } else if (isIndexed) {
          this.gl.drawElements(drawMode, vertexCount, indexType, offset);
        } else if (isInstanced) {
          this.gl.drawArraysInstanced(drawMode, offset, vertexCount, instanceCount);
        } else {
          this.gl.drawArrays(drawMode, offset, vertexCount);
        }
      });

      if (transformFeedback) {
        transformFeedback.end();
      }
    });
    return true;
  }

  setUniforms() {
    let uniforms = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    let _onChangeCallback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : () => {};

    let somethingChanged = false;
    const changedUniforms = {};

    for (const key in uniforms) {
      if (!areUniformsEqual(this.uniforms[key], uniforms[key])) {
        somethingChanged = true;
        changedUniforms[key] = uniforms[key];
        this.uniforms[key] = getUniformCopy(uniforms[key]);
      }
    }

    if (somethingChanged) {
      _onChangeCallback();

      checkUniformValues(changedUniforms, this.id, this._uniformSetters);

      this._setUniforms(changedUniforms);
    }

    return this;
  }

  reset() {}

  _areTexturesRenderable() {
    let texturesRenderable = true;

    for (const uniformName in this.uniforms) {
      const uniformSetter = this._uniformSetters[uniformName];

      if (uniformSetter && uniformSetter.textureIndex !== undefined) {
        let uniform = this.uniforms[uniformName];

        if (uniform instanceof Framebuffer) {
          const framebuffer = uniform;
          uniform = framebuffer.texture;
        }

        if (uniform instanceof Texture) {
          const texture = uniform;
          texturesRenderable = texturesRenderable && texture.loaded;
        }
      }
    }

    return texturesRenderable;
  }

  _bindTextures() {
    for (const uniformName in this.uniforms) {
      const uniformSetter = this._uniformSetters[uniformName];

      if (uniformSetter && uniformSetter.textureIndex !== undefined) {
        let uniform = this.uniforms[uniformName];

        if (uniform instanceof Framebuffer) {
          uniform = uniform.texture;
        }

        if (uniform instanceof Texture) {
          const texture = uniform;
          texture.bind(uniformSetter.textureIndex);
        }
      }
    }
  }

  _setUniforms(uniforms) {
    this.gl.useProgram(this.handle);

    for (const uniformName in uniforms) {
      let uniform = uniforms[uniformName];
      const uniformSetter = this._uniformSetters[uniformName];

      if (uniformSetter) {
        if (uniform instanceof Framebuffer) {
          uniform = uniform.texture;
        }

        if (uniform instanceof Texture) {
          if (uniformSetter.textureIndex === undefined) {
            uniformSetter.textureIndex = this._textureIndexCounter++;
          }

          const texture = uniform;
          const textureIndex = uniformSetter.textureIndex;
          texture.bind(textureIndex);
          uniformSetter(textureIndex);
        } else {
          uniformSetter(uniform);
        }
      }
    }

    return this;
  }

  _createHandle() {
    return this.gl.createProgram();
  }

  _deleteHandle() {
    this.gl.deleteProgram(this.handle);
  }

  _getOptionsFromHandle(handle) {
    const shaderHandles = this.gl.getAttachedShaders(handle);
    const opts = {};

    for (const shaderHandle of shaderHandles) {
      const type = this.gl.getShaderParameter(this.handle, 35663);

      switch (type) {
        case 35633:
          opts.vs = new VertexShader({
            handle: shaderHandle
          });
          break;

        case 35632:
          opts.fs = new FragmentShader({
            handle: shaderHandle
          });
          break;

        default:
      }
    }

    return opts;
  }

  _getParameter(pname) {
    return this.gl.getProgramParameter(this.handle, pname);
  }

  _setId(id) {
    if (!id) {
      const programName = this._getName();

      this.id = uid(programName);
    }
  }

  _getName() {
    let programName = this.vs.getName() || this.fs.getName();
    programName = programName.replace(/shader/i, '');
    programName = programName ? "".concat(programName, "-program") : 'program';
    return programName;
  }

  _compileAndLink() {
    const gl = this.gl;
    gl.attachShader(this.handle, this.vs.handle);
    gl.attachShader(this.handle, this.fs.handle);
    log.time(LOG_PROGRAM_PERF_PRIORITY, "linkProgram for ".concat(this._getName()))();
    gl.linkProgram(this.handle);
    log.timeEnd(LOG_PROGRAM_PERF_PRIORITY, "linkProgram for ".concat(this._getName()))();

    if (gl.debug || log.priority > 0) {
      gl.validateProgram(this.handle);
      const linked = gl.getProgramParameter(this.handle, 35714);

      if (!linked) {
        throw new Error("Error linking: ".concat(gl.getProgramInfoLog(this.handle)));
      }
    }
  }

  _readUniformLocationsFromLinkedProgram() {
    const gl = this.gl;
    this._uniformSetters = {};
    this._uniformCount = this._getParameter(35718);

    for (let i = 0; i < this._uniformCount; i++) {
      const info = this.gl.getActiveUniform(this.handle, i);

      const _parseUniformName = parseUniformName(info.name),
            name = _parseUniformName.name,
            isArray = _parseUniformName.isArray;

      const location = gl.getUniformLocation(this.handle, name);
      this._uniformSetters[name] = getUniformSetter(gl, location, info, isArray);
    }

    this._textureIndexCounter = 0;
  }

  getActiveUniforms(uniformIndices, pname) {
    return this.gl.getActiveUniforms(this.handle, uniformIndices, pname);
  }

  getUniformBlockIndex(blockName) {
    return this.gl.getUniformBlockIndex(this.handle, blockName);
  }

  getActiveUniformBlockParameter(blockIndex, pname) {
    return this.gl.getActiveUniformBlockParameter(this.handle, blockIndex, pname);
  }

  uniformBlockBinding(blockIndex, blockBinding) {
    this.gl.uniformBlockBinding(this.handle, blockIndex, blockBinding);
  }

}
//# sourceMappingURL=program.js.map