import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import transpileShader from './transpile-shader';
import { assert } from '../utils';
var VERTEX_SHADER = 'vs';
var FRAGMENT_SHADER = 'fs';

var ShaderModule = function () {
  function ShaderModule(_ref) {
    var name = _ref.name,
        vs = _ref.vs,
        fs = _ref.fs,
        _ref$dependencies = _ref.dependencies,
        dependencies = _ref$dependencies === void 0 ? [] : _ref$dependencies,
        _ref$getUniforms = _ref.getUniforms,
        getUniforms = _ref$getUniforms === void 0 ? function () {
      return {};
    } : _ref$getUniforms,
        _ref$deprecations = _ref.deprecations,
        deprecations = _ref$deprecations === void 0 ? [] : _ref$deprecations,
        _ref$defines = _ref.defines,
        defines = _ref$defines === void 0 ? {} : _ref$defines,
        vertexShader = _ref.vertexShader,
        fragmentShader = _ref.fragmentShader;

    _classCallCheck(this, ShaderModule);

    assert(typeof name === 'string');
    this.name = name;
    this.vs = vs || vertexShader;
    this.fs = fs || fragmentShader;
    this.getModuleUniforms = getUniforms;
    this.dependencies = dependencies;
    this.deprecations = this._parseDeprecationDefinitions(deprecations);
    this.defines = defines;
  }

  _createClass(ShaderModule, [{
    key: "getModuleSource",
    value: function getModuleSource(type, targetGLSLVersion) {
      var moduleSource;

      switch (type) {
        case VERTEX_SHADER:
          moduleSource = transpileShader(this.vs || '', targetGLSLVersion, true);
          break;

        case FRAGMENT_SHADER:
          moduleSource = transpileShader(this.fs || '', targetGLSLVersion, false);
          break;

        default:
          assert(false);
      }

      if (typeof moduleSource !== 'string') {
        return '';
      }

      return "#define MODULE_".concat(this.name.toUpperCase(), "\n").concat(moduleSource, "// END MODULE_").concat(this.name, "\n\n");
    }
  }, {
    key: "getUniforms",
    value: function getUniforms(opts, uniforms) {
      return this.getModuleUniforms(opts, uniforms);
    }
  }, {
    key: "getDefines",
    value: function getDefines() {
      return this.defines;
    }
  }, {
    key: "checkDeprecations",
    value: function checkDeprecations(shaderSource, log) {
      this.deprecations.forEach(function (def) {
        if (def.regex.test(shaderSource)) {
          if (def.deprecated && log) {
            log.deprecated(def.old, def["new"])();
          } else if (log) {
            log.removed(def.old, def["new"])();
          }
        }
      });
    }
  }, {
    key: "_parseDeprecationDefinitions",
    value: function _parseDeprecationDefinitions() {
      var deprecations = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      deprecations.forEach(function (def) {
        switch (def.type) {
          case 'function':
            def.regex = new RegExp("\\b".concat(def.old, "\\("));
            break;

          default:
            def.regex = new RegExp("".concat(def.type, " ").concat(def.old, ";"));
        }
      });
      return deprecations;
    }
  }]);

  return ShaderModule;
}();

export { ShaderModule as default };
//# sourceMappingURL=shader-module.js.map