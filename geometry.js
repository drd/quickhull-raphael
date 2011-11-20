Vector2d = function(arguments) {
    return this.concat(arguments);
}

Vector2d.prototype = new Array;

Vector2d.prototype.crossProduct = function(other) {
    return this[0] * other[1] - this[1] * other[0];
}