(function() {

	var Tree = function(comparer)
	{
		this.comparer = comparer;
		this.root = null;

		if(typeof this.comparer !== "function")
			this.comparer = function(a,b) {
				if(a < b)
					return -1;
				else if(a > b)
					return 1;
				else
					return 0;
			}
	}

	var Node = function(key, data)
	{
		this.key = key;
		this.data = data;
		this.parent = null;
		this.leftChild = null;
		this.rightChild = null;
		this.leftWeight = 0;
		this.rightWeight = 0;
	}

	Tree.prototype.insert = function(key, data)
	{
		var node;

		if(key instanceof Node)
			node = key;
		else
			node = new Node(key, data);

		if(this.root == null)
			this.root = node;
		else
			this.root.insertBelow(node, this.comparer);
	}

	Tree.prototype.find = function(key)
	{
		if(this.root == null)
			return;

		return this.root.find(key, this.comparer).data;
	}

	Tree.prototype.inOrder = function()
	{
		var ret = [];

		var visit = function(node)
		{
			ret.push(node.data);
		}

		var traverse = function(node)
		{
			if(node.leftChild != null)
				traverse(node.leftChild);

			visit(node);

			if(node.rightChild != null)
				traverse(node.rightChild);
		}

		traverse(this.root);

		return ret;
	}

	Tree.prototype.preOrder = function()
	{
		var ret = [];

		var visit = function(node)
		{
			ret.push(node.data);
		}

		var traverse = function(node)
		{
			visit(node);

			if(node.leftChild != null)
				traverse(node.leftChild);

			if(node.rightChild != null)
				traverse(node.rightChild);
		}

		traverse(this.root);

		return ret;
	}

	Tree.prototype.postOrder = function()
	{
		var ret = [];

		var visit = function(node)
		{
			ret.push(node.data);
		}

		var traverse = function(node)
		{
			if(node.leftChild != null)
				traverse(node.leftChild);

			if(node.rightChild != null)
				traverse(node.rightChild);

			visit(node);
		}

		traverse(this.root);

		return ret;
	}

	Tree.prototype.BFS = function()
	{
		var ret = [];

		var handlingStack = [];

		handlingStack.push(this.root);

		while(handlingStack.length > 0)
		{

			var current = handlingStack.splice(0,1)[0];
			
			ret.push(current.data);
			if(current.leftChild!=null)
				handlingStack.push(current.leftChild);
			if(current.rightChild!=null)
				handlingStack.push(current.rightChild);
		}

		return ret;
	}

	Node.prototype.insertBelow = function(node, comparer)
	{
		if(comparer(this.key, node.key) > 0)
		{
			if(this.leftChild == null)
			{
				this.leftChild = node;
				node.parent = this;
			}
			else
				this.leftChild.insertBelow(node, comparer);
			this.leftWeight++;
		}
		else
		{
			if(this.rightChild == null)
			{
				this.rightChild = node;
				node.parent = this;
			}
			else
				this.rightChild.insertBelow(node, comparer);
			this.rightWeight++;
		}
	}



	Node.prototype.find = function(key, comparer)
	{
		var comparison = comparer(this.key, key);
		if(comparison == 0)
			return this;
		else if(comparison < 0)
			return this.rightChild.find(key, comparer);
		else
			return this.leftChild.find(key, comparer);
	}

	Node.prototype.rotateClockwise = function(parentRelation)
	{
		var parent;
		if(typeof parentRelation === "undefined" || parentRelation == "null")
			parent = null;
		else
			parent = this.parent;


		//disassociate left child
		var left = this.leftChild;
		if(left == null)
			return;

		left.parent = null
		this.leftChild = null;

		//move left's left child over
		this.leftChild = left.rightChild;
		if(this.leftChild != null)
			this.leftChild.parent = this;

		//move this to be right child of left
		left.rightChild = this;
		this.parent = left;

		if(parent != null)
		{

			left.parent = parent;
			if(parentRelation == "right")
				left.parent.rightChild = this.parent;
			else
				left.parent.leftChild = this.parent;

		}

		return left;
	}

	Node.prototype.rotateCounterClockwise = function(parentRelation)
	{
		var parent;
		if(typeof parentRelation === "undefined" || parentRelation == "null")
			parent = null;
		else
			parent = this.parent;


		//disassociate right child
		var right = this.rightChild;

		right.parent = null
		this.rightChild = null;

		//move right's left child over
		this.rightChild = right.leftChild;
		this.rightChild.parent = this;

		//move this to be left child of right
		right.leftChild = this;
		this.parent = right;

		if(parent != null)
		{

			right.parent = parent;
			if(parentRelation == "right")
				right.parent.rightChild = this.parent;
			else
				right.parent.leftChild = this.parent;

		}

		return right;
	}


	var library = {};

	library.Tree = Tree;

	module.exports = library;

	var mytree = new Tree();

	mytree.insert("B", { nato: "Bravo" });
	mytree.insert("D", { nato: "Delta" });
	mytree.insert("A", { nato: "Alpha" });
	mytree.insert("E", { nato: "Echo" });
	mytree.insert("F", { nato: "Foxtrot" });
	mytree.insert("C", { nato: "Charlie" });

	console.log(mytree.BFS());


})();