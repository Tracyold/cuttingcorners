import httpx
from fastapi import FastAPI, Request
from fastapi.responses import Response

app = FastAPI()

@app.api_route("/api/{path:path}", methods=["GET","POST","PUT","DELETE","PATCH"])
async def proxy(request: Request, path: str):
    async with httpx.AsyncClient() as client:
        response = await client.request(
            method=request.method,
            url=f"http://localhost:3000/api/{path}",
            headers=dict(request.headers),
            content=await request.body(),   # raw bytes — do not decode or re-encode
            params=request.query_params,
        )
    return Response(
        content=response.content,
        status_code=response.status_code,
        headers=dict(response.headers)
    )
