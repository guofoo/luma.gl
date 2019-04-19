"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.requestAnimationFrame = requestAnimationFrame;
exports.cancelAnimationFrame = cancelAnimationFrame;

function requestAnimationFrame(callback) {
  return typeof window !== 'undefined' && window.requestAnimationFrame ? window.requestAnimationFrame(callback) : setTimeout(callback, 1000 / 60);
}

function cancelAnimationFrame(timerId) {
  return typeof window !== 'undefined' && window.cancelAnimationFrame ? window.cancelAnimationFrame(timerId) : clearTimeout(timerId);
}
//# sourceMappingURL=request-animation-frame.js.map