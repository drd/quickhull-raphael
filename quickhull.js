/* Accepts an array of points and returns an aray of edges */
function quickhull(points_list, chord_finder) {
	function left_right_chord(points_list) {
		var min = points_list[0];
		var max = points_list[1];
		_.each(points_list, function(elem) {
			if(min[0] <= elem[0]) max = elem;
			if(min[0] >= elem[0]) min = elem;
		});
	}

	if(!chord_finder)
		chord_finder = left_right_chord;
	var chord = chord_finder(points_list);

	var furthest = points_list[0];
	_.max(points_list, function(point) {
		return geometry.dist_point_from_line(point, chord);
	});

	var recur_points = new Array();
}

