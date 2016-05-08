"use strict";

var Filters = Filters || {};

var i2;


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
    var lums = [];
  for (var i = 0; i <= 256; i++) {
    lums.push(0);
  }
  //calculate number of occurances of each gray level
  for (var x = 0; x < image.width; x++) {
    for (var y = 0; y < image.height; y++) {
      var pixel = image.getPixel(x, y);
      var luminance = 0.2126 * pixel.data[0] + 0.7152 * pixel.data[1] + 0.0722 * pixel.data[2];
      luminance = Math.round(255 * luminance);
      lums[luminance] = lums[luminance] + 1;
    }
  }
  //create cdf from those frequencies (not divided by number of pixels)
  for (var i = 1; i <= 256; i++) {
    lums[i] = lums[i] + lums[i-1];
  }
  //use given formula to change luminance of each pixel
  for (var x = 0; x < image.width; x++) {
    for (var y = 0; y < image.height; y++) {
      var pixel = image.getPixel(x, y);
      var luminance = 0.2126 * pixel.data[0] + 0.7152 * pixel.data[1] + 0.0722 * pixel.data[2];
      luminance = Math.round(255 * luminance);
      var newlum = Math.round(255*(lums[luminance] - 1)/(image.width*image.height) - 1) / 255;
      pixel = pixel.rgbToHsl();
      pixel.data[2] = newlum;
      pixel = pixel.hslToRgb();
      pixel.clamp();
      image.setPixel(x, y, pixel);
    }
  }
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
  for (var x = 0; x < backgroundImg.width; x++) {
    for (var y = 0; y < backgroundImg.height; y++) {
      var p1 = foregroundImg.getPixel(x, y);
      var p2 = backgroundImg.getPixel(x, y);
      var alpha = p1.a;
      p2.data[0] = alpha * p1.data[0] + (1-alpha)* p2.data[0];
      p2.data[1] = alpha * p1.data[1] + (1-alpha)* p2.data[1];
      p2.data[2] = alpha * p1.data[2] + (1-alpha)* p2.data[2];
      backgroundImg.setPixel(x, y, p2);
    }
  }
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

Filters.brushFilter = function( i1, radius, color, vertsString ) {
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

  var innerR = radius;
  var outerR = radius * 1.5;
  var i3 = i1.copyImg(i1);
  for (var x = 0; x < i1.width; x++) {
    for (var y = 0; y < i1.height; y++) {
      var inside = false;
      var partial = false;
      var minalpha = 1;

      var p2 = i1.getPixel(x, y);
      var p1 = i2.getPixel(x, y);
      var pixel = new Pixel(0, 0, 0, 1);
      for (var i = 0; i < centers.length; i++) {
        var xmid = centers[i].x;
        var ymid = centers[i].y;
        var r = ((x - xmid) * (x - xmid)) + ((y - ymid) * (y - ymid));
        var halfdiag = 100;
        var alpha = 1 - (((Math.pow(r, .5) / halfdiag)  - innerR) / (outerR - innerR));
        if (alpha < minalpha && alpha >= 0) minalpha = alpha;
        if (Math.pow(r, .5) < innerR * halfdiag) inside = true;
        if (Math.pow(r, .5) < outerR * halfdiag) partial = true;
      }
      //if it is outside the outer circle, paint it
      if (inside == true) {
        pixel = p1;
      }
      //if it is between the two circles, make it kind of painted
      else if (partial == true) {
        pixel.data[0] = minalpha * p1.data[0] + (1 - minalpha) * p2.data[0];
        pixel.data[1] = minalpha * p1.data[1] + (1 - minalpha) * p2.data[1];
        pixel.data[2] = minalpha * p1.data[2] + (1 - minalpha) * p2.data[2];
      }
      //otherwise leave it alone
      else pixel = p2;
      pixel.clamp();
      i3.setPixel(x, y, pixel);
    }
  }
  return i3;
};


Filters.paletteFilter = function( image, colorNum ) {
  // ----------- STUDENT CODE BEGIN ------------
  // ----------- Our reference solution uses 83 lines of code.
  // ----------- STUDENT CODE END ------------
  Gui.alertOnce ('paletteFilter is not implemented yet');
  return image;
};


