(function(root, name, make) {
  if (typeof module != 'undefined' && module['exports']) module['exports'] = make();
  else root[name] = make();
}(this, 'avant', function() {

  var api = {}
    , doc = document
    , W3C = !!doc.addEventListener
    , modernLookup = 'onblur' in doc.documentElement
    , setAtt = 'setAttribute'
    , remAtt = 'removeAttribute'
    , create = 'createElement';
  
  api['addEvent'] = W3C ? function(node, type, fn) {
    node.addEventListener(type, fn, false); 
  } : function(node, type, fn) { 
    node.attachEvent('on' + type, fn); 
  };
  
  api['removeEvent'] = W3C ? function(node, type, fn) { 
    node.removeEventListener(type, fn, false); 
  } : function(node, type, fn) {
    node.detachEvent('on' + type, fn); 
  };
  
  /**
   * @param {!string} type event name to test for (e.g. 'blur')
   * @param {(Node|Window|string|number)=} node to test on (defaults to div) or iteration index
   * @return {boolean} true if `node` supports the event
   * @link http://github.com/Modernizr/Modernizr/pull/636
   * @link http://bit.ly/event-detection
   */
  api['hasEvent'] = function(type, node) {
    var und, bool = false;
    if (!type) return bool;
    type = 'on' + type;
    node = typeof node == 'number' ? this : node;
    node = typeof node != 'string' && node || doc[create](node || 'div');
    bool = type in node; // suffices in modern browsers and IE, but not old FF
    if (bool || modernLookup || !node.nodeType && node.window != node) return bool;
    if (!node[setAtt]) node = doc[create]('div');
    if (!node[setAtt] || !node[remAtt]) return bool;
    // hack for old FF
    node[setAtt](type, '');
    bool = typeof node[type] == 'function';
    if (und !== node[type]) node[type] = und;
    node[remAtt](type);
    return bool;
  };
    
  return api;
}));