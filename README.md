# avant
#### Cross-browser JavaScript events module

```sh
$ npm install avant --save
```

### Basic usage

```js
var avant = require('avant');
avant.listen(document, 'click', function(event) {
  console.log(event)
});
```

## API

### `avant.listen(node, type, listener)`
- Add an event <var>listener</var> for the specified event <var>type</var>

### `avant.unlisten(node, type, listener)`
- Remove the event <var>listener</var> for the specified event <var>type</var>

### `avant.support(type, node|tagname?)`
- Detect if the <var>node</var> supports the event <var>type</var>
- &rarr; <b>boolean</b>

## License
MIT