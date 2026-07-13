import os
from fastapi import FastAPI
from fastapi.responses import FileResponse, HTMLResponse
from fastapi.staticfiles import StaticFiles
import uvicorn

app = FastAPI(
    title="Prism API",
    description="Backend service for Prism - the hidden spectrum of what you can study",
    version="0.1.0"
)

@app.get("/", response_class=HTMLResponse)
async def read_root():
    """Serves the interactive web app prism.html at the root URL."""
    html_path = os.path.join(os.path.dirname(__file__), "prism.html")
    if not os.path.exists(html_path):
        return HTMLResponse(
            content="<h1>Error</h1><p>prism.html file not found in the project root.</p>",
            status_code=404
        )
    return FileResponse(html_path)

# Mount the current directory at "/" to serve resources like prism.css and prism.js
app.mount("/", StaticFiles(directory=os.path.dirname(__file__)), name="static")

def start():
    """Starts the uvicorn development server."""
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)

if __name__ == "__main__":
    start()
