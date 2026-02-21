from typing import Dict, Any, List


def paraphrase_ir(ir: Dict[str, Any]) -> str:
    parts = []

    if ir["operation"] == "find":
        parts.append("Showing records")

    if ir["operation"] == "aggregate":
        agg_type = ir["aggregation"]["type"]

        if agg_type == "count":
            parts.append("Counting records")
        else:
            parts.append(f"Calculating {agg_type} of {ir['aggregation']['field']}")

    for condition in ir["conditions"]:
        field = condition["field"]
        operator = condition["operator"]
        value = condition["value"]

        if operator == "eq":
            parts.append(f"where {field} is {value}")
        elif operator == "gt":
            parts.append(f"where {field} > {value}")
        elif operator == "lt":
            parts.append(f"where {field} < {value}")

    if ir["sort"]:
        direction = ir["sort"]["direction"]
        field = ir["sort"]["field"]
        parts.append(f"sorted by {field} ({direction})")

    if ir["limit"]:
        parts.append(f"limited to {ir['limit']} results")

    return " ".join(parts) + "."


def clean_documents(results: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    cleaned = []
    for doc in results:
        doc.pop("_id", None)
        cleaned.append(doc)
    return cleaned


def format_response(ir: Dict[str, Any], results: List[Dict[str, Any]]) -> Dict[str, Any]:

    interpretation = paraphrase_ir(ir)

    if ir["operation"] == "aggregate":
        if results:
            value = results[0].get("result", 0)
        else:
            value = 0

        return {
            "interpretation": interpretation,
            "result": value
        }

    return {
        "interpretation": interpretation,
        "result_count": len(results),
        "results": clean_documents(results)
    }
