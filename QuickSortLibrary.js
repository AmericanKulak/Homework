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

		quicksort(array, 0, array.length - 1, valFn);

		return array;
	}

	function quicksort(array, left, right, valFn)
	{
		if(left < right)
		{
			var pivotIndex = choosePivot(array, left, right, valFn);

			var pivotNewIndex = partition(array, left, right, pivotIndex, valFn);

			quicksort(array, left, pivotNewIndex - 1, valFn);
			quicksort(array, pivotNewIndex + 1, right, valFn);
		}
	}

	function choosePivot(array, left, right, valFn)
	{
		var l = array[left];
		var r = array[right];
		var m = array[Math.floor((left + right) / 2)];

		if((valFn(m, l) < 0 && valFn(l, r) < 0) || (valFn(m, l) > 0 && valFn(l, r) > 0))
			return left;

		if((valFn(m, r) < 0 && valFn(r, l) < 0) || (valFn(m, r) > 0 && valFn(r, l) > 0))
			return right;

		else
			return Math.floor((left + right) / 2);

	}


	function partition(array, left, right, pivotIndex, valFn)
	{
		var pivotValue = array[pivotIndex];

		swap(pivotIndex, right);

		var storeIndex = left;

		for (var i = left; i < right; i++) {
			if(valFn(array[i], pivotValue) <= 0)
			{
				swap(i, storeIndex);

				storeIndex++;
			}
		};

		swap(storeIndex, right);

		return storeIndex;


		function swap(a, b)
		{
			var temp = array[a];
			array[a] = array[b];
			array[b] = temp;
		}
	}

	

	var library = {};

	library.sort = sort;

	module.exports = library;

	// var testArray = [];

	// for (let i = 0; i < 10; i++) {
	// 	let x = Math.random();

	// 	let obj = {
	// 		"a" : x
	// 	};

	// 	testArray.push(obj);

	// 	console.log(x);
	// };

	// console.log(sort(testArray, function(a, b){ return  a.a - b.a; }));

	// console.log(sort(["bob", "charlie", "alf", "echo", "delta"]));

	// console.log(sort(["bob", "charlie", "alf", "echo", "delta"], function(a, b){ return a.length - b.length;}));

	// console.log(sort([3,7,8,5,2,1,9,5,4]));

})();