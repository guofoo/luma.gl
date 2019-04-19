(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("luma"));
	else if(typeof define === 'function' && define.amd)
		define(["luma"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("luma")) : factory(root["luma"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(window, function(__WEBPACK_EXTERNAL_MODULE__luma_gl_core__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/bundle.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../../node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "../constants/src/index.js":
/*!*********************************!*\
  !*** ../constants/src/index.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

// GL constants, copied from Mozilla documentation
// https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Constants

// Standard WebGL 1 constants
// These constants are defined on the WebGLRenderingContext interface.

/* eslint-disable key-spacing, max-len, no-inline-comments, camelcase */
// eslint-disable-next-line
module.exports = {
  // Clearing buffers
  // Constants passed to clear() to clear buffer masks.

  DEPTH_BUFFER_BIT: 0x00000100,
  STENCIL_BUFFER_BIT: 0x00000400,
  COLOR_BUFFER_BIT: 0x00004000,

  // Rendering primitives
  // Constants passed to drawElements() or drawArrays() to specify what kind of primitive to render.

  POINTS: 0x0000,
  LINES: 0x0001,
  LINE_LOOP: 0x0002,
  LINE_STRIP: 0x0003,
  TRIANGLES: 0x0004,
  TRIANGLE_STRIP: 0x0005,
  TRIANGLE_FAN: 0x0006,

  // Blending modes
  // Constants passed to blendFunc() or blendFuncSeparate() to specify the blending mode (for both, RBG and alpha, or separately).

  ZERO: 0,
  ONE: 1,
  SRC_COLOR: 0x0300,
  ONE_MINUS_SRC_COLOR: 0x0301,
  SRC_ALPHA: 0x0302,
  ONE_MINUS_SRC_ALPHA: 0x0303,
  DST_ALPHA: 0x0304,
  ONE_MINUS_DST_ALPHA: 0x0305,
  DST_COLOR: 0x0306,
  ONE_MINUS_DST_COLOR: 0x0307,
  SRC_ALPHA_SATURATE: 0x0308,
  CONSTANT_COLOR: 0x8001,
  ONE_MINUS_CONSTANT_COLOR: 0x8002,
  CONSTANT_ALPHA: 0x8003,
  ONE_MINUS_CONSTANT_ALPHA: 0x8004,

  // Blending equations
  // Constants passed to blendEquation() or blendEquationSeparate() to control
  // how the blending is calculated (for both, RBG and alpha, or separately).

  FUNC_ADD: 0x8006,
  FUNC_SUBTRACT: 0x800a,
  FUNC_REVERSE_SUBTRACT: 0x800b,

  // Getting GL parameter information
  // Constants passed to getParameter() to specify what information to return.

  BLEND_EQUATION: 0x8009,
  BLEND_EQUATION_RGB: 0x8009,
  BLEND_EQUATION_ALPHA: 0x883d,
  BLEND_DST_RGB: 0x80c8,
  BLEND_SRC_RGB: 0x80c9,
  BLEND_DST_ALPHA: 0x80ca,
  BLEND_SRC_ALPHA: 0x80cb,
  BLEND_COLOR: 0x8005,
  ARRAY_BUFFER_BINDING: 0x8894,
  ELEMENT_ARRAY_BUFFER_BINDING: 0x8895,
  LINE_WIDTH: 0x0b21,
  ALIASED_POINT_SIZE_RANGE: 0x846d,
  ALIASED_LINE_WIDTH_RANGE: 0x846e,
  CULL_FACE_MODE: 0x0b45,
  FRONT_FACE: 0x0b46,
  DEPTH_RANGE: 0x0b70,
  DEPTH_WRITEMASK: 0x0b72,
  DEPTH_CLEAR_VALUE: 0x0b73,
  DEPTH_FUNC: 0x0b74,
  STENCIL_CLEAR_VALUE: 0x0b91,
  STENCIL_FUNC: 0x0b92,
  STENCIL_FAIL: 0x0b94,
  STENCIL_PASS_DEPTH_FAIL: 0x0b95,
  STENCIL_PASS_DEPTH_PASS: 0x0b96,
  STENCIL_REF: 0x0b97,
  STENCIL_VALUE_MASK: 0x0b93,
  STENCIL_WRITEMASK: 0x0b98,
  STENCIL_BACK_FUNC: 0x8800,
  STENCIL_BACK_FAIL: 0x8801,
  STENCIL_BACK_PASS_DEPTH_FAIL: 0x8802,
  STENCIL_BACK_PASS_DEPTH_PASS: 0x8803,
  STENCIL_BACK_REF: 0x8ca3,
  STENCIL_BACK_VALUE_MASK: 0x8ca4,
  STENCIL_BACK_WRITEMASK: 0x8ca5,
  VIEWPORT: 0x0ba2,
  SCISSOR_BOX: 0x0c10,
  COLOR_CLEAR_VALUE: 0x0c22,
  COLOR_WRITEMASK: 0x0c23,
  UNPACK_ALIGNMENT: 0x0cf5,
  PACK_ALIGNMENT: 0x0d05,
  MAX_TEXTURE_SIZE: 0x0d33,
  MAX_VIEWPORT_DIMS: 0x0d3a,
  SUBPIXEL_BITS: 0x0d50,
  RED_BITS: 0x0d52,
  GREEN_BITS: 0x0d53,
  BLUE_BITS: 0x0d54,
  ALPHA_BITS: 0x0d55,
  DEPTH_BITS: 0x0d56,
  STENCIL_BITS: 0x0d57,
  POLYGON_OFFSET_UNITS: 0x2a00,
  POLYGON_OFFSET_FACTOR: 0x8038,
  TEXTURE_BINDING_2D: 0x8069,
  SAMPLE_BUFFERS: 0x80a8,
  SAMPLES: 0x80a9,
  SAMPLE_COVERAGE_VALUE: 0x80aa,
  SAMPLE_COVERAGE_INVERT: 0x80ab,
  COMPRESSED_TEXTURE_FORMATS: 0x86a3,
  VENDOR: 0x1f00,
  RENDERER: 0x1f01,
  VERSION: 0x1f02,
  IMPLEMENTATION_COLOR_READ_TYPE: 0x8b9a,
  IMPLEMENTATION_COLOR_READ_FORMAT: 0x8b9b,
  BROWSER_DEFAULT_WEBGL: 0x9244,

  // Buffers
  // Constants passed to bufferData(), bufferSubData(), bindBuffer(), or
  // getBufferParameter().

  STATIC_DRAW: 0x88e4,
  STREAM_DRAW: 0x88e0,
  DYNAMIC_DRAW: 0x88e8,
  ARRAY_BUFFER: 0x8892,
  ELEMENT_ARRAY_BUFFER: 0x8893,
  BUFFER_SIZE: 0x8764,
  BUFFER_USAGE: 0x8765,

  // Vertex attributes
  // Constants passed to getVertexAttrib().

  CURRENT_VERTEX_ATTRIB: 0x8626,
  VERTEX_ATTRIB_ARRAY_ENABLED: 0x8622,
  VERTEX_ATTRIB_ARRAY_SIZE: 0x8623,
  VERTEX_ATTRIB_ARRAY_STRIDE: 0x8624,
  VERTEX_ATTRIB_ARRAY_TYPE: 0x8625,
  VERTEX_ATTRIB_ARRAY_NORMALIZED: 0x886a,
  VERTEX_ATTRIB_ARRAY_POINTER: 0x8645,
  VERTEX_ATTRIB_ARRAY_BUFFER_BINDING: 0x889f,

  // Culling
  // Constants passed to cullFace().

  CULL_FACE: 0x0b44,
  FRONT: 0x0404,
  BACK: 0x0405,
  FRONT_AND_BACK: 0x0408,

  // Enabling and disabling
  // Constants passed to enable() or disable().

  BLEND: 0x0be2,
  DEPTH_TEST: 0x0b71,
  DITHER: 0x0bd0,
  POLYGON_OFFSET_FILL: 0x8037,
  SAMPLE_ALPHA_TO_COVERAGE: 0x809e,
  SAMPLE_COVERAGE: 0x80a0,
  SCISSOR_TEST: 0x0c11,
  STENCIL_TEST: 0x0b90,

  // Errors
  // Constants returned from getError().

  NO_ERROR: 0,
  INVALID_ENUM: 0x0500,
  INVALID_VALUE: 0x0501,
  INVALID_OPERATION: 0x0502,
  OUT_OF_MEMORY: 0x0505,
  CONTEXT_LOST_WEBGL: 0x9242,

  // Front face directions
  // Constants passed to frontFace().

  CW: 0x0900,
  CCW: 0x0901,

  // Hints
  // Constants passed to hint()

  DONT_CARE: 0x1100,
  FASTEST: 0x1101,
  NICEST: 0x1102,
  GENERATE_MIPMAP_HINT: 0x8192,

  // Data types

  BYTE: 0x1400,
  UNSIGNED_BYTE: 0x1401,
  SHORT: 0x1402,
  UNSIGNED_SHORT: 0x1403,
  INT: 0x1404,
  UNSIGNED_INT: 0x1405,
  FLOAT: 0x1406,

  // Pixel formats

  DEPTH_COMPONENT: 0x1902,
  ALPHA: 0x1906,
  RGB: 0x1907,
  RGBA: 0x1908,
  LUMINANCE: 0x1909,
  LUMINANCE_ALPHA: 0x190a,

  // Pixel types

  // UNSIGNED_BYTE: 0x1401,
  UNSIGNED_SHORT_4_4_4_4: 0x8033,
  UNSIGNED_SHORT_5_5_5_1: 0x8034,
  UNSIGNED_SHORT_5_6_5: 0x8363,

  // Shaders
  // Constants passed to createShader() or getShaderParameter()

  FRAGMENT_SHADER: 0x8b30,
  VERTEX_SHADER: 0x8b31,
  COMPILE_STATUS: 0x8b81,
  DELETE_STATUS: 0x8b80,
  LINK_STATUS: 0x8b82,
  VALIDATE_STATUS: 0x8b83,
  ATTACHED_SHADERS: 0x8b85,
  ACTIVE_ATTRIBUTES: 0x8b89,
  ACTIVE_UNIFORMS: 0x8b86,
  MAX_VERTEX_ATTRIBS: 0x8869,
  MAX_VERTEX_UNIFORM_VECTORS: 0x8dfb,
  MAX_VARYING_VECTORS: 0x8dfc,
  MAX_COMBINED_TEXTURE_IMAGE_UNITS: 0x8b4d,
  MAX_VERTEX_TEXTURE_IMAGE_UNITS: 0x8b4c,
  MAX_TEXTURE_IMAGE_UNITS: 0x8872,
  MAX_FRAGMENT_UNIFORM_VECTORS: 0x8dfd,
  SHADER_TYPE: 0x8b4f,
  SHADING_LANGUAGE_VERSION: 0x8b8c,
  CURRENT_PROGRAM: 0x8b8d,

  // Depth or stencil tests
  // Constants passed to depthFunc() or stencilFunc().

  NEVER: 0x0200,
  ALWAYS: 0x0207,
  LESS: 0x0201,
  EQUAL: 0x0202,
  LEQUAL: 0x0203,
  GREATER: 0x0204,
  GEQUAL: 0x0206,
  NOTEQUAL: 0x0205,

  // Stencil actions
  // Constants passed to stencilOp().

  KEEP: 0x1e00,
  REPLACE: 0x1e01,
  INCR: 0x1e02,
  DECR: 0x1e03,
  INVERT: 0x150a,
  INCR_WRAP: 0x8507,
  DECR_WRAP: 0x8508,

  // Textures
  // Constants passed to texParameteri(),
  // texParameterf(), bindTexture(), texImage2D(), and others.

  NEAREST: 0x2600,
  LINEAR: 0x2601,
  NEAREST_MIPMAP_NEAREST: 0x2700,
  LINEAR_MIPMAP_NEAREST: 0x2701,
  NEAREST_MIPMAP_LINEAR: 0x2702,
  LINEAR_MIPMAP_LINEAR: 0x2703,
  TEXTURE_MAG_FILTER: 0x2800,
  TEXTURE_MIN_FILTER: 0x2801,
  TEXTURE_WRAP_S: 0x2802,
  TEXTURE_WRAP_T: 0x2803,
  TEXTURE_2D: 0x0de1,
  TEXTURE: 0x1702,
  TEXTURE_CUBE_MAP: 0x8513,
  TEXTURE_BINDING_CUBE_MAP: 0x8514,
  TEXTURE_CUBE_MAP_POSITIVE_X: 0x8515,
  TEXTURE_CUBE_MAP_NEGATIVE_X: 0x8516,
  TEXTURE_CUBE_MAP_POSITIVE_Y: 0x8517,
  TEXTURE_CUBE_MAP_NEGATIVE_Y: 0x8518,
  TEXTURE_CUBE_MAP_POSITIVE_Z: 0x8519,
  TEXTURE_CUBE_MAP_NEGATIVE_Z: 0x851a,
  MAX_CUBE_MAP_TEXTURE_SIZE: 0x851c,
  // TEXTURE0 - 31 0x84C0 - 0x84DF A texture unit.
  TEXTURE0: 0x84c0,
  ACTIVE_TEXTURE: 0x84e0,
  REPEAT: 0x2901,
  CLAMP_TO_EDGE: 0x812f,
  MIRRORED_REPEAT: 0x8370,

  // Emulation
  TEXTURE_WIDTH: 0x1000,
  TEXTURE_HEIGHT: 0x1001,

  // Uniform types

  FLOAT_VEC2: 0x8b50,
  FLOAT_VEC3: 0x8b51,
  FLOAT_VEC4: 0x8b52,
  INT_VEC2: 0x8b53,
  INT_VEC3: 0x8b54,
  INT_VEC4: 0x8b55,
  BOOL: 0x8b56,
  BOOL_VEC2: 0x8b57,
  BOOL_VEC3: 0x8b58,
  BOOL_VEC4: 0x8b59,
  FLOAT_MAT2: 0x8b5a,
  FLOAT_MAT3: 0x8b5b,
  FLOAT_MAT4: 0x8b5c,
  SAMPLER_2D: 0x8b5e,
  SAMPLER_CUBE: 0x8b60,

  // Shader precision-specified types

  LOW_FLOAT: 0x8df0,
  MEDIUM_FLOAT: 0x8df1,
  HIGH_FLOAT: 0x8df2,
  LOW_INT: 0x8df3,
  MEDIUM_INT: 0x8df4,
  HIGH_INT: 0x8df5,

  // Framebuffers and renderbuffers

  FRAMEBUFFER: 0x8d40,
  RENDERBUFFER: 0x8d41,
  RGBA4: 0x8056,
  RGB5_A1: 0x8057,
  RGB565: 0x8d62,
  DEPTH_COMPONENT16: 0x81a5,
  STENCIL_INDEX: 0x1901,
  STENCIL_INDEX8: 0x8d48,
  DEPTH_STENCIL: 0x84f9,
  RENDERBUFFER_WIDTH: 0x8d42,
  RENDERBUFFER_HEIGHT: 0x8d43,
  RENDERBUFFER_INTERNAL_FORMAT: 0x8d44,
  RENDERBUFFER_RED_SIZE: 0x8d50,
  RENDERBUFFER_GREEN_SIZE: 0x8d51,
  RENDERBUFFER_BLUE_SIZE: 0x8d52,
  RENDERBUFFER_ALPHA_SIZE: 0x8d53,
  RENDERBUFFER_DEPTH_SIZE: 0x8d54,
  RENDERBUFFER_STENCIL_SIZE: 0x8d55,
  FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE: 0x8cd0,
  FRAMEBUFFER_ATTACHMENT_OBJECT_NAME: 0x8cd1,
  FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL: 0x8cd2,
  FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE: 0x8cd3,
  COLOR_ATTACHMENT0: 0x8ce0,
  DEPTH_ATTACHMENT: 0x8d00,
  STENCIL_ATTACHMENT: 0x8d20,
  DEPTH_STENCIL_ATTACHMENT: 0x821a,
  NONE: 0,
  FRAMEBUFFER_COMPLETE: 0x8cd5,
  FRAMEBUFFER_INCOMPLETE_ATTACHMENT: 0x8cd6,
  FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT: 0x8cd7,
  FRAMEBUFFER_INCOMPLETE_DIMENSIONS: 0x8cd9,
  FRAMEBUFFER_UNSUPPORTED: 0x8cdd,
  FRAMEBUFFER_BINDING: 0x8ca6,
  RENDERBUFFER_BINDING: 0x8ca7,
  READ_FRAMEBUFFER: 0x8ca8,
  DRAW_FRAMEBUFFER: 0x8ca9,
  MAX_RENDERBUFFER_SIZE: 0x84e8,
  INVALID_FRAMEBUFFER_OPERATION: 0x0506,

  // Pixel storage modes
  // Constants passed to pixelStorei().

  UNPACK_FLIP_Y_WEBGL: 0x9240,
  UNPACK_PREMULTIPLY_ALPHA_WEBGL: 0x9241,
  UNPACK_COLORSPACE_CONVERSION_WEBGL: 0x9243,

  // /////////////////////////////////////////////////////
  // Additional constants defined WebGL 2
  // These constants are defined on the WebGL2RenderingContext interface.
  // All WebGL 1 constants are also available in a WebGL 2 context.
  // /////////////////////////////////////////////////////

  // Getting GL parameter information
  // Constants passed to getParameter()
  // to specify what information to return.

  READ_BUFFER: 0x0c02,
  UNPACK_ROW_LENGTH: 0x0cf2,
  UNPACK_SKIP_ROWS: 0x0cf3,
  UNPACK_SKIP_PIXELS: 0x0cf4,
  PACK_ROW_LENGTH: 0x0d02,
  PACK_SKIP_ROWS: 0x0d03,
  PACK_SKIP_PIXELS: 0x0d04,
  TEXTURE_BINDING_3D: 0x806a,
  UNPACK_SKIP_IMAGES: 0x806d,
  UNPACK_IMAGE_HEIGHT: 0x806e,
  MAX_3D_TEXTURE_SIZE: 0x8073,
  MAX_ELEMENTS_VERTICES: 0x80e8,
  MAX_ELEMENTS_INDICES: 0x80e9,
  MAX_TEXTURE_LOD_BIAS: 0x84fd,
  MAX_FRAGMENT_UNIFORM_COMPONENTS: 0x8b49,
  MAX_VERTEX_UNIFORM_COMPONENTS: 0x8b4a,
  MAX_ARRAY_TEXTURE_LAYERS: 0x88ff,
  MIN_PROGRAM_TEXEL_OFFSET: 0x8904,
  MAX_PROGRAM_TEXEL_OFFSET: 0x8905,
  MAX_VARYING_COMPONENTS: 0x8b4b,
  FRAGMENT_SHADER_DERIVATIVE_HINT: 0x8b8b,
  RASTERIZER_DISCARD: 0x8c89,
  VERTEX_ARRAY_BINDING: 0x85b5,
  MAX_VERTEX_OUTPUT_COMPONENTS: 0x9122,
  MAX_FRAGMENT_INPUT_COMPONENTS: 0x9125,
  MAX_SERVER_WAIT_TIMEOUT: 0x9111,
  MAX_ELEMENT_INDEX: 0x8d6b,

  // Textures
  // Constants passed to texParameteri(),
  // texParameterf(), bindTexture(), texImage2D(), and others.

  RED: 0x1903,
  RGB8: 0x8051,
  RGBA8: 0x8058,
  RGB10_A2: 0x8059,
  TEXTURE_3D: 0x806f,
  TEXTURE_WRAP_R: 0x8072,
  TEXTURE_MIN_LOD: 0x813a,
  TEXTURE_MAX_LOD: 0x813b,
  TEXTURE_BASE_LEVEL: 0x813c,
  TEXTURE_MAX_LEVEL: 0x813d,
  TEXTURE_COMPARE_MODE: 0x884c,
  TEXTURE_COMPARE_FUNC: 0x884d,
  SRGB: 0x8c40,
  SRGB8: 0x8c41,
  SRGB8_ALPHA8: 0x8c43,
  COMPARE_REF_TO_TEXTURE: 0x884e,
  RGBA32F: 0x8814,
  RGB32F: 0x8815,
  RGBA16F: 0x881a,
  RGB16F: 0x881b,
  TEXTURE_2D_ARRAY: 0x8c1a,
  TEXTURE_BINDING_2D_ARRAY: 0x8c1d,
  R11F_G11F_B10F: 0x8c3a,
  RGB9_E5: 0x8c3d,
  RGBA32UI: 0x8d70,
  RGB32UI: 0x8d71,
  RGBA16UI: 0x8d76,
  RGB16UI: 0x8d77,
  RGBA8UI: 0x8d7c,
  RGB8UI: 0x8d7d,
  RGBA32I: 0x8d82,
  RGB32I: 0x8d83,
  RGBA16I: 0x8d88,
  RGB16I: 0x8d89,
  RGBA8I: 0x8d8e,
  RGB8I: 0x8d8f,
  RED_INTEGER: 0x8d94,
  RGB_INTEGER: 0x8d98,
  RGBA_INTEGER: 0x8d99,
  R8: 0x8229,
  RG8: 0x822b,
  R16F: 0x822d,
  R32F: 0x822e,
  RG16F: 0x822f,
  RG32F: 0x8230,
  R8I: 0x8231,
  R8UI: 0x8232,
  R16I: 0x8233,
  R16UI: 0x8234,
  R32I: 0x8235,
  R32UI: 0x8236,
  RG8I: 0x8237,
  RG8UI: 0x8238,
  RG16I: 0x8239,
  RG16UI: 0x823a,
  RG32I: 0x823b,
  RG32UI: 0x823c,
  R8_SNORM: 0x8f94,
  RG8_SNORM: 0x8f95,
  RGB8_SNORM: 0x8f96,
  RGBA8_SNORM: 0x8f97,
  RGB10_A2UI: 0x906f,

  /* covered by extension
  COMPRESSED_R11_EAC : 0x9270,
  COMPRESSED_SIGNED_R11_EAC: 0x9271,
  COMPRESSED_RG11_EAC: 0x9272,
  COMPRESSED_SIGNED_RG11_EAC : 0x9273,
  COMPRESSED_RGB8_ETC2 : 0x9274,
  COMPRESSED_SRGB8_ETC2: 0x9275,
  COMPRESSED_RGB8_PUNCHTHROUGH_ALPHA1_ETC2 : 0x9276,
  COMPRESSED_SRGB8_PUNCHTHROUGH_ALPHA1_ETC : 0x9277,
  COMPRESSED_RGBA8_ETC2_EAC: 0x9278,
  COMPRESSED_SRGB8_ALPHA8_ETC2_EAC : 0x9279,
  */
  TEXTURE_IMMUTABLE_FORMAT: 0x912f,
  TEXTURE_IMMUTABLE_LEVELS: 0x82df,

  // Pixel types

  UNSIGNED_INT_2_10_10_10_REV: 0x8368,
  UNSIGNED_INT_10F_11F_11F_REV: 0x8c3b,
  UNSIGNED_INT_5_9_9_9_REV: 0x8c3e,
  FLOAT_32_UNSIGNED_INT_24_8_REV: 0x8dad,
  UNSIGNED_INT_24_8: 0x84fa,
  HALF_FLOAT: 0x140b,
  RG: 0x8227,
  RG_INTEGER: 0x8228,
  INT_2_10_10_10_REV: 0x8d9f,

  // Queries

  CURRENT_QUERY: 0x8865,
  QUERY_RESULT: 0x8866,
  QUERY_RESULT_AVAILABLE: 0x8867,
  ANY_SAMPLES_PASSED: 0x8c2f,
  ANY_SAMPLES_PASSED_CONSERVATIVE: 0x8d6a,

  // Draw buffers

  MAX_DRAW_BUFFERS: 0x8824,
  DRAW_BUFFER0: 0x8825,
  DRAW_BUFFER1: 0x8826,
  DRAW_BUFFER2: 0x8827,
  DRAW_BUFFER3: 0x8828,
  DRAW_BUFFER4: 0x8829,
  DRAW_BUFFER5: 0x882a,
  DRAW_BUFFER6: 0x882b,
  DRAW_BUFFER7: 0x882c,
  DRAW_BUFFER8: 0x882d,
  DRAW_BUFFER9: 0x882e,
  DRAW_BUFFER10: 0x882f,
  DRAW_BUFFER11: 0x8830,
  DRAW_BUFFER12: 0x8831,
  DRAW_BUFFER13: 0x8832,
  DRAW_BUFFER14: 0x8833,
  DRAW_BUFFER15: 0x8834,
  MAX_COLOR_ATTACHMENTS: 0x8cdf,
  COLOR_ATTACHMENT1: 0x8ce1,
  COLOR_ATTACHMENT2: 0x8ce2,
  COLOR_ATTACHMENT3: 0x8ce3,
  COLOR_ATTACHMENT4: 0x8ce4,
  COLOR_ATTACHMENT5: 0x8ce5,
  COLOR_ATTACHMENT6: 0x8ce6,
  COLOR_ATTACHMENT7: 0x8ce7,
  COLOR_ATTACHMENT8: 0x8ce8,
  COLOR_ATTACHMENT9: 0x8ce9,
  COLOR_ATTACHMENT10: 0x8cea,
  COLOR_ATTACHMENT11: 0x8ceb,
  COLOR_ATTACHMENT12: 0x8cec,
  COLOR_ATTACHMENT13: 0x8ced,
  COLOR_ATTACHMENT14: 0x8cee,
  COLOR_ATTACHMENT15: 0x8cef,

  // Samplers

  SAMPLER_3D: 0x8b5f,
  SAMPLER_2D_SHADOW: 0x8b62,
  SAMPLER_2D_ARRAY: 0x8dc1,
  SAMPLER_2D_ARRAY_SHADOW: 0x8dc4,
  SAMPLER_CUBE_SHADOW: 0x8dc5,
  INT_SAMPLER_2D: 0x8dca,
  INT_SAMPLER_3D: 0x8dcb,
  INT_SAMPLER_CUBE: 0x8dcc,
  INT_SAMPLER_2D_ARRAY: 0x8dcf,
  UNSIGNED_INT_SAMPLER_2D: 0x8dd2,
  UNSIGNED_INT_SAMPLER_3D: 0x8dd3,
  UNSIGNED_INT_SAMPLER_CUBE: 0x8dd4,
  UNSIGNED_INT_SAMPLER_2D_ARRAY: 0x8dd7,
  MAX_SAMPLES: 0x8d57,
  SAMPLER_BINDING: 0x8919,

  // Buffers

  PIXEL_PACK_BUFFER: 0x88eb,
  PIXEL_UNPACK_BUFFER: 0x88ec,
  PIXEL_PACK_BUFFER_BINDING: 0x88ed,
  PIXEL_UNPACK_BUFFER_BINDING: 0x88ef,
  COPY_READ_BUFFER: 0x8f36,
  COPY_WRITE_BUFFER: 0x8f37,
  COPY_READ_BUFFER_BINDING: 0x8f36,
  COPY_WRITE_BUFFER_BINDING: 0x8f37,

  // Data types

  FLOAT_MAT2x3: 0x8b65,
  FLOAT_MAT2x4: 0x8b66,
  FLOAT_MAT3x2: 0x8b67,
  FLOAT_MAT3x4: 0x8b68,
  FLOAT_MAT4x2: 0x8b69,
  FLOAT_MAT4x3: 0x8b6a,
  UNSIGNED_INT_VEC2: 0x8dc6,
  UNSIGNED_INT_VEC3: 0x8dc7,
  UNSIGNED_INT_VEC4: 0x8dc8,
  UNSIGNED_NORMALIZED: 0x8c17,
  SIGNED_NORMALIZED: 0x8f9c,

  // Vertex attributes

  VERTEX_ATTRIB_ARRAY_INTEGER: 0x88fd,
  VERTEX_ATTRIB_ARRAY_DIVISOR: 0x88fe,

  // Transform feedback

  TRANSFORM_FEEDBACK_BUFFER_MODE: 0x8c7f,
  MAX_TRANSFORM_FEEDBACK_SEPARATE_COMPONENTS: 0x8c80,
  TRANSFORM_FEEDBACK_VARYINGS: 0x8c83,
  TRANSFORM_FEEDBACK_BUFFER_START: 0x8c84,
  TRANSFORM_FEEDBACK_BUFFER_SIZE: 0x8c85,
  TRANSFORM_FEEDBACK_PRIMITIVES_WRITTEN: 0x8c88,
  MAX_TRANSFORM_FEEDBACK_INTERLEAVED_COMPONENTS: 0x8c8a,
  MAX_TRANSFORM_FEEDBACK_SEPARATE_ATTRIBS: 0x8c8b,
  INTERLEAVED_ATTRIBS: 0x8c8c,
  SEPARATE_ATTRIBS: 0x8c8d,
  TRANSFORM_FEEDBACK_BUFFER: 0x8c8e,
  TRANSFORM_FEEDBACK_BUFFER_BINDING: 0x8c8f,
  TRANSFORM_FEEDBACK: 0x8e22,
  TRANSFORM_FEEDBACK_PAUSED: 0x8e23,
  TRANSFORM_FEEDBACK_ACTIVE: 0x8e24,
  TRANSFORM_FEEDBACK_BINDING: 0x8e25,

  // Framebuffers and renderbuffers

  FRAMEBUFFER_ATTACHMENT_COLOR_ENCODING: 0x8210,
  FRAMEBUFFER_ATTACHMENT_COMPONENT_TYPE: 0x8211,
  FRAMEBUFFER_ATTACHMENT_RED_SIZE: 0x8212,
  FRAMEBUFFER_ATTACHMENT_GREEN_SIZE: 0x8213,
  FRAMEBUFFER_ATTACHMENT_BLUE_SIZE: 0x8214,
  FRAMEBUFFER_ATTACHMENT_ALPHA_SIZE: 0x8215,
  FRAMEBUFFER_ATTACHMENT_DEPTH_SIZE: 0x8216,
  FRAMEBUFFER_ATTACHMENT_STENCIL_SIZE: 0x8217,
  FRAMEBUFFER_DEFAULT: 0x8218,
  // DEPTH_STENCIL_ATTACHMENT : 0x821A,
  // DEPTH_STENCIL: 0x84F9,
  DEPTH24_STENCIL8: 0x88f0,
  DRAW_FRAMEBUFFER_BINDING: 0x8ca6,
  READ_FRAMEBUFFER_BINDING: 0x8caa,
  RENDERBUFFER_SAMPLES: 0x8cab,
  FRAMEBUFFER_ATTACHMENT_TEXTURE_LAYER: 0x8cd4,
  FRAMEBUFFER_INCOMPLETE_MULTISAMPLE: 0x8d56,

  // Uniforms

  UNIFORM_BUFFER: 0x8a11,
  UNIFORM_BUFFER_BINDING: 0x8a28,
  UNIFORM_BUFFER_START: 0x8a29,
  UNIFORM_BUFFER_SIZE: 0x8a2a,
  MAX_VERTEX_UNIFORM_BLOCKS: 0x8a2b,
  MAX_FRAGMENT_UNIFORM_BLOCKS: 0x8a2d,
  MAX_COMBINED_UNIFORM_BLOCKS: 0x8a2e,
  MAX_UNIFORM_BUFFER_BINDINGS: 0x8a2f,
  MAX_UNIFORM_BLOCK_SIZE: 0x8a30,
  MAX_COMBINED_VERTEX_UNIFORM_COMPONENTS: 0x8a31,
  MAX_COMBINED_FRAGMENT_UNIFORM_COMPONENTS: 0x8a33,
  UNIFORM_BUFFER_OFFSET_ALIGNMENT: 0x8a34,
  ACTIVE_UNIFORM_BLOCKS: 0x8a36,
  UNIFORM_TYPE: 0x8a37,
  UNIFORM_SIZE: 0x8a38,
  UNIFORM_BLOCK_INDEX: 0x8a3a,
  UNIFORM_OFFSET: 0x8a3b,
  UNIFORM_ARRAY_STRIDE: 0x8a3c,
  UNIFORM_MATRIX_STRIDE: 0x8a3d,
  UNIFORM_IS_ROW_MAJOR: 0x8a3e,
  UNIFORM_BLOCK_BINDING: 0x8a3f,
  UNIFORM_BLOCK_DATA_SIZE: 0x8a40,
  UNIFORM_BLOCK_ACTIVE_UNIFORMS: 0x8a42,
  UNIFORM_BLOCK_ACTIVE_UNIFORM_INDICES: 0x8a43,
  UNIFORM_BLOCK_REFERENCED_BY_VERTEX_SHADER: 0x8a44,
  UNIFORM_BLOCK_REFERENCED_BY_FRAGMENT_SHADER: 0x8a46,

  // Sync objects

  OBJECT_TYPE: 0x9112,
  SYNC_CONDITION: 0x9113,
  SYNC_STATUS: 0x9114,
  SYNC_FLAGS: 0x9115,
  SYNC_FENCE: 0x9116,
  SYNC_GPU_COMMANDS_COMPLETE: 0x9117,
  UNSIGNALED: 0x9118,
  SIGNALED: 0x9119,
  ALREADY_SIGNALED: 0x911a,
  TIMEOUT_EXPIRED: 0x911b,
  CONDITION_SATISFIED: 0x911c,
  WAIT_FAILED: 0x911d,
  SYNC_FLUSH_COMMANDS_BIT: 0x00000001,

  // Miscellaneous constants

  COLOR: 0x1800,
  DEPTH: 0x1801,
  STENCIL: 0x1802,
  MIN: 0x8007,
  MAX: 0x8008,
  DEPTH_COMPONENT24: 0x81a6,
  STREAM_READ: 0x88e1,
  STREAM_COPY: 0x88e2,
  STATIC_READ: 0x88e5,
  STATIC_COPY: 0x88e6,
  DYNAMIC_READ: 0x88e9,
  DYNAMIC_COPY: 0x88ea,
  DEPTH_COMPONENT32F: 0x8cac,
  DEPTH32F_STENCIL8: 0x8cad,
  INVALID_INDEX: 0xffffffff,
  TIMEOUT_IGNORED: -1,
  MAX_CLIENT_WAIT_TIMEOUT_WEBGL: 0x9247,

  // Constants defined in WebGL extensions

  // ANGLE_instanced_arrays

  VERTEX_ATTRIB_ARRAY_DIVISOR_ANGLE: 0x88fe,

  // WEBGL_debug_renderer_info

  UNMASKED_VENDOR_WEBGL: 0x9245,
  UNMASKED_RENDERER_WEBGL: 0x9246,

  // EXT_texture_filter_anisotropic

  MAX_TEXTURE_MAX_ANISOTROPY_EXT: 0x84ff,
  TEXTURE_MAX_ANISOTROPY_EXT: 0x84fe,

  // WEBGL_compressed_texture_s3tc

  COMPRESSED_RGB_S3TC_DXT1_EXT: 0x83f0,
  COMPRESSED_RGBA_S3TC_DXT1_EXT: 0x83f1,
  COMPRESSED_RGBA_S3TC_DXT3_EXT: 0x83f2,
  COMPRESSED_RGBA_S3TC_DXT5_EXT: 0x83f3,

  // WEBGL_compressed_texture_es3

  COMPRESSED_R11_EAC: 0x9270,
  COMPRESSED_SIGNED_R11_EAC: 0x9271,
  COMPRESSED_RG11_EAC: 0x9272,
  COMPRESSED_SIGNED_RG11_EAC: 0x9273,
  COMPRESSED_RGB8_ETC2: 0x9274,
  COMPRESSED_RGBA8_ETC2_EAC: 0x9275,
  COMPRESSED_SRGB8_ETC2: 0x9276,
  COMPRESSED_SRGB8_ALPHA8_ETC2_EAC: 0x9277,
  COMPRESSED_RGB8_PUNCHTHROUGH_ALPHA1_ETC2: 0x9278,
  COMPRESSED_SRGB8_PUNCHTHROUGH_ALPHA1_ETC2: 0x9279,

  // WEBGL_compressed_texture_pvrtc

  COMPRESSED_RGB_PVRTC_4BPPV1_IMG: 0x8c00,
  COMPRESSED_RGBA_PVRTC_4BPPV1_IMG: 0x8c02,
  COMPRESSED_RGB_PVRTC_2BPPV1_IMG: 0x8c01,
  COMPRESSED_RGBA_PVRTC_2BPPV1_IMG: 0x8c03,

  // WEBGL_compressed_texture_etc1

  COMPRESSED_RGB_ETC1_WEBGL: 0x8d64,

  // WEBGL_compressed_texture_atc

  COMPRESSED_RGB_ATC_WEBGL: 0x8c92,
  COMPRESSED_RGBA_ATC_EXPLICIT_ALPHA_WEBGL: 0x8c92,
  COMPRESSED_RGBA_ATC_INTERPOLATED_ALPHA_WEBGL: 0x87ee,

  // WEBGL_depth_texture

  UNSIGNED_INT_24_8_WEBGL: 0x84fa,

  // OES_texture_half_float

  HALF_FLOAT_OES: 0x8d61,

  // WEBGL_color_buffer_float

  RGBA32F_EXT: 0x8814,
  RGB32F_EXT: 0x8815,
  FRAMEBUFFER_ATTACHMENT_COMPONENT_TYPE_EXT: 0x8211,
  UNSIGNED_NORMALIZED_EXT: 0x8c17,

  // EXT_blend_minmax

  MIN_EXT: 0x8007,
  MAX_EXT: 0x8008,

  // EXT_sRGB

  SRGB_EXT: 0x8c40,
  SRGB_ALPHA_EXT: 0x8c42,
  SRGB8_ALPHA8_EXT: 0x8c43,
  FRAMEBUFFER_ATTACHMENT_COLOR_ENCODING_EXT: 0x8210,

  // OES_standard_derivatives

  FRAGMENT_SHADER_DERIVATIVE_HINT_OES: 0x8b8b,

  // WEBGL_draw_buffers

  COLOR_ATTACHMENT0_WEBGL: 0x8ce0,
  COLOR_ATTACHMENT1_WEBGL: 0x8ce1,
  COLOR_ATTACHMENT2_WEBGL: 0x8ce2,
  COLOR_ATTACHMENT3_WEBGL: 0x8ce3,
  COLOR_ATTACHMENT4_WEBGL: 0x8ce4,
  COLOR_ATTACHMENT5_WEBGL: 0x8ce5,
  COLOR_ATTACHMENT6_WEBGL: 0x8ce6,
  COLOR_ATTACHMENT7_WEBGL: 0x8ce7,
  COLOR_ATTACHMENT8_WEBGL: 0x8ce8,
  COLOR_ATTACHMENT9_WEBGL: 0x8ce9,
  COLOR_ATTACHMENT10_WEBGL: 0x8cea,
  COLOR_ATTACHMENT11_WEBGL: 0x8ceb,
  COLOR_ATTACHMENT12_WEBGL: 0x8cec,
  COLOR_ATTACHMENT13_WEBGL: 0x8ced,
  COLOR_ATTACHMENT14_WEBGL: 0x8cee,
  COLOR_ATTACHMENT15_WEBGL: 0x8cef,
  DRAW_BUFFER0_WEBGL: 0x8825,
  DRAW_BUFFER1_WEBGL: 0x8826,
  DRAW_BUFFER2_WEBGL: 0x8827,
  DRAW_BUFFER3_WEBGL: 0x8828,
  DRAW_BUFFER4_WEBGL: 0x8829,
  DRAW_BUFFER5_WEBGL: 0x882a,
  DRAW_BUFFER6_WEBGL: 0x882b,
  DRAW_BUFFER7_WEBGL: 0x882c,
  DRAW_BUFFER8_WEBGL: 0x882d,
  DRAW_BUFFER9_WEBGL: 0x882e,
  DRAW_BUFFER10_WEBGL: 0x882f,
  DRAW_BUFFER11_WEBGL: 0x8830,
  DRAW_BUFFER12_WEBGL: 0x8831,
  DRAW_BUFFER13_WEBGL: 0x8832,
  DRAW_BUFFER14_WEBGL: 0x8833,
  DRAW_BUFFER15_WEBGL: 0x8834,
  MAX_COLOR_ATTACHMENTS_WEBGL: 0x8cdf,
  MAX_DRAW_BUFFERS_WEBGL: 0x8824,

  // OES_vertex_array_object

  VERTEX_ARRAY_BINDING_OES: 0x85b5,

  // EXT_disjoint_timer_query

  QUERY_COUNTER_BITS_EXT: 0x8864,
  CURRENT_QUERY_EXT: 0x8865,
  QUERY_RESULT_EXT: 0x8866,
  QUERY_RESULT_AVAILABLE_EXT: 0x8867,
  TIME_ELAPSED_EXT: 0x88bf,
  TIMESTAMP_EXT: 0x8e28,
  GPU_DISJOINT_EXT: 0x8fbb // A Boolean indicating whether or not the GPU performed any disjoint operation.
};


/***/ }),

/***/ "./src/bundle.js":
/*!***********************!*\
  !*** ./src/bundle.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/* global window, global */
const moduleExports = __webpack_require__(/*! ./index */ "./src/index.js");

const _global = typeof window === 'undefined' ? global : window;
_global.loaders = _global.luma || {};

module.exports = Object.assign(_global.luma, moduleExports);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/global.js */ "../../node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: depth, ConvolutionPass, OutlinePass, SSAOPass */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_depth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/depth */ "./src/modules/depth.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "depth", function() { return _modules_depth__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _passes_convolution_pass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./passes/convolution-pass */ "./src/passes/convolution-pass.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ConvolutionPass", function() { return _passes_convolution_pass__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _passes_outline_pass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./passes/outline-pass */ "./src/passes/outline-pass.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "OutlinePass", function() { return _passes_outline_pass__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _passes_ssao_pass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./passes/ssao-pass */ "./src/passes/ssao-pass.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SSAOPass", function() { return _passes_ssao_pass__WEBPACK_IMPORTED_MODULE_3__["default"]; });

// Shader modules


// Image processing / render passes





/***/ }),

/***/ "./src/modules/convolution.js":
/*!************************************!*\
  !*** ./src/modules/convolution.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// A convolution shader
// Based on https://webglfundamentals.org/webgl/lessons/webgl-image-processing-continued.html

/*
# Copyright 2012, Gregg Tavares.
# All rights reserved.
#
# Redistribution and use in source and binary forms, with or without
# modification, are permitted provided that the following conditions are
# met:
#
#     * Redistributions of source code must retain the above copyright
# notice, this list of conditions and the following disclaimer.
#     * Redistributions in binary form must reproduce the above
# copyright notice, this list of conditions and the following disclaimer
# in the documentation and/or other materials provided with the
# distribution.
#     * Neither the name of Gregg Tavares. nor the names of his
# contributors may be used to endorse or promote products derived from
# this software without specific prior written permission.
#
# THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
# "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
# LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
# A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
# OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
# SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
# LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
# DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
# THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
# (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
# OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// Pre-defined convolution kernels
/* eslint-disable */
const KERNEL = {
  NORMAL: [0, 0, 0, 0, 1, 0, 0, 0, 0],
  GAUSSIAN_BLUR: [0.045, 0.122, 0.045, 0.122, 0.332, 0.122, 0.045, 0.122, 0.045],
  GAUSSIAN_BLUR_2: [1, 2, 1, 2, 4, 2, 1, 2, 1],
  GAUSSIAN_BLUR_3: [0, 1, 0, 1, 1, 1, 0, 1, 0],
  UNSHARPEN: [-1, -1, -1, -1, 9, -1, -1, -1, -1],
  SHARPNESS: [0, -1, 0, -1, 5, -1, 0, -1, 0],
  SHARPEN: [-1, -1, -1, -1, 16, -1, -1, -1, -1],
  EDGE_DETECT: [-0.125, -0.125, -0.125, -0.125, 1, -0.125, -0.125, -0.125, -0.125],
  EDGE_DETECT_2: [-1, -1, -1, -1, 8, -1, -1, -1, -1],
  EDGE_DETECT_3: [-5, 0, 0, 0, 0, 0, 0, 0, 5],
  EDGE_DETECT_4: [-1, -1, -1, 0, 0, 0, 1, 1, 1],
  EDGE_DETECT_5: [-1, -1, -1, 2, 2, 2, -1, -1, -1],
  EDGE_DETECT_6: [-5, -5, -5, -5, 39, -5, -5, -5, -5],
  SOBEL_HORIZONTAL: [1, 2, 1, 0, 0, 0, -1, -2, -1],
  SOBEL_VERTICAL: [1, 0, -1, 2, 0, -2, 1, 0, -1],
  PREVIT_HORIZONTAL: [1, 1, 1, 0, 0, 0, -1, -1, -1],
  PREVIT_VERTICAL: [1, 0, -1, 1, 0, -1, 1, 0, -1],
  BOX_BLUR: [0.111, 0.111, 0.111, 0.111, 0.111, 0.111, 0.111, 0.111, 0.111],
  TRIANGLE_BLUR: [0.0625, 0.125, 0.0625, 0.125, 0.25, 0.125, 0.0625, 0.125, 0.0625],
  EMBOSS: [-2, -1, 0, -1, 1, 1, 0, 1, 2]
};
/* eslint-enable */

const fs = `
precision highp float;

uniform vec2 uTextureSize;
uniform float uKernel[9];
uniform float uKernelWeight;

vec4 convolution_getColor(sampler2D tDiffuse, vec2 uv) {
  vec2 onePixel = vec2(1.0, 1.0) / uTextureSize;
  vec4 colorSum =
    texture2D(tDiffuse, uv + onePixel * vec2(-1, -1)) * uKernel[0] +
    texture2D(tDiffuse, uv + onePixel * vec2( 0, -1)) * uKernel[1] +
    texture2D(tDiffuse, uv + onePixel * vec2( 1, -1)) * uKernel[2] +
    texture2D(tDiffuse, uv + onePixel * vec2(-1,  0)) * uKernel[3] +
    texture2D(tDiffuse, uv + onePixel * vec2( 0,  0)) * uKernel[4] +
    texture2D(tDiffuse, uv + onePixel * vec2( 1,  0)) * uKernel[5] +
    texture2D(tDiffuse, uv + onePixel * vec2(-1,  1)) * uKernel[6] +
    texture2D(tDiffuse, uv + onePixel * vec2( 0,  1)) * uKernel[7] +
    texture2D(tDiffuse, uv + onePixel * vec2( 1,  1)) * uKernel[8] ;

  // Divide the sum by the weight but just use rgb, set alpha to 1.0
  return vec4((colorSum / uKernelWeight).rgb, 1.0);
}
`;

const DEFAULT_PROPS = {};

/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'convolution',
  fs,
  DEFAULT_PROPS,
  getUniforms: props => props,
  KERNEL
});


/***/ }),

