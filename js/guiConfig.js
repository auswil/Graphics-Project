"use strict";

var GuiConfig = GuiConfig || {

};

GuiConfig.imageNames = [
  'flower.jpg',
  'goldengate.jpg',
  'leaves.jpg',
  'woman.jpg',
  'man.jpg',
  'town.jpg',
  'mesa.jpg',
  'chang.jpg',
  'halber.jpg',
  'doge.jpg',
  'alpha.png',
  'yy.png'
];

var sampleDropdownOptions = ['point', 'bilinear', 'gaussian'];
var morphLinesDropdownOptions = ['marker.json'];

GuiConfig.onInit = function() {
  // starter image, if none loaded from url
  if (Gui.historyFilters.length === 0) {
    Gui.addHistoryEntry(Gui.filterDefs[0], [GuiConfig.imageNames[0]]);
  }
};

// NOTE(drew): filter names must correspond to names of filter functions unless funcName is supplied
GuiConfig.filterDefs = [
  // GENERAL
  {
    name: "Push Image",
    folderName: undefined,
    notFilter: true,
    pushImage: true,
    paramDefs: [
      {
        name: "image name",
        defaultVal: GuiConfig.imageNames[0],
        dropdownOptions: GuiConfig.imageNames,
      },
    ]
  },
  {
    name: "Brush",
    folderName: "Final Project",
    paramDefs: [
      {
        name: "radius",
        defaultVal: .5,
        sliderRange: [0, 1],
        isFloat: true,
      },
      {
        name: "color",
        defaultVal: [255, 255, 255],
        isColor: true,
      },
      {
        name: "verts",
        defaultVal: "",
        isString: true,
      },
    ]
  },
  {
    name: "Reverse Brush",
    funcName: "applyToArea",
    folderName: "Final Project",
    canAnimate: true,
    paramDefs: [
      {
        name: "input value",
        defaultVal: 0.5,
        sliderRange: [0, 1],
        isFloat: true,
      },
      {
        name: "input value",
        defaultVal: 0.5,
        sliderRange: [0, 1],
        isFloat: true,
      },
      {
        name: "verts",
        defaultVal: "",
        isString: true,
      },
    ]
  },
  

  // Final Project OPERATIONS
  {
    name: "Paint",
    folderName: "Final Project",
    funcName: "paint2Filter",
    paramDefs: [
      {
        name: "radius",
        defaultVal: 0.5,
        sliderRange: [0, 1],
        isFloat: true,
      },
      {
        name: "length",
        defaultVal: 0.5,
        sliderRange: [0, 1],
        isFloat: true,
      },
      {
        name: "direction",
        defaultVal: 0.5,
        sliderRange: [0, 3.14],
        isFloat: true,
      },
    ]
  },
  {
    name: "Auto Paint",
    folderName: "Final Project",
    funcName: "paintFilter",
    paramDefs: [
      {
        name: "radius",
        defaultVal: 0.5,
        sliderRange: [0, 1],
        isFloat: true,
      },
      {
        name: "length",
        defaultVal: 0.5,
        sliderRange: [0, 1],
        isFloat: true,
      },
      {
        name: "direction",
        defaultVal: 0.5,
        sliderRange: [0, 3.14],
        isFloat: true,
      },
    ]
  },
  {
    name: "Paint",
    folderName: "Misc",
    funcName: "paintFlowFilter",
    paramDefs: [
      {
        name: "input value",
        defaultVal: 0.5,
        sliderRange: [0, 1],
        isFloat: true,
      },
    ]
  },
  {
    name: "XDoG",
    funcName: "xDoGFilter",
    folderName: "Final Project",
    paramDefs: [
      {
        name: "input value",
        defaultVal: 0.5,
        sliderRange: [0, 1],
        isFloat: true,
      },
    ]
  },

  {
    name: "Mosaic",
    funcName: "mosaic",
    folderName: "Final Project",
    canAnimate: true,
    paramDefs: [
      {
        name: "input value",
        defaultVal: 0.5,
        sliderRange: [0, 1],
        isFloat: true,
      },
    ]
  },
  {
    name: "XDoG",
    funcName: "xDoGFilter",
    folderName: "Misc",
    paramDefs: [
      {
        name: "input value",
        defaultVal: 0.5,
        sliderRange: [0, 1],
        isFloat: true,
      },
    ]
  },

  {
    name: "CustomFilter",
    funcName: "customFilter",
    folderName: "Misc",
    canAnimate: true,
    paramDefs: [
      {
        name: "input value",
        defaultVal: 0.5,
        sliderRange: [0, 1],
        isFloat: true,
      },
    ]
  },
  
];
