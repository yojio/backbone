define(
		[ 'backbone'],
		function(Backbone) {

			return

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

			var obj2 = new Backbone.Model({
				name : "Kenichiro",
				age : 30
			});

			var Staff = Backbone.Model.extend({
				defaults : {
					"name" : '',
					"age" : 0,
					"updateTime" : new Date()
				},
				initialize : function() {
					console.log("Staff[" + this.cid + "]:"
							+ JSON.stringify(this));
				}
			});

			var tmpStaff = new Staff();
			tmpStaff.set({
				name : "Murata",
				age : 15,
				id : 101
			});

			console.log("Staff[" + tmpStaff.cid + "]:"
					+ JSON.stringify(tmpStaff));

			var tmpStaff2 = new Staff({
				name : "Kenichiro",
				age : 35,
				id : 102
			});

			var objs = new Backbone.Collection([ obj, obj2 ]);

			console.log("objs.get(cid): " + JSON.stringify(objs.get("c1")));
			console.log("objs.at(index): " + JSON.stringify(objs.at(0)));

			objs.add(new Backbone.Model({
				name : "Acroquest",
				age : 20
			}));

			objs.add(new Backbone.Model({
				name : "Technology",
				age : 10
			}));

			console.log("objs.loength:" + objs.length);
			console.log("objs: " + JSON.stringify(objs));

			objs.comparator = function(item) {
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

			var staffs = new Staffs([ tmpStaff, tmpStaff2 ]);

			console.log("staffs: " + JSON.stringify(staffs));
			console.log("staffs.get(cid): " + JSON.stringify(staffs.get("c4")));
			console.log("staffs.at(index): " + JSON.stringify(staffs.at(1)));
			console.log("staffs.get(id); " + JSON.stringify(staffs.get(102)));

			objs.each(function(item, index) {
				console.log("each(" + index + "): " + JSON.stringify(item));
			});

			var tmpObj = objs.find(function(item) {
				return item.get("age") === 20;
			});

			console.log("find result: " + JSON.stringify(tmpObj));

			tmpObj = objs.filter(function(item) {
				return item.get("age") === 20;
			});

			console.log("filter result: " + JSON.stringify(tmpObj));

			tmpObj = objs.where({
				age : 20
			});

			console.log("where result: " + JSON.stringify(tmpObj));

			tmpObj = objs.max(function(item) {
				return item.get("age");
			});

			console.log("max result: " + JSON.stringify(tmpObj));

			tmpObj = objs.map(function(item) {
				return item.get("age") + 1;
			});

			console.log("map result: " + JSON.stringify(tmpObj));

			tmpObj = objs.reduce(function(memo, item) {
				return memo + item.get("age");
			}, 0);

			console.log("reduce result: " + JSON.stringify(tmpObj));

			console.log("pluck result: " + JSON.stringify(objs.pluck("name")));

			var Memo = Backbone.Model.extend({
				urlRoot : "/memo",
				idAttribute : "key",
				defaults : {
					"content" : ""
				}
			});

			var memo = new Memo();

			console.log("Before save: " + JSON.stringify(memo));
			console.log("isNew(): " + memo.isNew());

			memo
					.save(
							{
								content : "Acroquest"
							},
							{
								success : function() {
									console.log("After save(post) memo: "
											+ JSON.stringify(memo));
									console
											.log("After save(post) memo.isNew():"
													+ memo.isNew())
								}
							})
					.then(
							function() {
								memo.set({
									content : "Acro"
								});

								console.log("Before fetch memo:"
										+ JSON.stringify(memo));

								return memo.fetch({
									success : function() {
										console.log("After fetch memo: "
												+ JSON.stringify(memo))
									}
								});

							})
					.then(
							function() {
								console.log("Before save(put) memo: "
										+ JSON.stringify(memo));
								return memo.save({
									content : "Acroquest Technology"
								}, {
									success : function() {
										console.log("After save(put) memo: "
												+ JSON.stringify(memo))
									}
								});

							})
					.then(
							function() {
								console.log("Before delete memo:"
										+ JSON.stringify(memo));
								return memo.destroy({
									success : function() {
										console.log("After delete memo:"
												+ JSON.stringify(memo))
									}
								});
							})
					.then(
							function() {

								var Memo = Backbone.Model.extend({
									idAttribute : "key",
									defaults : {
										"content" : ""
									}
								})

								var MemoList = Backbone.Collection.extend({
									model : Memo,
									url : "/memo"
								})

								var memoList = new MemoList();

								console.log("Before collection.length: "
										+ memoList.length)
								//
								// var memo =
								// memoList.create({content:"Acro1"},{
								// success: function() {
								// console.log("After create model: " +
								// JSON.stringify(memoList));
								// console.log("After create collection.length:
								// " + memoList.length);
								// }
								// })
								//
								// console.log("After model: " +
								// JSON.stringify(memo));
								// console.log("After collection.length: " +
								// memoList.length);

								memo = new Memo({
									content : "Acro2"
								}, {
									collection : memoList
								});
								return memo
										.save(
												null,
												{
													success : function() {
														console
																.log("After create memoList: "
																		+ JSON
																				.stringify(memoList));
														console
																.log("After create memoList: "
																		+ memoList.length);
													}
												})
										.then(
												function() {
													return memoList
															.fetch({
																success : function() {
																	console
																			.log("After fetch memoList: "
																					+ JSON
																							.stringify(memoList));
																	console
																			.log("After fetch memoList.length: "
																					+ memoList.length);
																}
															});
												})
										.then(
												function() {
													var tempMemo = memoList
															.find(function(item) {
																return item
																		.get("content") === "Acro2";
															});

													return tempMemo
															.save(
																	{
																		content : "Acro3"
																	},
																	{
																		success : function() {
																			console
																					.log("After save memoList: "
																							+ JSON
																									.stringify(memoList));
																			console
																					.log("After save memoList.length: "
																							+ memoList.length);
																		}
																	});

												})
										.then(
												function() {
													var tempMemo = memoList
															.find(function(item) {
																return item
																		.get("content") === "Acro3";
															});

													return tempMemo
															.destroy({
																success : function() {
																	console
																			.log("After destroy memoList: "
																					+ JSON
																							.stringify(memoList));
																	console
																			.log("After destory memoList.length: "
																					+ memoList.length);
																}
															})
												}).done(function() {
										});

								memoList.add(memo);

								console.log("After add memo; "
										+ JSON.stringify(memo));
								console.log("After add memoList.length: "
										+ memoList.length);

							});

			console.log("After save: " + JSON.stringify(memo));
			console.log("isNew(): " + memo.isNew());

		});
