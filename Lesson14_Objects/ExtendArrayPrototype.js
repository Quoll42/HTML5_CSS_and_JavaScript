Array.prototype.contains = function(val) {
    for (let i = 0; i < this.length; i++) {
        if (this[i] === val) {
            return true;
        }
    return false;
    }
}