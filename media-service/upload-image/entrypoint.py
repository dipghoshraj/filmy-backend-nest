from app import create_app
from app.model import db

app = create_app()

# Initialize the database and create tables
with app.app_context():
    db.init_app(app)
    db.create_all()

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000, debug=True)
