"use strict";

(function(){

	var sort = function(array, valFn)
	{
		if(valFn == null)
		{
			valFn = function(a, b) {
				if(a < b)
					return -1;
				else if(a > b)
					return 1;
				else
					return 0;
			}
		}

		if(array.length <= 1)
			return array;

		var left = []
		  , right = []
		  , middle = Math.floor(array.length / 2);

		for (let i = 0; i < middle; i++) {
			left.push(array[i]);
		};

		for(let i = middle; i < array.length; i++) {
			right.push(array[i]);
		}

		left = sort(left, valFn);
		right = sort(right, valFn);

		return merge(left, right, valFn);
	}

	var merge = function(left, right, valFn)
	{
		var result = [];

		while(left.length > 0 || right.length > 0)
		{
			if(left.length > 0 && right.length > 0)
			{
				if(valFn.call(null, left[0], right[0]) <= 0)
					result.push(left.shift(1));
				else
					result.push(right.shift(1));
			}
			else if(left.length > 0)
				result.push(left.shift(1));
			else
				result.push(right.shift(1));
		}

		return result;
	}


	var library = {};

	library.sort = sort;

	module.exports = library;

	var testArray = [];

	for (let i = 0; i < 10; i++) {
		let x = Math.random();

		let obj = {
			"a" : x
		};

		testArray.push(obj);

		console.log(x);
	};

	console.log(sort(testArray, function(a, b){ return  a.a - b.a; }));

	console.log(sort(["bob", "charlie", "alf", "echo", "delta"]));

	console.log(sort(["bob", "charlie", "alf", "echo", "delta"], function(a, b){ return a.length - b.length;}));

	console.log(sort([5,3,2,4,1]));

})();