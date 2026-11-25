from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import check_password_hash, generate_password_hash

db = SQLAlchemy()

# ---------- User model ----------
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    subscriptions = db.relationship("Subscription", backref="user", lazy=True)

    def set_password(self, raw_password):
        """Store a one-way password hash, never the original password."""
        self.password = generate_password_hash(raw_password)

    def check_password(self, raw_password):
        return check_password_hash(self.password, raw_password)

# ---------- Subscription model ----------
class Subscription(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    service = db.Column(db.String(100))
    amount = db.Column(db.String(50))
    plan_type = db.Column(db.String(20))
    renewal_date = db.Column(db.String(20))
    category = db.Column(db.String(50))
    notes = db.Column(db.Text)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "service": self.service,
            "amount": self.amount,
            "planType": self.plan_type,
            "renewalDate": self.renewal_date,
            "category": self.category,
            "notes": self.notes,
        }
