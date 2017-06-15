import React from 'react';
import PropTypes from 'prop-types';

export const isNumberOrHyphen = (value) => {
  return value.match(/^(\d|-)*$/) != null;
};

export const isTelNumberValid = (value) => {
  return value.match(/^(050|070|080|090)-{0,1}\d{4}-{0,1}\d{4}$/) != null;
};

export const getTelNumber = (value) => {
  return value.replace(/-/g, '');
};

export const formatTelNumber = (value) => {
  if (value.length === 11) {
    // format telephone number when pasted
    return `${value.substring(0, 3)}-${value.substring(3, 7)}-${value.substring(7)}`;
  }
  return value;
};

class TelephoneInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initialized: false,
      value: '',
      valid: false,
      cursorPosition: -1
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidUpdate() {
    // const cursorPosition = this.state.cursorPosition;
    // if (cursorPosition !== -1) {
    //   this.setState({ cursorPosition: -1 });
    //   this.tel.selectionEnd = cursorPosition;
    //   this.textarea.selectionStart = cursorPosition;
    // }
  }

  handleChange(e) {
    const oldValue = this.state.value;
    let newValue = e.target.value;

    if (newValue.length === oldValue.length + 1) {
      // add hyphon when inputing a digit
      if ((newValue.length === 3 && !newValue.includes('-'))
          || (newValue.length === 8 && !newValue.endsWith('-'))) {
        newValue = newValue + '-';
      }
    } else if (newValue.length === oldValue.length - 1) {
      // delete hyphon when removing a digit
      if (oldValue.endsWith('-') && oldValue.startsWith(newValue)) {
        newValue = newValue.substring(0, newValue.length - 1);
      }
    }

    const value = getTelNumber(newValue);
    const valid = isTelNumberValid(value);

    this.setState({
      value: value.length === 11 ? formatTelNumber(value) : newValue,
      valid,
      cursorPosition: e.target.selectionEnd
    });

    if (value !== getTelNumber(oldValue)) {
      // informs when changed
      this.props.onChange(value, valid);
    }
  }

  render() {
    const { value, onChange, ...props } = this.props;
    if (!this.state.initialized) {
      setTimeout(() => {
        this.setState({
          initialized: true,
          value: formatTelNumber(value),
          valid: isTelNumberValid(value)
        });
        onChange(this.state.value, this.state.valid);
      }, 0);
      return <div />;
    }

    return (
      <input
        placeholder="000-0000-0000"
        {...props}
        type="tel"
        value={this.state.value}
        maxLength={13}
        onChange={this.handleChange}
      />
    );
  }
}

TelephoneInput.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

TelephoneInput.defaultProps = {
  value: ''
};

export default TelephoneInput;
