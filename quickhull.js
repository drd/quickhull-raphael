function vector(p1, p2) {
	this.p1 = p1;
	this.p2 = p2;
}

function point(x, y) {
	this.x = x;
	this.y = y;
}

point.prototype.is_left_of = function(vector) {
	p1 = vector.p1
	p2 = vector.p2
	return ((p2.x - p1.x)*(y - p1.y) - (p2.y - p1.y)*(x - p1.x)) > 0;
}

/* Accepts an array of points and returns an aray of edges */
function quickhull(points_list) {

}

