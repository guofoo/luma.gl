import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import { isWebGL2 } from '../webgl-utils';
import WEBGL_LIMITS from './webgl-limits-table';
import { getContextDebugInfo } from '../debug/get-context-debug-info';
export function getContextLimits(gl) {
  gl.luma = gl.luma || {};

  if (!gl.luma.limits) {
    gl.luma.limits = {};
    gl.luma.webgl1MinLimits = {};
    gl.luma.webgl2MinLimits = {};
    var isWebgl2 = isWebGL2(gl);

    for (var parameter in WEBGL_LIMITS) {
      var limit = WEBGL_LIMITS[parameter];
      var webgl1MinLimit = limit.gl1;
      var webgl2MinLimit = 'gl2' in limit ? limit.gl2 : limit.gl1;
      var minLimit = isWebgl2 ? webgl2MinLimit : webgl1MinLimit;
      var limitNotAvailable = 'gl2' in limit && !isWebgl2 || 'extension' in limit && !gl.getExtension(limit.extension);
      var value = limitNotAvailable ? minLimit : gl.getParameter(parameter);
      gl.luma.limits[parameter] = value;
      gl.luma.webgl1MinLimits[parameter] = webgl1MinLimit;
      gl.luma.webgl2MinLimits[parameter] = webgl2MinLimit;
    }
  }

  return gl.luma.limits;
}
export function getGLContextInfo(gl) {
  gl.luma = gl.luma || {};
  var info = getContextDebugInfo(gl);

  if (!gl.luma.info) {
    var _gl$luma$info;

    gl.luma.info = (_gl$luma$info = {}, _defineProperty(_gl$luma$info, 37445, info.vendor), _defineProperty(_gl$luma$info, 37446, info.renderer), _defineProperty(_gl$luma$info, 7936, info.vendorMasked), _defineProperty(_gl$luma$info, 7937, info.rendererMasked), _defineProperty(_gl$luma$info, 7938, info.version), _defineProperty(_gl$luma$info, 35724, info.shadingLanguageVersion), _gl$luma$info);
  }

  return gl.luma.info;
}
export function getContextInfo(gl) {
  return Object.assign(getContextDebugInfo(gl), {
    limits: getContextLimits(gl),
    info: getGLContextInfo(gl),
    webgl1MinLimits: gl.luma.webgl1MinLimits,
    webgl2MinLimits: gl.luma.webgl2MinLimits
  });
}
//# sourceMappingURL=limits.js.map