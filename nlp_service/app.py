from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

from parser import parse_to_ir
from ir_validator import validate_ir
from ir_compiler import compile_ir_to_mongo
from db import execute_query
from response_formatter import format_response



app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class QueryRequest(BaseModel):
    query: str


@app.post("/query")
def query_users(request: QueryRequest):

    ir = parse_to_ir(request.query)

    if ir is None:
        raise HTTPException(status_code=400, detail="Invalid query format")

    validated_ir = validate_ir(ir)

    mongo_query = compile_ir_to_mongo(validated_ir)

    results = execute_query(mongo_query)

    formatted = format_response(validated_ir, results)
    return formatted



@app.get("/health")
def health_check():
    return {"status": "ok"}
