/* Accepts an array of points and returns an aray of edges */
function quickhull(points_list, chord_finder) {
	function left_right_chord(points_list) {
		var min = points_list[0];
		var max = points_list[1];
		_.each(points_list, function(elem) {
			if(min[0] <= elem[0]) max = elem;
			if(min[0] >= elem[0]) min = elem;
		});
		return [min, max];
	}

	function triangle_part(points, p, q) {
		if(points.length == 0)
			return;
		var ch_points = []

		var farthest = _.max(points, function(point) {
			return geometry.dist_point_from_line(point, this[0], this[1]);
		}, chord);
		ch_points.push(farthest);

		var s1_points = _.filter(points, function(point) {
			return geometry.point_left_of([p, farthest], point);
		}, {'p': p, 'farthest': farthest});
		var s2_points = _.filter(points, function(point) {
			return geometry.point_left_of([farthest, q], point);
		}, {'q': q, 'farthest': farthest});

		ch_points.concat(triangle_part(s1_points, p, farthest));
		ch_points.concat(triangle_part(s2_points, farthest, q));
		console.log(ch_points);

		return ch_points;
	}

	if(!chord_finder)
		chord_finder = left_right_chord;
	var chord = chord_finder(points_list);

	var hull_points = [].concat(chord);

	var upper = _.filter(points_list, function(point) {
		return geometry.point_left_of(this, point);
	}, chord);
	var lower = _.filter(points_list, function(point) {
		return geometry.point_right_of(this, point);
	}, chord);

	hull_points.concat(triangle_part(upper, chord[0], chord[1]));
	hull_points.concat(triangle_part(lower, chord[1], chord[0]));
	return hull_points;
}