/***/ "./src/modules/depth.js":
/*!******************************!*\
  !*** ./src/modules/depth.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _pack__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pack */ "./src/modules/pack.js");
// depth buffer utilities
// initial version ported from THREE.js

/* eslint-disable camelcase */


const fs = `\
#define DEPTH_PACKING 3201

uniform bool depth_uEnabled;

#ifdef USE_LOGDEPTHBUF
uniform float logDepthBufFC;
#endif

#if DEPTH_PACKING == 3200
uniform float opacity;
#endif


// NOTE: viewZ/eyeZ is < 0 when in front of the camera per OpenGL conventions

float depth_viewZToOrthographicDepth(
  const in float viewZ, const in float near, const in float far
) {
  return ( viewZ + near ) / ( near - far );
}

float depth_orthographicDepthToViewZ(
  const in float linearClipZ, const in float near, const in float far
) {
  return linearClipZ * ( near - far ) - near;
}

float depth_viewZToPerspectiveDepth(
  const in float viewZ, const in float near, const in float far
) {
  return (( near + viewZ ) * far ) / (( far - near ) * viewZ );
}

float depth_perspectiveDepthToViewZ(
  const in float invClipZ, const in float near, const in float far
) {
  return ( near * far ) / ( ( far - near ) * invClipZ - far );
}

// Sample depth buffer and convert to float
float depth_getDepth(sampler2D tDepth, vec2 coord) {
  float depthValue = pack_RGBA8ToFloat(texture2D(tDepth, coord));
#ifdef USE_LOGDEPTHBUF
  float logz = depthValue;
  float w = pow(2.0, (logz / logDepthBufFC)) - 1.0;
  float z = (logz / w) + 1.0;
#else
  float z = depthValue;
#endif
  return z;
}

//
vec4 depth_getColor() {
#if DEPTH_PACKING == 3200
  return vec4( vec3( 1.0 - gl_FragCoord.z ), opacity );
#elif DEPTH_PACKING == 3201
  return pack_floatToRGBA8( gl_FragCoord.z );
#endif
}

vec4 depth_filterColor(vec4 color) {
  return depth_uEnabled ? depth_getColor() : color;
}
`;

