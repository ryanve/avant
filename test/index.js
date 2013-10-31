(function(root) {
    var common = typeof module != 'undefined' && !!module.exports
      , aok = common ? require('../node_modules/aok') : root.aok
      , avant = root.avant;
    aok.log(avant);
}(this));