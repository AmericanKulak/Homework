"use strict";

(function(){

	var sort = function(array, valFn)
	{
		quicksort(array, 0, array.length-1, valFn);

		return array;
	}

	function quicksort(array, left, right, valFn)
	{
		if(left < right)
		{

			var pivotIndex = choosePivot(array, left, right, valFn);

			console.log("pivotIndex: " + pivotIndex);

			var pivotNewIndex = partition(array, left, right, pivotIndex, valFn);

			console.dir(array);

			quicksort(array, left, pivotNewIndex - 1, valFn);
			quicksort(array, pivotNewIndex + 1, right, valFn);
		}
	}

	function choosePivot(array, left, right, valFn)
	{
		return Math.floor(left + right / 2);
	}


	function partition(array, left, right, pivotIndex, valFn)
	{
		var pivotValue = array[pivotIndex];

		swap(pivotIndex, right);

		var storeIndex = left;

		for (var i = left; i < right; i++) {
			if(array[i] <= pivotValue)
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

	console.log(sort([3,7,8,5,2,1,9,5,4]));

})();