const DEFAULT_PROPS = {
  depth_uEnabled: false
};

/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'depth',
  dependencies: [_pack__WEBPACK_IMPORTED_MODULE_0__["default"]],
  fs,
  DEFAULT_PROPS,
  getUniforms: (props = DEFAULT_PROPS) => props
});


/***/ }),

/***/ "./src/modules/pack.js":
/*!*****************************!*\
  !*** ./src/modules/pack.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// Packing of floats into RGBA8
/* eslint-disable camelcase */

const fs = `\
const float PackUpscale = 256. / 255.; // fraction -> 0..1 (including 1)
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256.,  256. );

const float UnpackDownscale = 255. / 256.; // 0..1 -> fraction (excluding 1)
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );

const float ShiftRight8 = 1. / 256.;

vec4 pack_floatToRGBA8( const in float v ) {
  vec4 r = vec4( fract( v * PackFactors ), v );
  r.yzw -= r.xyz * ShiftRight8; // tidy overflow
  return r * PackUpscale;
}

float pack_RGBA8ToFloat( const in vec4 v ) {
  return dot(v, UnpackFactors);
}
`;

const DEFAULT_PROPS = {};

/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'pack',
  fs,
  vs: fs,
  DEFAULT_PROPS,
  getUniforms: props => props
});