Filters.applyToArea = function(i1, radius, blah, vertsString) {

  var x1 = i1.width / 2.0;
  var y1 = i1.height / 2.0;
  var halfdiag = Math.pow(((4 * x1 * x1) + (4 * y1 * y1)), .5) / 2.0;

  console.log(vertsString);
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

  var innerR = radius;
  var outerR = radius * 1.5;
  var i3 = i1.copyImg(i1);
  for (var x = 0; x < i1.width; x++) {
    for (var y = 0; y < i1.height; y++) {
      var inside = false;
      var partial = false;
      var minalpha = 1;

      var p1 = i1.getPixel(x, y);
      var p2 = i2.getPixel(x, y);
      var pixel = new Pixel(0, 0, 0, 1);
      for (var i = 0; i < centers.length; i++) {
        var xmid = centers[i].x;
        var ymid = centers[i].y;
        var r = ((x - xmid) * (x - xmid)) + ((y - ymid) * (y - ymid));
        //var halfdiag = 100;
        var alpha = 1 - (((Math.pow(r, .5) / halfdiag)  - innerR) / (outerR - innerR));
        if (alpha < minalpha && alpha >= 0) minalpha = alpha;
        if (Math.pow(r, .5) < innerR * halfdiag) inside = true;
        if (Math.pow(r, .5) < outerR * halfdiag) partial = true;
      }
      //if it is outside the outer circle, paint it
      if (inside == true) {
        pixel = p1;
      }
      //if it is between the two circles, make it kind of painted
      /*else if (partial == true) {
        pixel.data[0] = minalpha * p1.data[0] + (1 - minalpha) * p2.data[0];
        pixel.data[1] = minalpha * p1.data[1] + (1 - minalpha) * p2.data[1];
        pixel.data[2] = minalpha * p1.data[2] + (1 - minalpha) * p2.data[2];
        //pixel = new Pixel(0, 0, 0 , 1);
      }*/
      //otherwise leave it alone
      else pixel = p2;
      pixel.clamp();
      i3.setPixel(x, y, pixel);
    }
  }
  return i3;
};

Filters.brushStrokes = function(image, imageCopy, s, direction, length, reps) {
    var size = s;
    for (var i = 0; i < reps; i++) {
    var x = Math.random() * image.width;
    var y = Math.random() * image.height;
    var color = image.getPixel(x, y);
    for (var z = 0; z < length; z++) {
      var tx = Math.round(x + z * direction[0]);
      var ty = Math.round(y + z * direction[1]);
      for (var j = -size; j < size; j++) {
        for (var k = -size; k < size; k++) {
          var r = j*j + k*k;
          if (tx + j >= 0 && tx + j < image.width && ty + k >= 0 && ty + k < image.height && r < size * size) imageCopy.setPixel(tx + j, ty + k, color);
        }
      }
    }
  }
  return imageCopy;
}

Filters.paint2Filter = function( image, s, l, angle) {
  s = s * 2;
  var imageCopy = image.copyImg();
  var length = 100 * l + 1;
  var direction = [Math.cos(angle), Math.sin(angle)];
  var size = Math.round(20 * s);

  imageCopy = Filters.brushStrokes(image, imageCopy, size, direction, length, 200);

  size = Math.round(10 * s);
  imageCopy = Filters.brushStrokes(image, imageCopy, size, direction, length, 600);


  size = Math.round(5 * s);
  imageCopy = Filters.brushStrokes(image, imageCopy, size, direction, length, 600);

  i2 = imageCopy.copyImg();
  return image;
};

