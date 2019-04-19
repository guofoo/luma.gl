const ERR_TYPE_DEDUCTION = 'Failed to deduce GL constant from typed array';
export function getGLTypeFromTypedArray(arrayOrType) {
  const type = ArrayBuffer.isView(arrayOrType) ? arrayOrType.constructor : arrayOrType;

  switch (type) {
    case Float32Array:
      return 5126;

    case Uint16Array:
      return 5123;

    case Uint32Array:
      return 5125;

    case Uint8Array:
      return 5121;

    case Uint8ClampedArray:
      return 5121;

    case Int8Array:
      return 5120;

    case Int16Array:
      return 5122;

    case Int32Array:
      return 5124;

    default:
      throw new Error(ERR_TYPE_DEDUCTION);
  }
}
export function getTypedArrayFromGLType(glType) {
  let _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$clamped = _ref.clamped,
      clamped = _ref$clamped === void 0 ? true : _ref$clamped;

  switch (glType) {
    case 5126:
      return Float32Array;

    case 5123:
    case 33635:
    case 32819:
    case 32820:
      return Uint16Array;

    case 5125:
      return Uint32Array;

    case 5121:
      return clamped ? Uint8ClampedArray : Uint8Array;

    case 5120:
      return Int8Array;

    case 5122:
      return Int16Array;

    case 5124:
      return Int32Array;

    default:
      throw new Error('Failed to deduce typed array type from GL constant');
  }
}
export function flipRows(_ref2) {
  let data = _ref2.data,
      width = _ref2.width,
      height = _ref2.height,
      _ref2$bytesPerPixel = _ref2.bytesPerPixel,
      bytesPerPixel = _ref2$bytesPerPixel === void 0 ? 4 : _ref2$bytesPerPixel,
      temp = _ref2.temp;
  const bytesPerRow = width * bytesPerPixel;
  temp = temp || new Uint8Array(bytesPerRow);

  for (let y = 0; y < height / 2; ++y) {
    const topOffset = y * bytesPerRow;
    const bottomOffset = (height - y - 1) * bytesPerRow;
    temp.set(data.subarray(topOffset, topOffset + bytesPerRow));
    data.copyWithin(topOffset, bottomOffset, bottomOffset + bytesPerRow);
    data.set(temp, bottomOffset);
  }
}
export function scalePixels(_ref3) {
  let data = _ref3.data,
      width = _ref3.width,
      height = _ref3.height;
  const newWidth = Math.round(width / 2);
  const newHeight = Math.round(height / 2);
  const newData = new Uint8Array(newWidth * newHeight * 4);

  for (let y = 0; y < newHeight; y++) {
    for (let x = 0; x < newWidth; x++) {
      for (let c = 0; c < 4; c++) {
        newData[(y * newWidth + x) * 4 + c] = data[(y * 2 * width + x * 2) * 4 + c];
      }
    }
  }

  return {
    data: newData,
    width: newWidth,
    height: newHeight
  };
}
//# sourceMappingURL=typed-array-utils.js.map