# Prism

> **The hidden spectrum of what you can study.**  
> School shows you ten subjects. It hides a thousand fields.

Prism is an interactive web app that helps high school students (aged 15 to 17) explore interdisciplinary fields of study. Exciting modern fields are often combinations of the core subjects they already know.

This project is set up as a `uv`-managed Python repository. It features a lightweight FastAPI backend to serve the application locally.

---

## Getting Started

### Prerequisites

You need [uv](https://github.com/astral-sh/uv) installed on your system.

### Running the App Locally

To start the FastAPI server and serve the web app:

```bash
uv run main.py
```

Or run uvicorn directly:

```bash
uv run uvicorn main:app --reload
```

Once running, open your browser and navigate to:
👉 **[http://127.0.0.1:8000](http://127.0.0.1:8000)**

---

## Project Structure

```
.
├── .git/               # Git repository configuration
├── .gitignore          # Rules for Git ignore tracking
├── .python-version     # Target Python version for uv
├── pyproject.toml      # uv configuration and project dependencies
├── README.md           # This guide
├── main.py             # FastAPI entry point to serve the app
├── prism.html          # Clean HTML5 structure
├── prism.css           # Modular stylesheet for page, custom scrollbars, and panels
├── prism.js            # Modular application logic, physics, and AudioContext chimes
└── prism-design-brief.md # Detailed design brief and specs
```

---

## Architecture & Features

### 1. Modularization
- Split the monolithic `prism.html` into clean, relative `prism.css` and `prism.js` files.
- You can still double-click **[prism.html](prism.html)** from Finder to open it locally as a `file://` link (fully CORS-safe relative linking).
- Mounted `StaticFiles` in `main.py` at `/` so the FastAPI server resolves assets correctly.

### 2. High-Performance Graph Physics (Locked 60fps)
- **Sleep-State physics**: The animation loops (`requestAnimationFrame`) put themselves to sleep when there is no mouse movement, no viewport panning, and all nodes have returned to their base coordinates. This drops CPU usage to **0%** when static, preventing audio crackle or delay.
- **GPU-Accelerated viewport zoom/pan**: Instead of mutating the CPU-heavy SVG `viewBox` attribute (which triggers page reflows), we scale and translate a single SVG `<g id="viewport">` container using hardware-accelerated CSS `transform: translate3d(...) scale(...)`.
- **Squared Broadphase checks**: Uses squared distance checks (`distSq < 6400`) to completely bypass costly `Math.sqrt` calculations for nodes far away from the mouse.
- **O(1) edge lookup**: Node physics objects are pre-linked to line edges at load time, removing the inner `.find()` linear search from the physics loop.
- **Filter-Bypassing during transitions**: Temporarily disables expensive Gaussian Blur filters (`filter: url(#glow)`) on the node halos while the viewport is actively animating, re-enabling them when static.

### 3. Dynamic Centering & Layout Fixes
- **Dynamic Field Centering**: Panning targets the weighted midpoint of the selected field and its parent subject nodes, keeping the focal area zoomed in comfortably.
- **Responsive portrait media query**: Handles vertical aspect ratios (including mobile and iPad portrait orientations) by drawing a bottom sheet drawer (max height `380px`) and shifting the SVG `12vh` upwards to clear the screen space.
- **Damped Hover Legibility**: Dimmed nodes fade smoothly to `0.75` opacity and display their labels on hover, ensuring high legibility.
- **Interactive Cursor physics**: Uses GPU `translate3d` tracking and custom, detune-glow shadows mapped via CSS transition exclusions.
- **Minimalist Scrollbars**: Implemented Antigravity-style overlay scrollbars (`6px` width, transparent track) across all WebKit and Firefox browsers.
