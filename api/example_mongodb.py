import pymongo
from pprint import pprint

client = pymongo.MongoClient("192.168.231.112", 27017)
db = client.test
# clean up collection
db.my_collection.drop()


# add some data
db.my_collection.insert_one({"task": "cleaning", "hours": 2})
db.my_collection.insert_one({"task": "dishwashing", "hours": 1})
db.my_collection.insert_one({"task": "cooking", "hours": 2})

# get them all
pprint(list(db.my_collection.find()))

# get one
pprint(db.my_collection.find_one({"task": "dishwashing"}))

# Get a filtered set
pprint(list(db.my_collection.find({"hours": 2})))


# perform an aggregation
pipeline = [
    {"$unwind": "$task"},
    {"$group": {"_id": "$task", "hours": {"$sum": "$hours"}}},
    {"$project": {"_id": 0, "task": "$_id", "hours": "$hours"}},
]


pprint(list(db.my_collection.aggregate(pipeline)))