Filters.paintFilter = function (image, size, l, angle) {
  var s = .2;
  var tmp = image.copyImg();
  var img = mosaic_grayscale(tmp); 
  img = mosaic_histEq(img); 
  var sigma = 16; 
  img = mosaic_gaussian(img, sigma); 

  // Compute mean luminance
  var sum = 0; 
  var nTotal = image.width*image.height; 
  for (var x = 0; x < image.width; x++) {
    for (var y = 0; y < image.height; y++) {
      var pixel = img.getPixel(x, y); 
      sum += pixel.data[2]; 
    }
  }
  var u = sum / nTotal; 

  // Compute variance of luminance 
  sum = 0; 
  for (var x = 0; x < image.width; x++) {
    for (var y = 0; y < image.height; y++) {
      var pixel = img.getPixel(x, y); 
      sum += (pixel.data[2] - u)*(pixel.data[2] - u); 
    }
  }
  var v = sum / (nTotal); 

  // Set luminance to 1 if | I(x, y) - u | > T, T = v / 4
  // ADJUST THIS PARAMETER
  var T = v / 4; 
  for (var x = 0; x < image.width; x++) {
    for (var y = 0; y < image.height; y++) {
      var pixel = img.getPixel(x, y); 
      if (Math.abs(pixel.data[2] - u) > T) {
        pixel.data[0] = 1; 
        pixel.data[1] = 1; 
        pixel.data[2] = 1; 
        pixel.clamp(); 
      }
      else {
        pixel.data[0] = 0; 
        pixel.data[1] = 0; 
        pixel.data[2] = 0; 
      }
      img.setPixel(x, y, pixel); 
    }
  }

  for (var x = 0; x < image.width; x++) {
    for (var y = 0; y < image.height; y++) {
      var pix = img.getPixel(x, y); 
      if (!pix) console.log(x, y); 
    }
  }

  // Convole with Laplace edge detector 
  for (var x = 0; x < image.width; x++) {
    for (var y = 0; y < image.height; y++) {
      var pix = img.getPixel(x, y); 
      if (!pix) console.log(x, y); 
    }
  }

  // Compute distance transformation matrix 
  var dtM = mosaic_distanceTransform( img ); 

  // // Compute gradient matrix 
  var gM = mosaic_gradientTransform( dtM );
  console.log(dtM);
  console.log(gM); 
  var imageCopy = image.copyImg();


  var size = Math.round(200 * s);
  var length = 5;
    for (var i = 0; i < 30; i++) {
    var x = Math.floor(Math.random() * image.width);
    var y = Math.floor(Math.random() * image.height);
    //console.log(x, y);
    var angle = gM[x][y];
    angle = angle + ((Math.random() * .2) - .2);
    var direction = [Math.cos(angle), Math.sin(angle)];
    var color = image.getPixel(x, y);
    for (var z = 0; z < length; z++) {
      var tx = Math.round(x + z * direction[0]);
      var ty = Math.round(y + z * direction[1]);
      for (var j = -size; j < size; j++) {
        for (var k = -size; k < size; k++) {
          var r = j*j + k*k;
          if (tx + j >= 0 && tx + j < image.width && ty + k >= 0 && ty + k < image.height && r < size * size) imageCopy.setPixel(tx + j, ty + k, color);
        }
      }
    }
  }
  var size = Math.round(60 * s);
  var length = 20;
    for (var i = 0; i < 1000; i++) {
    var x = Math.floor(Math.random() * image.width);
    var y = Math.floor(Math.random() * image.height);
    //console.log(x, y);
    var angle = gM[x][y];
    angle = angle + ((Math.random() * .2) - .2);
    var direction = [Math.cos(angle), Math.sin(angle)];
    var color = image.getPixel(x, y);
    for (var z = 0; z < length; z++) {
      var tx = Math.round(x + z * direction[0]);
      var ty = Math.round(y + z * direction[1]);
      for (var j = -size; j < size; j++) {
        for (var k = -size; k < size; k++) {
          var r = j*j + k*k;
          if (tx + j >= 0 && tx + j < image.width && ty + k >= 0 && ty + k < image.height && r < size * size) imageCopy.setPixel(tx + j, ty + k, color);
        }
      }
    }
  }
  var size = Math.round(10 * s);
  var length = 30;
    for (var i = 0; i < 2000; i++) {
    var x = Math.floor(Math.random() * image.width);
    var y = Math.floor(Math.random() * image.height);
    //console.log(x, y);
    var angle = gM[x][y];
    angle = angle + ((Math.random() * .2) - .2);
    var direction = [Math.cos(angle), Math.sin(angle)];
    var color = image.getPixel(x, y);
    for (var z = 0; z < length; z++) {
      var tx = Math.round(x + z * direction[0]);
      var ty = Math.round(y + z * direction[1]);
      for (var j = -size; j < size; j++) {
        for (var k = -size; k < size; k++) {
          var r = j*j + k*k;
          if (tx + j >= 0 && tx + j < image.width && ty + k >= 0 && ty + k < image.height && r < size * size) imageCopy.setPixel(tx + j, ty + k, color);
        }
      }
    }
  }
  var size = Math.round(5 * s);
  var length = 10;
    for (var i = 0; i < 2000; i++) {
    var x = Math.floor(Math.random() * image.width);
    var y = Math.floor(Math.random() * image.height);
    //console.log(x, y);
    var angle = gM[x][y];
    angle = angle + ((Math.random() * .2) - .2);
    var direction = [Math.cos(angle), Math.sin(angle)];
    var color = image.getPixel(x, y);
    for (var z = 0; z < length; z++) {
      var tx = Math.round(x + z * direction[0]);
      var ty = Math.round(y + z * direction[1]);
      for (var j = -size; j < size; j++) {
        for (var k = -size; k < size; k++) {
          var r = j*j + k*k;
          if (tx + j >= 0 && tx + j < image.width && ty + k >= 0 && ty + k < image.height && r < size * size) imageCopy.setPixel(tx + j, ty + k, color);
        }
      }
    }
  }
  i2 = imageCopy;
  return image;

}

