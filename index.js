/* jshint strict:false */

var Canvas = require('canvas');

var DEFAULTS = {
  colorBg:     '999',
  colorFg:     'fff',
  maxFontSize: 120,
  maxHeight:   1600,
  maxWidth:    1600,
  route:       'imgipsum',
  textPadding: 0.1
};

module.exports = function() {
  return function (req, res, next) {
    var pathTokens = req.path.slice(1).split('/');

    // Check route
    if (pathTokens[0] !== DEFAULTS.route) return next();

    // TODO: Handle no params in route
    var dimensions = pathTokens[1].split('x');
    var width      = Math.min(parseInt(dimensions[0]), DEFAULTS.maxWidth);
    var height     = Math.min(parseInt(dimensions[1] || width), DEFAULTS.maxHeight);
    var colorBg    = pathTokens[2] || DEFAULTS.colorBg;
    var colorFg    = pathTokens[3] || DEFAULTS.colorFg;
    var text       = req.query.text || ('' + width + 'x' + height);

    // Create canvas
    var canvas = new Canvas(width, height);
    var ctx    = canvas.getContext('2d');

    // Set background
    ctx.fillStyle = '#' + colorBg;
    ctx.fillRect(0, 0, width, height);

    // Find optimal text size
    var textFits = false;
    var fontSize = DEFAULTS.maxFontSize;
    var textWidthPercent = 1 - DEFAULTS.textPadding * 2;
    while (!textFits) {
      ctx.font = '' + fontSize + 'px Impact';
      var textMetrics = ctx.measureText(text);
      if (textMetrics.width > (width * textWidthPercent)) {
        fontSize = Math.round(fontSize * 0.9);
      } else {
        textFits = true;
      }
    }

    // Set text
    ctx.textAlign    = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle    = '#' + colorFg;
    ctx.fillText(text, width / 2, height / 2);

    // Send
    res.header('Content-Type', 'image/png');
    var stream = canvas.pngStream();
    stream.pipe(res, function(err) {
      if (err) {
        return res.send(500, err);
      } else {
        return res.end();
      }
    });
  };
};
