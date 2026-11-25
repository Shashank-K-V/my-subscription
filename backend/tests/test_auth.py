import os
import sys

import pytest


os.environ.setdefault("JWT_SECRET_KEY", "test-secret-that-is-never-used-outside-tests")
os.environ.setdefault("DATABASE_URL", "sqlite:///:memory:")
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from app import app  # noqa: E402
from models import User, db  # noqa: E402


@pytest.fixture()
def client():
    app.config.update(TESTING=True)
    with app.app_context():
        db.drop_all()
        db.create_all()
    with app.test_client() as test_client:
        yield test_client


def test_signup_hashes_password_and_login_returns_token(client):
    signup = client.post(
        "/auth/signup", json={"username": "alice", "password": "correct-horse"}
    )
    assert signup.status_code == 201

    with app.app_context():
        user = User.query.filter_by(username="alice").one()
        assert user.password != "correct-horse"
        assert user.check_password("correct-horse")

    login = client.post(
        "/auth/login", json={"username": "alice", "password": "correct-horse"}
    )
    assert login.status_code == 200
    assert login.get_json()["token"]


def test_login_rejects_wrong_password(client):
    client.post("/auth/signup", json={"username": "alice", "password": "right-one"})
    response = client.post(
        "/auth/login", json={"username": "alice", "password": "wrong-one"}
    )
    assert response.status_code == 401
