{
	[{
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
	},
	]
}