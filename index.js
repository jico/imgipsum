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

function merge(obj1, obj2){
  var obj3 = {};
  for (var prop1 in obj1) { obj3[prop1] = obj1[prop1]; }
  for (var prop2 in obj2) { obj3[prop2] = obj3[prop2]; }
  return obj3;
}

module.exports = function(options) {
  options = merge(DEFAULTS, options);

  return function (req, res, next) {
    var pathTokens = req.path.slice(1).split('/');

    // Check route
    if (pathTokens[0] !== options.route) return next();

    // TODO: Handle no params in route
    var dimensions = pathTokens[1].split('x');
    var width      = Math.min(parseInt(dimensions[0]), options.maxWidth);
    var height     = Math.min(parseInt(dimensions[1] || width), options.maxHeight);
    var colorBg    = pathTokens[2] || options.colorBg;
    var colorFg    = pathTokens[3] || options.colorFg;
    var text       = req.query.text || ('' + width + 'x' + height);

    // Create canvas
    var canvas = new Canvas(width, height);
    var ctx    = canvas.getContext('2d');

    // Set background
    ctx.fillStyle = '#' + colorBg;
    ctx.fillRect(0, 0, width, height);

    // Find optimal text size
    var textFits = false;
    var fontSize = options.maxFontSize;
    var textWidthPercent = 1 - options.textPadding * 2;
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
