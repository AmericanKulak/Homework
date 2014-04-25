"use strict";

var HeapLibrary = require("./HeapLibrary")
  , Heap = HeapLibrary.Heap
  , Node = HeapLibrary.Node
  , testData = require("./TSPTestData.js");

var priorityQueue = new Heap();
var myGraph = [];
var myCityCount = 0;
var N = 0;

//consider redundancy heuristic
var redundancyMap = Object.create(null);  //inherant in that we are processing the Cheapest path at any given point in time, if we ever find a duplicate, we know that the earlier one is cheaper


var Path = function(){
	this.cost = 0;
	this.cities = [];
	this.cityMap = [];
	this.currentCity = -1;
}

Path.prototype.goTo = function(city, cost)
{
	var ret = new Path();

	//cloning
	for (let city in this.cityMap) {
		ret.cityMap[city] = true;
	};
	for (var i = 0; i < this.cities.length; i++) {
		ret.cities.push(this.cities[i]);
	}


	//add new city
	ret.cost = this.cost + cost;
	ret.cityMap[city] = true;
	ret.cities.push(city);
	ret.currentCity = city;

	return ret;
}

Path.prototype.isRoundTrip = function(cityCount, origin)
{
	if(this.currentCity != origin)
		return false;
	for (var i = 0; i < cityCount; i++) {
		if(!this.cityMap[i])
			return false;
	};

	return true;
}



var initializeGraph = function(cityCount, origins, destinations, costs, bidirectional)
{
	myCityCount = cityCount;

	for (let i = 0; i < cityCount; i++) {
		myGraph[i] = [];
	}

	for (let i = 0; i < origins.length; i++) {
		myGraph[origins[i]][destinations[i]] = costs[i];
		// if(bidirectional)
		// 	myGraph[[destinations[i]][origins[i]] = costs[i];
	}
}

var initializeWithGraph = function(cityCount, map)
{
	myGraph = map;
	myCityCount = cityCount;
}

var reset = function()
{
	priorityQueue = new Heap();
	myGraph = [];
	myCityCount = 0;
	N = 0;

	//consider redundancy heuristic
	redundancyMap = Object.create(null);
}

var solve = function(origin)
{
	var startPath = new Path().goTo(origin, 0);

	addPath(startPath);

	while(priorityQueue.size > 0)
	{
		N++;
		var currentPath = priorityQueue.pop().data;

		//checkSuccess
		if(currentPath.isRoundTrip(myCityCount, origin))
			return {path: currentPath.cities, cost: currentPath.cost};


		//process

		var myDestinations = myGraph[currentPath.currentCity];

		for(var destination in myDestinations)
		{
			let nuPath = currentPath.goTo(destination, myDestinations[destination]);
			addPath(nuPath);
		}

	}

	return "impossible";
}

function addPath(path)  //O(log(N^N))  log of the stored paths N^N as worst case, heuristic reduces
{
	var key = getKey(path);

	//redundancy check
	if(redundancyMap[key] <= path.cost)
		return;
	else
		redundancyMap[key] = path.cost;


	priorityQueue.push(new Node(path, path.cost));

}

function isRedundant() 
{

}

function getKey(path)
{
	var key = "";
	key = key + path.currentCity;

	for(var city in path.cityMap)
	{
		key = key + "," + city;
	}

	return key;

	//results in "currentCity,city1,city2,city8"
}

var testCase = 5;
var testGraph

for (var cities = 2; cities < 13; cities++) {
	testCase = cities;
	testGraph = testData.Cities(testCase);

	reset();
	initializeWithGraph(testCase, testGraph);
	console.dir(solve(0));
	console.log(cities + " cities took " + N + " iterations.");
};

//initializeGraph(5, testOrigins, testDestinations, testCosts, false);


// console.dir(solve(0));
// console.dir(N);