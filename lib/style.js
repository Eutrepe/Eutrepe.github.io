var style;

// this is a wrapped function
(function () {

  // the variables declared here will not be scoped anywhere and will only be accessible in this wrapped function
  var defaultColor   = "white",
      highlightColor = "#cf2727";

  style = {
    navitem: {
      base: {
        font          : '30pt Snubnose',
        align         : 'left',
        srokeThickness: 4
      },
      default: {
        fill  : defaultColor,
        stroke: 'rgba(0,0,0,0)'
      },
      inverse: {
        fill  : 'black',
        stroke: 'black'
      },
      hover: {
        fill  : highlightColor,
        stroke: '#e50000'
      }
    }
  };

  for (var key in style.navitem) {
    if (key !== "base") {
      Object.assign(style.navitem[key], style.navitem.base)
    }
  }

})();

// the trailing () triggers the function call immediately