Filters.xDoGFilter = function( image, value ) {
  // value could be an array
  // ----------- STUDENT CODE BEGIN ------------
  // ----------- Our reference solution uses 60 lines of code.
  // ----------- STUDENT CODE END ------------
  Gui.alertOnce ('xDoGFilter is not implemented yet');
  return image;
};

function mosaic_gaussian ( image, sigma ) {
  // the filter window will be [-winR, winR];
  var newImg = image.createImg(image.width, image.height);
  var winR = Math.round(.5*sigma*3);

  for (var y = 0; y < image.height; y++) {
    for (var x = 0; x < image.width; x++) {
      var l = 0, w = 0, wsum = 0; 
      var pixel = new Pixel( 0, 0, 0); 

      for (var wx = Math.max(0, x-winR); wx < Math.min(image.width, x+winR+1); wx++) {
        var src = image.getPixel(wx,y); 
        var dist = x - wx; 
        w = Math.exp(-(dist*dist)/(2*sigma*sigma)); 

        l += src.data[0]*w; 
        wsum += w; 
      }

      l /= wsum; 
      pixel.data[0] = l; 
      pixel.data[1] = l; 
      pixel.data[2] = l; 
      pixel.clamp(); 

      newImg.setPixel(x, y, pixel); 
    }
  }

  var swap = image; 
  image = newImg; 
  newImg = swap; 

  for (var x = 0; x < image.width; x++) {
    for (var y = 0; y < image.height; y++) {
    var l = 0, w = 0, wsum = 0; 
    var pixel = new Pixel( 0, 0, 0); 

      for (var wy = Math.max(0, y-winR); wy < Math.min(image.height, y+winR+1); wy++) {
        var src = image.getPixel(x,wy);
        var dist = y - wy; 
        w = Math.exp(-(dist*dist)/(2*sigma*sigma)); 

        l += src.data[0]*w; 
        wsum += w; 
      }

      l /= wsum; 
      pixel.data[0] = l; 
      pixel.data[1] = l; 
      pixel.data[2] = l;  
      pixel.clamp(); 

      newImg.setPixel(x, y, pixel); 
    }
  }

  return newImg;
}

