import pymysql
from flask import Flask
from flask_restful import reqparse, abort, Api, Resource

# User API 구현을 위한 새로운 패키지 로드
from flask import jsonify
from flask import request
from flask import session

# 암호화----------------------------------------------------
from werkzeug.security import check_password_hash
from werkzeug.security import generate_password_hash
# 토큰
from flask_jwt_extended import (
    JWTManager, jwt_required, create_access_token, get_jwt_identity, unset_jwt_cookies)

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

# session을 위한 secret_key 설정-------------------------
app.config.from_mapping(SECRET_KEY='dev')

# 토큰 생성에 사용될 Secret Key를 flask 환경 변수에 등록
app.config.update(
			DEBUG = True,
			JWT_SECRET_KEY = "I'M DAIN"
		)
# JWT 확장 모듈을 flask 어플리케이션에 등록
jwt = JWTManager(app)


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
        # session.clear()
        # session['email'] = user['email']
        # return jsonify(status = "success", result = {"email": args["email"]})
        access_token = create_access_token(identity=user['id'])
        return jsonify(status = "success", access_token=access_token)
    else: #아이디, 비밀번호가 일치하지 않는 경우
        return jsonify(result = "Invalid Params!")

@app.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    print("welcome to vip zone")
    return jsonify(logged_in_as=current_user)
# @jwt_required는 헤더로 수신한 Access 토큰의 유효성을 검증하는 데코레이터이다. 만약 만료 되었거나 유효하지 않은 토큰이라면 인가받지 못했다는 리턴을 확인할 수 있을 것이다.
# get_jwt_identity() 메서드는 현재 유효한 토큰임을 확인했기 때문에 서명된 사용자 이름을 찾을 수 있을 것이다. 그 사용자 이름 즉 식별자 identity를 반환하는 함수이다.

# @app.route('/logout', methods=["GET"])
# def logout():
#     session.clear()
#     return jsonify(status = "success")

if __name__ == '__main__':
    app.run(debug=True)