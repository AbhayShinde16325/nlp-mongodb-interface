/**
 * API Gateway client for the existing Express routes:
 *   /api/nlq/connect-cluster
 *   /api/nlq/get-collections
 *   /api/nlq/run-nlp
 *   /api/nlq/diagnose
 *   /api/nlq/clear-cache
 */

const RAW_API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/nlq"
const API_BASE = RAW_API_BASE.endsWith("/api/nlq")
  ? RAW_API_BASE
  : `${RAW_API_BASE.replace(/\/$/, "")}/api/nlq`

interface ConnectClusterResponse {
  databases: string[]
  total_databases: number
  message?: string
}

interface CollectionInfo {
  name: string
  document_count: number
}

interface GetCollectionsResponse {
  collections: CollectionInfo[]
}

export interface RunNLPResponse {
  interpretation?: string
  data?: Record<string, unknown>[]
  result?: number
  result_count?: number
  total_results?: number
  page?: number
  page_size?: number
  warning?: string
  value_hint?: string
  indexes?: Array<{ name: string; unique?: boolean }>
  interpreted_ir?: {
    operation?: string
    conditions?: Array<{ field?: string; operator?: string; value?: unknown }>
  }
}

export interface DiagnoseResponse {
  query?: string
  steps?: Record<string, unknown>
}

function extractErrorMessage(data: unknown, fallback: string): string {
  if (data && typeof data === "object") {
    const maybeDetail = (data as { detail?: unknown }).detail
    const maybeError = (data as { error?: unknown }).error
    if (typeof maybeDetail === "string") return maybeDetail
    if (typeof maybeError === "string") return maybeError
  }
  return fallback
}

async function postJSON<T>(path: string, body: Record<string, unknown>, fallbackError: string): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })

  const data = await res.json().catch(() => ({}))

  if (!res.ok) {
    throw new Error(extractErrorMessage(data, fallbackError))
  }

  return data as T
}

export async function connectToMongo(mongoUri: string): Promise<ConnectClusterResponse> {
  return postJSON<ConnectClusterResponse>(
    "/connect-cluster",
    { mongo_uri: mongoUri },
    "Failed to connect to MongoDB cluster"
  )
}

export async function fetchDatabases(mongoUri: string): Promise<string[]> {
  const result = await connectToMongo(mongoUri)
  return result.databases || []
}

export async function fetchCollections(mongoUri: string, db: string): Promise<string[]> {
  const result = await postJSON<GetCollectionsResponse>(
    "/get-collections",
    { mongo_uri: mongoUri, database_name: db },
    "Failed to fetch collections"
  )

  return (result.collections || []).map((col) => col.name)
}

export async function sendQuery(params: {
  mongoUri: string
  db: string
  collection: string
  query: string
  page?: number
  pageSize?: number
}): Promise<RunNLPResponse> {
  const { mongoUri, db, collection, query, page = 1, pageSize = 20 } = params

  return postJSON<RunNLPResponse>(
    "/run-nlp",
    {
      mongo_uri: mongoUri,
      database_name: db,
      collection_name: collection,
      query,
      page,
      page_size: pageSize,
    },
    "Query failed"
  )
}

export async function diagnoseQuery(params: {
  mongoUri: string
  db: string
  collection: string
  query: string
}): Promise<DiagnoseResponse> {
  const { mongoUri, db, collection, query } = params

  return postJSON<DiagnoseResponse>(
    "/diagnose",
    {
      mongo_uri: mongoUri,
      database_name: db,
      collection_name: collection,
      query,
    },
    "Diagnosis failed"
  )
}

export async function clearCache(): Promise<{ status?: string; message?: string }> {
  return postJSON<{ status?: string; message?: string }>(
    "/clear-cache",
    {},
    "Failed to clear cache"
  )
}
