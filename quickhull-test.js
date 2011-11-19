/* Brute force implementation of convex hull
   Accepts array of points and returns array of edges */
function convex_hull_bruteforce(points_list) {
	function points_are_equal(p1, p2) {
		return p1[0] == p2[0] && p1[1] == p2[1];
	}

	function point_left_of(vect, cmp) {
		p1 = vect[0]
		p2 = vect[1]
		return ((p2[0] - p1[0])*(cmp[1] - p1[1]) - (p2[1] - p1[1])*(cmp[0] - p1[0])) > 0;
	}

	function vector_on_hull(test_list, p1, p2) {
		return _.all(test_list, function(test_point) {
			if(points_are_equal(test_point, p1) || points_are_equal(test_point, p2)) return true;
			var ret = point_left_of([p1, p2], test_point);
			return ret;
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

	console.log("Hull consists of:" );
	_.each(hull_list, function(vector) { console.log("\t" + vector[0] + " -> " + vector[1]); });
	return hull_list;
}

convex_hull_bruteforce([[0, 0], [1, 2], [5, 6], [1, 1], [2, 2]]);