/***/ }),

/***/ "./src/modules/ssao.js":
/*!*****************************!*\
  !*** ./src/modules/ssao.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _depth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./depth */ "./src/modules/depth.js");
/**
 * Screen-space ambient occlusion shader
 *
 * Ported to luma.gl from THREE.js
 *
 * Attributions: (per comments in original THREE.js files)
 * - ported to THREE.js from SSAO GLSL shader v1.2 by alteredq / http://alteredqualia.com/
 *   assembled by Martins Upitis (martinsh) (http://devlog-martinsh.blogspot.com)
 * - original technique by ArKano22 http://www.gamedev.net/topic/550699-ssao-no-halo-artifacts/
 * - modifications
 * - modified to use RGBA packed depth texture (use clear color 1,1,1,1 for depth pass)
 * - refactoring and optimizations
 */

/* eslint-disable camelcase */


const DEFAULT_PROPS = {
  ssao_uEnabled: true,
  tDiffuse: null,
  tDepth: null,
  size: [512, 512],
  cameraNear: 1,
  cameraFar: 100,
  radius: 32, // 4
  onlyAO: false,
  aoClamp: 0.25,
  lumInfluence: 0.7
};

const fsSSAO = `\
// Inputs
uniform sampler2D tDiffuse;
uniform sampler2D tDepth;
uniform vec2 size;        // texture width, height

// TODO - move to 'camera' module?
uniform float cameraNear;
uniform float cameraFar;

// SSAO
uniform bool ssao_uEnabled;
uniform float radius;     // ao radius
uniform float aoClamp;    // depth clamp - reduces haloing at screen edges
uniform float lumInfluence;  // how much luminance affects occlusion

uniform bool onlyAO;      // use only ambient occlusion pass?

#define DL 2.399963229728653  // PI * ( 3.0 - sqrt( 5.0 ) )
#define EULER 2.718281828459045

const int samples = 64;           // ao sample count
const bool useNoise = true;       // use noise instead of pattern for sample dithering
const float noiseAmount = 0.0004; // dithering amount
const float diffArea = 0.4;       // self-shadowing reduction
const float gDisplace = 0.4;      // gauss bell center

// Random noise generating: pattern texture for dithering
vec2 rand( const vec2 coord ) {
  vec2 noise;

  if ( useNoise ) {
    float nx = dot ( coord, vec2( 12.9898, 78.233 ) );
    float ny = dot ( coord, vec2( 12.9898, 78.233 ) * 2.0 );
    noise = clamp( fract ( 43758.5453 * sin( vec2( nx, ny ) ) ), 0.0, 1.0 );
  } else {
    float ff = fract( 1.0 - coord.s * ( size.x / 2.0 ) );
    float gg = fract( coord.t * ( size.y / 2.0 ) );
    noise = vec2( 0.25, 0.75 ) * vec2( ff ) + vec2( 0.75, 0.25 ) * gg;
  }

  return ( noise * 2.0  - 1.0 ) * noiseAmount;
}

// RGBA depth

float readDepth( const in vec2 coord ) {
  float z = depth_getDepth(tDepth, coord);

  float cameraFarPlusNear = cameraFar + cameraNear;
  float cameraFarMinusNear = cameraFar - cameraNear;
  float cameraCoef = 2.0 * cameraNear;
  return cameraCoef / ( cameraFarPlusNear - z * cameraFarMinusNear );
}

float compareDepths( const in float depth1, const in float depth2, inout int far ) {
  float garea = 8.0;                         // gauss bell width
  float diff = ( depth1 - depth2 ) * 100.0;  // depth difference (0-100)

  // reduce left bell width to avoid self-shadowing

  if ( diff < gDisplace ) {
    garea = diffArea;
  } else {
    far = 1;
  }

  float dd = diff - gDisplace;
  float gauss = pow( EULER, -2.0 * ( dd * dd ) / ( garea * garea ) );
  return gauss;
}

float calcAO( float depth, float dw, float dh, vec2 uv ) {
  vec2 vv = vec2( dw, dh );

  vec2 coord1 = uv + radius * vv;
  vec2 coord2 = uv - radius * vv;

  float temp1 = 0.0;
  float temp2 = 0.0;

  int far = 0;
  temp1 = compareDepths( depth, readDepth( coord1 ), far );

  // DEPTH EXTRAPOLATION
  if ( far > 0 ) {
    temp2 = compareDepths( readDepth( coord2 ), depth, far );
    temp1 += ( 1.0 - temp1 ) * temp2;
  }

  return temp1;
}

vec4 ssao_filterColor(vec4 color4, vec2 uv) {

  vec2 noise = rand( uv );
  float depth = readDepth( uv );

  float tt = clamp( depth, aoClamp, 1.0 );

  float w = ( 1.0 / size.x ) / tt + ( noise.x * ( 1.0 - noise.x ) );
  float h = ( 1.0 / size.y ) / tt + ( noise.y * ( 1.0 - noise.y ) );

  float ao = 0.0;

  float dz = 1.0 / float( samples );
  float l = 0.0;
  float z = 1.0 - dz / 2.0;

  for ( int i = 0; i <= samples; i ++ ) {
    float r = sqrt( 1.0 - z );

    float pw = cos( l ) * r;
    float ph = sin( l ) * r;
    ao += calcAO( depth, pw * w, ph * h, uv );
    z = z - dz;
    l = l + DL;
  }

  ao /= float( samples );
  ao = 1.0 - ao;

  vec3 color = color4.rgb;

  vec3 final = color;

  vec3 lumcoeff = vec3( 0.299, 0.587, 0.114 );
  float lum = dot( color.rgb, lumcoeff );
  vec3 luminance = vec3( lum );

  // mix( color * ao, white, luminance )
  final = vec3( color * mix( vec3( ao ), vec3( 1.0 ), luminance * lumInfluence ) );

  if ( onlyAO ) {
    // ambient occlusion only
    final = vec3( mix( vec3( ao ), vec3( 1.0 ), luminance * lumInfluence ) );
  }

  return vec4( final, 1.0 );
}

vec4 ssao_getColor(vec2 uv) {
  vec4 color = texture2D( tDiffuse, uv );
  return ssao_uEnabled ? ssao_filterColor(color, uv) : color;
}
`;

