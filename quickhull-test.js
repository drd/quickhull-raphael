/* Brute force implementation of convex hull
   Accepts array of points and returns array of edges */
function convex_hull_bruteforce(points_list) {
	function points_are_equal(p1, p2) {
		return p1[0] == p2[0] && p1[1] == p2[1];
	}

	function cross_prod(v1, v2) {
		return (v1[0]*v2[1]) - (v1[1]*v2[0]);
	}

	function points_left_of(p1, p2, cmp) {
		var v1 = [p2[0] - p1[0], p2[1] - p1[1]]
		var v2 = [p2[0] - cmp[0], p2[1] - cmp[1]]
		return cross_prod(v1, v2) <= 0;
	}

	function vector_on_hull(test_list, p1, p2) {
		return _.each(test_list, function(test_point) {
			if(points_are_equal(test_point, p1) || points_are_equal(test_point, p2)) return true;
			return points_left_of(p1, p2, test_point);
		});
	}

	// For each pair of points p, q determine if all other points
	// lie to the left of the line connecting p and q

	// Generate points on hull
	hull_list = new Array();
	_.each(points_list, function(p) {
		_.each(points_list, function(q) {
			if(points_are_equal(p, q)) return;
			if(vector_on_hull(points_list, p, q)) {
				hull_list.push([p, q]);
				console.log("( " + p + " -> " + q + " ) is on the hull");
			} else
				console.log("( " + p + " -> " + q + " ) is not on hull");
		});
	});

	console.log("Hull consists of: " + hull_list);
	return hull_list;
}

convex_hull_bruteforce([[0, 0], [1, 2], [5, 6], [1, 1]]);

