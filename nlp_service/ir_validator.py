# nlp-service/ir_validator.py

from typing import Dict, Any

ALLOWED_FIELDS = ["age", "salary", "name", "city"]
ALLOWED_OPERATORS = ["eq", "gt", "lt", "in"]
MAX_LIMIT = 100


def validate_ir(ir: Dict[str, Any]) -> Dict[str, Any]:
    for condition in ir["conditions"]:
        if condition["field"] not in ALLOWED_FIELDS:
            raise ValueError(f"Field '{condition['field']}' not allowed")

        if condition["operator"] not in ALLOWED_OPERATORS:
            raise ValueError(f"Operator '{condition['operator']}' not allowed")

    if ir["limit"] is not None:
        if ir["limit"] > MAX_LIMIT:
            ir["limit"] = MAX_LIMIT

    return ir
