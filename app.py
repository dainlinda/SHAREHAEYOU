import pymysql
from flask import Flask
from flask_restful import reqparse, abort, Api, Resource

# User API 구현을 위한 새로운 패키지 로드
from flask import jsonify
from flask import request
from flask import session

# 암호화
from werkzeug.security import check_password_hash
from werkzeug.security import generate_password_hash
import bcrypt

#flask_cors 사용
from flask_cors import CORS, cross_origin

app = Flask(__name__)
api = Api(app)
#flask_cors 사용
CORS(app)

# db 연결
db = pymysql.connect(
        user = 'root',
        passwd = '1234',
        host = '127.0.0.1',
        port = 3306,
        db = 'webportfolio',
        charset = 'utf8'
    )

cursor = db.cursor(pymysql.cursors.DictCursor)

"""
User APIs : 유저 SignUp / Login / Logout

SignUp API : *fullname*, *email*, *password* 를 입력받아 새로운 유저를 가입시킵니다.
Login API : *email*, *password* 를 입력받아 특정 유저로 로그인합니다.
Logout API : 현재 로그인 된 유저를 로그아웃합니다.
"""
parser = reqparse.RequestParser()
parser.add_argument('id')
parser.add_argument('fullname')
parser.add_argument('email')
parser.add_argument('password')

# session을 위한 secret_key 설정
app.config.from_mapping(SECRET_KEY='dev')

@app.route('/signup', methods=["POST"])
def register():
    args = parser.parse_args()
    sql = "INSERT INTO `user` (`fullname`, `email`, `password`) VALUES (%s, %s, %s)"
    cursor.execute(sql, (args['fullname'],args['email'],generate_password_hash(args['password'])))
    db.commit()
    return jsonify(status = "success", result = {"fullname": args["fullname"]})
        
@app.route('/login', methods=["POST"])
def login():
    args = parser.parse_args()
    sql = "SELECT * FROM `user` WHERE email = %s"
    cursor.execute(sql, (args['email'],))
    user = cursor.fetchone()  
    if check_password_hash(user['password'], args['password']):
        session.clear()
        session['email'] = user['email']
        return jsonify(status = "success", result = {"email": args["email"]})

@app.route('/logout', methods=["GET"])
def logout():
    session.clear()
    return jsonify(status = "success")

if __name__ == '__main__':
    app.run(debug=True)