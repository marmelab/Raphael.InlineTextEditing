Inline Text Editing With Raphaël.js
==================================

[Demo](http://marmelab.github.com/Raphael.InlineTextEditing)

[Source](https://github.com/marmelab/Raphael.InlineTextEditing)

You can easily do inline editing in pure HTML, but how about enabling the same feature in SVG, and making it available on all major browsers?

## The Problem

Although pure SVG implementations like [SVG Textbox](http://www.carto.net/papers/svg/gui/textbox/) exist, they can't be used on a iOS device because the textfield isn't recognized as an input text, so the keyboard doesn't show up.

Another alternative is to use the [SVG foreignObject tag](https://developer.mozilla.org/en/docs/SVG/Element/foreignObject), which aims to add HTML element in a SVG, like an `<input>` tag. But it's not compatible with Internet Explorer under the version 9.

The feature is already planned for implementation directly in SVG, see the SVG text editing draft specification: [Text editing SVG 1.2](http://www.w3.org/TR/2004/WD-SVG12-20040226/#text-edit).

## The Context

When looking for a library that allows to manipulate SVG elements in the browser, the first one that pop directly is Raphael.js. It's also the most easy to use. 

Raphaël.js implements W3C's current recommendation of SVG, which is currently in version 1.1. So there is no way to get the native SVG text editing feature directly in Raphaël.js.

So it must be emulated...

## The Trick

The solution is simple: Add an `<input>` text field on top of the SVG. This allows to edit the text on mobile device and is compatible with Internet Explorer.

The tricky part is to report the SVG transformations on the input element.

## Writing a Raphael Plugin

The [Raphael.fn method](http://raphaeljs.com/reference.html#Raphael.fn) object provides a way to add custom methods that can be called on the `paper` object.

It allows to make a new `inlineTextEditing`() method to turn any SVG `<text>` element into an editable text, as follows:

```javascript
var text = paper.text(50, 50 'Hello, World');
paper.inlineTextEditing(text);
```

Let's get started. First, we initialize the new method, taking an SVG text element as parameter:

```javascript
Raphael.fn.inlineTextEditing = function(subject) {
  // do stuff
}
```

Next, we have to retrieve the transformations (rotation / translation & scale) of the text element. This is done thanks to the '_' property of the Raphael element (an undocumented property which has nothing to do with the underscorejs library).

This property returns the *rotation* and the *scale* of the element. To retrieve the *translation* we have to parse each transformation to point out the one that begin by a 't'.

## The Matrix Is Everywhere. It Is All Around Us

The [Element.Transform](http://raphaeljs.com/reference.html#Element.transform) method can take a matrix parameter, as follows:

```javascript
paper.text(50, 50, 'Simple text').attr({'text-anchor': 'start'}).transform('m1.4627,0.628,-0.9108,2.1215,-9.3025,-56.8329');
```

Here no `s`, `t` or `r` to represents the scale, translation or rotation. Just a `m` that is the combination of all of theses.
In this case there is no informations in the '_' attribute, we have to parse the transformations in search of a `m` transform.

For more informations about transform matrix, check out [Matthew Bystedt's blog post](http://apike.ca/prog_svg_transform.html).

## Positioning The Textfield

The textfield is positioned by the CSS `transform` property and the CSS `transform-origin` property.

Raphael uses the center by default to rotate or scale an element so we set the `transform-origin` to `"center center"`.
The translation is directly added to the original position of the element (`top` & `left` properties).

Then we build the `transform` property. It should take the same transform order than the SVG element. That's because a scale followed by a rotation on an element don't give the same result as a rotation followed by a scale.

We can now append the textfield to the container of Raphael's paper and hide the text element.

## Apply Text Change

Providing a `stopEditing` method in the plugin allows the user to :

- apply the modifications
- remove the textfield 
- Re-display the text element.

## What's Next?

After 2 days working on this plugin we have set up a todo list :
- Elarge the text field to avoid text scrolling when typing
- Add textarea for multi-line texts
- Allow webfonts
- Improve the matrix deconstruction

You're welcome if you want to give us a hand!
