(function() {
  var dust = require('dustjs-linkedin'),
      type = require('tea-type');

  module.exports = function(obj, context) {
    context = context || obj;
    for (var key in obj) {
      var value = obj[key];
      switch (type(value)) {
        case 'string':
          if (value.indexOf('{') !== -1) {
            var compiled = dust.compile(value, 'temp');
            dust.loadSource(compiled);
            // DustJS is only asynchronous if loading partials, or using helpers that call chunk.map
            // We're not loading helpers, but if the config references partials, this will not work
            dust.render('temp', context, function(err, result) {
              delete dust.cache['temp'];
              return obj[key] = result;
            });
          }
          break;
        case 'array':
          for (var i = 0, len = value.length; i < len; i++) {
            value[i] = renderDustStrings(value[i], context);
          };
          break;
        case 'object':
          obj[key] = renderDustStrings(value, context);
          break;
      }
    }
    return obj;
  };

}).call(this);