/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'ssao',
  dependencies: [_depth__WEBPACK_IMPORTED_MODULE_0__["default"]],
  DEFAULT_PROPS,
  fs: fsSSAO
});


/***/ }),

/***/ "./src/passes/convolution-pass.js":
/*!****************************************!*\
  !*** ./src/passes/convolution-pass.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ConvolutionPass; });
/* harmony import */ var _luma_gl_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @luma.gl/core */ "@luma.gl/core");
/* harmony import */ var _luma_gl_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_luma_gl_core__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _modules_convolution__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../modules/convolution */ "./src/modules/convolution.js");
// A convolution render pass
// Based on https://webglfundamentals.org/webgl/lessons/webgl-image-processing-continued.html




class ConvolutionPass extends _luma_gl_core__WEBPACK_IMPORTED_MODULE_0__["_Pass"] {
  static get KERNEL() {
    return _modules_convolution__WEBPACK_IMPORTED_MODULE_1__["default"].KERNEL;
  }

  constructor(gl, props = {}) {
    super(
      gl,
      Object.assign(
        {
          id: 'convolution-pass',
          swap: true,
          kernel: _modules_convolution__WEBPACK_IMPORTED_MODULE_1__["default"].KERNEL.NORMAL
        },
        props
      )
    );

    this.clipspace = new _luma_gl_core__WEBPACK_IMPORTED_MODULE_0__["ClipSpace"](gl, {
      id: 'convolution-pass',
      modules: [_modules_convolution__WEBPACK_IMPORTED_MODULE_1__["default"]],
      fs: `
        uniform sampler2D tDiffuse;
        varying vec2 uv; // the texCoords passed in from the vertex shader.
        void main() {
          gl_FragColor = convolution_getColor(tDiffuse, uv);
        }
      `
    });

    this.setProps(props);
  }

