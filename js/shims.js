if (! DOMTokenList.prototype.hasOwnProperty('replace')) {
	DOMTokenList.prototype.replace = function(cname1, cname2) {
		if (this.contains(cname1)) {
			this.remove(cname1);
			this.add(cname2);
		}
	};
}
