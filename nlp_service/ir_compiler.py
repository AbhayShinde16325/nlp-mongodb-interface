from typing import Dict, Any


def build_match_stage(conditions):
    if not conditions:
        return {}

    and_conditions = []

    for condition in conditions:
        field = condition["field"]
        operator = condition["operator"]
        value = condition["value"]

        if operator == "eq":
            and_conditions.append({field: value})
        elif operator == "gt":
            and_conditions.append({field: {"$gt": value}})
        elif operator == "lt":
            and_conditions.append({field: {"$lt": value}})

    if len(and_conditions) == 1:
        return and_conditions[0]

    return {"$and": and_conditions}


def compile_ir_to_mongo(ir: Dict[str, Any]) -> Dict[str, Any]:

    if ir["operation"] == "find":

        mongo_filter = build_match_stage(ir["conditions"])

        mongo_query = {
            "type": "find",
            "filter": mongo_filter,
            "sort": None,
            "limit": ir["limit"]
        }

        if ir["sort"]:
            direction = 1 if ir["sort"]["direction"] == "asc" else -1
            mongo_query["sort"] = (ir["sort"]["field"], direction)

        return mongo_query

    # -------- AGGREGATION --------
    elif ir["operation"] == "aggregate":

        match_stage = build_match_stage(ir["conditions"])

        pipeline = []

        if match_stage:
            pipeline.append({"$match": match_stage})

        agg_type = ir["aggregation"]["type"]
        field = ir["aggregation"]["field"]

        if agg_type == "count":
            pipeline.append({"$count": "result"})
        else:
            operator_map = {
                "avg": "$avg",
                "sum": "$sum",
                "max": "$max",
                "min": "$min"
            }

            pipeline.append({
                "$group": {
                    "_id": None,
                    "result": {
                        operator_map[agg_type]: f"${field}"
                    }
                }
            })

        return {
            "type": "aggregate",
            "pipeline": pipeline
        }
