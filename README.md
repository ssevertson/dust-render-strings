dust-render-strings
===================

A stupid-simple utility to evaluate any strings in an object which contain dust templates, in the context of the provided object.

Useful for providing templating capabilities for configuration JSON files. For example, with [Flatiron](https://github.com/flatiron/flatiron) or [NConf](https://github.com/flatiron/nconf):

    var dustRenderStrings = require('dust-render-strings');
    app.config.stores.literal.store = dustRenderStrings(app.config.get());