  setProps(props) {
    Object.assign(this.props, props);
    this.clipspace.setUniforms({
      uKernel: this.props.kernel,
      uKernelWeight: this.props.kernel.reduce((sum, x) => sum + x, 0)
    });
  }

  _renderPass({inputBuffer, outputBuffer}) {
    const {width, height} = inputBuffer;
    this.clipspace.draw({
      uniforms: {
        tDiffuse: inputBuffer,
        uTextureSize: [width, height]
      },
      parameters: {
        depthWrite: false,
        depthTest: false
      }
    });
  }
}


/***/ }),

/***/ "./src/passes/outline-pass.js":
/*!************************************!*\
  !*** ./src/passes/outline-pass.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return OutlinePass; });
/* harmony import */ var _luma_gl_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @luma.gl/constants */ "../constants/src/index.js");
/* harmony import */ var _luma_gl_constants__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_luma_gl_constants__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _luma_gl_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @luma.gl/core */ "@luma.gl/core");
/* harmony import */ var _luma_gl_core__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_luma_gl_core__WEBPACK_IMPORTED_MODULE_1__);
/**
 * A traditional stencil buffer based outline pass.
 */




class OutlinePass extends _luma_gl_core__WEBPACK_IMPORTED_MODULE_1__["_Pass"] {
  constructor(gl, props = {}) {
    super(gl, Object.assign({id: 'simple-outline-pass'}, props));
    this.setProps(props);
  }

