// Example is the singleton object which controls the quickhull example
// and interacts with Raphael and jQuery to produce the UI.
// points are just objects with x & y properties
Example = {
    defaults: {
        // these are parameters for the underlying quickhull algorithm
        numPoints: 100,
        xCenter: 0,
        yCenter: 0,
        xRange: 50,
        yRange: 50,

        // these configure the UI display
        width: 600,
        height: 400,
        pointRadius: 3,
        pointColor: '#999',
        backgroundColor: '#e7e7f3',
        containerSelector: '#graphPaper'
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

    initializeRaphael: function(undefined) {
        if (Raphael == undefined) {
            console.error('This example requires Raphael.js');
            return;
        }

        this.container = $(this.options.containerSelector);
        var width = this.container.width();
        var height = this.container.height();

        var x = this.container.offset().left;
        var y = this.container.offset().top;

        this.canvas = Raphael(this.container[0], width, height);
        this.drawGraphLines();
    },

    mapCoord: function(coord) {
        var local = Object.create(coord);
        local.x = local.x;
    },

    drawGraphLines: function() {
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

window.jQuery(document).ready(function($) {   
    Example.init();
});
