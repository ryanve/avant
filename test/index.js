!function(root) {
  var doc = typeof document != 'undefined' && document
    , aok = doc ? root.aok : require('aok')
    , avant = doc ? root.avant : require('../src')
    , html = doc.documentElement
    , body = doc.body
    , methods = ['listen', 'unlisten', 'support']
    , aliases = ['addEvent', 'removeEvent', 'hasEvent'];
   
  aok('methods', !aok.fail(methods, function(n) {
    return typeof avant[n] == 'function';
  }));
  
  aok('aliases', !aok.fail(methods, function(n, i) {
    return avant[n] === avant[aliases[i]];
  }));
  
  if (!doc) return void aok.log('Basics seem fine. Open test/index.html to run DOM tests.');

  aok('.support(type)', true === avant.support('blur'));
  aok('.support(type, elem)', true === avant.support('blur', html));
  aok('.support(badtype)', false === avant.support('!!!'));
  aok('.support(type, i)', 2 === aok.pass(['blur', 'click'], avant.support, body));
}(this);