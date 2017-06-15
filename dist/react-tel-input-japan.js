(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react'), require('prop-types')) :
  typeof define === 'function' && define.amd ? define(['exports', 'react', 'prop-types'], factory) :
  (factory((global.TelephoneInput = global.TelephoneInput || {}),global.React,global.PropTypes));
}(this, (function (exports,React,PropTypes) { 'use strict';

React = 'default' in React ? React['default'] : React;
PropTypes = 'default' in PropTypes ? PropTypes['default'] : PropTypes;

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};









var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};









var objectWithoutProperties = function (obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};



var set = function set(object, property, value, receiver) {
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent !== null) {
      set(parent, property, value, receiver);
    }
  } else if ("value" in desc && desc.writable) {
    desc.value = value;
  } else {
    var setter = desc.set;

    if (setter !== undefined) {
      setter.call(receiver, value);
    }
  }

  return value;
};

var isNumberOrHyphen = function isNumberOrHyphen(value) {
  return value.match(/^(\d|-)*$/) != null;
};

var isTelNumberValid = function isTelNumberValid(value) {
  return value.match(/^(050|070|080|090)-{0,1}\d{4}-{0,1}\d{4}$/) != null;
};

var getTelNumber = function getTelNumber(value) {
  return value.replace(/-/g, '');
};

var formatTelNumber = function formatTelNumber(value) {
  if (value.length === 11) {
    // format telephone number when pasted
    return value.substring(0, 3) + '-' + value.substring(3, 7) + '-' + value.substring(7);
  }
  return value;
};

var TelephoneInput = function (_React$Component) {
  inherits(TelephoneInput, _React$Component);

  function TelephoneInput(props) {
    classCallCheck(this, TelephoneInput);

    var _this = possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.state = {
      initialized: false,
      value: '',
      valid: false,
      cursorPosition: -1
    };

    _this.handleChange = _this.handleChange.bind(_this);
    return _this;
  }

  TelephoneInput.prototype.componentDidUpdate = function componentDidUpdate() {
    // const cursorPosition = this.state.cursorPosition;
    // if (cursorPosition !== -1) {
    //   this.setState({ cursorPosition: -1 });
    //   this.tel.selectionEnd = cursorPosition;
    //   this.textarea.selectionStart = cursorPosition;
    // }
  };

  TelephoneInput.prototype.handleChange = function handleChange(e) {
    var oldValue = this.state.value;
    var newValue = e.target.value;

    if (newValue.length === oldValue.length + 1) {
      // add hyphon when inputing a digit
      if (newValue.length === 3 && !newValue.includes('-') || newValue.length === 8 && !newValue.endsWith('-')) {
        newValue = newValue + '-';
      }
    } else if (newValue.length === oldValue.length - 1) {
      // delete hyphon when removing a digit
      if (oldValue.endsWith('-') && oldValue.startsWith(newValue)) {
        newValue = newValue.substring(0, newValue.length - 1);
      }
    }

    var value = getTelNumber(newValue);
    var valid = isTelNumberValid(value);

    this.setState({
      value: value.length === 11 ? formatTelNumber(value) : newValue,
      valid: valid,
      cursorPosition: e.target.selectionEnd
    });

    if (value !== getTelNumber(oldValue)) {
      // informs when changed
      this.props.onChange(value, valid);
    }
  };

  TelephoneInput.prototype.render = function render() {
    var _this2 = this;

    var _props = this.props,
        value = _props.value,
        onChange = _props.onChange,
        props = objectWithoutProperties(_props, ['value', 'onChange']);

    if (!this.state.initialized) {
      setTimeout(function () {
        _this2.setState({
          initialized: true,
          value: formatTelNumber(value),
          valid: isTelNumberValid(value)
        });
        onChange(_this2.state.value, _this2.state.valid);
      }, 0);
      return React.createElement('div', null);
    }

    return React.createElement('input', _extends({
      placeholder: '000-0000-0000'
    }, props, {
      type: 'tel',
      value: this.state.value,
      maxLength: 13,
      onChange: this.handleChange
    }));
  };

  return TelephoneInput;
}(React.Component);

TelephoneInput.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

TelephoneInput.defaultProps = {
  value: ''
};

exports.isNumberOrHyphen = isNumberOrHyphen;
exports.isTelNumberValid = isTelNumberValid;
exports.getTelNumber = getTelNumber;
exports.formatTelNumber = formatTelNumber;
exports['default'] = TelephoneInput;

Object.defineProperty(exports, '__esModule', { value: true });

})));
