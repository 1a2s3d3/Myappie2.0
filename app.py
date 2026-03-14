from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os
import base64

app = Flask(__name__)
CORS(app)

# ---------------- SECRET KEY (ENCRYPTED) ----------------
encoded_key = "U3VwZXJTZWNyZXRLZXlfUmVzdGF1cmFudF8yMDI2"
app.config["SECRET_KEY"] = base64.b64decode(encoded_key).decode("utf-8")

# ---------------- DATABASE CONFIG ----------------
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.path.join(BASE_DIR, "restaurant.db")

app.config["SQLALCHEMY_DATABASE_URI"] = f"sqlite:///{DB_PATH}"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)

# ---------------- MODEL ----------------
class Order(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    order_item = db.Column(db.String(200), nullable=False)
    details = db.Column(db.Text, nullable=True)

# ---------------- CREATE TABLES ----------------
with app.app_context():
    db.create_all()

# ---------------- ORDER ROUTE ----------------
@app.route("/api/order", methods=["POST"])
def create_order():
    data = request.get_json(silent=True)

    if not data:
        return jsonify({
            "status": "error",
            "message": "No data was sent."
        }), 400

    full_name = data.get("fullName", "").strip()
    email = data.get("email", "").strip()
    order_item = data.get("orderItem", "").strip()
    details = data.get("details", "").strip()

    if not full_name or not email or not order_item:
        return jsonify({
            "status": "error",
            "message": "Please fill in all required fields."
        }), 400

    try:
        new_order = Order(
            full_name=full_name,
            email=email,
            order_item=order_item,
            details=details
        )

        db.session.add(new_order)
        db.session.commit()

        return jsonify({
            "status": "success",
            "message": "Your request has been received successfully. Kindly wait for feedback."
        }), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({
            "status": "error",
            "message": f"Database error: {str(e)}"
        }), 500

# ---------------- OPTIONAL: VIEW ALL ORDERS ----------------
@app.route("/api/orders", methods=["GET"])
def get_orders():
    orders = Order.query.all()

    all_orders = []
    for order in orders:
        all_orders.append({
            "id": order.id,
            "full_name": order.full_name,
            "email": order.email,
            "order_item": order.order_item,
            "details": order.details
        })

    return jsonify(all_orders), 200


if __name__ == "__main__":
    app.run(debug=True)