'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connectTheme = exports.ThemeProvider = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash.omit');

var _lodash2 = _interopRequireDefault(_lodash);

var _reactJss = require('react-jss');

var _reactJss2 = _interopRequireDefault(_reactJss);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Provide the theme object to context

var ThemeProvider = exports.ThemeProvider = function (_Component) {
  _inherits(ThemeProvider, _Component);

  function ThemeProvider() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, ThemeProvider);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(ThemeProvider)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.getChildContext = function () {
      return { theme: _this.props.theme };
    }, _this.render = function () {
      return _react.Children.only(_this.props.children);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  return ThemeProvider;
}(_react.Component);

// Pluck class names from the sheet and pass them down


ThemeProvider.childContextTypes = { theme: _react.PropTypes.object };
ThemeProvider.propTypes = { theme: _react.PropTypes.object.isRequired };
var PluckClasses = function PluckClasses(Comp) {
  return function (props) {
    var childProps = (0, _lodash2.default)(props, 'sheet');
    return _react2.default.createElement(Comp, _extends({}, childProps, { theme: props.sheet.classes }));
  };
};

// Pull the theme off of context and pass it to a 'PluckClasses' wrapped component
var connectTheme = exports.connectTheme = function connectTheme(mapThemeToCss) {
  return function (Composed) {
    var wrapped = function wrapped(props, context) {
      if (!context || !context.theme) return _react2.default.createElement(Composed, props);

      var jssComp = _react2.default.createElement((0, _reactJss2.default)(PluckClasses(Composed), mapThemeToCss(context.theme)), props);
      return jssComp;
    };

    wrapped.contextTypes = { theme: _react.PropTypes.object };
    wrapped.displayName = 'Theme(' + (Composed.displayName || 'component') + ')';
    wrapped.propTypes = Composed.propTypes;
    return wrapped;
  };
};
