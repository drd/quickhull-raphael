var geometry = {
	points_are_equal: function(p1, p2) {
		return p1[0] == p2[0] && p1[1] == p2[1];
	},

	point_left_of: function(vect, cmp) {
		p1 = vect[0]
		p2 = vect[1]
		return ((p2[0] - p1[0])*(cmp[1] - p1[1]) - (p2[1] - p1[1])*(cmp[0] - p1[0])) < 0;
	},

	point_left_of_or_on: function(vect, cmp) {
		p1 = vect[0]
		p2 = vect[1]
		return ((p2[0] - p1[0])*(cmp[1] - p1[1]) - (p2[1] - p1[1])*(cmp[0] - p1[0])) <= 0;
	},

	point_right_of_or_on: function(vect, cmp) {
		p1 = vect[0]
		p2 = vect[1]
		return ((p2[0] - p1[0])*(cmp[1] - p1[1]) - (p2[1] - p1[1])*(cmp[0] - p1[0])) >= 0;
	},

	point_right_of: function(vect, cmp) {
		p1 = vect[0]
		p2 = vect[1]
		return ((p2[0] - p1[0])*(cmp[1] - p1[1]) - (p2[1] - p1[1])*(cmp[0] - p1[0])) > 0;
	},

	vector_on_hull: function(test_list, p1, p2) {
		return _.all(test_list, function(test_point) {
			if(geometry.points_are_equal(test_point, p1) || geometry.points_are_equal(test_point, p2)) return true;
			var ret = geometry.point_left_of([p1, p2], test_point);
			return ret;
		});
	},

	dist_point_from_line: function(point, p1, p2) {
		var a = point[0] - p1[0];
		var b = point[1] - p1[1];
		var c = p2[0] - p1[0];
		var d = p2[1] - p1[1];
		return Math.abs(a * d - c * b) / Math.sqrt(c * c + d * d);
	},

	gen_random_points: function(cnt, xmin, xmax, ymin, ymax) {
		var points = [];
		var i;

		var xrange = xmax - xmin;
		var yrange = ymax - ymin;
		for(i = 0;i < cnt;++i) {
			points.push([
				(Math.random() * xrange) + xmin,
				(Math.random() * yrange) + ymin
			]);
		}
		return points;
	}
}

