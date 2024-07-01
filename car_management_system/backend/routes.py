from flask import Flask, request, jsonify
from flask_mysqldb import MySQL
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from config import Config
import os
from dotenv import load_dotenv

app = Flask(__name__)
CORS(app)

app.config.from_object(Config)

mysql = MySQL(app)
load_dotenv()

app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')
jwt = JWTManager(app)

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
        user = cursor.fetchone()

        if user and check_password_hash(user[4], password):
            access_token = create_access_token(identity=user[0])  # Use user ID as JWT identity
            cursor.close()
            return jsonify(access_token=access_token), 200
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

        brand_id = existing_brand[0] 
        
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
    sql_query = "Select * from brands"
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

@app.route('/add_feedback', methods=['POST'])
@jwt_required()  
def add_feedback():
    try:
        current_user_id = get_jwt_identity()  # Get user ID from JWT
        data = request.get_json()
        model_id = data['model_id']
        feedback_text = data['feedback']

        cursor = mysql.connection.cursor()

        # Check if feedback already exists for this user and model
        cursor.execute("SELECT * FROM feedback WHERE user_id = %s AND model_id = %s", (current_user_id, model_id))
        existing_feedback = cursor.fetchone()

        if existing_feedback:
            cursor.close()
            return jsonify({'message': 'Feedback already exists for this model.'}), 400

        # If feedback doesn't exist, insert new feedback
        cursor.execute("INSERT INTO feedback (user_id, model_id, feedback) VALUES (%s, %s, %s)",
                       (current_user_id, model_id, feedback_text))
        mysql.connection.commit()
        cursor.close()
        return jsonify({'message': 'Feedback added successfully.'}), 200

    except Exception as e:
        print(f"An error occurred: {e}")
        return jsonify({'message': 'An error occurred while adding feedback'}), 500

@app.route('/get_feedback', methods=['GET'])
def get_feedback():
    data = request.get_json()
    model_id = data['model_id']
    feedback = data['feedback']
    cursor = mysql.connection.cursor()
    sql_query = "SELECT feedback from feedback WHERE model_id = %s"
    cursor.execute(sql_query, ('%' + model_id + '%',))
    results = cursor.fetchall()
    cursor.close()
    return jsonify(results)

@app.route('/remove_model/<name>', methods=['DELETE'])
def remove_model(name):
    model_name = name

    if not model_name:
        return jsonify({'message': 'Model name not provided'}), 400

    try:
        # Connect to the database
        connection = mysql.connect
        cursor = connection.cursor()

        # Check if model exists
        cursor.execute('SELECT * FROM models WHERE name = %s', (model_name,))
        model = cursor.fetchone()

        if not model:
            return jsonify({'message': f'Model with name {model_name} not found'}), 404

        # Delete the model
        cursor.execute('DELETE FROM models WHERE name = %s', (model_name,))
        connection.commit()

        # Close cursor and connection
        cursor.close()
        connection.close()

        return jsonify({'message': f'Model {model_name} removed successfully'}), 200

    except mysql.connector.Error as err:
        return jsonify({'message': f'MySQL Error: {str(err)}'}), 500

    except Exception as e:
        return jsonify({'message': f'Failed to remove model {model_name}', 'error': str(e)}), 500
    

@app.route("/update_model", methods=['PUT'])
def update_model():
    try:
        data = request.get_json()

        # Extract data from request
        name = data.get('name')
        backgroundImg_url = data.get('backgroundImg_url')
        issuanceYear = data.get('issuanceYear')
        price = data.get('price')
        fuel_type = data.get('fuel_type')

        # Create MySQL cursor
        cursor = mysql.connection.cursor()

        # SQL query to update model
        sql_query = """
        UPDATE models
        SET backgroundImg_url = %s, issuanceYear = %s, price = %s, fuel_type = %s
        WHERE name = %s
        """

        # Execute the update query with the provided values
        cursor.execute(sql_query, (backgroundImg_url, issuanceYear, price, fuel_type, name))

        # Commit the transaction to apply the changes
        mysql.connection.commit()


        # Close cursor
        cursor.close()

        # Return success response
        return jsonify({'message': 'Model updated successfully'}), 200

    except Exception as e:
        mysql.connection.rollback()
        print(f"An error occurred: {e}")
        return jsonify({'message': 'An error occurred while updating the model', 'error': str(e)}), 500


if __name__ == "__main__":
    app.run(host='localhost', port=5000)
