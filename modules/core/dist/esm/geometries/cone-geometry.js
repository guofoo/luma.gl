import _objectSpread from "@babel/runtime/helpers/esm/objectSpread";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import TruncatedConeGeometry from './truncated-cone-geometry';
import { uid } from '../utils';

var ConeGeometry = function (_TruncatedConeGeometr) {
  _inherits(ConeGeometry, _TruncatedConeGeometr);

  function ConeGeometry() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, ConeGeometry);

    var _props$id = props.id,
        id = _props$id === void 0 ? uid('cone-geometry') : _props$id,
        _props$radius = props.radius,
        radius = _props$radius === void 0 ? 1 : _props$radius,
        _props$cap = props.cap,
        cap = _props$cap === void 0 ? true : _props$cap;
    return _possibleConstructorReturn(this, _getPrototypeOf(ConeGeometry).call(this, _objectSpread({}, props, {
      id: id,
      topRadius: 0,
      topCap: Boolean(cap),
      bottomCap: Boolean(cap),
      bottomRadius: radius
    })));
  }

  return ConeGeometry;
}(TruncatedConeGeometry);

export { ConeGeometry as default };
//# sourceMappingURL=cone-geometry.js.map