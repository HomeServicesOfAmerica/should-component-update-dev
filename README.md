# should-component-update-dev

> Logs out the reason why `shouldComponentUpdate` is returning true

![Example](http://i.imgur.com/vTyhTxf.png)

## Install

```
$ npm install --save-dev should-component-update-dev
```


## Usage

Just import the package and bind it to your React component

```js
import shouldComponentUpdate from 'should-component-update-dev';

class SomeReactComponent extends React {
 constructor(props) {
  super(props);
  this.shouldComponentUpdate = shouldComponentUpdate.bind(this);
 }
}
```

## License

MIT © Concierge Auctions
