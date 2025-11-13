from flask import Blueprint, render_template, request, jsonify
from .text_service import echo_text, to_uppercase

bp = Blueprint("main", __name__)

@bp.get("/")
def home():
    # Render the page with a small form and JS client
    return render_template("index.html")

@bp.post("/process")
def process():
    data = request.get_json(silent=True) or request.form
    text = (data.get("text") or "").strip()
    to_upper = str(data.get("to_upper", "false")).lower() == "true"

    result = to_uppercase(text) if to_upper else echo_text(text)
    return jsonify({"input": text, "output": result, "upper": to_upper})
