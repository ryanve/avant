/*!
 * avant 0.0.0+201310310727
 * https://github.com/ryanve/avant
 * MIT License 2013 Ryan Van Etten
 */

(function(root, name, make) {
    if (typeof module != 'undefined' && module['exports']) module['exports'] = make();
    else root[name] = make();
}(this, 'avant', function() {

    var doc = document
      , W3C = !!doc.addEventListener;
        
    return {
        'addEvent': W3C ? function(node, type, fn) { 
            node.addEventListener(type, fn, false); 
        } : function(node, type, fn) { 
            node.attachEvent('on' + type, fn); 
        }
      , 'removeEvent': W3C ? function(node, type, fn) { 
            node.removeEventListener(type, fn, false); 
        } : function(node, type, fn) {
            node.detachEvent('on' + type, fn); 
        }
      , 'hasEvent': (function(doc, und) {
            var div = 'div'
              , modern = 'onblur' in doc.documentElement
              , remAtt = 'removeAttribute'
              , setAtt = 'setAttribute'
              , create = 'createElement';

            /**
             * @param {string|*} event to test for (e.g. 'blur')
             * @param {(Node|Window|string|*)=} node object or tagName
             * @return {boolean} true if the object supports the event
             * @link http://github.com/Modernizr/Modernizr/pull/636
             * @link http://bit.ly/event-detection
             */
            return function(event, node) {
                var bool;
                if (!event) return false;
                event = 'on' + event;
                node = typeof node == 'number' ? this : node; // arrays
                node = typeof node != 'string' && node ? node : doc[create](node || div);
                bool = event in node; // suffices in modern browsers and IE
                if (!bool && !modern) {
                    if (node.nodeType || node.window == node) {
                        node[setAtt] ? node : node = doc[create](div);
                        if (node[setAtt] && node[remAtt]) {
                            node[setAtt](event, '');
                            bool = typeof node[event] == 'function';
                            und === node[event] || (node[event] = und);
                            node[remAtt](event); // cleanup
                        }
                    }
                }
                return bool;
            };
        }(doc))
    };
}));