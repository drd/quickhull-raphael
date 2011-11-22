/* Brute force implementation of convex hull
   Accepts array of points and returns array of edges */
function convex_hull_bruteforce(points_list) {
	// For each pair of points p, q determine if all other points
	// lie to the left of the line connecting p and q

	// Generate points on hull
	hull_list = new Array();
	_.each(points_list, function(p) {
		_.each(points_list, function(q) {
			if(geometry.points_are_equal(p, q)) return;
			if(geometry.vector_on_hull(points_list, p, q)) {
				hull_list.push([p, q]);
			}
		});
	});

	console.log("Hull consists of:" );
	_.each(hull_list, function(vector) { console.log("\t" + vector[0] + " -> " + vector[1]); });

	return hull_list;
}
