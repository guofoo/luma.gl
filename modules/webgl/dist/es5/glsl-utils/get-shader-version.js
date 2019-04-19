"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getShaderVersion;

function getShaderVersion(source) {
  var version = 100;
  var words = source.match(/[^\s]+/g);

  if (words.length >= 2 && words[0] === '#version') {
    var v = parseInt(words[1], 10);

    if (Number.isFinite(v)) {
      version = v;
    }
  }

  return version;
}
//# sourceMappingURL=get-shader-version.js.map