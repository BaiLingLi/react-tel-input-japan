
import React from 'react';
import ReactDOM from 'react-dom';
import TelephoneInput from '../src';

class Demo extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      value: '',
      valid: false
    };
  }

  render() {
    return (
      <div>
        <h2>Telephone Number Input Component</h2>
        <pre>{`<TelephoneInput
  value={this.state.value}
  onChange={(value, valid) => this.setState({ value, valid })}
  placeholder={'input telephone number'}
/>`}
        </pre>

        <TelephoneInput
          value={this.state.value}
          onChange={(value, valid) => this.setState({ value, valid })}
          placeholder={'input telephone number'}
        />

        <br />

        <bold>Inputed value:</bold>
        <pre>
          {this.state.value}
        </pre>
        <bold>Valid:</bold>
        <pre>
          {this.state.valid ? 'true' : 'false'}
        </pre>
      </div>
    );
  }
}

ReactDOM.render(
  <Demo />,
  document.querySelector('#main')
);
