"use strict";

var Filters = Filters || {};



// space for general utility functions, if you want
var pi = 3.14159265359;

function clamp(val, min, max) {
  return val < min ? min : (val > max ? max : val);
}

// ----------- STUDENT CODE BEGIN ------------
// ----------- Our reference solution uses 77 lines of code.

// returns cumulative distribution array for an image
function getCdf( image, num_of_levels, channel ) {
  var size = image.width * image.height;
  var level;
  var pdf = []
  var cdf = []
  // initialize arrays
  for (var i = 0; i < num_of_levels; i++) {
    pdf.push(0);
    cdf.push(0);
  }
  // calculate gray counts and update pdf array
  for (var x = 0; x < image.width; x++) {
    for (var y = 0; y < image.height; y++) {
      var pixel = image.getPixel(x,y);
      if (channel === "gray")
        level = (pixel.data[0] + pixel.data[1] + pixel.data[2]) / 3.0;
      else
        level = pixel.data[channel];
      level = Math.round( level * (num_of_levels - 1) );
      pdf[level]++;
    }
  }
  // calculate cdf array
  for (var x = 0; x < num_of_levels; x++) {
    pdf[x] /= size;
    if (x > 0)
      cdf[x] = cdf[x-1] + pdf[x];
    else
      cdf[0] = pdf[x];
  }
  return cdf;
}

// returns inverse mapping of cdf
function invertCdf( cdf ) {
  var inverse = [];
  var j = 0;
  var num_of_levels = cdf.length;

  for (var i = 0; i < num_of_levels; i++) {
    while ((cdf[j] * num_of_levels) < i)
      j++;
    inverse[i] = j;
  }

  return inverse;
}
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
  // for every pixel in the image...
  for (var x = 0; x < image.width; x++) {
    for (var y = 0; y < image.height; y++) {
      var pixel = image.getPixel(x, y);

      // interpolate or extrapolate to change contrast
      pixel.data[0] =
        (pixel.data[0] - 0.5) * Math.tan((ratio + 1) * Math.PI/4) + 0.5;
      pixel.data[1] =
        (pixel.data[1] - 0.5) * Math.tan((ratio + 1) * Math.PI/4) + 0.5;
      pixel.data[2] =
        (pixel.data[2] - 0.5) * Math.tan((ratio + 1) * Math.PI/4) + 0.5;

      pixel.clamp();

      image.setPixel(x, y, pixel);
    }
  }
  // ----------- STUDENT CODE END ------------
  //Gui.alertOnce ('contrastFilter is not implemented yet');
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
  var num_of_gray_levels = 100;
  var cdf = getCdf( image, num_of_gray_levels, "gray");
  var gray;

  // fix image according to cdf array
  for (var x = 0; x < image.width; x++) {
    for (var y = 0; y < image.height; y++) {
      var pixel = image.getPixel(x,y).rgbToHsl();
      // get current graylevel
      gray = Math.round( pixel.data[2] * (num_of_gray_levels - 1) );
      // adjust graylevel
      pixel.data[2] = cdf[gray];
      image.setPixel(x, y, pixel.hslToRgb());
    }
  }
  // ----------- STUDENT CODE END ------------
  //Gui.alertOnce ('histogramEqualizationFilter is not implemented yet');
  return image;
};

