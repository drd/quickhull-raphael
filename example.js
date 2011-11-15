// Example is the singleton object which controls the quickhull example
// and interacts with Raphael and jQuery to produce the UI.
// points are just objects with x & y properties
Example = {
    defaults: {
        numPoints: 100,
        xCenter: 0,
        yCenter: 0,
        xRange: 50,
        yRange: 50
    },

    points: [],

    rand: function() {
        return Math.random() * 2.0 - 1.0;
    },

    init: function(options) {
        if (options) {
            this.options = _.extend(options, this.defaults);
        } else {
            this.options = this.defaults;
        }

        this.initializeRaphael();
        this.generatePoints();
    },

    initializeRaphael: function() {
        // TODO:eo
    },

    generatePoints: function() {
        for (i = 0; i < this.options.numPoints; i++) {
            this.points.push({
                x: this.options.xRange / 2.0 * this.rand() + this.options.xCenter,
                y: this.options.yRange / 2.0 * this.rand() + this.options.yCenter
            })
        }
    }
}
        
Example.init();