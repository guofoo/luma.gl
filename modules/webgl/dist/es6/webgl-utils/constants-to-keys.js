import { assert } from '../utils';
export function getKeyValue(gl, name) {
  if (typeof name !== 'string') {
    return name;
  }

  const number = Number(name);

  if (!isNaN(number)) {
    return number;
  }

  name = name.replace(/^.*\./, '');
  const value = gl[name];
  assert(value !== undefined, "Accessing undefined constant GL.".concat(name));
  return value;
}
export function getKey(gl, value) {
  value = Number(value);

  for (const key in gl) {
    if (gl[key] === value) {
      return "GL.".concat(key);
    }
  }

  return String(value);
}
export function getKeyType(gl, value) {
  assert(value !== undefined, 'undefined key');
  value = Number(value);

  for (const key in gl) {
    if (gl[key] === value) {
      return "GL.".concat(key);
    }
  }

  return String(value);
}
//# sourceMappingURL=constants-to-keys.js.map