  setProps(props) {
    this.props = Object.assign(this.props, props);
    // this.clipspace.setUniforms(pixelation.getUniforms(this.props));
  }

  _renderPass({gl, animationProps}) {
    Object(_luma_gl_core__WEBPACK_IMPORTED_MODULE_1__["withParameters"])(
      gl,
      {
        stencilTest: true, // turn on stencil buffers
        stencilOp: [_luma_gl_constants__WEBPACK_IMPORTED_MODULE_0___default.a.KEEP, _luma_gl_constants__WEBPACK_IMPORTED_MODULE_0___default.a.KEEP, _luma_gl_constants__WEBPACK_IMPORTED_MODULE_0___default.a.REPLACE] // update stencil if both stencil+depth tests pass
      },
      () => {
        // Enable writing to stencil buffer plane 0
        Object(_luma_gl_core__WEBPACK_IMPORTED_MODULE_1__["setParameters"])(gl, {
          stencilFunc: [_luma_gl_constants__WEBPACK_IMPORTED_MODULE_0___default.a.ALWAYS, 1, 0xff], // update stencil buffer, regardless of current value
          stencilMask: 0x01
        });

        gl.clear(_luma_gl_constants__WEBPACK_IMPORTED_MODULE_0___default.a.STENCIL_BUFFER_BIT);

        // draw
        for (const model of this.props.models) {
          model.setUniforms(this.props.normalUniforms);
          model.draw(this.props.drawParams);
        }

        // Disable stencil writing, mask to stencil plane 0
        Object(_luma_gl_core__WEBPACK_IMPORTED_MODULE_1__["setParameters"])(gl, {
          stencilFunc: [_luma_gl_constants__WEBPACK_IMPORTED_MODULE_0___default.a.NOTEQUAL, 1, 0x01],
          stencilMask: 0x00, // disable writing to the stencil buffer
          depthTest: false
        });

        for (const model of this.props.models) {
          model.setUniforms(this.props.outlineUniforms);
          model.draw(this.props.drawParams);
          model.setUniforms(this.props.normalUniforms);
        }

        // All GL settings will reset here...
      }
    );
  }
}


