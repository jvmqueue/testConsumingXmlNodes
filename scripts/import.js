var jvm = jvm || {};
jvm['import'] = (function(w, d, $){ // use associative array notation, because IE8 complains 

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

	var Fragment = function(paramFragment){
		var frag = paramFragment;
		this.getFragment = function(){ // friendly, has public scope with access to private members
			return frag;
		};
	};
	Fragment.prototype = {
		getNode:function(paramNodeName){
			var frag = this.getFragment(); // access private variable through public method
			var nodeName = paramNodeName;
			var node = frag.getElementsByTagName(nodeName)[0];
			return node;
		},
		getNodeName:function(){},
		getAttributeValue:function(paramNode, paramAttribute){
			return paramNode.getAttribute(paramAttribute);
		},
		getText:function(){}
	};

	var Html = function(){
		var htmlFrag = null;
		var htmlIdToAppend = null;
		this.setHtmlFrag = function(paramFrag){
			htmlFrag = paramFrag;
		};
		this.getHtmlFrag = function(){
			return htmlFrag;
		};
		this.setHtmlIdToAppend = function(){

			htmlIdToAppend = this.getHtmlFrag().getAttribute('appendTo');

		};
		this.getHtmlIdToAppend = function(){
			return htmlIdToAppend;
		};
	};
	Html.prototype = {
		append:function(paramFrag){ // paramFrag must pass Interface test
			var interfaceFrag = new jvm.Interface('interfaceFrag', ['getNode', 'getNodeName', 'getAttributeValue', 'getText']);
			var objFragment = paramFrag;

			jvm.Interface.ensureImplements(objFragment, interfaceFrag);
			var frag = objFragment.getNode('fragment'); // TODO: getNode from which fragment. Fragment class needs access to an XML frag
			this.setHtmlFrag(frag);
			this.setHtmlIdToAppend();
			this.build();
			
		},
		appendToAParent:function(paramFragRemainder, paramNode){ // TODO: should be recursive. If no children return, else call itself
			var node = paramNode
			var fragXmlRemainder = paramFragRemainder;
			var nodeNew = null;
			var nodeText = null;

			$(fragXmlRemainder.childNodes).each(function(index, elm){
				if(this.nodeType == 1){
					nodeNew = d.createElement(this.nodeName);
					nodeText = d.createTextNode(this.firstChild.nodeValue);
					nodeNew.appendChild(nodeText);
					node.appendChild(nodeNew);
				}
			});			
		},
		build:function(){
			var that = this; // scoping
			var node = null;
			// TODO: use our Html privalged methods to build an HTML fragment from XML
			var frag = this.getHtmlFrag();
			var fragmentToAppend = d.createDocumentFragment();
			$(frag.childNodes).each(function(index, elm){
				if(this.nodeType == 1){
					node = d.createElement(this.nodeName);
					node.setAttribute('class', this.getAttribute('class'));
					// TODO: test if has children, append children to node
					that.appendToAParent(this, node);

				}
				
			});
			fragmentToAppend.appendChild(node);
			var nodeExist = d.getElementById('container');
			nodeExist.appendChild(fragmentToAppend);


		}
	};



	// main page init entry point
	var main = (function(){
		var objXml = new Xml();
		
		$(function(){ // wait for DOM
			$('#container').on('data:retrieved', objXml.listener); // define listener now, use it latter

			// TODO: need to be able to couple with different data, XML Fragments
			// TODO: let the XML fragment define the HTML section which it is to be appended
			// TODO: should be able to reuse the above listener. Simply invoke objXml.getResponse with differnt URL
			objXml.getResponse('../pageMiddleRow0/index.xml', objXml);
		});

		var lclInterval = w.setInterval(function(){

			// TODO: simply call a method. Let the method setInterval and look for static data
			// TODO: the method should be named appendDom
			if( !!Xml.staticData ){
				w.clearInterval(lclInterval);

				// TODO: once XML retrieved, simply let the HtmlBuilder update the DOM
				var xmlNode = objXml.getNode('fragments');


				var objFragment = new Fragment(xmlNode); // fragment object, always takes XML as parameter. Fragment performs tasks on XML fragments
				var objHtml = new Html(); // html object

				objHtml.append(objFragment); // pass fragment to append, let append verify fragment's interface

			}

		}, 333);

	})();

})(window, document, jQuery);