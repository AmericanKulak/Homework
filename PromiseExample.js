var Q = require('q');

var simplePromiseGenerator = function()
{
	var counter = 0;
	counter++;

	var deferred = Q.defer();

	deferred.resolve(counter);

	return deferred.promise;
}

simplePromiseGenerator().then(function(data){
	console.log(data);
})