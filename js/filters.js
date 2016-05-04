"use strict";

var Filters = Filters || {};



// space for general utility functions, if you want
var pi = 3.14159265359;

function clamp(val, min, max) {
  return val < min ? min : (val > max ? max : val);
}

// ----------- STUDENT CODE BEGIN ------------
// ----------- Our reference solution uses 77 lines of code.
// ----------- STUDENT CODE END ------------



Filters.samplePixel = function ( image, x, y, mode ) {
  if ( mode == 'bilinear') {
    // ----------- STUDENT CODE BEGIN ------------
    // ----------- Our reference solution uses 19 lines of code.
    // ----------- STUDENT CODE END ------------
    Gui.alertOnce ('bilinear sampling is not implemented yet');

  } else if ( mode == 'gaussian' ) {
    // ----------- STUDENT CODE BEGIN ------------
    // ----------- Our reference solution uses 37 lines of code.
    // ----------- STUDENT CODE END ------------
    Gui.alertOnce ('gaussian sampling is not implemented yet');

  } else { // point sampling

    y = Math.max( 0, Math.min(Math.round(y), image.height- 1) );
    x = Math.max( 0, Math.min(Math.round(x), image.width - 1) );
    return image.getPixel(x, y);
  }
}

Filters.fillFilter = function( image, color ) {
  image.fill(color);

  return image;
};

Filters.brightnessFilter = function( image, ratio ) {
  var alpha, dirLuminance;
  if (ratio < 0.0) {
    alpha = 1 + ratio;
    dirLuminance = 0;   // blend with black
  } else {
    alpha = 1 - ratio;
    dirLuminance = 1; // blend with white
  }

  for (var x = 0; x < image.width; x++) {
    for (var y = 0; y < image.height; y++) {
      var pixel = image.getPixel(x, y);

      pixel.data[0] = alpha * pixel.data[0] + (1-alpha) * dirLuminance;
      pixel.data[1] = alpha * pixel.data[1] + (1-alpha) * dirLuminance;
      pixel.data[2] = alpha * pixel.data[2] + (1-alpha) * dirLuminance;

      image.setPixel(x, y, pixel)
    }
  }

  return image;
};

Filters.contrastFilter = function( image, ratio ) {
  // Reference: https://en.wikipedia.org/wiki/Image_editing#Contrast_change_and_brightening
  // ----------- STUDENT CODE BEGIN ------------
  // ----------- Our reference solution uses 14 lines of code.
  // ----------- STUDENT CODE END ------------
  Gui.alertOnce ('contrastFilter is not implemented yet');
  return image;

};

Filters.gammaFilter = function( image, logOfGamma ) {
  var gamma = Math.exp(logOfGamma);
  // ----------- STUDENT CODE BEGIN ------------
  // ----------- Our reference solution uses 12 lines of code.
  // ----------- STUDENT CODE END ------------
  Gui.alertOnce ('gammaFilter is not implemented yet');
  return image;

};

Filters.vignetteFilter = function( image, innerR, outerR ) {
  innerR = clamp(innerR, 0, outerR-0.1); // innerR should be at least 0.1 smaller than outerR
  // ----------- STUDENT CODE BEGIN ------------
  // ----------- Our reference solution uses 17 lines of code.
  // ----------- STUDENT CODE END ------------
  Gui.alertOnce ('vignetteFilter is not implemented yet');
  return image;
};

Filters.histogramEqualizationFilter = function( image ) {
  // ----------- STUDENT CODE BEGIN ------------
  // ----------- Our reference solution uses 31 lines of code.
  // ----------- STUDENT CODE END ------------
  Gui.alertOnce ('histogramEqualizationFilter is not implemented yet');
  return image;
};

Filters.grayscaleFilter = function( image ) {
  for (var x = 0; x < image.width; x++) {
    for (var y = 0; y < image.height; y++) {
      var pixel = image.getPixel(x, y);
      var luminance = 0.2126 * pixel.data[0] + 0.7152 * pixel.data[1] + 0.0722 * pixel.data[2];
      pixel.data[0] = luminance;
      pixel.data[1] = luminance;
      pixel.data[2] = luminance;

      image.setPixel(x, y, pixel);
    }
  }

  return image;
};

Filters.saturationFilter = function( image, ratio ) {
  // ----------- STUDENT CODE BEGIN ------------
  // ----------- Our reference solution uses 13 lines of code.
  // ----------- STUDENT CODE END ------------
  Gui.alertOnce ('saturationFilter is not implemented yet');
  return image;
};

