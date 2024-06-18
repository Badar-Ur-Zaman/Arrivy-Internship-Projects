from flask import Flask, request, jsonify
from flask_mysqldb import MySQL
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from config import Config

app = Flask(__name__)
CORS(app) 

app.config.from_object(Config)

mysql = MySQL(app)

@app.route('/register', methods=['POST'])
def register():
    try:
        data = request.get_json() 
        firstName = data['firstName']
        lastName = data['lastName']
        email = data['email']
        password = data['password']

        cursor = mysql.connection.cursor()
        cursor.execute("SELECT * FROM users WHERE email = %s", (email,))
        existing_user = cursor.fetchone()

        if existing_user:
            cursor.close()
            return jsonify({'message': 'Email already exists. Please use a different email.'}), 400

        hashed_password = generate_password_hash(password)
        cursor.execute("INSERT INTO users (firstName, lastName, email, password) VALUES (%s, %s, %s, %s)", 
                       (firstName, lastName, email, hashed_password))
        mysql.connection.commit()
        cursor.close()
        return jsonify({'message': 'Account created successfully.'}), 200

    except Exception as e:
        print(f"An error occurred: {e}")
        return jsonify({'message': 'An error occurred during registration'}), 500

@app.route("/login", methods=['POST'])
def login():
    try:
        data = request.get_json()  # Handle JSON data
        email = data['email']
        password = data['password']

        cursor = mysql.connection.cursor()
        cursor.execute("SELECT * FROM users WHERE email = %s", (email,))
        existed_user = cursor.fetchone()

        if existed_user and check_password_hash(existed_user[4], password):
            cursor.close()
            return jsonify({"message": "Login Successful"}), 200
        else:
            cursor.close()
            return jsonify({'message': 'Invalid Email or Password'}), 401

    except Exception as e:
        print(f"An error occurred: {e}")
        return jsonify({'message': 'An error occurred during login'}), 500

@app.route('/add_car', methods=['POST'])
def add_car():
    try:
        data = request.get_json() 
        model = data['model']
        year = data['year']
        brand = data['brand']
        engine = data['engine']
        fuel_type = data['fuel_type']

        cursor = mysql.connection.cursor()
        cursor.execute("INSERT INTO cars (model, year, brand, engine, fuel_type) VALUES (%s, %s, %s, %s, %s)", 
                       (model, year, brand, engine, fuel_type))
        mysql.connection.commit()
        cursor.close()
        return jsonify({'message': 'Car added successfully.'}), 200

    except Exception as e:
        print(f"An error occurred: {e}")
        return jsonify({'message': 'An error occurred while adding the car'}), 500

@app.route('/brands', methods = ['GET'])
def get_brands():
    cursor = mysql.connection.cursor()
    sql_query = "Select * from brands limit 5"
    cursor.execute(sql_query)
    rows = cursor.fetchall()
    cursor.close()
    return jsonify(rows)

@app.route('/models', methods=['POST'])
def get_models():
    data = request.get_json()
    brandID = data['brand']
    cursor = mysql.connection.cursor()
    sql_query = "SELECT * FROM models WHERE brand_id = %s"
    cursor.execute(sql_query, (brandID,))
    rows = cursor.fetchall()
    cursor.close()
    return jsonify(rows)



if __name__ == "__main__":
    app.run(host='localhost', port=5000)
