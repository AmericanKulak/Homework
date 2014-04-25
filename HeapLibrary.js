"use strict";

(function(){

	var Heap = function(array){

		if(typeof array === "undefined")
			array = [];

		this.elements = array;
		this.size = array.length;

		this.reorder();
	}

	var Node = function(data, value){
		this.value = value;
		this.data = data;
	}

	Heap.prototype.findMin = function() {
		return this.elements[0];
	}

	Heap.prototype.deleteMin = function() {

		this.elements[0] = this.elements[this.size - 1];
		this.elements.pop();
		this.size--;

		checkNodeDown.call(this, 0);

		return this;
	}

	Heap.prototype.insert = function(node) {

		this.size++;
		this.elements.push(node);

		checkNodeUp.call(this, this.elements.length - 1);

		return this;
	}

	Heap.prototype.reorder = function() {

		if(this.size <= 1)
			return;

		var lastNonLeafNodeIndex = Math.floor(this.size / 2) - 1;

		for (let i = lastNonLeafNodeIndex; i >= 0; i--) {
			checkNodeDown.call(this, i);
		};

		return this;
	}

	Heap.prototype.push = Heap.prototype.insert;

	Heap.prototype.pop = function() {

		var ret = this.findMin();

		this.deleteMin();

		return ret;
	}

	Heap.prototype.print = function(){

		var level = 0;
		var currentIndex = 0;

		while(currentIndex < this.elements.length)
		{
			var numberOfElements = Math.pow(2, level);

			var subArray = this.elements.slice(currentIndex, currentIndex + numberOfElements)

			var printLine = "";
			for (var i = 0; i < subArray.length; i++) {
				printLine = printLine + subArray[i].value + " ";
			};

			console.log(printLine);

			currentIndex = currentIndex + numberOfElements;
			level ++;
		}

		return this;

	}

	function checkNodeUp(nodeIndex)
	{

		var isRoot = nodeIndex <= 0;
		if(isRoot)
			return;

		var parentIndex = ((nodeIndex + (nodeIndex % 2)) - 2) / 2;

		if(this.elements[parentIndex].value > this.elements[nodeIndex].value)
		{
			let temp = this.elements[nodeIndex];
			this.elements[nodeIndex] = this.elements[parentIndex];
			this.elements[parentIndex] = temp;

			checkNodeUp.call(this, parentIndex);
		}
	}

	function checkNodeDown(nodeIndex)
	{

		var isLeafNode = nodeIndex >= Math.floor(this.elements.length / 2);

		if(isLeafNode)
			return;

		var leftChildIndex = nodeIndex * 2 + 1;
		var rightChildIndex = nodeIndex * 2 + 2;
		var leftChildExists = leftChildIndex < this.elements.length;
		var rightChildExists = rightChildIndex < this.elements.length;

		var swapIndex = -1;

		if(leftChildExists && rightChildExists && this.elements[nodeIndex].value > this.elements[leftChildIndex].value && this.elements[nodeIndex].value > this.elements[rightChildIndex].value)
		{

			if(this.elements[leftChildIndex].value < this.elements[rightChildIndex].value)
				swapIndex = leftChildIndex;
			else
				swapIndex = rightChildIndex;

			
		}
		else if(leftChildExists && this.elements[nodeIndex].value > this.elements[leftChildIndex].value)
		{
			swapIndex = leftChildIndex;
		}

		else if(rightChildExists && this.elements[nodeIndex].value > this.elements[rightChildIndex].value)
		{
			swapIndex = rightChildIndex;
		}

		if(swapIndex != -1)
		{
			let temp = this.elements[nodeIndex];
			this.elements[nodeIndex] = this.elements[swapIndex];
			this.elements[swapIndex] = temp;

			checkNodeDown.call(this, swapIndex);
		}
	}

	var library = {};

	library.Heap = Heap;
	library.Node = Node;

	module.exports = library;

})();