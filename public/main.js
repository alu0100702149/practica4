$(document).ready(function() {
	document.getElementById('fileinput').addEventListener('change', loadTextArea, false);
 	var dropZone = document.getElementById('drop_zone');
	dropZone.addEventListener('dragover', handleDragOver, false);
	dropZone.addEventListener('drop', handleFileSelect, false);
});


Object.prototype.error = function (message, t) {
    t = t || this;
    t.name = "SyntaxError";
    t.message = message;
    throw t;
};

function loadTextArea(evt){
    var file;
	if(evt.type != "drop")
		file = evt.target.files[0]; 
	else
		file = evt.dataTransfer.files[0];
		
	if (file) {
			var reader = new FileReader();
			reader.onload = function(e) { 
          			INPUT.value = e.target.result;
					if (window.localStorage){
						localStorage.INPUT = INPUT.value;
					}
			}
			var c = reader.readAsText(file);
		}
	else { alert("Failed to load file"); }
}

function main() {
    var parse = make_parse();


    var source = INPUT.value;
    var string, tree;
    try {
        tree = parse(source);
        
        //string = JSON.stringify(tree, ['type', 'value', 'from', 'to'],  4);
        string = JSON.stringify(tree, ['key', 'name', 'message',
             'value', 'arity', 'first', 'second', 'third', 'fourth'], 4);
    } catch (e) {
        string = JSON.stringify(e, ['name', 'message', 'from', 'to', 'key',
                'value', 'arity', 'first', 'second', 'third', 'fourth'], 4);
    }
    OUTPUT.innerHTML = string.replace(/&/g, '&amp;').replace(/[<]/g, '&lt;');
	if (window.localStorage) 
		localStorage.OUTPUT = OUTPUT.innerHTML;
};

function handleFileSelect(evt) {
	evt.stopPropagation();
	evt.preventDefault();

	var files = evt.dataTransfer.files; // FileList object.
	
	loadTextArea(evt);
	evt.target.style.background = "#CEE765";

}

function handleDragOver(evt) {
	evt.stopPropagation();
	evt.preventDefault();
	evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
    evt.target.style.background = "#A3D84A"; 
}
    

window.onload = function() {
  PARSE.onclick = main;
   if (window.localStorage && localStorage.OUTPUT) {
    document.getElementById("OUTPUT").innerHTML = localStorage.OUTPUT;
  }
  
  if (window.localStorage && localStorage.INPUT) {
    document.getElementById("INPUT").innerHTML = localStorage.INPUT;
  }else{
	document.getElementById('INPUT').innerHTML = "var a = \"hello\"; // initialize a\nvar b = (a <= 1)*5; /* initialize b  */"
  }
}

