/* build Interface Class */
var jvm = jvm || {};
jvm.Interface = function(paramName, paramMethods){

	if(arguments.length != 2){ // Interfaces must have an object and an array of method names
		throw new Error('Exception: jvm.Interface constructor called with ' + arguments.length + ' arguments, but expect exactly 2');
	}

	this.name = paramName;
	var methods = paramMethods;
	this.methods = [];

	for(var i = 0, len = methods.length; i < len; i++){
		if(typeof methods[i] != 'string'){
			throw new Error('Exception: jvm.Interface constructor expects method names to be passed as string');
		}

		this.methods.push(methods[i]); // method is a string, store in instance
	}
};
jvm.Interface.ensureImplements = function(paramObject){ // static method, must involk directly through jvm.Interface. Cannot be accessed through instance

	var object = paramObject;

	if(arguments.length < 2){
		throw new Error('Exception: jvm.Interface.ensureImplements called with ' + arguments.length + ' arguments, but expects at least 2');
	}

	for(var i = 1, len = arguments.length; i < len; i++){ // start with second argument. First argument is always an object. Args after 1st are interface names
		var interface = arguments[i];
		if(interface.constructor != jvm.Interface){
			throw new Error('Exception: jvm.Interface.ensureImplements expects arguments two and above to be instances of Interface');
		}
		for(var j = 0, methodsLen = interface.methods.length; j < methodsLen; j++){ // iterate through jvm.Interface instance methods property
			var method = interface.methods[j];

			if(!object[method] || typeof object[method] !== 'function'){ // method must be in object and must be tupe of function
				throw new Error('Exception: jvm.Interface.ensureImplements object does not implement the ' + interface.name + ' interface.methods: ' + method + ' was not found');
			}
		} // End inner for()
	} // End otter for()

};