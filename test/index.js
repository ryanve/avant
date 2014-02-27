(function(root) {
  var common = typeof module != 'undefined' && !!module.exports
    , aok = common ? require('../node_modules/aok') : root.aok
    , avant = root.avant
    , html = document.documentElement
    , body = document.body;
    
  aok('methods', !aok.fail(['addEvent', 'removeEvent', 'hasEvent'], function(n) {
    return typeof avant[n] == 'function';
  }));

  aok('hasEvent-1', true === avant.hasEvent('blur'));
  aok('hasEvent-2', true === avant.hasEvent('blur', html));
  aok('hasEvent-3', false === avant.hasEvent('!!!'));
  aok('hasEvent-4', 2 === aok.pass(['blur', 'click'], avant.hasEvent, body));
}(this));