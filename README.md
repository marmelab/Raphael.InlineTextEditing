Raphaël.InlineTextEditing
====================

Inline text editing tool for [Raphaël 2.0](http://raphaeljs.com/) & compatible with [Raphaël Free transform](https://github.com/ElbertF/Raphael.FreeTransform).
Supports SVG text elements with any type of transformation (scale, rotate, translate, matrix).

[See demo](http://marmelab.github.io/Raphael.InlineTextEditing/)

 *Licensed under the [MIT license](LICENSE).*

Example
-------

```javascript
var paper = Raphael(document.getElementById('container'), 740, 540);
var text = paper.text(250, 250, 'Hello').attr({'text-anchor': 'start', 'font-size': '25px'}).transform(['T', 242, -174, 'R', 36.9973, 'S', 2.0631, 1]);

// Initialize text editing for the text element
paper.inlineTextEditing(text);

// Start inline editing on click
text.click(function(){
	// Retrieve created <input type=text> field
	var input = this.inlineTextEditing.startEditing();

	input.addEventListener("blur", function(e){
		// Stop inline editing after blur on the text field
		text.inlineTextEditing.stopEditing();
	}, true);
});
```

Functions
---------
#### `startEditing()`
Hide initialized text and add HTML input text at the same position.

Returns this text field.

#### `stopEditing()`
Remove the text field added with startEditing() and apply text modifications.


TODO
----
* Fix long text positionning when scaled
* Allow webfonts
