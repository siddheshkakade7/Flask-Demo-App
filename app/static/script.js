async function submitText(event) {
  event.preventDefault();
  const textEl = document.getElementById("text");
  const upperEl = document.getElementById("to_upper");
  const resultEl = document.getElementById("result");

  const payload = {
    text: textEl.value || "",
    to_upper: upperEl.checked ? "true" : "false",
  };

  try {
    const res = await fetch("/process", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const msg = await res.text();
      resultEl.textContent = JSON.stringify({ error: msg }, null, 2);
      return;
    }

    const data = await res.json();
    resultEl.textContent = JSON.stringify(data, null, 2);
  } catch (err) {
    resultEl.textContent = JSON.stringify({ error: String(err) }, null, 2);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("text-form");
  form.addEventListener("submit", submitText);
});
