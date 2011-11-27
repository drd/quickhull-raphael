/* Accepts an array of points and returns an aray of edges */
function quickhull(points_list, chord_finder, ex) {
    function highlight(ps, attrs, undefined) {
        if (ps[0] && (ps[0].length === undefined)) {
            ps = [ps];
        }
        
        _(ps).each(function(_p) {
            var p = ex.pointMap[_p];
            var glow = p.glow();
            glow.attr(_.extend({opacity: 0}, attrs));
            glow.animate({opacity: .125}, 250, '>', function() {
                glow.animate({opacity: 0}, 250, '<');
            });
        });
    }

	function left_right_chord(points_list) {
		var min = points_list[0];
		var max = points_list[0];
		_.each(points_list, function(elem) {
			if(max[0] <= elem[0]) max = elem;
			if(min[0] >= elem[0]) min = elem;
		});
		return [min, max];
	}

	function triangle_part(points, p, q, ch_points) {
		if(points.length == 0)
			return;
		if(!ch_points)
			var ch_points = []

		var farthest = _.max(points, function(point) {
			return geometry.dist_point_from_line(point, p, q);
		}, {'p': p, 'q': q});
		if(geometry.dist_point_from_line(farthest, p, q) <= 0)
			alert('Invalid point');
		//console.log('p: ', p);
		//console.log('q: ', q);
		//console.log('farthest: ', farthest);
		
		if(geometry.points_are_equal(p, farthest) || geometry.points_are_equal(q, farthest))
			return;

		function outer_points(points, point1, point2) {
			return _.filter(points, function(point) {
				if(geometry.points_are_equal(point, point1) || geometry.points_are_equal(point, point2))
					return false;
				return geometry.point_left_of_or_on([point1, point2], point);
			}, {'point1': point1, 'point2': point2});
		}

		var bad_points = _.filter(points, function(point) {
			if(geometry.points_are_equal(point, p) || geometry.points_are_equal(point, q) || geometry.points_are_equal(point, farthest))
				return false;
			return geometry.point_left_of_or_on([farthest, p], point) && geometry.point_left_of_or_on([q, farthest], point);
			}, {'p': p, 'q': q, 'farthest': farthest});
		console.log('p: ', p);
		console.log('q: ', q);
		console.log('farthest: ', farthest);
		console.log('Bad points: ', bad_points);
		console.log();

		var s1_points = outer_points(points, farthest, p);
		//console.log("s1_points: ", s1_points);
		var s2_points = outer_points(points, q, farthest);
		//console.log("s2_points: ", s2_points);

            highlight(s1_points, {stroke: '#c00'});
            highlight(s2_points, {stroke: '#0c0'});

//            setTimeout(function() {
		triangle_part(s1_points, p, farthest, ch_points);
            // }, 500);
/*
		var app = true;
		_.each(ch_points, function(point) {
			if(geometry.points_are_equal(point, farthest)) {
				console.trace();
				alert('error' + p + ', ' + q + ', ' + ', ' + farthest);
				app = false;
			}
		});
		if(app)*/ ch_points.push(farthest);
			
            // setTimeout(function() {
		triangle_part(s2_points, farthest, q, ch_points);
            // }, 1000);

		return ch_points;
	}

	if(!chord_finder)
		chord_finder = left_right_chord;
	var chord = chord_finder(points_list);

	var hull_points = [];
	hull_points.push(chord[0]);
    Example.pointMap[chord[0]].attr('fill', '#fcc');
    Example.pointMap[chord[1]].attr('fill', '#cfc');

	var lower = _.filter(points_list, function(point) {
		return geometry.point_left_of(chord, point);
	}, {'chord': chord});
	var upper = _.filter(points_list, function(point) {
		return geometry.point_right_of(chord, point);
	}, {'chord': chord});

    // highlight(lower, {stroke: '#f00'});
    // highlight(upper, {stroke: '#0f0'});
	console.log('Dataset: ', points_list);
	console.log('Using chord: ', chord);
	console.log('upper: ', upper);
	console.log('lower: ', lower);

	console.log('');
	console.log('Handling upper');
	triangle_part(upper, chord[0], chord[1], hull_points);

	hull_points.push(chord[1]);

	console.log('');
	console.log('Handling lower');
	triangle_part(lower, chord[1], chord[0], hull_points);
	return hull_points;
}

