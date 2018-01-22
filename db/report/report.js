{
	tasks1: [{
		task: "3.1",
		query: {
			$and: [{
				borough: "Queens"
			}, {
				cuisine: "Chinese"
			}
			]
		},
		rawQuery: "db.restaurants.find({$and:[{borough: 'Queens'}, {cuisine: 'Chinese'}]}).count()",
		result: 728
	}, {
		task: "3.2",
		query: [{
			$match: {
				grades: {
					$exists: 1
				}
			}
		}, {
			$project: {
				maxScore: {
					$max: '$grades.score'
				},
			}
		}, {
			$sort: {
				maxScore: -1
			}
		}, {
			$limit: 1
		}
		],
		rawQuery: "db.restaurants.aggregate([{$match:{grades:{$exists:1}}},{$project:{maxScore:{$max:'$grades.score'},}},{$sort:{maxScore:-1}},{$limit:1}])",
		result: { "_id": ObjectId("5a631f4374e52a68c20e3971"), "maxScore": 131 }
	}, {
		task: "3.3",
		query: [
			{ borough: 'Manhattan' },
			{
				$push: { 'grades': { grade: 'A', score: 7, date: ISODate() } }
			}
		],
		rawQuery: "db.restaurants.updateMany({borough:'Manhattan'},{$push:{'grades':{grade:'A',score:7,date:ISODate()}}});",
		result: { "acknowledged": true, "matchedCount": 10259, "modifiedCount": 10259 }
	}, {
		task: "3.4",
		query: [{ 'grades.8.score': { $lt: 7 } }, { _id: 0, name: 1 }
		],
		rawQuery: "db.restaurants.find({'grades.8.score':{$lt:7}},{_id:0,name:1});",
		result: [{ "name": "Silver Krust West Indian Restaurant" }, { "name": "Pure Food" }]
	}, {
		task: "3.5",
		query: [{ cuisine: 'Seafood', grades: { $elemMatch: { grade: { $in: ['B'] }, $and: [{ date: { $gt: ISODate('2014-02-01T00:00:00.000Z') } }, { date: { $lt: ISODate('2014-03-01T00:00:00.000Z') } }] } } }, { _id: 0, name: 1 }
		],
		rawQuery: "db.restaurants.find({cuisine:'Seafood',grades:{$elemMatch:{grade:{$in:['B']},$and:[{date:{$gt:ISODate('2014-02-01T00:00:00.000Z')}},{date:{$lt:ISODate('2014-03-01T00:00:00.000Z')}}]}}},{_id:0,name:1});",
		result: [{ "name": "Los Primos Seafood Market" }, { "name": "Catch" }]
	}]
	tasks2: [
		{
			task: "4.1",
			rawQuery: "db.restaurants.explain('executionStats').find({name:'Glorious Food'});",
			index: "db.restaurants.createIndex({name: 1})",
			withoutIndexExecutionPlan: {
				"queryPlanner": {
					"plannerVersion": 1,
					"namespace": "frontcamp.restaurants",
					"indexFilterSet": false,
					"parsedQuery": {
						"cuisine": {
							"$eq": "Glorious Food"
						}
					},
					"winningPlan": {
						"stage": "COLLSCAN",
						"filter": {
							"cuisine": {
								"$eq": "Glorious Food"
							}
						},
						"direction": "forward"
					},
					"rejectedPlans": []
				},
				"executionStats": {
					"executionSuccess": true,
					"nReturned": 0,
					"executionTimeMillis": 75,
					"totalKeysExamined": 0,
					"totalDocsExamined": 25359,
					"executionStages": {
						"stage": "COLLSCAN",
						"filter": {
							"cuisine": {
								"$eq": "Glorious Food"
							}
						},
						"nReturned": 0,
						"executionTimeMillisEstimate": 63,
						"works": 25361,
						"advanced": 0,
						"needTime": 25360,
						"needYield": 0,
						"saveState": 200,
						"restoreState": 200,
						"isEOF": 1,
						"invalidates": 0,
						"direction": "forward",
						"docsExamined": 25359
					}
				},
				"serverInfo": {
					"host": "EPBYMINW5103",
					"port": 27017,
					"version": "3.4.0",
					"gitVersion": "f4240c60f005be757399042dc12f6addbc3170c1"
				},
				"ok": 1
			},
			withIndexExecutionPlan: {
				"queryPlanner" : {
						"plannerVersion" : 1,
						"namespace" : "frontcamp.restaurants",
						"indexFilterSet" : false,
						"parsedQuery" : {
								"name" : {
										"$eq" : "Glorious Food"
								}
						},
						"winningPlan" : {
								"stage" : "FETCH",
								"inputStage" : {
										"stage" : "IXSCAN",
										"keyPattern" : {
												"name" : 1
										},
										"indexName" : "name_1",
										"isMultiKey" : false,
										"multiKeyPaths" : {
												"name" : [ ]
										},
										"isUnique" : false,
										"isSparse" : false,
										"isPartial" : false,
										"indexVersion" : 2,
										"direction" : "forward",
										"indexBounds" : {
												"name" : [
														"[\"Glorious Food\", \"Glorious Food\"]"
												]
										}
								}
						},
						"rejectedPlans" : [ ]
				},
				"executionStats" : {
						"executionSuccess" : true,
						"nReturned" : 1,
						"executionTimeMillis" : 8,
						"totalKeysExamined" : 1,
						"totalDocsExamined" : 1,
						"executionStages" : {
								"stage" : "FETCH",
								"nReturned" : 1,
								"executionTimeMillisEstimate" : 0,
								"works" : 2,
								"advanced" : 1,
								"needTime" : 0,
								"needYield" : 0,
								"saveState" : 0,
								"restoreState" : 0,
								"isEOF" : 1,
								"invalidates" : 0,
								"docsExamined" : 1,
								"alreadyHasObj" : 0,
								"inputStage" : {
										"stage" : "IXSCAN",
										"nReturned" : 1,
										"executionTimeMillisEstimate" : 0,
										"works" : 2,
										"advanced" : 1,
										"needTime" : 0,
										"needYield" : 0,
										"saveState" : 0,
										"restoreState" : 0,
										"isEOF" : 1,
										"invalidates" : 0,
										"keyPattern" : {
												"name" : 1
										},
										"indexName" : "name_1",
										"isMultiKey" : false,
										"multiKeyPaths" : {
												"name" : [ ]
										},
										"isUnique" : false,
										"isSparse" : false,
										"isPartial" : false,
										"indexVersion" : 2,
										"direction" : "forward",
										"indexBounds" : {
												"name" : [
														"[\"Glorious Food\", \"Glorious Food\"]"
												]
										},
										"keysExamined" : 1,
										"seeks" : 1,
										"dupsTested" : 0,
										"dupsDropped" : 0,
										"seenInvalidated" : 0
								}
						}
				},
				"serverInfo" : {
						"host" : "EPBYMINW5103",
						"port" : 27017,
						"version" : "3.4.0",
						"gitVersion" : "f4240c60f005be757399042dc12f6addbc3170c1"
				},
				"ok" : 1
			}
		},
		{
			task: "4.2",
			rawQuery: "db.restaurants.explain('executionStats').find({name:'Glorious Food'});",
			index: "db.restaurants.dropIndex({'name': 1})",
		},
		{
			task: "4.3",
			rawQuery: "db.restaurants.explain('executionStats').find({restaurant_id: '41098650'}, { _id:0, borough: 1});",
			index: "db.restaurants.createIndex({restaurant_id: 1, borough: 1})",
			withoutIndexExecutionPlan: {
				"queryPlanner" : {
						"plannerVersion" : 1,
						"namespace" : "frontcamp.restaurants",
						"indexFilterSet" : false,
						"parsedQuery" : {
								"restaurant_id" : {
										"$eq" : "41098650"
								}
						},
						"winningPlan" : {
								"stage" : "PROJECTION",
								"transformBy" : {
										"_id" : 0,
										"borough" : 1
								},
								"inputStage" : {
										"stage" : "COLLSCAN",
										"filter" : {
												"restaurant_id" : {
														"$eq" : "41098650"
												}
										},
										"direction" : "forward"
								}
						},
						"rejectedPlans" : [ ]
				},
				"executionStats" : {
						"executionSuccess" : true,
						"nReturned" : 1,
						"executionTimeMillis" : 26,
						"totalKeysExamined" : 0,
						"totalDocsExamined" : 25359,
						"executionStages" : {
								"stage" : "PROJECTION",
								"nReturned" : 1,
								"executionTimeMillisEstimate" : 41,
								"works" : 25361,
								"advanced" : 1,
								"needTime" : 25359,
								"needYield" : 0,
								"saveState" : 199,
								"restoreState" : 199,
								"isEOF" : 1,
								"invalidates" : 0,
								"transformBy" : {
										"_id" : 0,
										"borough" : 1
								},
								"inputStage" : {
										"stage" : "COLLSCAN",
										"filter" : {
												"restaurant_id" : {
														"$eq" : "41098650"
												}
										},
										"nReturned" : 1,
										"executionTimeMillisEstimate" : 41,
										"works" : 25361,
										"advanced" : 1,
										"needTime" : 25359,
										"needYield" : 0,
										"saveState" : 199,
										"restoreState" : 199,
										"isEOF" : 1,
										"invalidates" : 0,
										"direction" : "forward",
										"docsExamined" : 25359
								}
						}
				},
				"serverInfo" : {
						"host" : "EPBYMINW5103",
						"port" : 27017,
						"version" : "3.4.0",
						"gitVersion" : "f4240c60f005be757399042dc12f6addbc3170c1"
				},
				"ok" : 1
			},
			withIndexExecutionPlan: {
				"queryPlanner" : {
						"plannerVersion" : 1,
						"namespace" : "frontcamp.restaurants",
						"indexFilterSet" : false,
						"parsedQuery" : {
								"restaurant_id" : {
										"$eq" : "41098650"
								}
						},
						"winningPlan" : {
								"stage" : "PROJECTION",
								"transformBy" : {
										"_id" : 0,
										"borough" : 1
								},
								"inputStage" : {
										"stage" : "IXSCAN",
										"keyPattern" : {
												"restaurant_id" : 1,
												"borough" : 1
										},
										"indexName" : "restaurant_id_1_borough_1",
										"isMultiKey" : false,
										"multiKeyPaths" : {
												"restaurant_id" : [ ],
												"borough" : [ ]
										},
										"isUnique" : false,
										"isSparse" : false,
										"isPartial" : false,
										"indexVersion" : 2,
										"direction" : "forward",
										"indexBounds" : {
												"restaurant_id" : [
														"[\"41098650\", \"41098650\"]"
												],
												"borough" : [
														"[MinKey, MaxKey]"
												]
										}
								}
						},
						"rejectedPlans" : [ ]
				},
				"executionStats" : {
						"executionSuccess" : true,
						"nReturned" : 1,
						"executionTimeMillis" : 1,
						"totalKeysExamined" : 1,
						"totalDocsExamined" : 0,
						"executionStages" : {
								"stage" : "PROJECTION",
								"nReturned" : 1,
								"executionTimeMillisEstimate" : 0,
								"works" : 2,
								"advanced" : 1,
								"needTime" : 0,
								"needYield" : 0,
								"saveState" : 0,
								"restoreState" : 0,
								"isEOF" : 1,
								"invalidates" : 0,
								"transformBy" : {
										"_id" : 0,
										"borough" : 1
								},
								"inputStage" : {
										"stage" : "IXSCAN",
										"nReturned" : 1,
										"executionTimeMillisEstimate" : 0,
										"works" : 2,
										"advanced" : 1,
										"needTime" : 0,
										"needYield" : 0,
										"saveState" : 0,
										"restoreState" : 0,
										"isEOF" : 1,
										"invalidates" : 0,
										"keyPattern" : {
												"restaurant_id" : 1,
												"borough" : 1
										},
										"indexName" : "restaurant_id_1_borough_1",
										"isMultiKey" : false,
										"multiKeyPaths" : {
												"restaurant_id" : [ ],
												"borough" : [ ]
										},
										"isUnique" : false,
										"isSparse" : false,
										"isPartial" : false,
										"indexVersion" : 2,
										"direction" : "forward",
										"indexBounds" : {
												"restaurant_id" : [
														"[\"41098650\", \"41098650\"]"
												],
												"borough" : [
														"[MinKey, MaxKey]"
												]
										},
										"keysExamined" : 1,
										"seeks" : 1,
										"dupsTested" : 0,
										"dupsDropped" : 0,
										"seenInvalidated" : 0
								}
						}
				},
				"serverInfo" : {
						"host" : "EPBYMINW5103",
						"port" : 27017,
						"version" : "3.4.0",
						"gitVersion" : "f4240c60f005be757399042dc12f6addbc3170c1"
				},
				"ok" : 1
			}
		},
		{
			task: "4.4", 
			rawQueries: [ 
				"db.restaurants.explain('executionStats').find({borough: 'Staten Island', cuisine: 'American'})",
				"db.restaurants.explain('executionStats').find({borough: 'Staten Island', name: 'Bagel Land'})",
				"db.restaurants.explain('executionStats').find({borough: 'Queens', cuisine: 'Pizza'})"
			],
			index: "db.restaurants.createIndex({ cuisine: 1 }, { partialFilterExpression: { borough: 'Staten Island' } })"
		},
		{
			task: "4.5", 
			rawQueries: [ 
				"db.restaurants.explain('executionStats').find({borough: 'Staten Island', cuisine: 'American'})",
				"db.restaurants.explain('executionStats').find({borough: 'Staten Island', name: 'Bagel Land'})",
				"db.restaurants.explain('executionStats').find({borough: 'Queens', cuisine: 'Pizza'})"
			],
			index: "db.restaurants.createIndex({ borough: 1,  cuisine: 1, name: 1 })" // it's not right way.
		}
		
	]
}