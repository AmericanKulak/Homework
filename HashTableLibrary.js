//Of note, objects function like Hash Tables in javascript.  I'm just going to implement one using only arrays, for studies.
(function() {

	var storage = [];

	var expansions = 0;
	var initialLength = 2;
	var bucketLengthLimit = 2;
	var pointer = 0;



	var insert = function(key, data){

		var bucketIndex = hash(key);
		addToBucket(bucketIndex, {key: key, data: data});
		handleOverflow(bucketIndex);

	}

	var find = function(key)
	{
		var bucketIndex = hash(key);

		for (var i = 0; i < storage[bucketIndex].length; i++) {
			if(storage[bucketIndex][i].key == key)
				return storage[bucketIndex][i].data;
		};
	}

	var remove = function(key)
	{
		var bucketIndex = hash(key);

		for (var i = 0; i < storage[bucketIndex].length; i++) {
			if(storage[bucketIndex][i].key == key)
				return storage[bucketIndex].splice(i,1)[0].data;
		};
	}


	

	function hash(key)
	{
		var hash = actualHash(key);
		return reduceHash(hash);

	}

	function actualHash(key)
	{
		var hash = 0, i, chr, len;

		if (key.length == 0) return hash;

		for (i = 0, len = key.length; i < len; i++) {
			chr   = key.charCodeAt(i);
			hash  = ((hash << 5) - hash) + chr;
			hash |= 0; // Convert to 32bit integer
		}

		return hash;
	}

	function reduceHash(hash)
	{
		var proposedLocation = hash % reducer(0);

		if(proposedLocation < pointer)
			return hash % reducer(1);
		else
			return proposedLocation;

		function reducer(level)
		{
			return (2 * Math.pow(2, expansions + level));
		}
	}

	function addToBucket(index, element)
	{
		if(!storage[index])
			storage[index] = [];

		for (var i = 0; i < storage[index].length; i++) {
			if(storage[index][i].key == element.key)
				return;
		};

		storage[index].push(element);
	}

	function handleOverflow(index)
	{
		if(storage[index].length > bucketLengthLimit)
			overflow();

		if(pointer >= initialLength * Math.pow(2, expansions))
		{
			pointer = 0;
			expansions++;
		}
	}

	function overflow()
	{
		if(!storage[pointer])
			storage[pointer] = [];

		var splitBucketIndex = pointer;
		pointer++;


		for (var i = 0; i < storage[splitBucketIndex].length; i++) {
		

			var insertLocation = hash(storage[splitBucketIndex][i].key);

			if(insertLocation != splitBucketIndex)
			{
				var element = storage[splitBucketIndex].splice(i, 1)[0];

				if(!storage[insertLocation])
					storage[insertLocation] = [];

				storage[insertLocation].push(element);
				i--;
			}
		};
		

	}


	var library = {};

	library.insert = insert;
	library.find = find;
	library.remove = remove;

	module.exports = library;

})();