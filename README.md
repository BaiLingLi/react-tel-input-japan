# react-tel-input-japan

A react telephone number input component for japan.

The following features are provided.

- Treats line break as 1 letter in safari when the maxLength attribute is set.
- Supports placeholder with multiple lines.

```javascript
import TelephoneInput from 'react-tel-input-japan';

React.renderComponent(
  <div>
    <TelephoneInput
      value={this.state.memo}
      maxLength={30}
      placeholder="this is \na \nmultiple line \nplaceholder"
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