function mosaic_histEq ( image ) {
  // Reference:https://en.wikipedia.org/wiki/Histogram_equalization
  var nLevels, nTotal, aHist, nC; 

  nC = 2; 
  nLevels = 200;
  nTotal = image.width*image.height; 
  aHist = new Array(nLevels); 

  for (var i = 0; i < nLevels; i++) {
    aHist[i] = 0; 
  }

  for (var x = 0; x < image.width; x++) {
    for (var y = 0; y < image.height; y++ ) {
      var pixel = image.getPixel(x,y);
      var L = Math.round(pixel.data[nC]*(nLevels-1)); 
      aHist[L] += 1; 
    }
  }

  for (var i = 0; i < nLevels; i++) {
    aHist[i] /= nTotal;
    if (i != 0) aHist[i] += aHist[i-1];
  }

  for (var x = 0; x < image.width; x++) {
    for (var y = 0; y < image.height; y++ ) {
      var pixel = image.getPixel(x,y);
      L = Math.round(pixel.data[nC]*(nLevels-1));
      pixel.data[0] = aHist[L];
      pixel.data[1] = aHist[L];
      pixel.data[2] = aHist[L];
      pixel.clamp(); 
      image.setPixel(x, y, pixel);
    }
  }

  return image;
}

function mosaic_grayscale( image ) {
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
}

function mosaic_edgeLaplace( image ) {
  var newImg = image.createImg(image.width, image.height);
  var kernel = [[-1, -1, -1],
                [-1,  8, -1],
                [-1, -1, -1]];

  var nCorner = 3, nEdge = 5; 
  var nK = kernel.length; 
  var invert = new Pixel(1, 1, 1); 

  for (var x = 0; x < image.width; x++) {
    for (var y = 0; y < image.height; y++) {
      var pixel = new Pixel ( 0, 0, 0); 

      for (var ix = 0; ix < nK; ix++) {
        for (var iy = 0; iy < nK; iy++) {
          var xp, yp, m, src; 
          xp = x + ix - 1; yp = y + iy - 1; 

          if (xp >= 0 && yp >= 0 && xp < image.width && yp < image.height) {
            src = image.getPixel(xp, yp); 
            m = kernel[ix][iy]; 

            if ((ix == 1 && iy == 1) && ( x == 0 || x == image.width-1 ||  y == 0 || y == image.height-1)) {
                m = nEdge; 
              } 
            
              if ((ix == 1 && iy == 1) && ((x == 0 && y == 0) || 
                                           (x == 0 && y == image.height - 1) ||
                                           (x == image.width-1 && y == 0) ||
                                           (x == image.width-1 && y == image.height-1))) {
                  m = nCorner;
                }
           
            pixel = pixel.plus(src.multipliedBy(m)); 
          }
        }
      }
      
      pixel = invert.minus(pixel); 
      pixel.clamp(); 
      newImg.setPixel(x, y, pixel); 
    }
  }

  return newImg; 
}

