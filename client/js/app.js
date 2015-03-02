// requirejs設定
requirejs
		.config({
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
		});

define([ 'backbone' ], function(Backbone) {
	console.log(Backbone === window.Backbone);

	(function() {

		console.log("Hello Backbone!");

	}());

	var obj = new Backbone.Model();
	obj.set({
		name : "Murata"
	});

	obj.set({
		age : 20
	});

	console.log("obj:" + JSON.stringify(obj));
	console.log("obj.name: " + obj.get("name"));

	var obj2 = new Backbone.Model(
			{
				name : "Kenichiro"
				,age : 30
			}
		);

	var Staff = Backbone.Model.extend({
			defaults: {
				"name":'',
				"age":0,
				"updateTime": new Date()
			},
			initialize: function(){
				console.log("Staff[" + this.cid + "]:" + JSON.stringify(this));
			}
		});

	var tmpStaff = new Staff();
	tmpStaff.set(
		{
			name:"Murata"
			,age:15
			,id:101
		}
	);

	console.log("Staff[" + tmpStaff.cid + "]:" + JSON.stringify(tmpStaff));

	var tmpStaff2 = new Staff({
		name : "Kenichiro"
		,age : 35
		,id : 102
	});

	var objs = new Backbone.Collection([obj,obj2]);

	console.log("objs.get(cid): " + JSON.stringify(objs.get("c1")));
	console.log("objs.at(index): " + JSON.stringify(objs.at(0)));

	objs.add(new Backbone.Model(
			{
				name: "Acroquest"
				,age : 20
			}
	));

	objs.add(new Backbone.Model(
			{
				name: "Technology"
				,age : 10
			}
	));

	console.log("objs.loength:" + objs.length);
	console.log("objs: " + JSON.stringify(objs));

	objs.comparator = function(item){
		return item.get("age");
	};

	objs.sort();

	console.log("After sort objs: " + JSON.stringify(objs));
	console.log("After sort objs: " + JSON.stringify(objs.at(0)));

	objs.remove(obj2);
	console.log("objs.length: " + objs.length);
	console.log("objs: " + JSON.stringify(objs));

	var Staffs = Backbone.Collection.extend({
		model : Staff
	});

	var staffs = new Staffs([
		tmpStaff,
		tmpStaff2
	]);

	console.log("staffs: " + JSON.stringify(staffs));
	console.log("staffs.get(cid): " + JSON.stringify(staffs.get("c4")));
	console.log("staffs.at(index): " + JSON.stringify(staffs.at(1)));
	console.log("staffs.get(id); " + JSON.stringify(staffs.get(102)));

	objs.each(function(item, index){
		console.log("each(" + index + "): " + JSON.stringify(item));
	});

	var tmpObj = objs.find(function(item){
		return item.get("age") === 20;
	});

	console.log("find result: " + JSON.stringify(tmpObj));

	tmpObj = objs.filter(function(item){
		return item.get("age") === 20;
	});

	console.log("filter result: " + JSON.stringify(tmpObj));

	tmpObj = objs.where({
		age : 20
	});

	console.log("where result: " + JSON.stringify(tmpObj));

	tmpObj = objs.max(function(item){
		return item.get("age");
	});

	console.log("max result: " + JSON.stringify(tmpObj));

	tmpObj = objs.map(function(item){
		return item.get("age") + 1;
	});

	console.log("map result: " + JSON.stringify(tmpObj));

	tmpObj = objs.reduce(function(memo,item){
		return memo + item.get("age");
	},0);

	console.log("reduce result: " + JSON.stringify(tmpObj));

	console.log("pluck result: " + JSON.stringify(objs.pluck("name")));





});
