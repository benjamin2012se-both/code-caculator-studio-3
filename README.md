# Code Calculator Studio 3.0

A browser-based learning project with a standard calculator and a small HTML/CSS/JavaScript playground.

## Files

- `index.html` — page entry point
- `style.css` — layout, colors, responsive styling
- `script.js` — calculator, tabs, code preview, and HTML download

## Run locally

Keep all three files in the same folder and open `index.html` in a modern browser. No installation or build command is required.

## Deploy to Cloudflare Pages

1. Upload `index.html`, `style.css`, and `script.js` to the **root** of your GitHub repository.
2. In Cloudflare, create a **Pages** project connected to that repository.
3. For a plain static HTML site, leave the build command blank.
4. Set the build output directory to `/` (or `.` if the form requires a relative directory).
5. Deploy.

## Notes

- The calculator accepts numbers, parentheses, decimal points, and the basic arithmetic operators.
- The code preview is sandboxed in an iframe.
- This is a starter version. Add and test extra features before using it as a production tool.
