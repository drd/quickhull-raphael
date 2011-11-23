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
            glow.animate({opacity: .125}, 300, '>', function() {
                glow.animate({opacity: 0}, 300, '<');
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
		console.log('p: ', p);
		console.log('q: ', q);
		console.log('farthest: ', farthest);
		
		if(!geometry.points_are_equal(p, farthest) && !geometry.points_are_equal(q, farthest))
			ch_points.push(farthest);
		console.log('hull list: ', ch_points)

		var s1_points = _.filter(points, function(point) {
			if(geometry.points_are_equal(point, p) || geometry.points_are_equal(point, farthest))
				return false;
			return geometry.point_left_of_or_on([farthest, p], point);
		}, {'p': p, 'farthest': farthest});

		var s2_points = _.filter(points, function(point) {
			if(geometry.points_are_equal(point, q) || geometry.points_are_equal(point, farthest))
				return false;
			return geometry.point_left_of_or_on([q, farthest], point);
		}, {'q': q, 'farthest': farthest});

            highlight(s1_points, {stroke: '#c00'});
            highlight(s2_points, {stroke: '#0c0'});
		triangle_part(s1_points, p, farthest, ch_points);
		triangle_part(s2_points, farthest, q, ch_points);

		return ch_points;
	}

	if(!chord_finder)
		chord_finder = left_right_chord;
	var chord = chord_finder(points_list);

	var hull_points = [].concat(chord);

	var lower = _.filter(points_list, function(point) {
		return geometry.point_left_of(chord, point);
	}, {'chord': chord});
	var upper = _.filter(points_list, function(point) {
		return geometry.point_right_of(chord, point);
	}, {'chord': chord});

    highlight(lower, {stroke: '#f00'});
    highlight(upper, {stroke: '#0f0'});
	console.log('Dataset: ', points_list);
	console.log('Using chord: ', chord);
	console.log('upper: ', upper);
	console.log('lower: ', lower);

	console.log('');
	console.log('Handling upper');
	triangle_part(upper, chord[0], chord[1], hull_points);

	console.log('');
	console.log('Handling lower');
	triangle_part(lower, chord[1], chord[0], hull_points);
	return hull_points;
}

