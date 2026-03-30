from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager, jwt_required, get_jwt_identity
from models import db, Subscription
from auth import auth_bp
import os

app = Flask(__name__)
CORS(app)

# ---------- JWT CONFIG ----------
app.config["JWT_SECRET_KEY"] = "supersecretkey"  # change in production
app.config["JWT_TOKEN_LOCATION"] = ["headers"]
app.config["JWT_HEADER_NAME"] = "Authorization"
app.config["JWT_HEADER_TYPE"] = "Bearer"

jwt = JWTManager(app)

# ---------- Database Setup ----------
BASE_DIR = os.path.abspath(os.path.dirname(__file__))
db_dir = os.path.join(BASE_DIR, "db")
os.makedirs(db_dir, exist_ok=True)
app.config["SQLALCHEMY_DATABASE_URI"] = f"sqlite:///{os.path.join(db_dir, 'database.db')}"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db.init_app(app)

# ---------- Initialize database ----------
with app.app_context():
    db.create_all()
    print("✅ Database ready at:", os.path.join(db_dir, "database.db"))

# ---------- Register Blueprint ----------
app.register_blueprint(auth_bp, url_prefix="/auth")

# ---------- JWT Error Handlers ----------
@jwt.unauthorized_loader
def unauthorized_callback(reason):
    return jsonify({"error": "Missing or invalid token"}), 401

@jwt.invalid_token_loader
def invalid_token_callback(reason):
    return jsonify({"error": f"Invalid token: {reason}"}), 401


# ---------- Subscription Routes ----------
@app.route("/subscriptions", methods=["POST"])
@jwt_required()
def add_subscription():
    data = request.get_json()
    current_user = get_jwt_identity()
    new_sub = Subscription(
        service=data.get("service"),
        amount=data.get("amount"),
        plan_type=data.get("planType"),
        renewal_date=data.get("renewalDate"),
        category=data.get("category"),
        notes=data.get("notes"),
        user_id=current_user
    )
    db.session.add(new_sub)
    db.session.commit()
    return jsonify(new_sub.to_dict()), 201


@app.route("/subscriptions", methods=["GET"])
@jwt_required()
def get_subscriptions():
    current_user = get_jwt_identity()
    print("🧠 Current user from token:", current_user)
    subs = Subscription.query.filter_by(user_id=current_user).all()
    return jsonify([s.to_dict() for s in subs]), 200


@app.route("/subscriptions/<int:id>", methods=["PUT"])
@jwt_required()
def update_subscription(id):
    current_user = get_jwt_identity()
    sub = Subscription.query.filter_by(id=id, user_id=current_user).first_or_404()
    data = request.get_json()

    sub.service = data.get("service", sub.service)
    sub.amount = data.get("amount", sub.amount)
    sub.plan_type = data.get("planType", sub.plan_type)
    sub.renewal_date = data.get("renewalDate", sub.renewal_date)
    sub.category = data.get("category", sub.category)
    sub.notes = data.get("notes", sub.notes)

    db.session.commit()
    return jsonify(sub.to_dict()), 200


@app.route("/subscriptions/<int:id>", methods=["DELETE"])
@jwt_required()
def delete_subscription(id):
    current_user = get_jwt_identity()
    sub = Subscription.query.filter_by(id=id, user_id=current_user).first_or_404()
    db.session.delete(sub)
    db.session.commit()
    return jsonify({"message": "Subscription deleted"}), 200


@app.route("/")
def home():
    return "Flask backend running successfully!"


if __name__ == "__main__":
    app.run(debug=True)