Filters.whiteBalanceFilter = function( image, white ) {
  // ----------- STUDENT CODE BEGIN ------------
  // ----------- Our reference solution uses 23 lines of code.
  // ----------- STUDENT CODE END ------------
  Gui.alertOnce ('whiteBalanceFilter is not implemented yet');
  return image;
};

Filters.histogramMatchFilter = function( image, refImg, value ) {
  // ----------- STUDENT CODE BEGIN ------------
  // ----------- Our reference solution uses 0 lines of code.
  // ----------- STUDENT CODE END ------------
  Gui.alertOnce ('histogramMatchFilter is not implemented yet');
  return image;
};

Filters.gaussianFilter = function( image, sigma ) {
  // note: this function needs to work in a new copy of the image
  //       to avoid overwriting original pixels values needed later
  // create a new image with the same size as the input image
  var newImg = image.createImg(image.width, image.height);
  // the filter window will be [-winR, winR];
  var winR = Math.round(sigma*3);
  // ----------- STUDENT CODE BEGIN ------------
  // ----------- Our reference solution uses 54 lines of code.
  // ----------- STUDENT CODE END ------------
  Gui.alertOnce ('gaussianFilter is not implemented yet');
  return newImg;
};

Filters.edgeFilter = function( image ) {
  // ----------- STUDENT CODE BEGIN ------------
  // ----------- Our reference solution uses 51 lines of code.
  // ----------- STUDENT CODE END ------------
  Gui.alertOnce ('edgeFilter is not implemented yet');
  return image;
};

Filters.sharpenFilter = function( image ) {
  // ----------- STUDENT CODE BEGIN ------------
  // ----------- Our reference solution uses 29 lines of code.
  // ----------- STUDENT CODE END ------------
  Gui.alertOnce ('sharpenFilter is not implemented yet');
  return image;
};

Filters.medianFilter = function( image, winR ) {
  // winR: the window will be  [-winR, winR];
  // ----------- STUDENT CODE BEGIN ------------
  // ----------- Our reference solution uses 31 lines of code.
  // ----------- STUDENT CODE END ------------
  Gui.alertOnce ('medianFilter is not implemented yet');
  return image;
};

Filters.bilateralFilter = function( image, sigmaR, sigmaS ) {
  // reference: https://en.wikipedia.org/wiki/Bilateral_filter
  // ----------- STUDENT CODE BEGIN ------------
  // ----------- Our reference solution uses 48 lines of code.
  // ----------- STUDENT CODE END ------------
  Gui.alertOnce ('bilateralFilter is not implemented yet');
  return image;
};

Filters.quantizeFilter = function( image, bitsPerChannel ) {
  var valuesPerChannel = Math.pow(2, bitsPerChannel)
  // ----------- STUDENT CODE BEGIN ------------
  // ----------- Our reference solution uses 12 lines of code.
  // ----------- STUDENT CODE END ------------
  Gui.alertOnce ('quantizeFilter is not implemented yet');
  return image;
};

Filters.randomFilter = function( image, bitsPerChannel ) {
  var valuesPerChannel = Math.pow(2, bitsPerChannel)
  // ----------- STUDENT CODE BEGIN ------------
  // ----------- Our reference solution uses 12 lines of code.
  // ----------- STUDENT CODE END ------------
  Gui.alertOnce ('randomFilter is not implemented yet');
  return image;

};

Filters.orderedFilter = function( image, bitsPerChannel ) {
  var valuesPerChannel = Math.pow(2, bitsPerChannel)
  // ----------- STUDENT CODE BEGIN ------------
  // ----------- Our reference solution uses 31 lines of code.
  // ----------- STUDENT CODE END ------------
  Gui.alertOnce ('orderedFilter is not implemented yet');
  return image;

};

Filters.floydFilter = function( image, bitsPerChannel ) {
  var valuesPerChannel = Math.pow(2, bitsPerChannel)
  // ----------- STUDENT CODE BEGIN ------------
  // ----------- Our reference solution uses 23 lines of code.
  // ----------- STUDENT CODE END ------------
  Gui.alertOnce ('floydFilter is not implemented yet');
  return image;
};

Filters.scaleFilter = function( image, ratio, sampleMode ) {
  // ----------- STUDENT CODE BEGIN ------------
  // ----------- Our reference solution uses 19 lines of code.
  // ----------- STUDENT CODE END ------------
  Gui.alertOnce ('scaleFilter is not implemented yet');
  return image;
};

Filters.translateFilter = function( image, x, y, sampleMode ) {
  // Note: set pixels outside the image to RGBA(0,0,0,0)
  // ----------- STUDENT CODE BEGIN ------------
  // ----------- Our reference solution uses 21 lines of code.
  // ----------- STUDENT CODE END ------------
  Gui.alertOnce ('translateFilter is not implemented yet');
  return image;
};

