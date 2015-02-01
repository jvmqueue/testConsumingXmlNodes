var jvm = jvm || {};
jvm.import = (function(w, d, $){

	var Page = function(paramXmlObject){

	};

	var Xml = function(){

	};

	Xml.prototype = {
		getNode:function(paramNodeName){
			var node = null;
			return node;
		},
		getResponse:function(paramUrl){
			var req = $.ajax({
				url:paramUrl,
				context:d.body,
			});
			req.done(
				function(data){
					$('#container').triggerHandler('data:retrieved', [data]);
				}
			);
		},
		saveResponse:function(){
			
		},
		listener:function(e, paramData){
			console.group();
				console.log('Reached Event listener paramData:\t', paramData);
			console.groupEnd();	
		}		
	};



	// main page init entry point
	var main = (function(){
		var objXml = new Xml();
		
		$(function(){ // wait for DOM
			$('#container').on('data:retrieved', objXml.listener);
			objXml.getResponse('../pageMiddleRow0/index.xml');
		});

	})();

})(window, document, jQuery);