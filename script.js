
/* Code Calculator Studio 3.0 */
(() => {
  const app = document.getElementById("app");
  if (!app) return;

  app.innerHTML = `
    <header class="topbar">
      <div class="brand">
        <div class="brand-mark">⌘</div>
        <div>Code Calculator Studio
          <small>Version 3.0 · Learn, calculate, create</small>
        </div>
      </div>
      <div class="top-actions">
        <button class="btn" id="themeBtn">☼ Theme</button>
      </div>
    </header>

    <main class="container">
      <section class="hero">
        <div class="eyebrow">Your creative workspace</div>
        <h1>Code Calculator Studio 3.0</h1>
        <p>A simple calculator and browser-based HTML playground.</p>
      </section>

      <nav class="tabs">
        <button class="tab active" data-tab="calculator">Calculator</button>
        <button class="tab" data-tab="editor">Code editor</button>
      </nav>

      <section id="calculatorView" class="workspace">
        <div class="panel">
          <h2>Standard calculator</h2>
          <div class="display">
            <span class="expression" id="expression">Ready</span>
            <span id="display">0</span>
          </div>

          <div class="keypad" id="keypad">
            <button class="key clear" data-action="clear">AC</button>
            <button class="key" data-action="back">⌫</button>
            <button class="key operator" data-value="(">(</button>
            <button class="key operator" data-value=")">)</button>

            <button class="key" data-value="7">7</button>
            <button class="key" data-value="8">8</button>
            <button class="key" data-value="9">9</button>
            <button class="key operator" data-value="/">÷</button>

            <button class="key" data-value="4">4</button>
            <button class="key" data-value="5">5</button>
            <button class="key" data-value="6">6</button>
            <button class="key operator" data-value="*">×</button>

            <button class="key" data-value="1">1</button>
            <button class="key" data-value="2">2</button>
            <button class="key" data-value="3">3</button>
            <button class="key operator" data-value="-">−</button>

            <button class="key" data-value="0">0</button>
            <button class="key" data-value=".">.</button>
            <button class="key equals" data-action="equals">=</button>
            <button class="key operator" data-value="+">+</button>
          </div>

          <p class="hint">Use the buttons or your keyboard.</p>
          <div class="status" id="calcStatus"></div>
        </div>

        <aside class="panel">
          <h2>Quick guide</h2>
          <p class="hint">
            Enter a calculation and press = to see the result.
            Use AC to clear the display.
          </p>
        </aside>
      </section>

      <section id="editorView" class="workspace hidden">
        <div class="panel">
          <h2>HTML / CSS / JavaScript editor</h2>

          <div class="editor-toolbar">
            <button class="btn primary" id="runCode">▶ Run preview</button>
            <button class="btn" id="resetCode">Reset example</button>
            <button class="btn" id="downloadCode">Download HTML</button>
          </div>

          <textarea id="codeInput" class="editor"
            spellcheck="false"></textarea>

          <div class="status" id="editorStatus">
            Edit the example and select Run preview.
          </div>
        </div>

        <div class="panel">
          <h2>Live preview</h2>
          <iframe class="preview" id="preview"
            title="Code preview" sandbox="allow-scripts"></iframe>
          <p class="hint">Preview runs locally in your browser.</p>
        </div>
      </section>
    </main>

    <footer>
      Code Calculator Studio 3.0 · Made for learning and creating
    </footer>
  `;

  const display = document.getElementById("display");
  const expression = document.getElementById("expression");
  let current = "";

  function updateDisplay() {
    display.textContent = current || "0";
  }

  function calculate() {
    if (!current.trim()) return;

    if (!/^[0-9+*/().\s-]+$/.test(current)) {
      expression.textContent = "Invalid expression";
      return;
    }

    try {
      const result = Function(
        '"use strict"; return (' + current + ')'
      )();

      if (typeof result !== "number" || !Number.isFinite(result)) {
        throw new Error("Invalid result");
      }

      expression.textContent = current + " =";
      current = String(Number(result.toPrecision(12)));
      updateDisplay();

      document.getElementById("calcStatus").textContent =
        "Calculation complete.";

    } catch {
      expression.textContent = "Check your calculation";

      document.getElementById("calcStatus").textContent =
        "That expression could not be calculated.";
    }
  }

  document.getElementById("keypad").addEventListener("click", event => {
    const button = event.target.closest("button");
    if (!button) return;

    const action = button.dataset.action;

    if (action === "clear") {
      current = "";
      expression.textContent = "Cleared";
    } else if (action === "back") {
      current = current.slice(0, -1);
    } else if (action === "equals") {
      calculate();
      return;
    } else if (button.dataset.value) {
      current += button.dataset.value;
      expression.textContent = "Entering calculation";
    }

    updateDisplay();
  });

  document.addEventListener("keydown", event => {
    if (
      document.activeElement &&
      ["TEXTAREA", "INPUT"].includes(document.activeElement.tagName)
    ) return;

    if (/^[0-9()+\-*/.]$/.test(event.key)) {
      current += event.key;
      updateDisplay();
    } else if (event.key === "Backspace") {
      current = current.slice(0, -1);
      updateDisplay();
    } else if (event.key === "Enter" || event.key === "=") {
      event.preventDefault();
      calculate();
    } else if (event.key === "Escape") {
      current = "";
      updateDisplay();
      expression.textContent = "Cleared";
    }
  });

  document.querySelectorAll(".tab").forEach(tab => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".tab").forEach(item => {
        item.classList.toggle("active", item === tab);
      });

      document.getElementById("calculatorView")
        .classList.toggle("hidden", tab.dataset.tab !== "calculator");

      document.getElementById("editorView")
        .classList.toggle("hidden", tab.dataset.tab !== "editor");
    });
  });

  const sample = `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>My first page</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      padding: 2rem;
      background: #eef3ff;
      color: #18213b;
    }
    button { padding: .6rem 1rem; }
  </style>
</head>
<body>
  <h1>Hello, world!</h1>
  <p>Edit this HTML and click Run preview.</p>
  <button onclick="document.querySelector('p').textContent='It works!'">
    Try me
  </button>
</body>
</html>`;

  const codeInput = document.getElementById("codeInput");
  const preview = document.getElementById("preview");

  codeInput.value = sample;

  document.getElementById("runCode").addEventListener("click", () => {
    preview.srcdoc = codeInput.value;

    document.getElementById("editorStatus").textContent =
      "Preview updated.";
  });

  document.getElementById("resetCode").addEventListener("click", () => {
    codeInput.value = sample;
    preview.srcdoc = sample;

    document.getElementById("editorStatus").textContent =
      "Example restored.";
  });

  document.getElementById("downloadCode").addEventListener("click", () => {
    const blob = new Blob([codeInput.value], {
      type: "text/html"
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "my-webpage.html";
    link.click();

    URL.revokeObjectURL(url);

    document.getElementById("editorStatus").textContent =
      "HTML download started.";
  });

  preview.srcdoc = sample;

  document.getElementById("themeBtn").addEventListener("click", () => {
    document.body.classList.toggle("light");
  });

})();
