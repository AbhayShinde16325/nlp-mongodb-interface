
from venv import logger
from pymongo import MongoClient
from config import MONGO_URI, DATABASE_NAME, COLLECTION_NAME

# Create Mongo client
client = MongoClient(MONGO_URI)

# Access database
db = client[DATABASE_NAME]

# Access collection
collection = db[COLLECTION_NAME]


from pymongo import MongoClient
from config import MONGO_URI, DATABASE_NAME, COLLECTION_NAME

client = MongoClient(MONGO_URI)
db = client[DATABASE_NAME]
collection = db[COLLECTION_NAME]


def execute_query(mongo_query):

    if mongo_query["type"] == "find":
        query = collection.find(mongo_query["filter"])

        if mongo_query["sort"]:
            query = query.sort([mongo_query["sort"]])

        if mongo_query["limit"]:
            query = query.limit(mongo_query["limit"])

        return list(query)

    elif mongo_query["type"] == "aggregate":
        result = list(collection.aggregate(mongo_query["pipeline"]))
        return result



