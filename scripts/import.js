var jvm = jvm || {};
jvm.import = (function(w, d, $){

	var Page = function(paramXmlObject){

	};

	var Xml = function(){
	};

	Xml.staticData = null; // Allows access to XML fragments outside of Xml instance

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

	var Fragment = function(){

	};
	Fragment.prototype = {
		getNode:function(){},
		getNodeName:function(){},
		getAttribute:function(){},
		getText:function(){}
	};

	var Html = function(){

	};
	Html.prototype = {
		append:function(paramFrag){
			var interfaceFrag = new jvm.Interface('interfaceFrag', ['getNode', 'getNodeName', 'getAttribute', 'getText']);
			var objFragment = paramFrag;
			jvm.Interface.ensureImplements(objFragment, interfaceFrag);

		}
	};



	// main page init entry point
	var main = (function(){
		var objXml = new Xml();
		
		$(function(){ // wait for DOM
			$('#container').on('data:retrieved', objXml.listener); // define listener now, use it latter
			// TODO: need to be able to couple with different data, XML Fragments
			// TODO: let the XML fragment define the HTML section which it is to be appended
			objXml.getResponse('../pageMiddleRow0/index.xml', objXml);
		});

		var lclInterval = w.setInterval(function(){

			// TODO: simply call a method. Let the method setInterval and look for static data
			// TODO: the method should be named appendDom

			if( !!Xml.staticData ){
				w.clearInterval(lclInterval);
				// TODO: once XML retrieved, simply let the HtmlBuilder update the DOM
				var xmlNode = objXml.getNode('fragment');

				var objFragment = new Fragment(); // fragment object
				var objHtml = new Html(); // html object

				objHtml.append(objFragment); // pass fragment to append, let append verify fragment's interface

			}

		}, 333);

	})();

})(window, document, jQuery);