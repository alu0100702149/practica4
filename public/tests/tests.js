var assert = chai.assert;

suite('Parser', function(){
	test('Comment /**/', function() {
		var parse = make_parse();
		var input = "/* Comentario */";
		var string, tree;
		try {
			tree = parse(input);
			string = JSON.stringify(tree, ['key', 'name', 'message',
			'value', 'arity', 'first', 'second', 'third', 'fourth'], 4);
		} catch (e) {
			string = JSON.stringify(e, ['name', 'message', 'from', 'to', 'key',
			'value', 'arity', 'first', 'second', 'third', 'fourth'], 4);
		}
		assert.deepEqual(string, "null");
	});
 	test('Comment //', function() {
		var parse = make_parse();
		var input = "//Esto es un comentario";
		var string, tree;
		try {
			tree = parse(input);
			string = JSON.stringify(tree, ['key', 'name', 'message',
			'value', 'arity', 'first', 'second', 'third', 'fourth'], 4);
		} catch (e) {
			string = JSON.stringify(e, ['name', 'message', 'from', 'to', 'key',
			'value', 'arity', 'first', 'second', 'third', 'fourth'], 4);
		}
		assert.deepEqual(string, "null");
	});  
 	test('One Char OP', function() {
		var parse = make_parse();
		var input = "var x = 256";
		var string, tree;
		try {
			tree = parse(input);
			string = JSON.stringify(tree, ['key', 'name', 'message',
			'value', 'arity', 'first', 'second', 'third', 'fourth'], 4);
		} catch (e) {
			string = JSON.stringify(e, ['name', 'message', 'from', 'to', 'key',
			'value', 'arity', 'first', 'second', 'third', 'fourth'], 4);
		}
		assert.deepEqual(string, '{\n    "name": "SyntaxError",\n    "message": "Expected \';\'.",\n    "value": "(end)"\n}');
	});   		
 	test('Two Char OP', function() {
		var parse = make_parse();
		var input = "var x = 256 - 8";
		var string, tree;
		try {
			tree = parse(input);
			string = JSON.stringify(tree, ['key', 'name', 'message',
			'value', 'arity', 'first', 'second', 'third', 'fourth'], 4);
		} catch (e) {
			string = JSON.stringify(e, ['name', 'message', 'from', 'to', 'key',
			'value', 'arity', 'first', 'second', 'third', 'fourth'], 4);
		}
		assert.deepEqual(string, '{\n    "name": "SyntaxError",\n    "message": "Expected \';\'.",\n    "value": "(end)"\n}');
	}); 
 	test('Error', function() {
		var parse = make_parse();
		var input = "var error = estoesunerror;";
		var string, tree;
		try {
			tree = parse(input);
			string = JSON.stringify(tree, ['key', 'name', 'message',
			'value', 'arity', 'first', 'second', 'third', 'fourth'], 4);
		} catch (e) {
			string = JSON.stringify(e, ['name', 'message', 'from', 'to', 'key',
			'value', 'arity', 'first', 'second', 'third', 'fourth'], 4);
		}
		assert.deepEqual(string, '{\n    "name": "SyntaxError",\n    "message": "Undefined.",\n    "from": 12,\n    "to": 25,\n    "value": "estoesunerror",\n    "arity": "name"\n}');
	}); 
});

suite('Tokens', function(){
  test('Regexp.bexec', function(){
    var input_str = "esto es una prueba";
	var regexp = /prueba/;
	regexp.lastIndex = 0;

	assert.equal(regexp.bexec(input_str), null);
  });

  test('String.tokens() - 1', function(){
    var input_str = "var x = 2 + 3;";
    var output_str = '[{"type":"name","value":"var","from":0,"to":3},{"type":"name","value":"x","from":4,"to":5},{"type":"operator","value":"=","from":6,"to":7},{"type":"number","value":2,"from":8,"to":9},{"type":"operator","value":"+","from":10,"to":11},{"type":"number","value":3,"from":12,"to":13},{"type":"operator","value":";","from":13,"to":14}]';
	var resultado_str = JSON.stringify(input_str.tokens());

	assert.equal(output_str, resultado_str);
  });
  
  test('String.tokens() - 2', function(){
    var input_str = "var x = 2;//comentario";
    var output_str = '[{"type":"name","value":"var","from":0,"to":3},{"type":"name","value":"x","from":4,"to":5},{"type":"operator","value":"=","from":6,"to":7},{"type":"number","value":2,"from":8,"to":9},{"type":"operator","value":";","from":9,"to":10}]';
	var resultado_str = JSON.stringify(input_str.tokens());

	assert.equal(output_str, resultado_str);
  });
  test('String.tokens() - 3', function(){
    var input_str = "{#: esto lanza un error}";
	var resultado_str = "Syntax error near \'#: esto lanza un error}";
    chai.expect(function () { input_str.tokens() }).to.throw(resultado_str);
  });
  
});