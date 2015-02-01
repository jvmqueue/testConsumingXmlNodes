var jvm = jvm || {};
jvm.import = (function(w, d, $){

	var Page = function(paramXmlObject){

	};

	var Xml = function(){
	};

	Xml.staticData = null;

	Xml.prototype = {
		getNode:function(paramNodeName){
			var node = null;
			node = Xml.staticData.getElementsByTagName(paramNodeName)[0];
			return node;
		},
		getResponse:function(paramUrl, paramThat){
			var that = paramThat;
			var req = $.ajax({
				url:paramUrl,
				context:that
			});
			req.done(
				function(paramData){
					var hash = {that:this, data:paramData};
					$('#container').triggerHandler('data:retrieved', [hash]);
				}
			);
		},
		saveResponse:function(paramsThat, paramsData){
			Xml.staticData = paramsData;
		},
		listener:function(e, params){			
			params.that.saveResponse(params.that, params.data);
		}		
	};



	// main page init entry point
	var main = (function(){
		var objXml = new Xml();
		
		$(function(){ // wait for DOM
			$('#container').on('data:retrieved', objXml.listener);
			objXml.getResponse('../pageMiddleRow0/index.xml', objXml);
		});

		var lclInterval = w.setInterval(function(){

			// TODO: simply call a method. Let the method setInterval and look for static data
			// TODO: the method should be named appendDom
			if( !!Xml.staticData ){
				w.clearInterval(lclInterval);
				var xmlNode = objXml.getNode('fragment');
				console.group('CLEAR INTERVAL');
					console.log('xmlNode:\t', xmlNode);
				console.groupEnd();	
			}

		}, 333);

	})();

})(window, document, jQuery);