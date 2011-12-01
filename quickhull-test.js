var test_cnt = 10;
var xmin = -100;
var ymin = -100;
var xmax = 100;
var ymax = 100;
var xcen = 0;
var ycen = 0;

var tests = {
    // 'Circle (r=Random(0,100))': [
    //     geometry.gen_circle_points,
    //     [xcen, ycen]
    // ]};
    'Uniform Point Cloud': [
        geometry.gen_random_points,
        [xmin, xmax, ymin, ymax]
    ]
    //     'Circle (r=100)': [
    //         geometry.gen_circle_points,
    //         [xcen, ycen, 100]
    //     ],
    //     'Circle (r=Random(0,100))': [
    //         geometry.gen_circle_points,
    //         [xcen, ycen]
    //     ],
    //     'Line (slope=Random(-10000,10000))': [
    //         geometry.gen_line_points,
    //         []
    //     ]
    // }
};

function Test(point_cnt, point_function, point_args) {
    function singleTest() {
	var points = point_function.apply(this, [point_cnt].concat(point_args));
        console.profile('quickhull:' + point_cnt);
	var qh = quickhull(points);
        console.profileEnd();
        // console.profile('bruteforce:' + point_cnt);
	// var bf = convex_hull_bruteforce(points);
        // console.profileEnd();
	return true; //geometry.points_lists_are_equal(qh, bf);
    }

    var i;
    for(i = 0;i < test_cnt;++i) {
	if(!singleTest()) {
	    $("#test_log").append("Error!<br />");
	    return;
	}
    }

    $("#test_log").append("done<br />");
}

function startTest() {
    $("#test_log").html("");
    _(tests).each(function(test, name) {
        $('#test_log').append('Starting ' + name + '..<br />');
        _(_.range(30000, 100000, 10000)).each(
            function(point_cnt) {
                $('#test_log').append('Using ' + point_cnt + ' points..<br />');
                Test.apply(this, [point_cnt].concat(test));
            });
        $('#test_log').append('Done with ' + name + '..<br />');
    });
}

$(function() {
    $("#start_button").click(function(event) {
        startTest();
        var runTimes = _(console.profiles).reduce(
            function(a, p) {
                var alg = p.title.split(':')[0];
                var pts = p.title.split(':')[1];
                a[alg][pts] = a[alg][pts] ? 
                    a[alg][pts].concat(p.head.totalTime) : 
                    [p.head.totalTime];
                return a; 
            }, {'quickhull': {}} // , 'bruteforce': {}}
        );
        console.log(runTimes);
        results = _(runTimes).map(function(pts, alg) {
            return {
                name: alg + ' median',
                data: _(pts).map(function(times) {
                    return times.sort()[Math.round(times.length/2)];
                })
            };
        }).concat(_(runTimes).map(function(pts, alg) {
            return {
                name: alg + ' avg',
                data: _(pts).map(function(times) {
                    return times.reduce(function(s, t) { return s + t; }) / times.length;
                })
            };
        }));
        chart = new Highcharts.Chart({
	    chart: {
		renderTo: 'charts',
		defaultSeriesType: 'line',
		marginRight: 130,
		marginBottom: 25
	    },
	    title: {
		text: 'Median Runtime vs Number of Points',
		x: -20 //center
	    },
	    xAxis: {
                title: { text: 'Number of points' },
                categories: _(runTimes['quickhull']).keys(),
                y: -20
	    },
	    yAxis: {
		title: {
		    text: 'Runtime (ms)'
		},
		plotLines: [{
		    value: 0,
		    width: 1,
		    color: '#808080'
		}]
	    },
	    tooltip: {
		formatter: function() {
		    return '<b>'+ this.series.name +'</b><br/>'+
			this.x +': '+ this.y + 'ms';
		}
	    },
	    legend: {
		layout: 'vertical',
		align: 'right',
		verticalAlign: 'top',
		x: -10,
		y: 100,
		borderWidth: 0
	    },
	    series: results
        });
    });
});
