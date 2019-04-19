import Buffer from './buffer';
import Framebuffer from './framebuffer';
import Texture from './texture';
import { withParameters } from '../context';
import { assertWebGL2Context, flipRows, scalePixels } from '../webgl-utils';
import { getTypedArrayFromGLType, getGLTypeFromTypedArray } from '../webgl-utils/typed-array-utils';
import { glFormatToComponents, glTypeToBytes } from '../webgl-utils/format-utils';
import { toFramebuffer } from '../webgl-utils/texture-utils';
import { assert, log } from '../utils';
export function readPixelsToArray(source) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$sourceX = _ref.sourceX,
      sourceX = _ref$sourceX === void 0 ? 0 : _ref$sourceX,
      _ref$sourceY = _ref.sourceY,
      sourceY = _ref$sourceY === void 0 ? 0 : _ref$sourceY,
      _ref$sourceFormat = _ref.sourceFormat,
      sourceFormat = _ref$sourceFormat === void 0 ? 6408 : _ref$sourceFormat,
      _ref$sourceAttachment = _ref.sourceAttachment,
      sourceAttachment = _ref$sourceAttachment === void 0 ? 36064 : _ref$sourceAttachment,
      _ref$target = _ref.target,
      target = _ref$target === void 0 ? null : _ref$target,
      sourceWidth = _ref.sourceWidth,
      sourceHeight = _ref.sourceHeight,
      sourceType = _ref.sourceType;

  var _getFramebuffer = getFramebuffer(source),
      framebuffer = _getFramebuffer.framebuffer,
      deleteFramebuffer = _getFramebuffer.deleteFramebuffer;

  assert(framebuffer);
  var gl = framebuffer.gl,
      handle = framebuffer.handle,
      attachments = framebuffer.attachments;
  sourceWidth = sourceWidth || framebuffer.width;
  sourceHeight = sourceHeight || framebuffer.height;

  if (sourceAttachment === 36064 && handle === null) {
    sourceAttachment = 1028;
  }

  assert(attachments[sourceAttachment]);
  sourceType = sourceType || attachments[sourceAttachment].type;
  target = getPixelArray(target, sourceType, sourceFormat, sourceWidth, sourceHeight);
  sourceType = sourceType || getGLTypeFromTypedArray(target);
  var prevHandle = gl.bindFramebuffer(36160, handle);
  gl.readPixels(sourceX, sourceY, sourceWidth, sourceHeight, sourceFormat, sourceType, target);
  gl.bindFramebuffer(36160, prevHandle || null);

  if (deleteFramebuffer) {
    framebuffer["delete"]();
  }

  return target;
}
export function readPixelsToBuffer(source, _ref2) {
  var _ref2$sourceX = _ref2.sourceX,
      sourceX = _ref2$sourceX === void 0 ? 0 : _ref2$sourceX,
      _ref2$sourceY = _ref2.sourceY,
      sourceY = _ref2$sourceY === void 0 ? 0 : _ref2$sourceY,
      _ref2$sourceFormat = _ref2.sourceFormat,
      sourceFormat = _ref2$sourceFormat === void 0 ? 6408 : _ref2$sourceFormat,
      _ref2$target = _ref2.target,
      target = _ref2$target === void 0 ? null : _ref2$target,
      _ref2$targetByteOffse = _ref2.targetByteOffset,
      targetByteOffset = _ref2$targetByteOffse === void 0 ? 0 : _ref2$targetByteOffse,
      sourceWidth = _ref2.sourceWidth,
      sourceHeight = _ref2.sourceHeight,
      sourceType = _ref2.sourceType;

  var _getFramebuffer2 = getFramebuffer(source),
      framebuffer = _getFramebuffer2.framebuffer,
      deleteFramebuffer = _getFramebuffer2.deleteFramebuffer;

  assert(framebuffer);
  var gl = framebuffer.gl;
  sourceWidth = sourceWidth || framebuffer.width;
  sourceHeight = sourceHeight || framebuffer.height;
  assertWebGL2Context(gl);
  sourceType = sourceType || (target ? target.type : 5121);

  if (!target) {
    var components = glFormatToComponents(sourceFormat);
    var byteCount = glTypeToBytes(sourceType);
    var byteLength = targetByteOffset + sourceWidth * sourceHeight * components * byteCount;
    target = new Buffer(gl, {
      byteLength: byteLength,
      accessor: {
        type: sourceType,
        size: components
      }
    });
  }

  target.bind({
    target: 35051
  });
  withParameters(gl, {
    framebuffer: framebuffer
  }, function () {
    gl.readPixels(sourceX, sourceY, sourceWidth, sourceHeight, sourceFormat, sourceType, targetByteOffset);
  });
  target.unbind({
    target: 35051
  });

  if (deleteFramebuffer) {
    framebuffer["delete"]();
  }

  return target;
}
export function copyToDataUrl(source) {
  var _ref3 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref3$sourceAttachmen = _ref3.sourceAttachment,
      sourceAttachment = _ref3$sourceAttachmen === void 0 ? 36064 : _ref3$sourceAttachmen,
      _ref3$targetMaxHeight = _ref3.targetMaxHeight,
      targetMaxHeight = _ref3$targetMaxHeight === void 0 ? Number.MAX_SAFE_INTEGER : _ref3$targetMaxHeight;

  var data = readPixelsToArray(source, {
    sourceAttachment: sourceAttachment
  });
  var width = source.width,
      height = source.height;

  while (height > targetMaxHeight) {
    var _scalePixels = scalePixels({
      data: data,
      width: width,
      height: height
    });

    data = _scalePixels.data;
    width = _scalePixels.width;
    height = _scalePixels.height;
  }

  flipRows({
    data: data,
    width: width,
    height: height
  });
  var canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  var context = canvas.getContext('2d');
  var imageData = context.createImageData(width, height);
  imageData.data.set(data);
  context.putImageData(imageData, 0, 0);
  return canvas.toDataURL();
}
export function copyToImage(source) {
  var _ref4 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref4$sourceAttachmen = _ref4.sourceAttachment,
      sourceAttachment = _ref4$sourceAttachmen === void 0 ? 36064 : _ref4$sourceAttachmen,
      _ref4$targetImage = _ref4.targetImage,
      targetImage = _ref4$targetImage === void 0 ? null : _ref4$targetImage;

  var dataUrl = copyToDataUrl(source, {
    sourceAttachment: sourceAttachment
  });
  targetImage = targetImage || new Image();
  targetImage.src = dataUrl;
  return targetImage;
}
export function copyToTexture(source, target) {
  var _ref5 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      _ref5$sourceX = _ref5.sourceX,
      sourceX = _ref5$sourceX === void 0 ? 0 : _ref5$sourceX,
      _ref5$sourceY = _ref5.sourceY,
      sourceY = _ref5$sourceY === void 0 ? 0 : _ref5$sourceY,
      targetX = _ref5.targetX,
      targetY = _ref5.targetY,
      targetZ = _ref5.targetZ,
      _ref5$targetMipmaplev = _ref5.targetMipmaplevel,
      targetMipmaplevel = _ref5$targetMipmaplev === void 0 ? 0 : _ref5$targetMipmaplev,
      _ref5$targetInternalF = _ref5.targetInternalFormat,
      targetInternalFormat = _ref5$targetInternalF === void 0 ? 6408 : _ref5$targetInternalF,
      width = _ref5.width,
      height = _ref5.height;

  var _getFramebuffer3 = getFramebuffer(source),
      framebuffer = _getFramebuffer3.framebuffer,
      deleteFramebuffer = _getFramebuffer3.deleteFramebuffer;

  assert(framebuffer);
  var gl = framebuffer.gl,
      handle = framebuffer.handle;
  var isSubCopy = typeof targetX !== 'undefined' || typeof targetY !== 'undefined' || typeof targetZ !== 'undefined';
  targetX = targetX || 0;
  targetY = targetY || 0;
  targetZ = targetZ || 0;
  var prevHandle = gl.bindFramebuffer(36160, handle);
  assert(target);
  var texture = null;

  if (target instanceof Texture) {
    texture = target;
    width = Number.isFinite(width) ? width : texture.width;
    height = Number.isFinite(height) ? height : texture.height;
    texture.bind(0);
    target = texture.target;
  }

  if (!isSubCopy) {
    gl.copyTexImage2D(target, targetMipmaplevel, targetInternalFormat, sourceX, sourceY, width, height, 0);
  } else {
    switch (target) {
      case 3553:
      case 34067:
        gl.copyTexSubImage2D(target, targetMipmaplevel, targetX, targetY, sourceX, sourceY, width, height);
        break;

      case 35866:
      case 32879:
        gl.copyTexSubImage3D(target, targetMipmaplevel, targetX, targetY, targetZ, sourceX, sourceY, width, height);
        break;

      default:
    }
  }

  if (texture) {
    texture.unbind();
  }

  gl.bindFramebuffer(36160, prevHandle || null);

  if (deleteFramebuffer) {
    framebuffer["delete"]();
  }

  return texture;
}
export function blit(source, target) {
  var _ref6 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      _ref6$sourceAttachmen = _ref6.sourceAttachment,
      sourceAttachment = _ref6$sourceAttachmen === void 0 ? 36064 : _ref6$sourceAttachmen,
      _ref6$sourceX = _ref6.sourceX0,
      sourceX0 = _ref6$sourceX === void 0 ? 0 : _ref6$sourceX,
      _ref6$sourceY = _ref6.sourceY0,
      sourceY0 = _ref6$sourceY === void 0 ? 0 : _ref6$sourceY,
      sourceX1 = _ref6.sourceX1,
      sourceY1 = _ref6.sourceY1,
      _ref6$targetX = _ref6.targetX0,
      targetX0 = _ref6$targetX === void 0 ? 0 : _ref6$targetX,
      _ref6$targetY = _ref6.targetY0,
      targetY0 = _ref6$targetY === void 0 ? 0 : _ref6$targetY,
      targetX1 = _ref6.targetX1,
      targetY1 = _ref6.targetY1,
      _ref6$color = _ref6.color,
      color = _ref6$color === void 0 ? true : _ref6$color,
      _ref6$depth = _ref6.depth,
      depth = _ref6$depth === void 0 ? false : _ref6$depth,
      _ref6$stencil = _ref6.stencil,
      stencil = _ref6$stencil === void 0 ? false : _ref6$stencil,
      _ref6$mask = _ref6.mask,
      mask = _ref6$mask === void 0 ? 0 : _ref6$mask,
      _ref6$filter = _ref6.filter,
      filter = _ref6$filter === void 0 ? 9728 : _ref6$filter;

  var _getFramebuffer4 = getFramebuffer(source),
      srcFramebuffer = _getFramebuffer4.framebuffer,
      deleteSrcFramebuffer = _getFramebuffer4.deleteFramebuffer;

  var _getFramebuffer5 = getFramebuffer(target),
      dstFramebuffer = _getFramebuffer5.framebuffer,
      deleteDstFramebuffer = _getFramebuffer5.deleteFramebuffer;

  assert(srcFramebuffer);
  assert(dstFramebuffer);
  var gl = dstFramebuffer.gl,
      handle = dstFramebuffer.handle,
      width = dstFramebuffer.width,
      height = dstFramebuffer.height,
      readBuffer = dstFramebuffer.readBuffer;
  assertWebGL2Context(gl);

  if (!srcFramebuffer.handle && sourceAttachment === 36064) {
    sourceAttachment = 1028;
  }

  if (color) {
    mask |= 16384;
  }

  if (depth) {
    mask |= 256;
  }

  if (stencil) {
    mask |= 1024;
  }

  if (deleteSrcFramebuffer || deleteDstFramebuffer) {
    if (mask & (256 | 1024)) {
      mask = 16384;
      log.warn('Blitting from or into a Texture object, forcing mask to GL.COLOR_BUFFER_BIT')();
    }
  }

  assert(mask);
  sourceX1 = sourceX1 === undefined ? srcFramebuffer.width : sourceX1;
  sourceY1 = sourceY1 === undefined ? srcFramebuffer.height : sourceY1;
  targetX1 = targetX1 === undefined ? width : targetX1;
  targetY1 = targetY1 === undefined ? height : targetY1;
  var prevDrawHandle = gl.bindFramebuffer(36009, handle);
  var prevReadHandle = gl.bindFramebuffer(36008, srcFramebuffer.handle);
  gl.readBuffer(sourceAttachment);
  gl.blitFramebuffer(sourceX0, sourceY0, sourceX1, sourceY1, targetX0, targetY0, targetX1, targetY1, mask, filter);
  gl.readBuffer(readBuffer);
  gl.bindFramebuffer(36008, prevReadHandle || null);
  gl.bindFramebuffer(36009, prevDrawHandle || null);

  if (deleteSrcFramebuffer) {
    srcFramebuffer["delete"]();
  }

  if (deleteDstFramebuffer) {
    dstFramebuffer["delete"]();
  }

  return dstFramebuffer;
}

function getFramebuffer(source) {
  if (!(source instanceof Framebuffer)) {
    return {
      framebuffer: toFramebuffer(source),
      deleteFramebuffer: true
    };
  }

  return {
    framebuffer: source,
    deleteFramebuffer: false
  };
}

function getPixelArray(pixelArray, type, format, width, height) {
  if (pixelArray) {
    return pixelArray;
  }

  type = type || 5121;
  var ArrayType = getTypedArrayFromGLType(type, {
    clamped: false
  });
  var components = glFormatToComponents(format);
  return new ArrayType(width * height * components);
}
//# sourceMappingURL=copy-and-blit.js.map