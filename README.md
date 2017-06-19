# react-tel-input-japan

A react telephone number input component for japan.

The following features are provided.

- Inputs a telephone number and displays it with format of xxx-xxxx-xxxx.
  - It adds and removes "-" automatically.
  - It keeps the cursor position as much as possible.
  - It keeps the "-" when editing a inputted value.

- Validates the telephone number and return the validate result with the second parameters of onChange function.

```javascript
import TelephoneInput from 'react-tel-input-japan';

React.renderComponent(
  <div>
    <TelephoneInput
      value={this.state.value}
      onChange={(value, valid) => this.setState({ value, valid })}
      placeholder={'input telephone number'}
    />
  </div>,
  document.querySelector('#element'));
```

## Install

`npm install react-tel-input-japan`

## Demo

https://bailingli.github.io/react-tel-input-japan/example/index.html

## Development

To release patch, minor or major version:

    % npm run release:patch
    % npm run release:minor
    % npm run release:major

This will run eslint, compile sources from `src/` to `lib/`, `es/` and `dist/`, bump a
version in `package.json` and then create a new git commit with tag. If tests or
linter fails — commit won't be created. If tasks succeed it publishes to npm and pushes a tag to github.
