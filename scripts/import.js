var jvm = jvm || {};
jvm.import = (function(w, d, $){

	var Page = function(paramXmlObject){

	};

	var Xml = function(){
		this.data = 'Hello World';
	};
	Xml.staticData = null;

	Xml.prototype = {
		getNode:function(paramNodeName){
			var node = null;
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
			paramsThat.data = paramsData;
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
			console.group('INTERVAL');
				console.log('interval running');
			console.groupEnd();	

			if( !!Xml.staticData ){
				w.clearInterval(lclInterval);
				console.group('INTERVAL CLEAR');
					console.log('cleared Xml.staticData:\t', Xml.staticData);
				console.groupEnd();	
			}

		}, 333);

	})();

})(window, document, jQuery);