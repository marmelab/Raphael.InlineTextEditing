/*
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 *
 */
(function (root, factory) {
	if (typeof define === "function" && define.amd) {
		// Register AMD module
		define(["jquery", "raphael"], function(jQuery, Raphael) {
			// Use global variables if the locals are undefined
			return factory(jQuery || root.jQuery, Raphael || root.Raphael);
		});
	} else {
		// RequireJS isn't being used. Assume jQuery and Raphael are loaded in <script> tags
		factory(jQuery, Raphael);
	}
}(this, function($, Raphael) {

	Raphael.fn.inlineTextEditing = function(subject, options, callback) {

		// Store instance of the Raphael paper
		var paper = this;

		subject.inlineTextEditing = {
			paper : paper,
			$input: null,

			/**
			 * Start text editing by hiding the current element and adding a text field at the same position
			 * @return jQuery input element
			 */
			startEditing: function(){
				// Store Raphael container above the svg
				var $container      = $(this.paper.canvas).parent();
				var translateX	    = 0;
				var translateY	    = 0;
				var transformOrder  = {};

				// Retrieve element transformation
				var rotation        = subject._.deg;
				var scaleX          = subject._.sx;
				var scaleY          = subject._.sy;
				var matrix          = $(subject.node).attr('transform');

				// Check if the element has translations & retrieve transformations order
				for(var i = 0, length = subject._.transform.length; i < length; i++){
					var matrixComponents = subject._.transform[i];
					var transform = matrixComponents[0].toLowerCase();
					transformOrder[transform] = transform;

					if(transform == 't'){
						translateX += matrixComponents[1];
						translateY += matrixComponents[2];
					}
				}

				// Check if there are implicit matrices
				for(var i = 0, length = subject._.transform.length; i < length; i++){
					if(subject._.transform[i][0].toLowerCase() == 'm'){
						var matrixComponents = subject._.transform[i].slice(1);

						// Retrieve transformation from matrix elements
						rotation  += -1 * Math.asin(matrixComponents[2]) * 180 / Math.PI;
						scaleX    *= matrixComponents[0] / Math.cos(rotation*Math.PI/180);
						scaleY    *= matrixComponents[3] / Math.cos(rotation*Math.PI/180);
					}
				}

				// Remove transformation on the current element to get original dimension
				$(subject.node).attr('transform', null);

				// Perform translation directly with left & top attribute
				var originalBbox  = subject._getBBox();
				var width         = originalBbox.width;
				var height        = originalBbox.height;
				var x             = subject.attrs.x + translateX;
				var y             = subject.attrs.y - height / 2 + translateY;
				var sTransform    = '';
				var sOrigin       = 'center center';
				var oTransform    = {
					r : 'rotate('+rotation+'deg)',
					s : 'scale('+scaleX+', '+scaleY+')'
				};

				// Build transform CSS property in the same order than the element
				for(var transform in transformOrder){
					if(oTransform[transform] != undefined){
						sTransform += oTransform[transform] + ' ';
					}
				}

				// Re-apply stored transformation to the element and hide it
				$(subject.node).attr('transform', matrix);
				subject.hide();

				// Prepare input's styles
				var oStyles = {
					position: 'absolute',
					background: 'none',
					left: x+'px',
					top: y+'px',
					width: width+'px',
					height: height+'px',
					color: subject.attrs.fill,

					'-moz-transform-origin': sOrigin,
					'-ms-transform-origin': sOrigin,
					'-o-transform-origin': sOrigin,
					'-webkit-transform-origin': sOrigin,
					'transform-origin': sOrigin,

					'-moz-transform' : sTransform,
					'-ms-transform' : sTransform,
					'-o-transform' : sTransform,
					'-webkit-transform' : sTransform,
					'transform' : sTransform
				};

				// Retrieve elements font styles
				var aFontAttributes = ['font', 'font-family', 'font-size', 'font-style', 'font-weight', 'font-variant', 'line-height'];

				for(var i = 0, length = aFontAttributes.length; i < length; i++){
					var attribute = aFontAttributes[i];

					if(subject.attrs[attribute] != undefined){
						oStyles[attribute] = subject.attrs[attribute];
					}

					if(subject.node.style[attribute] != undefined){
						oStyles[attribute] = subject.node.style[attribute];
					}
				}

				var sStyles = '';
				for(var z in oStyles){
					sStyles += z + ':' + oStyles[z] + ';';
				}

				// Create an input element with theses styles
				this.$input = $('<input />', {
					type: "text",
					value: subject.attrs.text ? subject.attrs.text.replace(/\'/g,"\\\'") : '',
					style: sStyles
				});

				// Add the input in the container and apply focus on it
				$container.append(this.$input);
				this.$input.focus();

				// Return the created input
				return this.$input;
			},

			/**
			 * Apply text modification and remove associated input
			 */
			stopEditing: function(){
				var text = this.$input.val();
				// Set the new the value
				subject.attr('text', text);

				// Show the text element
				subject.show();

				// Remove text input
				this.$input.remove();

				return text;
			}
		};

		return subject.inlineTextEditing;
	}
}));