Filters.grayscaleFilter = function( image ) {
    var newImg = image.createImg( image.width, image.height );
    for (var x = 0; x < image.width; x++) {
	for (var y = 0; y < image.height; y++) {
	    var pixel = image.getPixel(x, y);
	    var luminance = 0.2126 * pixel.data[0] + 0.7152 * pixel.data[1] + 0.0722 * pixel.data[2];
	    pixel.data[0] = luminance;
	    pixel.data[1] = luminance;
	    pixel.data[2] = luminance;
	    
	    newImg.setPixel(x, y, pixel);
	}
    }
    
    return newImg;
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
  var kernel = [];
  var sum = 0;
  // create 1D kernel
  for (var i = 0; i <= winR; i++) {
      var power = - i * i / (2 * sigma * sigma);
      var weight = Math.pow(Math.E, power);
      kernel[winR+i] = weight;
      kernel[winR-i] = weight;
      sum += 2 * weight;
  }
  for (var i = 0; i < kernel.length; i++) {
    kernel[i] /= sum;
  }
  // ----------- STUDENT CODE END ------------
  //Gui.alertOnce ('gaussianFilter is not implemented yet');
  return convolve1D(newImg, image, kernel);
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
  var newImg = image.createImg(image.width, image.height);
  var winR = Math.round( Math.max(sigmaR,sigmaS)*2 );
  var sR = sigmaR * Math.sqrt(2) * winR / 255;
  sR = sR * sR * 2;
  var sS = 2 * sigmaS * sigmaS;
  var i_min, i_max, j_min, j_max;
  // for every pixel in image...
  for (var x = 0; x < image.width; x++) {
    i_min = Math.max(x-winR, 0);
    i_max = Math.min(x+winR+1, image.width);
    for (var y = 0; y < image.height; y++) {
      j_min = Math.max(y-winR, 0);
      j_max = Math.min(y+winR+1, image.height);
      var pixel = image.getPixel(x,y);
      // for some neighboring pixels in [-winR, winR]...
      var results = [0, 0, 0];
      var sums = [0, 0, 0];
      // compute weights for each neighbor
      for (var i = i_min; i < i_max; i++) {
        for (var j = j_min; j < j_max; j++) {
          var neighbor = image.getPixel(i, j);
          var s_term = - ((x-i)*(x-i) + (y-j)*(y-j)) / sS;
          for (var c = 0; c < 3; c++) {
            var r_term = neighbor.data[c] - pixel.data[c];
            r_term = - r_term * r_term / sR;
            var weight = Math.pow(Math.E, s_term + r_term);
            results[c] += neighbor.data[c] * weight;
            sums[c] += weight;
          }
        }
      }
      // normalize
      pixel.data[0] = results[0] / sums[0];
      pixel.data[1] = results[1] / sums[1];
      pixel.data[2] = results[2] / sums[2];
      newImg.setPixel(x, y, pixel);
    }
  }
  // ----------- STUDENT CODE END ------------
  //Gui.alertOnce ('bilateralFilter is not implemented yet');
  return newImg;
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
  var valuesPerChannel = Math.pow(2, bitsPerChannel);
  // ----------- STUDENT CODE BEGIN ------------
    // ----------- Our reference solution uses 31 lines of code.
    var newImg = image.createImg( image.width, image.height );
  var pattern = [[15,7,13,5],[3,11,1,9],[12,4,14,6],[0,8,2,10]];
  var threshold_count = pattern.length * pattern.length + 1;
  var levels = valuesPerChannel - 1;
  for (var x = 0; x < image.width; x++) {
    for (var y = 0; y < image.height; y++) {
      var i = x % pattern.length;
      var j = y % pattern.length;
      var pixel = image.getPixel(x,y);
      for (var c = 0; c < 3; c++) {
        var value = pixel.data[c];
        var err = value - (Math.floor(value * levels) / levels);
        var threshold = (pattern[i][j] + 1) / threshold_count / levels;
        if (err > threshold)
          pixel.data[c] = Math.ceil(value * levels) / levels;
        else
          pixel.data[c] = Math.floor(value * levels) / levels;
      }
      newImg.setPixel(x, y, pixel);
    }
  }
  // ----------- STUDENT CODE END ------------
  //Gui.alertOnce ('orderedFilter is not implemented yet');
  return newImg;

};

