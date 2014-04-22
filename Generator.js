function* fibonacci(){

	var element1 = 0;
	var element2 = 1;

	while(true)
	{
		var nextElement = element1 + element2;
		element1 = element2;
		element2 = nextElement;
		yield nextElement;
	}
}

var fibo = fibonacci();

console.log(fibo.next());