// Brute force too slow O(n^2) in number of pixels, list DS to iterate through border points? 
// Used Borgefors' Chamfer distance algorithm (CDA) 3 x 3 
// Note: noise greatly distorts DT
// ref: "Distance Transformation Algorithms and Their Implementation and Evaluation" -Grevera
function mosaic_distanceTransform( image ) {
  var dtM = new Array(image.width);
  var borders = new Array();

  for (var i = 0; i < image.width; i++) {
    dtM[i] = new Array(image.height); 
  }


  // assign guidenlines dist = 0; otherwise dist = INF
  for (var x = 0; x < image.width; x++) {
    for (var y = 0; y < image.height; y++) {
      var pixel = image.getPixel(x, y); 
      if (pixel.data[0] != 1)  {
        dtM[x][y] = 0;
        borders.push([x, y]);
      }
      else dtM[x][y] = Number.MAX_VALUE; 
    }
  }

  for (y = 0; y < image.height; y++) {
    for (x = 0; x < image.width; x++) {
      for (var i = 0; i < borders.length; i++) {
        var tx = borders[i][0];
        var ty = borders[i][1];
        var distance = Math.round(Math.sqrt(((x - tx) * (x - tx)) + ((y - ty) * (y - ty))));
        if (distance < dtM[x][y]) dtM[x][y] = distance;
      }
    }
  }

  /*
  // forward pass
  // [ 4, 3, 4]
  // [ 3, u, -]
  // [ -, -, -]
  var dx, dy, dxy, d, t; 
  dx = 3; dy = 3; dxy = 4; 

  for (y = 0; y < image.height; y++) {
    for (x = 0; x < image.width; x++) {

      if (x == 199 && y == 1) {
        console.log(y-1); 
        console.log(dtM[x][y-1]); 
        console.log(x-1);
        console.log(dtM[x-1][y-1]);
        console.log(dtM[x-1][y]); 
      }

      d = dtM[x][y]; 

      // ( x-1, y-1 ) dxy
      if ( x > 0 && y > 0 ) {
        t = dtM[x-1][y-1];
        if ( t + dxy < d) d = t + dxy; 
      }

      // ( x  , y-1 ) dy
      if ( y > 0 ) {
        t = dtM[x][y-1]; 
        if ( t + dy < d) d = t + dy; 
      }

      // ( x+1, y-1 ) dxy
      if ( y > 0 && x < image.width - 1) {
        t = dtM[x+1][y-1];
        if ( t + dxy < d) d = t + dxy; 
      }
      
      // ( x-1, y   ) dx
      if ( x > 0 ) {
        t = dtM[x-1][y];
        if ( t + dx < d) d = t + dx; 
      }

      dtM[x][y] = d; 
    }
  }


  // backward pass 
  // [ -, -, -]
  // [ -, u, 3]
  // [ 4, 3, 4]
  for (y = image.height - 1; y >= 0; y--) {
    for (x = image.width - 1; x >= 0; x--) {
      d = dtM[x][y]; 

      // ( x+1, y   ) dx
      if ( x < image.width - 1 ) {
        t = dtM[x+1][y] 
        if ( t + dx < d) d = t + dx; 
      }

      // ( x-1, y+1 ) dxy
      if ( y < image.height - 1 && x > 0) {
        t = dtM[x-1][y+1] 
        if ( t + dxy < d) d = t + dxy; 
      }
      
      // ( x  , y+1 ) dy
      if ( y < image.height - 1 ) {
        t = dtM[x][y+1] 
        if ( t + dy < d) d = t + dy; 
      }

      // ( x+1, y+1 ) dxy
      if (x < image.width - 1 && y < image.height - 1) {
        t = dtM[x+1][y+1] 
        if ( t + dxy < d) d = t + dxy; 
      }

      dtM[x][y] = d; 
    }
  }*/

  return dtM; 
}

// ref: "Abstract Mosaics" - Di Blasi, Gallo, 2005
function mosaic_gradientTransform( dtM ) {
  var width = dtM.length; 
  var height = dtM[0].length; 

  var gM = new Array(width); 
  for (var i = 0; i < width; i++) {
    gM[i] = new Array(height); 
  }

  for (var x = 0; x < width; x++) {
    for (var y = 0; y < height; y++) {
      var a, b, c, d; 

      if ( y == height-1 ) a = dtM[x][y]; 
      else  a = dtM[x][y+1]; 

      if ( y == 0 ) b = dtM[x][y];
      else b = dtM[x][y-1];

      if ( x == width-1  ) c = dtM[x][y];
      else c = dtM[x+1][y];

      if ( x == 0 ) d = dtM[x][y]; 
      else d = dtM[x-1][y]; 

      if ( c - d == 0 ) gM[x][y] = 0; 
      else gM[x][y] = Math.atan( (a - b)/(c - d) ); 
    }
  }

  return gM; 
}

// ref: "Abstract Mosaics" - Di Blasi, Gallo, 2005
function mosaic_levelLineTransform( dtM, tSize ) {
  var width = dtM.length; 
  var height = dtM[0].length; 

  var llM = new Array(width); 
  for (var i = 0; i < width; i++) {
    llM[i] = new Array(height); 
  }

  for (var x = 0; x < width; x++) {
    for (var y = 0; y < height; y++) {
      var m, v; 

      m = dtM[x][y] % (2*tSize); 
      v = 0; 
      if ( m == 0     ) v = 1; 
      if ( m == tSize ) v = 2; 

      llM[x][y] = v; 
    }
  }

  return llM; 
}


function mosaic_visualizeDistanceTransf( m, image ) {
  var width = m.length; 
  var height = m[0].length; 
  var img = image.createImg( width, height );

  var max = Number.MIN_VALUE; 
  // Find max distance to scale appropriately
  for (var i = 0; i < width; i++) {
    for (var j = 0; j < height; j++) {
      var v = m[i][j]; 
      if (v > max) max = v; 
    }
  }

  for (var x = 0; x < width; x++) {
    for (var y = 0; y < height; y++) {
      var L = (m[x][y]/max);
      var pixel = new Pixel( L, L, L); 
      img.setPixel(x, y, pixel); 
    }
  }

  return img; 
}

