export default function assert(condition, message) {
  if (!condition) {
    throw new Error(message || 'luma.gl: assertion failed.');
  }
}
//# sourceMappingURL=assert.js.map