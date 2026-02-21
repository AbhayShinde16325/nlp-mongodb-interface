from typing import Dict, Any, List

ALLOWED_FIELDS = ["age", "salary", "name", "city"]
NUMERIC_FIELDS = ["age", "salary"]

AGGREGATION_KEYWORDS = {
    # Count variants
    "count": "count",
    "number": "count",
    "many": "count",

    # Average variants
    "average": "avg",
    "avg": "avg",
    "mean": "avg",

    # Sum variants
    "sum": "sum",
    "total": "sum",

    # Max variants
    "max": "max",
    "maximum": "max",
    "highest": "max",

    # Min variants
    "min": "min",
    "minimum": "min",
    "lowest": "min"
}



def parse_to_ir(user_input: str) -> Dict[str, Any] | None:
    user_input = user_input.lower()
    words = user_input.split()

    conditions: List[Dict[str, Any]] = []
    sort = None
    limit = None
    aggregation = None
    operation = "find"

    # -------- DETECT AGGREGATION --------
        # -------- DETECT AGGREGATION --------

    # Detect "how many"
    if "how" in words and "many" in words:
        operation = "aggregate"
        aggregation = {
            "type": "count",
            "field": None
        }

    else:
        for word in words:
            if word in AGGREGATION_KEYWORDS:
                operation = "aggregate"
                agg_type = AGGREGATION_KEYWORDS[word]

                if agg_type == "count":
                    aggregation = {
                        "type": "count",
                        "field": None
                    }
                else:
                    for field in NUMERIC_FIELDS:
                        if field in words:
                            aggregation = {
                                "type": agg_type,
                                "field": field
                            }
                            break
                break


    # -------- CITY --------
    if "in" in words:
        index = words.index("in")
        if index + 1 < len(words):
            conditions.append({
                "field": "city",
                "operator": "eq",
                "value": words[index + 1].capitalize()
            })

    # -------- AGE CONDITIONS --------
    for i in range(len(words)):
        if words[i] == "older" and i + 2 < len(words) and words[i + 1] == "than":
            try:
                age = int(words[i + 2])
                conditions.append({
                    "field": "age",
                    "operator": "gt",
                    "value": age
                })
            except:
                pass

        if words[i] == "younger" and i + 2 < len(words) and words[i + 1] == "than":
            try:
                age = int(words[i + 2])
                conditions.append({
                    "field": "age",
                    "operator": "lt",
                    "value": age
                })
            except:
                pass

    # -------- SORT --------
    for i in range(len(words)):
        if words[i] == "sorted" and i + 2 < len(words):
            if words[i + 1] == "by":
                field = words[i + 2]
                if field in ALLOWED_FIELDS:
                    direction = "asc"
                    if i + 3 < len(words) and words[i + 3] == "descending":
                        direction = "desc"

                    sort = {
                        "field": field,
                        "direction": direction
                    }

    # -------- LIMIT --------
    for i in range(len(words)):
        if words[i] == "limit" and i + 1 < len(words):
            try:
                limit = int(words[i + 1])
            except:
                pass

    # If aggregation but no field detected (except count)
    if operation == "aggregate" and aggregation is None:
        return None

    if not conditions and operation == "find":
        return None

    return {
        "collection": "users",
        "operation": operation,
        "conditions": conditions,
        "aggregation": aggregation,
        "sort": sort,
        "limit": limit,
        "meta": {
            "confidence": 0.9,
            "needs_clarification": False
        }
    }