Filters.floydFilter = function( image, bitsPerChannel ) {
  var valuesPerChannel = Math.pow(2, bitsPerChannel);
  // ----------- STUDENT CODE BEGIN ------------
  // ----------- Our reference solution uses 23 lines of code.
  var levels = valuesPerChannel - 1;
  var weights = [7/16, 3/16, 5/16, 1/16];
  var n_xy = [[1,0],[-1,1],[0,1],[1,1]];
  var neighbors = [];

  for (var y = 0; y < image.height; y++) {
    for (var x = 0; x < image.width; x++) {
      var pixel = image.getPixel(x,y);
      // fetch neighbors
      for (var n = 0; n < 4; n++) {
        neighbors[n] = image.getPixel(x+n_xy[n][0],y+n_xy[n][1]);
      }
      for (var c = 0; c < 3; c++) {
        // quantize
        var err = pixel.data[c];
        pixel.data[c] = Math.round(pixel.data[c] * levels) / levels;
        err -= pixel.data[c];
        // distribute error
        for (var n = 0; n < 4; n++) {
          if (neighbors[n] != undefined)
            neighbors[n].data[c] += err * weights[n];
        }
      }
      image.setPixel(x, y, pixel);
      // set neighbors back
      for (var n = 0; n < 4; n++) {
        if (neighbors[n] != undefined)
          image.setPixel(x+n_xy[n][0], y+n_xy[n][1], neighbors[n]);
      }
    }
  }
  // ----------- STUDENT CODE END ------------
  //Gui.alertOnce ('floydFilter is not implemented yet');
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

Filters.brushFilter2 = function( image, radius, color, vertsString ) {
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
  var w1, w2, h1, h2;
  var radius2 = radius * radius;
  // for every location in centers[]...
  for (i = 0; i < centers.length; i++) {
    // find window bounds for circle
    x = centers[i].x;
    y = centers[i].y;
    w1 = x - radius;
    w2 = x + radius;
    h1 = y - radius;
    h2 = y + radius;
    // draw circle
    for (var w = w1; w <= w2; w++) {
      var distX = (x - w)*(x - w);
      for (var h = h1; h <= h2; h++) {
        var dist = (y - h)*(y - h) + distX;
        if (dist <= radius2)
          image.setPixel(w, h, color);
      }
    }
  }
  // ----------- STUDENT CODE END ------------
  // Gui.alertOnce ('brushFilter is not implemented yet');
  return image;
};


Filters.paletteFilter = function( image, colorNum ) {
  // ----------- STUDENT CODE BEGIN ------------
  // ----------- Our reference solution uses 83 lines of code.
  // ----------- STUDENT CODE END ------------
  Gui.alertOnce ('paletteFilter is not implemented yet');
  return image;
};


// convolves image with same kernel, vertically then horizontally
function convolve1D( image, refImg, kernel ) {
  var width = image.width;
  var height = image.height;
  var k = (kernel.length - 1) / 2;
  var results = [0, 0, 0];
  var i_min, i_max, j_min, j_max;
  var pixel, refPixel;
  // vertical 1D convolution
  for (var y = 0; y < height; y++) {
    j_min = k - Math.min(k, y);
    j_max = k + Math.min(k, height-1-y);
    for (var x = 0; x < width; x++) {
      results = [0, 0, 0];
      for (var j = j_min; j < j_max; j++) {
        refPixel = refImg.getPixel(x, y-k+j);
        results[0] += refPixel.data[0] * kernel[j];
        results[1] += refPixel.data[1] * kernel[j];
        results[2] += refPixel.data[2] * kernel[j];
      }
      pixel = image.getPixel(x,y);
      pixel.data[0] = results[0];
      pixel.data[1] = results[1];
      pixel.data[2] = results[2];
      image.setPixel(x, y, pixel);
    }
  }
  // horizontal 1D convolution
  for (var x = 0; x < width; x++) {
    i_min = k - Math.min(k, x);
    i_max = k + Math.min(k, width-1-x);
    for (var y = 0; y < height; y++) {
      pixel = image.getPixel(x,y);
      results = [0, 0, 0];
      for (var i = i_min; i < i_max; i++) {
        refPixel = image.getPixel(x-k+i, y);
        results[0] += refPixel.data[0] * kernel[i];
        results[1] += refPixel.data[1] * kernel[i];
        results[2] += refPixel.data[2] * kernel[i];
      }
      pixel.data[0] = results[0];
      pixel.data[1] = results[1];
      pixel.data[2] = results[2];
      image.setPixel(x, y, pixel);
    }
  }
  return image;
}




// given an image, returns a normalized gradient for each pixel
function normalizedGradients( image ) {
    var width = image.width;
    var height = image.height;
    var gradients = [];
    var max = 0;
    var min = 0;
    for (var x = 0; x < width; x++) {
	var x_lo = ( x - 1 + width ) % width;
	var x_hi = ( x + 1 ) % width;
	gradients[x] = [];
	for (var y = 0; y < height; y++) {
	    // find the indices (accounting for borders)
	    var y_lo = ( y - 1 + height ) % height;
	    var y_hi = ( y + 1 ) % height;
	    // all the neighboring pixels:
	    //  A   B   C
	    //  D   p   E
	    //  F   G   H
	    var pA = image.getPixel( x_lo, y_lo );
	    var pB = image.getPixel( x, y_lo );
	    var pC = image.getPixel( x_hi, y_lo );
	    var pD = image.getPixel( x_lo, y );
	    var p  = image.getPixel( x, y );
	    var pE = image.getPixel( x_hi, y );
	    var pF = image.getPixel( x_lo, y_hi );
	    var pG = image.getPixel( x, y_hi );
	    var pH = image.getPixel( x_hi, y_hi );
	    // calculate gradient using Sobel operator
	    var grad = { x:0, y:0, mag:0 };
	    grad.x = (-1 * pA.data[0] + pC.data[0]
		      -2 * pD.data[0] + 2 * pE.data[0]
		      -1 * pF.data[0] + pH.data[0]);
	    grad.y = (-1 * pA.data[0] + pF.data[0]
		      -2 * pB.data[0] + 2 * pG.data[0]
		      -1 * pC.data[0] + pH.data[0]);
	    grad.mag = Math.sqrt( grad.x * grad.x + grad.y * grad.y );
	    gradients[x][y] = grad;
	    max = Math.max( max, grad.mag );
	    min = Math.min( min, grad.mag );
	}
    }
    
    return gradients;
}


function edgeTangents( image, gradients, winR ) {
    var width = image.width;
    var height = image.height;
    var etf = [];
    // first iteration: perpendiculars to gradients
    for (var x = 0; x < width; x++) {
	etf[x] = [];
	for (var y = 0; y < height; y++) {
	    var grad = gradients[x][y];
	    var tang = { x, y };
	    tang.x = -1 * grad.y;
	    tang.y = grad.x;
	    etf[x][y] = tang;
	}
    }

    return etf;
}

function getKernel( sigma ) {
    var winR = Math.round(sigma * 3);
    var kernel = [];
    var sum = 0;
    for (var i = 0; i < winR; i++) {
	var power = - i * i / (2 * sigma * sigma);
	var weight = Math.pow(Math.E, power);
	kernel[i] = weight;
	if (i === 0)
	    sum += weight;
	else
	    sum += 2 * weight;
    }
    for (var i = 0; i < winR; i++) {
	kernel[i] /= sum;
    }
    return kernel;
}

// given a single point, convolves/integrates along curve and returns result
function lineIntegral( image, cx, cy, vectorField, kernel ) {
    var width = image.width;
    var height = image.height;
    
    // account for the center point
    var pixel = image.getPixel( cx, cy );
    var result = pixel.data[0] * kernel[0];
    
    // integrate along curve in both pos/neg directions
    var posPt = { x: cx, y: cy };
    var negPt = { x: cx, y: cy };
    var posVec = vectorField[cx][cy];
    var negVec = vectorField[cx][cy];
    
    // for k steps in positive/negative direction...
    for (var k = 1; k < kernel.length; k++) {
	
	// POSITIVE DIRECTION
	// get next point in positive direction
	posPt.x += posVec.x;
	posPt.y += posVec.y;
	// round to point sample the vector field and image
	var i = Math.max( 0, Math.min(Math.round(posPt.x), width - 1) );
	var j = Math.max( 0, Math.min(Math.round(posPt.y), height- 1) );
	posVec = vectorField[i][j];
	var posPix = image.getPixel( i, j );
	// add to weighted sum
	result += posPix.data[0] * kernel[k];
	
	// NEGATIVE DIRECTION
	// get next point in negative direction
	negPt.x -= negVec.x;
	negPt.y -= negVec.y;
	// round to point sample the vector field and image
	i = Math.max( 0, Math.min(Math.round(negPt.x), width - 1) );
	j = Math.max( 0, Math.min(Math.round(negPt.y), height- 1) );
	negVec = vectorField[i][j];
	var negPix = image.getPixel( i, j );
	// add to weighted sum
	result += negPix.data[0] * kernel[k];
    }
    
    return result;
}

// flow-based bilateral integration
function flowBilateral( image, vectorField, sigmaR, sigmaS ) {
    var width = image.width;
    var height = image.height;
    var newImg = image.createImg(width, height);
    var winR = Math.round( Math.max(sigmaR,sigmaS)*2 );
    var sR = sigmaR * Math.sqrt(2) * winR / 255;
    sR = sR * sR * 2;
    var sS = 2 * sigmaS * sigmaS;

    // for every pixel in image...
    for (var x = 0; x < width; x++) {
	for (var y = 0; y < height; y++) {
	    
	    // account for the center point and initialize counters
	    var pixel = image.getPixel( x, y );
	    var results = [ pixel.data[0], pixel.data[1], pixel.data[2] ];
	    var wt_sums = [ 1, 1, 1 ];
	    
	    // prepare to integrate along curve in both pos/neg directions
	    var posPt = { x: x, y: y };
	    var negPt = { x: x, y: y };
	    var posVec = vectorField[x][y];
	    var negVec = vectorField[x][y];
	    
	    // for k steps in positive/negative direction...
	    for (var k = 1; k < winR; k++) {
		// POSITIVE DIRECTION
		// get next point in positive direction
		posPt.x += posVec.x;
		posPt.y += posVec.y;
		// round to point sample the vector field and image
		var i = Math.max( 0, Math.min(Math.round(posPt.x), width - 1) );
		var j = Math.max( 0, Math.min(Math.round(posPt.y), height- 1) );
		posVec = vectorField[i][j];
		var posPix = image.getPixel( i, j );
		// add to weighted sum
		var spatial_wt = - ((x-i)*(x-i) + (y-j)*(y-j)) / sS;
		for (var c = 0; c < 3; c++) {
		    var color_wt = posPix.data[c] - pixel.data[c];
		    color_wt = - color_wt * color_wt / sR;
		    var weight = Math.pow(Math.E, spatial_wt + color_wt);
		    results[c] += posPix.data[c] * weight;
		    wt_sums[c] += weight;
		}
		
		// NEGATIVE DIRECTION
		// get next point in negative direction
		negPt.x -= negVec.x;
		negPt.y -= negVec.y;
		// round to point sample the vector field and image
		i = Math.max( 0, Math.min(Math.round(negPt.x), width - 1) );
		j = Math.max( 0, Math.min(Math.round(negPt.y), height- 1) );
		negVec = vectorField[i][j];
		var negPix = image.getPixel( i, j );
		// add to weighted sum
		spatial_wt = - ((x-i)*(x-i) + (y-j)*(y-j)) / sS;
		for (var c = 0; c < 3; c++) {
		    var color_wt = negPix.data[c] - pixel.data[c];
		    color_wt = - color_wt * color_wt / sR;
		    var weight = Math.pow(Math.E, spatial_wt + color_wt);
		    results[c] += negPix.data[c] * weight;
		    wt_sums[c] += weight;
		}
	    }
	    // normalize
	    pixel.data[0] = results[0] / wt_sums[0];
	    pixel.data[1] = results[1] / wt_sums[1];
	    pixel.data[2] = results[2] / wt_sums[2];
	    newImg.setPixel(x, y, pixel);
	}
    }

    return newImg;
}


function FDoG( image, gradients, etf, repeat ) {
    if (repeat === 0) return image;
    
    // PARAMETERS
    var sigmaC = 2.0;
    var sigmaS = 1.6 * sigmaC;
    var sigmaM = 4.4;
    var p = 100;
    var rho = 0.997;
    var eps = 0.08;
    
    var kernelC = getKernel( sigmaC );
    var kernelS = getKernel( sigmaS );
    var kernelM = getKernel( sigmaM );

    console.log("beginning first DoG pass (two line integrals per pixel)");
    var DoG_img = image.createImg( image.width, image.height );
    // first part of kernel convolution (along gradients)
    for (var k = 0; k < kernelS.length; k++) {
	kernelS[k] *= -rho;
	if (kernelC[k] != undefined)
	    kernelS[k] += kernelC[k];
    }
    for (var x = 0; x < image.width; x++) {
	for (var y = 0; y < image.height; y++) {
	    // // calculate difference of Gaussians
	    // var resultC = lineIntegral( image, x, y, gradients, kernelC );
	    // var resultS = lineIntegral( image, x, y, gradients, kernelS );
	    // var DoG = resultC - rho * resultS;
	    var DoG = lineIntegral( image, x, y, gradients, kernelS );
	    DoG *= p;
	    var pixel = DoG_img.getPixel( x, y );
	    pixel.data[0] = DoG;
	    pixel.data[1] = DoG;
	    pixel.data[2] = DoG;
	    DoG_img.setPixel( x, y, pixel );
	}
    }

    console.log("beginning second DoG pass (one line integral per pixel)");
    var newImg = image.createImg( image.width, image.height );
    // second part of kernel convolution (along tangents)
    for (var x = 0; x < image.width; x++) {
	for (var y = 0; y < image.height; y++) {
	    var result = lineIntegral( DoG_img, x, y, etf, kernelM );
	    var pixel = newImg.getPixel( x, y );
	    if (result >= eps)
	    	result = 1;
	    else
	    	result = 1 + Math.tanh( 15 * (result - eps) );
	    pixel.data[0] = result;
	    pixel.data[1] = result;
	    pixel.data[2] = result;
	    newImg.setPixel( x, y, pixel );
	}
    }    

    newImg = Filters.gaussianFilter( newImg, 0.75 );
    
    console.log("completed repeat " + repeat);
    return FDoG( newImg, gradients, etf, repeat - 1 );
}


Filters.xDoGFilter = function( image, value ) {
    // value could be an array
    // ----------- STUDENT CODE BEGIN ------------
    // ----------- Our reference solution uses 60 lines of code.
    
    var grayscaleImg = Filters.grayscaleFilter( image );
    grayscaleImg = Filters.histogramEqualizationFilter( grayscaleImg );
    grayscaleImg = Filters.gaussianFilter( grayscaleImg, 1.3 );
    var gradients = normalizedGradients( grayscaleImg );
    var etf = edgeTangents( image, gradients, 30 );

    var img = this.orderedFilter( image, 1 );

    var newImg = FDoG( grayscaleImg, gradients, etf, 1 );


    for (var x = 0; x < image.width; x++) {
	for (var y = 0; y < image.height; y++) {
	    var pixel = newImg.getPixel( x, y );
	    var color = image.getPixel( x, y );
	    pixel.data[0] += 0.3;
	    pixel.data[1] += 0.3;
	    pixel.data[2] += 0.3;
	    var gray = pixel.data[0] * 3.0;
	    pixel.data[0] *= gray * .415;
	    pixel.data[1] *= gray * .316;
	    pixel.data[2] *= gray * .226;
	    newImg.setPixel( x, y, pixel );
	}
    } 
    
    // ----------- STUDENT CODE END ------------
  // Gui.alertOnce ('xDoGFilter is not implemented yet');
  return newImg;
};


function paintDot( canvas, cx, cy, radius, color ) {
    var w1, w2, h1, h2;
    var radiusSq = radius * radius;
    w1 = cx - radius;
    w2 = cx + radius;
    h1 = cy - radius;
    h2 = cy + radius;
    // draw circle
    for (var w = w1; w <= w2; w++) {
	var distX = (cx - w)*(cx - w);
	for (var h = h1; h <= h2; h++) {
            var distSq = (cy - h)*(cy - h) + distX;
            if (distSq <= radiusSq)
		canvas.setPixel(w, h, color);
	}
    }
}

function paintLine( source, canvas, canvas2, cx, cy, etf, radius ) {
    var width = source.width;
    var height = source.height;
    
    // account for the center point
    var pixel = source.getPixel( cx, cy );
    
    // move along curve in both pos/neg directions
    var posPt = { x: cx, y: cy };
    var negPt = { x: cx, y: cy };
    var posVec = etf[cx][cy];
    var negVec = etf[cx][cy];
    var angle = Math.PI * 2 * Math.random();
    var R = 0.05;
    
    // for k steps in positive/negative direction...
    for (var k = 1; k < 50; k++) {
	// POSITIVE DIRECTION
	// get next point in positive direction
	posPt.x += posVec.x;
	posPt.y += posVec.y;
	// round to point sample the vector field and image
	var i = Math.max( 0, Math.min(Math.round(posPt.x), width - 1) );
	var j = Math.max( 0, Math.min(Math.round(posPt.y), height- 1) );
	posVec = etf[i][j];
	var mag = posVec.x * posVec.x + posVec.y * posVec.y;
	if (mag < 0.01) {
	    angle += 0.05;
	    R += 0.03;
	    var cos = Math.cos(angle);
	    var sin = Math.sin(angle);
	    posVec = { x: R * cos, y: R * sin};
	    paintDot( canvas2, i, j, radius*2, pixel );
	}
	else {
	    paintDot( canvas, i, j, radius, pixel );
	}
    }
    
    return canvas;
}


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

    var grayscaleImg = Filters.grayscaleFilter( image );
    grayscaleImg = this.histogramEqualizationFilter( grayscaleImg );
    var gradients = normalizedGradients( grayscaleImg );
    var etf = edgeTangents( image, gradients, 30 );


    var testGrad = image.createImg( image.width, image.height );
    for (var x = 0; x < image.width; x++) {
	for (var y = 0; y < image.height; y++) {
	    var pixel = testGrad.getPixel( x, y );
	    var grad = gradients[x][y];
	    pixel.data[0] = grad.x;
	    pixel.data[1] = grad.y;
	    pixel.data[2] = grad.mag;
	    testGrad.setPixel( x, y, pixel );
	}
    }
    //return testGrad;
   
    var dithered = Filters.orderedFilter( image, 4 );
    var newImg = image.createImg( image.width, image.height );
    var newImg2 = image.createImg( image.width, image.height );
    var skip = 5;
    for (var x = 0; x < image.width; x += skip) {
	for (var y = 0; y < image.height; y += skip) {
	    newImg = paintLine( dithered, newImg, newImg2, x, y, etf, 2 );
	}
    }
    for (var x = 0; x < image.width; x++) {
	for (var y = 0; y < image.height; y++) {
	    var pixel = newImg.getPixel( x, y );
	    var pixel2 = newImg2.getPixel( x, y );
	    if (pixel.data[0] * pixel.data[1] * pixel.data[2] === 1)
		newImg2.setPixel( x, y, pixel2 );
	    else
		newImg2.setPixel( x, y, pixel );
	}
    }
    
    // ----------- STUDENT CODE END ------------
    //Gui.alertOnce ('customFilter is not implemented yet');
    return newImg2;
};


Filters.paintFlowFilter = function( image, value ) {
  // http://mrl.nyu.edu/publications/painterly98/hertzmann-siggraph98.pdf
  // ----------- STUDENT CODE BEGIN ------------
    // ----------- Our reference solution uses 52 lines of code.
    var newImg = this.grayscaleFilter( this.xDoGFilter( image, value ) );

    for (var x = 0; x < image.width; x++) {
	for (var y = 0; y < image.height; y++) {
	    var color = image.getPixel( x, y );
	    var pixel = newImg.getPixel( x, y );
	    if (pixel.data[0] > 0.37) {
		pixel.data[0] *= 1.3;
		pixel.data[1] *= 1.3;
		pixel.data[2] *= 1.3;
		newImg.setPixel( x, y, pixel );
	    }
	    else {
		pixel.data[0] += 0.3;
		pixel.data[1] += 0.3;
		pixel.data[2] += 0.3;
		pixel.data[0] *= color.data[0];
		pixel.data[1] *= color.data[1];
		pixel.data[2] *= color.data[2];
		newImg.setPixel( x, y, pixel );
	    }
	}
    }
  // ----------- STUDENT CODE END ------------
  //Gui.alertOnce ('paintFilter is not implemented yet');
  return newImg;
};
