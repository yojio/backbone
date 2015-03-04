// requirejs設定
var require = {
			baseUrl : '/js',
			paths : {
				jquery : [ 'http://code.jquery.com/jquery-2.1.3' ],
				underscore : [ 'https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.2/underscore' ],
				backbone : 'https://cdnjs.cloudflare.com/ajax/libs/backbone.js/1.1.2/backbone'
			},

			shim : {
				underscore : {
					exports : '_'
				},
			}
		};