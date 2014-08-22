/* jshint strict:false */

var Canvas = require('canvas');

module.exports = function() {
  return function (req, res, next) {
    var pathTokens = req.path.slice(1).split('/');

    // Check route
    if (pathTokens[0] !== 'imgipsum') return next();

    // TODO: Handle no params

    var dimensions = pathTokens[1].split('x');
    var width      = parseInt(dimensions[0]);
    var height     = parseInt(dimensions[1] || width);
    var colorBg    = pathTokens[2] || '999';
    var colorFg    = pathTokens[3] || 'fff';
    var text       = req.query.text || ('' + width + 'x' + height);

    // Create canvas
    var canvas = new Canvas(width, height);
    var ctx    = canvas.getContext('2d');

    // Set background
    ctx.fillStyle = '#' + colorBg;
    ctx.fillRect(0, 0, width, height);

    // Find optimal text size
    var textFits = false;
    var fontSize = 120;
    while (!textFits) {
      ctx.font = '' + fontSize + 'px Impact';
      var textMetrics = ctx.measureText(text);
      if (textMetrics.width > (width * 0.8)) {
        fontSize = Math.round(fontSize * 0.9);
      } else {
        textFits = true;
      }
    }

    // Set text
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#' + colorFg;
    ctx.fillText(text, width / 2, height / 2);

    // Send
    res.header('Content-Type', 'image/png');
    var stream = canvas.pngStream();
    stream.pipe(res, function(err) {
      if (err) {
        res.send(500, err);
      } else {
        res.end();
      }
    });
  };
};