Filters.rotateFilter = function( image, radians, sampleMode ) {
  // Note: set pixels outside the image to RGBA(0,0,0,0)
  // ----------- STUDENT CODE BEGIN ------------
  // ----------- Our reference solution uses 30 lines of code.
  // ----------- STUDENT CODE END ------------
  Gui.alertOnce ('rotateFilter is not implemented yet');
  return image;
};

Filters.swirlFilter = function( image, radians, sampleMode ) {
  // ----------- STUDENT CODE BEGIN ------------
  // ----------- Our reference solution uses 27 lines of code.
  // ----------- STUDENT CODE END ------------
  Gui.alertOnce ('swirlFilter is not implemented yet');
  return image;
};

Filters.getAlphaFilter = function( backgroundImg, foregroundImg) {
  for (var i = 0; i < backgroundImg.height; i++) {
    for (var j = 0; j < backgroundImg.width; j++) {
      var pixelBg = backgroundImg.getPixel(j, i);
      var pixelFg = foregroundImg.getPixel(j, i);
      var luminance = 0.2126 * pixelFg.data[0] + 0.7152 * pixelFg.data[1] + 0.0722 * pixelFg.data[2];
      pixelBg.a = luminance;
      backgroundImg.setPixel(j, i, pixelBg);
    }
  }

  return backgroundImg;
};

Filters.compositeFilter = function( backgroundImg, foregroundImg ) {
  // ----------- STUDENT CODE BEGIN ------------
  // ----------- Our reference solution uses 14 lines of code.
  // ----------- STUDENT CODE END ------------
  Gui.alertOnce ('compositeFilter is not implemented yet');
  return backgroundImg;
};

Filters.morphFilter = function( initialImg, finalImg, alpha, sampleMode, linesFile ) {
  var lines = Parser.parseJson( "images/" + linesFile );

  // ----------- STUDENT CODE BEGIN ------------
  // ----------- Our reference solution uses 83 lines of code.
  // ----------- STUDENT CODE END ------------
  Gui.alertOnce ('morphFilter is not implemented yet');
  return image;
};

Filters.brushFilter = function( image, radius, color, vertsString ) {
  // extract vertex coordinates from the URL string.
  var centers = [];
  var coordStrings = vertsString.split("x");
  var coordsSoFar = 0;
  for (var i = 0; i < coordStrings.length; i++) {
    var coords = coordStrings[i].split("y");
    var x = parseInt(coords[0]);
    var y = parseInt(coords[1]);
    if (!isNaN(x) && !isNaN(y)) {
      centers.push({
        x: x,
        y: y,
      })
    }
  }

  // draw a filled circle centered at every location in centers[].
  // radius and color are specified in function arguments.
  // ----------- STUDENT CODE BEGIN ------------
  // ----------- Our reference solution uses 10 lines of code.
  // ----------- STUDENT CODE END ------------
  Gui.alertOnce ('brushFilter is not implemented yet');

  return image;
};


Filters.paletteFilter = function( image, colorNum ) {
  // ----------- STUDENT CODE BEGIN ------------
  // ----------- Our reference solution uses 83 lines of code.
  // ----------- STUDENT CODE END ------------
  Gui.alertOnce ('paletteFilter is not implemented yet');
  return image;
};

Filters.paintFilter = function( image, value ) {
  // http://mrl.nyu.edu/publications/painterly98/hertzmann-siggraph98.pdf
  // ----------- STUDENT CODE BEGIN ------------
  // ----------- Our reference solution uses 52 lines of code.
  // ----------- STUDENT CODE END ------------
  Gui.alertOnce ('paintFilter is not implemented yet');
  return image;
};

Filters.xDoGFilter = function( image, value ) {
  // value could be an array
  // ----------- STUDENT CODE BEGIN ------------
  // ----------- Our reference solution uses 60 lines of code.
  // ----------- STUDENT CODE END ------------
  Gui.alertOnce ('xDoGFilter is not implemented yet');
  return image;
};

Filters.customFilter = function( image, value ) {
  // You can use this filter to do whatever you want, for example
  // trying out some new idea or implementing something for the
  // art contest.
  // Currently the 'value' argument will be 1 or whatever else you set
  // it to in the URL. You could use this value to switch between
  // a bunch of different versions of your code if you want to
  // code up a bunch of different things for the art contest.
  // ----------- STUDENT CODE BEGIN ------------
  // ----------- Our reference solution uses 0 lines of code.
  // ----------- STUDENT CODE END ------------
  Gui.alertOnce ('customFilter is not implemented yet');
  return image;
};
