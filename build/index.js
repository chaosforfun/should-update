'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.onlyUpdateBy = onlyUpdateBy;
exports.noUpdateBy = noUpdateBy;

var _react = require('react');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 用高阶组件生产一个新的组件,新的组件只会在业务需要时才会重新渲染
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 常规业务有两种
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   1. 组件有N多属性,只有特定的几个属性更新时才需要重新渲染,这时候应该用onlyUpdateBy指定需要重新渲染的属性,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     只有这些指定属性更新时才会重新渲染
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   2. 组件有N多属性,只有特定几个属性更新不需要重新渲染,这时候应该用noUpldateBy指定不需要重新渲染的属性
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


function isEqual(a, b) {
  return a === b;
}
function getName(klass) {
  return klass.displayName || klass.name;
}

function theHOC(propList, isUpdate, SlowComponent) {
  var _class, _temp;

  var displayName = getName(SlowComponent);
  if (process.env.NODE_ENV !== 'production') {
    var tip = isUpdate ? 'will only' : 'will not';
    tip += ' be updated ty these props';
    console.info(displayName, tip, propList.toString());
  }

  return _temp = _class = function (_Component) {
    _inherits(_class, _Component);

    function _class() {
      _classCallCheck(this, _class);

      return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
    }

    _createClass(_class, [{
      key: 'shouldComponentUpdate',
      value: function shouldComponentUpdate(nextProps) {
        var props = this.props;

        var shouldUpdateProps = void 0;
        if (isUpdate) {
          shouldUpdateProps = propList;
        } else {
          shouldUpdateProps = Object.keys(nextProps).filter(function (key) {
            return propList.indexOf(key) === -1;
          });
        }
        var shuoldNotUpdate = shouldUpdateProps.every(function (key) {
          return isEqual(props[key], nextProps[key]);
        });
        return !shuoldNotUpdate;
      }
    }, {
      key: 'render',
      value: function render() {
        return React.createElement(SlowComponent, this.props);
      }
    }]);

    return _class;
  }(_react.Component), _class.displayName = 'SU' + displayName, _temp;
}
function onlyUpdateBy(propList) {
  return theHOC.bind(null, propList, true);
}
function noUpdateBy(propList) {
  return theHOC.bind(null, propList, false);
}