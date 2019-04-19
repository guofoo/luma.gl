import Resource from './resource';
import { FEATURES, hasFeatures } from '../features';
import { isWebGL2 } from '../webgl-utils';
import { assert } from '../utils';
const GL_QUERY_RESULT = 0x8866;
const GL_QUERY_RESULT_AVAILABLE = 0x8867;
const GL_TIME_ELAPSED_EXT = 0x88bf;
const GL_GPU_DISJOINT_EXT = 0x8fbb;
const GL_TRANSFORM_FEEDBACK_PRIMITIVES_WRITTEN = 0x8c88;
const GL_ANY_SAMPLES_PASSED = 0x8c2f;
const GL_ANY_SAMPLES_PASSED_CONSERVATIVE = 0x8d6a;
export default class Query extends Resource {
  static isSupported(gl) {
    let opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    const webgl2 = isWebGL2(gl);
    const hasTimerQuery = hasFeatures(gl, FEATURES.TIMER_QUERY);
    let supported = webgl2 || hasTimerQuery;

    for (const key of opts) {
      switch (key) {
        case 'queries':
          supported = supported && webgl2;
          break;

        case 'timers':
          supported = supported && hasTimerQuery;
          break;

        default:
          assert(false);
      }
    }

    return supported;
  }

  constructor(gl) {
    let opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    super(gl, opts);
    this.target = null;
    this._queryPending = false;
    this._pollingPromise = null;
    Object.seal(this);
  }

  beginTimeElapsedQuery() {
    return this.begin(GL_TIME_ELAPSED_EXT);
  }

  beginOcclusionQuery() {
    let _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$conservative = _ref.conservative,
        conservative = _ref$conservative === void 0 ? false : _ref$conservative;

    return this.begin(conservative ? GL_ANY_SAMPLES_PASSED_CONSERVATIVE : GL_ANY_SAMPLES_PASSED);
  }

  beginTransformFeedbackQuery() {
    return this.begin(GL_TRANSFORM_FEEDBACK_PRIMITIVES_WRITTEN);
  }

  begin(target) {
    if (this._queryPending) {
      return this;
    }

    this.target = target;
    this.gl.beginQuery(this.target, this.handle);
    return this;
  }

  end() {
    if (this._queryPending) {
      return this;
    }

    if (this.target) {
      this.gl.endQuery(this.target);
      this.target = null;
      this._queryPending = true;
    }

    return this;
  }

  isResultAvailable() {
    if (!this._queryPending) {
      return false;
    }

    const resultAvailable = this.gl.getQueryParameter(this.handle, GL_QUERY_RESULT_AVAILABLE);

    if (resultAvailable) {
      this._queryPending = false;
    }

    return resultAvailable;
  }

  isTimerDisjoint() {
    return this.gl.getParameter(GL_GPU_DISJOINT_EXT);
  }

  getResult() {
    return this.gl.getQueryParameter(this.handle, GL_QUERY_RESULT);
  }

  getTimerMilliseconds() {
    return this.getResult() / 1e6;
  }

  createPoll() {
    let limit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Number.POSITIVE_INFINITY;

    if (this._pollingPromise) {
      return this._pollingPromise;
    }

    let counter = 0;
    this._pollingPromise = new Promise((resolve, reject) => {
      const poll = () => {
        if (this.isResultAvailable()) {
          resolve(this.getResult());
          this._pollingPromise = null;
        } else if (counter++ > limit) {
          reject('Timed out');
          this._pollingPromise = null;
        } else {
          requestAnimationFrame(poll);
        }
      };

      requestAnimationFrame(poll);
    });
    return this._pollingPromise;
  }

  _createHandle() {
    return Query.isSupported(this.gl) ? this.gl.createQuery() : null;
  }

  _deleteHandle() {
    this.gl.deleteQuery(this.handle);
  }

}
//# sourceMappingURL=query.js.map