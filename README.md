Raphaël.inlineTextEditing
====================

Inline text editing tool for [Raphaël 2.0](http://raphaeljs.com/) & compatible with [Raphaël Free transform](https://github.com/ElbertF/Raphael.FreeTransform).
Support any types of transformations.

 *Licensed under the [MIT license](http://www.opensource.org/licenses/mit-license.php).*

Example
-------

```javascript
var paper = Raphael(document.getElementById('container'), 740, 540);
var text = paper.text(250, 250, 'Hello').attr({'text-anchor': 'start', 'font-size': '25px'}).transform(['T', 242, -174, 'R', 36.9973, 'S', 2.0631, 1]);

// Initialise text editing for the text
paper.inlineTextEditing(text);

// Start inline editing on click
text.click(function(){
	// Retrieve created text field
	var input = this.inlineTextEditing.startEditing();

	input.blur(function(e){
		// Stop inline editing after blur on the text field
		text.inlineTextEditing.stopEditing();
	});
});
```

Functions
---------
#### `startEditing()`
Hide initialized text and add HTML input text at the same position

Returns this text field.

#### `stopEditing()`
Remove the text field added with startEditing() and apply text modifications.


TODO
----
Handle a bigger length of input text
Add textarea for multi-line text.
Allow webfonts