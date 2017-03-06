# should-component-update-dev

[![Greenkeeper badge](https://badges.greenkeeper.io/ConciergeAuctions/should-component-update-dev.svg)](https://greenkeeper.io/)

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
import shouldComponentUpdateDev from 'should-component-update-dev';

class SomeReactComponent extends React {
 constructor(props) {
  super(props);
  this.shouldComponentUpdateDev = shouldComponentUpdate.bind(this);
 }
}
```

If you don't want it to completely overwrite your `shouldComponentUpdate` method then you
can just call it from within your existing method.

```js
shouldComponentUpdate(nextProps, nextState) {
  /* Your stuff here */
  shouldComponentUpdateDev.call(this, nextProps, nextState);
  /* Your other stuff here, or just return the above return value */
}
```

## License

MIT © Concierge Auctions