function mosaic_visualizeLevelLineTransf( m, image ) {
  var width = m.length; 
  var height = m[0].length; 
  var img = image.createImg( width, height );

  for (var x = 0; x < width; x++) {
    for (var y = 0; y < height; y++) {
      var pixel = new Pixel( 1, 1, 1); 
      if (m[x][y] == 1) pixel = new Pixel( 0, 0, 0 ); 
      if (m[x][y] == 2) pixel = new Pixel( 0, 1, 0 ); 

      img.setPixel(x, y, pixel); 
    }
  }

  return img; 
}

// ref: "Abstract Mosaics" - Di Blasi, Gallo, 2005
Filters.mosaic = function( image, value ) {
  // Convert to grayscale
  var img = mosaic_grayscale(image); 
  //return img;

  // Histogram equalization
  var img = mosaic_histEq(img); 

  // Convolve with origin-centered 2D Gaussian (ref: sigma = 16)
  // ADJUST THIS PARAMTER
  var sigma = 16; 
  img = mosaic_gaussian(img, sigma); 

  // Compute mean luminance
  var sum = 0; 
  var nTotal = image.width*image.height; 
  for (var x = 0; x < image.width; x++) {
    for (var y = 0; y < image.height; y++) {
      var pixel = img.getPixel(x, y); 
      sum += pixel.data[2]; 
    }
  }
  var u = sum / nTotal; 

  // Compute variance of luminance 
  sum = 0; 
  for (var x = 0; x < image.width; x++) {
    for (var y = 0; y < image.height; y++) {
      var pixel = img.getPixel(x, y); 
      sum += (pixel.data[2] - u)*(pixel.data[2] - u); 
    }
  }
  var v = sum / (nTotal); 

  // Set luminance to 1 if | I(x, y) - u | > T, T = v / 4
  // ADJUST THIS PARAMETER
  var T = v / 4; 
  for (var x = 0; x < image.width; x++) {
    for (var y = 0; y < image.height; y++) {
      var pixel = img.getPixel(x, y); 
      if (Math.abs(pixel.data[2] - u) > T) {
        pixel.data[0] = 1; 
        pixel.data[1] = 1; 
        pixel.data[2] = 1; 
        pixel.clamp(); 
      }
      else {
        pixel.data[0] = 0; 
        pixel.data[1] = 0; 
        pixel.data[2] = 0; 
      }
      img.setPixel(x, y, pixel); 
    }
  }

  for (var x = 0; x < image.width; x++) {
    for (var y = 0; y < image.height; y++) {
      var pix = img.getPixel(x, y); 
      if (!pix) console.log(x, y); 
    }
  }

  // Convole with Laplace edge detector 
  //img = mosaic_edgeLaplace( img ); 

  for (var x = 0; x < image.width; x++) {
    for (var y = 0; y < image.height; y++) {
      var pix = img.getPixel(x, y); 
      if (!pix) console.log(x, y); 
    }
  }

  // Compute distance transformation matrix 
  var dtM = mosaic_distanceTransform( img ); 
  console.log(dtM);
  return mosaic_visualizeDistanceTransf( dtM, img ); 

  // // Compute gradient matrix 
  var gM = mosaic_gradientTransform( dtM ); 
  // console.log(gM); 

  // Compute level line matrix 
  // ADJUST THIS PARAMETER
  var tSize = 10; 
  var llM = mosaic_levelLineTransform( dtM, tSize );
  return mosaic_visualizeLevelLineTransf(llM, img); 
  // console.log(llM); 

  // Create a tiled buffer
  // Tile chains (do not cross guidelines or overlap)
    // Nearest neighbor for chains
    // Grouting II 
  // Grouting I

  // Problems - nearest neighbor, storing tiles (shrink, color)? 
  // Ideas - faster nearest neighbors (antipole clustering), colors (weighted sum)

  return img;
};
