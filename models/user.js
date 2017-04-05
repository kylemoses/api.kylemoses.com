module.exports = function User(name, password) {
	this.username = name;
	this.password = password;
	this.getInfo = function() {
		return {
			'username': this.username,
			'password': this.password
		}
	}
}
