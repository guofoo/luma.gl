import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import { assert } from '../utils';
var FS100 = 'void main() {}';
var FS300 = "#version 300 es\n".concat(FS100);
export function getQualifierDetails(line, qualifiers) {
  qualifiers = Array.isArray(qualifiers) ? qualifiers : [qualifiers];
  var words = line.replace(/^\s+/, '').split(/\s+/);

  var _words = _slicedToArray(words, 3),
      qualifier = _words[0],
      type = _words[1],
      definition = _words[2];

  if (!qualifiers.includes(qualifier) || !type || !definition) {
    return null;
  }

  var name = definition.split(';')[0];
  return {
    qualifier: qualifier,
    type: type,
    name: name
  };
}
export function getPassthroughFS() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$version = _ref.version,
      version = _ref$version === void 0 ? 100 : _ref$version,
      input = _ref.input,
      inputType = _ref.inputType,
      output = _ref.output;

  if (!input) {
    return version === 300 ? FS300 : FS100;
  }

  var outputValue = convertToVec4(input, inputType);

  if (version === 300) {
    return "#version 300 es\nin ".concat(inputType, " ").concat(input, ";\nout vec4 ").concat(output, ";\nvoid main() {\n  ").concat(output, " = ").concat(outputValue, ";\n}");
  }

  return "varying ".concat(inputType, " ").concat(input, ";\nvoid main() {\n  gl_FragColor = ").concat(outputValue, ";\n}");
}
export function typeToChannelSuffix(type) {
  switch (type) {
    case 'float':
      return 'x';

    case 'vec2':
      return 'xy';

    case 'vec3':
      return 'xyz';

    case 'vec4':
      return 'xyzw';

    default:
      assert(false);
      return null;
  }
}
export function typeToChannelCount(type) {
  switch (type) {
    case 'float':
      return 1;

    case 'vec2':
      return 2;

    case 'vec3':
      return 3;

    case 'vec4':
      return 4;

    default:
      assert(false);
      return null;
  }
}
export function convertToVec4(variable, type) {
  switch (type) {
    case 'float':
      return "vec4(".concat(variable, ", 0.0, 0.0, 1.0)");

    case 'vec2':
      return "vec4(".concat(variable, ", 0.0, 1.0)");

    case 'vec3':
      return "vec4(".concat(variable, ", 1.0)");

    case 'vec4':
      return variable;

    default:
      assert(false);
      return null;
  }
}
//# sourceMappingURL=shader-utils.js.map