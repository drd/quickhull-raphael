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
        this.drawGraph();
    },

    initializeRaphael: function(undefined) {
        if (Raphael === undefined) {
            console.error('This example requires Raphael.js');
            return;
        }

        this.container = $(this.options.containerSelector);
        this.width = this.container.width();
        this.height = this.container.height();

        var x = this.container.offset().left;
        var y = this.container.offset().top;

        this.canvas = Raphael(this.container[0], this.width, this.height);
    },

    // map graph coordinates into pixel coordinates
    mapCoord: function(coord) {
        var self = this;
        var xMin = (self.options.xCenter - self.options.xRange)/2;
        var yMin = (self.options.yCenter - self.options.yRange)/2;
        var tx = self.width / self.options.xRange;
        var ty = self.height / self.options.yRange;

        var local = Object.create(coord);
        local.x = tx * (local.x - xMin);
        local.y = ty * (local.y - yMin);
        return local;
    },

    drawGraph: function() {
        var numLines = 24;
        var self = this;
        var gx = self.width / numLines;
        var gy = self.height / numLines;

        this.graph = {
            background: self.canvas.rect(0, 0, this.width + 1, this.height + 1),
            lines: _(_.range(0, numLines)).reduce(
                function(lines, l) {
                    var color = ((l & 3) == 0) ? '#fff' : '#eee';
                    var x = l * gx;
                    var y = l * gy;
                    lines.horizontal.push(
                        self.canvas.rect(0, y, self.width, 0.25).
                            attr('stroke', color));
                    lines.vertical.push(
                        self.canvas.rect(x, 0, 0.25, self.height).
                            attr('stroke', color));
                    return lines;
                },
                { horizontal: [], vertical: [] }
            ),
            points: _(this.points).map(function(p) {
                var q = self.mapCoord(p);
                return self.canvas.circle(q.x, q.y, self.options.pointRadius).
                    attr('fill', self.options.pointColor).
                    attr('stroke-width', 0);
            })
        };
        this.graph.background.attr('fill', this.options.backgroundColor);
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
