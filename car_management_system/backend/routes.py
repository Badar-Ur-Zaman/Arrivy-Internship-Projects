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

@app.route('/add_brand', methods=['POST'])
def add_brand():
    try:
        data = request.get_json()
        name = data['name']
        backgroundImgUrl = data['backgroundImgUrl']
        website = data['website']
        logo_url = data['logo_url']

        cursor = mysql.connection.cursor()

        cursor.execute("select * from brands WHERE name = %s", (name,))
        existing_brand = cursor.fetchone()

        if existing_brand:
            cursor.close()
            return jsonify({'message': 'Brand already exists.'}), 400

        cursor.execute("INSERT INTO brands (name, backgroudImg_url, website, logo_url) VALUES (%s, %s, %s, %s)", 
                       (name, backgroundImgUrl, website, logo_url),)
        mysql.connection.commit()
        cursor.close()
        return jsonify({'message': 'Brand added successfully.'}), 200

    except Exception as e:
        print(f"An error occurred: {e}")
        return jsonify({'message': 'An error occurred while adding the brand'}), 500


@app.route("/add_model", methods=['POST'])
def add_model():
    try:
        data = request.get_json()
        name = data['name']
        backgroundImgUrl = data['backgroundImgUrl']
        issuanceYear = data['issuanceYear']
        price = data['price']
        fuelType = data['fuelType']
        brand = data['brand']

        cursor = mysql.connection.cursor()
        cursor.execute("SELECT id FROM brands WHERE name = %s", (brand,))
        existing_brand = cursor.fetchone()

        if not existing_brand:
            cursor.close()
            return jsonify("Brand doesn't exist"), 400

        brand_id = existing_brand[0]  # Access id from tuple by index
        
        cursor.execute("INSERT INTO models (name, backgroundImg_url, issuanceYear, price, fuel_type, brand_id) VALUES (%s, %s, %s, %s, %s, %s)", 
                       (name, backgroundImgUrl, issuanceYear, price, fuelType, brand_id))
        mysql.connection.commit()
        cursor.close()
        return jsonify({'message': 'Model added successfully.'}), 200
    except Exception as e:
        print(f"An error occurred: {e}")
        return jsonify({'message': 'An error occurred while adding the model'}), 500


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

@app.route('/search_brands', methods=['POST'])
def search_brands():
    data = request.get_json()
    search_term = data['searchTerm']
    cursor = mysql.connection.cursor()
    sql_query = "SELECT id from brands WHERE name LIKE %s"
    cursor.execute(sql_query, ('%' + search_term + '%',))
    results = cursor.fetchall()
    cursor.close()
    return jsonify(results)



if __name__ == "__main__":
    app.run(host='localhost', port=5000)
