import flask
from flask import jsonify, redirect,request,render_template
from flask_bcrypt import Bcrypt
from flask_cors import CORS
import db as model
from sqlalchemy.sql import func

app = flask.Flask("hrms")
CORS(app)
bcrypt = Bcrypt(app)
db = model.SQLAlchemy(model_class=model.HRDBBase)


@app.route("/")
def index():
    return render_template("index.html")

@app.route("/contact")
def contact():
    return render_template("contact.html")

@app.route("/employees")
def employees_list():
    query = db.select(model.Employee).order_by(model.Employee.fname)
    users = db.session.execute(query).scalars()
    ret=[]
    for user in users:
        ret .append({
            'id':user.id,
            'name':user.fname
        })
    return jsonify(ret)



@app.route("/employees/<int:empid>")
def employee_details(empid):
        query = db.select(model.Employee).where(model.Employee.id == empid)
        user = db.session.execute(query).scalar()
        query_for_leaves = db.select(func.count(model.Employee.id)).join(model.Leave, model.Employee.id == model.Leave.employee_id).filter(model.Employee.id == empid)
        leave = db.session.execute(query_for_leaves).scalar()
        ret = {"fname" : user.fname,
            "lname" : user.lname,
            "title" : user.designation.designation,
            "email" : user.email,
            "phone" : user.phone,
            "max_leave":user.designation.max_leaves,
            "leave" : leave,
            "id":user.id
            }
        return jsonify(ret)
@app.route("/registeremployee", methods=['POST'])
def add_employee():
     try:
        data = request.json
        email = data.get('email')
        designation = data.get('designation')
        first_name = data.get('firstName')
        last_name = data.get('lastName')
        phone = data.get('phone')
        query = db.select(model.Designation).where(model.Designation.designation==designation)
        designation = db.session.execute(query).scalar_one()
        employee = model.Employee(lname=first_name,
                                        fname=last_name,
                                        designation=designation,
                                        email=email,
                                        phone=phone)
        db.session.add(employee)
        db.session.commit()


        return jsonify({'message': 'Employee details added successfully'})
     except:
         return jsonify({'message': 'Failed to add Employee details'})



@app.route('/leaves/<int:empid>', methods=['POST'])
def add_leaves(empid):
    try:
        print(f"Received POST request to /leaves/{empid}")
        data = request.json
        date = data.get('date')
        reason = data.get('reason')
        leave = model.Leave(date=date, employee_id=empid, reason=reason)
        db.session.add(leave)
        db.session.commit()
        message = {'message': "Successfully added leave. Refresh again."}
        print("Leave added successfully")
        return jsonify(message)
    except:
        message = {'message':"Failed to add leave. Check and add again"}
        return jsonify(message)
    


users = []
@app.route('/register', methods=['OPTIONS','POST'])
def register():
    if request.method == 'OPTIONS':
        response = jsonify({'message': 'Preflight request successful'})
        response.headers.add('Access-Control-Allow-Methods', 'POST')
        return response
    try:
        data = request.json
        username = data.get('username')
        password = data.get('password')
        if not username:
            raise ValueError('Username cannot be empty')
        elif any(user['username'] == username for user in users):
            return jsonify({'message': 'User already exists'})
        
        else:
            hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
            users.append({'username': username, 'password': hashed_password})
            return jsonify({'message': 'User registered successfully'})
    except:
        return jsonify({'message': 'failed to register'})

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    user = next((user for user in users if user['username'] == username), None)

    if not user or not bcrypt.check_password_hash(user['password'], password):
        return jsonify({'message': 'false'})
    else:   
        return jsonify({'message': 'true'})
    
def run_web():
    app.config["SQLALCHEMY_DATABASE_URI"] = f"postgresql:///hrms"
    db.init_app(app)
    app.run(debug=True)

if __name__ == '__main__':
    run_web()





        





