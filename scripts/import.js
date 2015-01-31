/*		<div class="ontainerMiddleCenter center">
			<h1 class="middleCenter white">BUISINESS <span class="gray">TIME</span></h1>
			<h2 class="middleCenter gray">FRESH IDEAS FOR YOUR BUSINESS</h2>
		</div>*/

var jvm = jvm || {};
jvm.importData = (function(w, d, $){


	var Data = function(options){
		/*this.url = options.url;*/
		
		this.url = options.url;
		this.xmlFrag = 'Hello World';

	};
	Data.prototype = {
		that:this,
		connect:function(){
			
			var _frag = 'Hello World';
			var xmlRequest = $.ajax({
				url:this.url,
				context:d.body
			});
			xmlRequest.done(
				function(data){				
				_frag = data.getElementsByTagName('fragment')[0];
				$('#container').triggerHandler('data:retrieved', [_frag]);
			});	
			xmlRequest.always(function(error){
				console.log('Error:\t', error);
			});
		},
		get:function(){},
		append:function(options, paramXmlData){			




			
			var frag = d.createDocumentFragment();
			var firstChild = paramXmlData.getElementsByTagName('div')[0];
			var nodeHtml = d.createElement( firstChild.nodeName );
			nodeHtml.setAttribute( 'class', firstChild.getAttribute('class') );
			var nodeHeading0 = d.createElement(firstChild.getElementsByTagName('h1')[0].nodeName);
			var nodeHeading0Attribute = (firstChild.getElementsByTagName('h1')[0].getAttribute('class'));
			
			var nodeHeading0Text = d.createTextNode(firstChild.getElementsByTagName('h1')[0].firstChild.nodeValue);
			
			nodeHeading0.setAttribute('class', nodeHeading0Attribute);
			nodeHeading0.appendChild(nodeHeading0Text);
			frag.appendChild(nodeHeading0);
			

			var nodeExist = d.getElementById('container');
			nodeExist.appendChild(frag);



			
		}
	};

	var doData = function(object){
		jvm.Interface.ensureImplements(object, InterfaceData);
		var lclXmlData = object.connect();
	};
	var InterfaceData = new jvm.Interface('data', ['get', 'append', 'connect']);
	// define main() for init controller
	// main() involks doData(pass in data JS object) 
	// - - > test data JS object against InterfaceData

	var main = (function(){
		var objectData = new Data({url:'../pageMiddleRow0/index.xml'});

		$(function(){ // wait for DOM
			$('#container').on('data:retrieved', objectData.append); // define listener. We trigger it once AJAX response received			
			doData(objectData);			
		});
		
	})();

})(window, document, jQuery);