/***/ }),

/***/ "./src/passes/ssao-pass.js":
/*!*********************************!*\
  !*** ./src/passes/ssao-pass.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return SSAOPass; });
/* harmony import */ var _luma_gl_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @luma.gl/core */ "@luma.gl/core");
/* harmony import */ var _luma_gl_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_luma_gl_core__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _modules_ssao__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../modules/ssao */ "./src/modules/ssao.js");
/**
 * Screen-space ambient occlusion pass.
 *
 * Ported to luma.gl from THREE.js (MIT license).
 * Attributions (per comments in original THREE.js files):
 * @author alteredq / http://alteredqualia.com/
 * @author tentone
 */

/* eslint-disable camelcase */



class SSAOPass extends _luma_gl_core__WEBPACK_IMPORTED_MODULE_0__["_Pass"] {
  constructor(gl, props) {
    super(gl, Object.assign({id: 'ssao-pass', swap: true}, _modules_ssao__WEBPACK_IMPORTED_MODULE_1__["default"].DEFAULT_PROPS, props));

    this.renderToScreen = false;

    // Depth render target, for `depth` shader module
    this.depthFramebuffer = new _luma_gl_core__WEBPACK_IMPORTED_MODULE_0__["Framebuffer"](gl, {id: 'ssao-pass-depth-map'});

    this.clipspace = new _luma_gl_core__WEBPACK_IMPORTED_MODULE_0__["ClipSpace"](gl, {
      id: 'ssao-pass',
      modules: [_modules_ssao__WEBPACK_IMPORTED_MODULE_1__["default"]],
      fs: `
        varying vec2 uv;
        void main() {
          gl_FragColor = ssao_getColor(uv);
        }
      `
    });

    this.setProps(props);
  }

  setProps(props) {
    super.setProps(props);

    const {width = 512, height = 512} = this.props;
    this.depthFramebuffer.resize({width, height});
    this.clipspace.setUniforms(this.props);

    // Shader uniforms
    // this.uniforms['cameraNear' ].value = this.camera2.near;
    // this.uniforms[ 'cameraFar' ].value = this.camera2.far;
  }

  _renderPass({inputBuffer, outputBuffer, animationProps}) {
    const {width, height} = inputBuffer;
    this.depthFramebuffer.resize({width, height});

    // Render depth into depthRenderTarget
    Object(_luma_gl_core__WEBPACK_IMPORTED_MODULE_0__["withParameters"])(this.gl, {framebuffer: this.depthFramebuffer}, () => {
      this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
      for (const model of this.props.models) {
        model.setUniforms({depth_uEnabled: true});
        model.draw(Object.assign({}, this.props.drawParams, {animationProps}));
        model.setUniforms({depth_uEnabled: false});
      }
    });

    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    this.clipspace.draw({
      animationProps,
      uniforms: {
        tDepth: this.depthFramebuffer,
        tDiffuse: inputBuffer,
        size: [this.depthFramebuffer.width, this.depthFramebuffer.height]
      }
    });
  }
}


/***/ }),

/***/ "@luma.gl/core":
/*!***********************!*\
  !*** external "luma" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__luma_gl_core__;

/***/ })

/******/ });
});