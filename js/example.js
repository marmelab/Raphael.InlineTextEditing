$(function(){
	var paper = Raphael(document.getElementById('canvas_container'), 740, 540);

	// A bunch of texts
	var elements = [
		paper.text(50, 50, 'Simple text').attr({'text-anchor': 'start', 'font-size': '20px'}),
		paper.text(250, 50, 'Scaled text').attr({'text-anchor': 'start', 'font-family': '20px'}).transform(['S', 1.7,2.4]),
		paper.text(50, 150, 'Turned text').attr({'text-anchor': 'start', 'font-size': '20px', 'font-family': 'Verdana'}).transform(['R', 35]),
		paper.text(450, 300, 'Turned and scaled text').attr({'text-anchor': 'start', 'font-size': '20px'}).transform(['R', 35, 'S', 1.7, 2.4]),
		paper.text(0, 300, 'Vertical text').attr({'text-anchor': 'start', 'font-size': '20px'}).transform(['R', 90, 'S', 1.7, 2.4]),
		paper.text(250, 250, 'Drunk text').attr({'text-anchor': 'start', 'font-size': '20px'}).transform(['r', 125, 's', 1.7, 2.4]),
		paper.text(350, 350, 'With nice font').attr({'text-anchor': 'start', 'font-family': 'Lobster Two'}).transform(['s', 1.7, 1.4]),
		paper.text(500, 350, 'With turned nice font').attr({'text-anchor': 'start', 'font-family': 'Lobster Two'}).transform(['R', 35, 'S', 2.7, 2.4]),
		paper.text(200, 500, 'Translated & scaled text').attr({'text-anchor': 'start', 'font-size': '22px'}).transform(['T', 50, -15, 'S', 1, 2]),
		paper.text(200, 450, 'Scaled & translated text').attr({'text-anchor': 'start', 'font-size': '20px'}).transform(['S', 1, 2, 'T', 50, -15]),
		paper.text(250, 250, 'Hello').attr({'text-anchor': 'start', 'font-size': '25px'}).transform(['T', 242, -174, 'R', 36.9973, 'S', 2.0631, 1])

	];

	for(var i = 0, nbElements = elements.length; i < nbElements; i++){
		var element = elements[i];

		// Initialize inline text editing for this element
		paper.inlineTextEditing(element);

		element.click(function(){
			// Start text editing and retrieve input field
			var input = this.inlineTextEditing.startEditing();

			(function(element){
				input.blur(function(e){
					// Apply new text and remove inline text editing on blur
					element.inlineTextEditing.stopEditing();
				})
			})(this);
		});
	}

});