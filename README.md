# should-component-update-dev

> Logs out the reason why `shouldComponentUpdate` is returning true

![Example](http://i.imgur.com/vTyhTxf.png)

Only logs out the reason if `shallowCompare` returns `false` (meaning `shouldComponentUpdate` will likely return `true`).
Doesn't do any logging if `process.env.NODE_ENV !== 'production'`.

This can be really useful if you're still getting a lot of renders even with `pure-render-mixin` or `shallowCompare`.


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
