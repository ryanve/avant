(function(root) {
  var doc = typeof document != 'undefined' && document
    , aok = doc ? root.aok : require('aok')
    , avant = doc ? root.avant : require('../src')
    , html = doc.documentElement
    , body = doc.body;
    
  aok('methods', !aok.fail(['addEvent', 'removeEvent', 'hasEvent'], function(n) {
    return typeof avant[n] == 'function';
  }));
  
  if (!doc) return void aok.log('Basics seem fine. Open test/index.html to run DOM tests.');

  aok('hasEvent-1', true === avant.hasEvent('blur'));
  aok('hasEvent-2', true === avant.hasEvent('blur', html));
  aok('hasEvent-3', false === avant.hasEvent('!!!'));
  aok('hasEvent-4', 2 === aok.pass(['blur', 'click'], avant.hasEvent, body));
}(this));