from flask_app.models.todos_model import Todo
from flask import json, jsonify, request
from flask_app import app

# You need to install flask-cors in the server: pipenv install flask-cors
from flask_cors import cross_origin

@app.route( '/api/todos' )
@cross_origin( origins = ['http://127.0.0.1:5500'] )
def api_get_todos():
    list_of_todos = Todo.api_get_all()

    return jsonify( list_of_todos )

@app.route( '/api/delete/todo/<int:id>', methods = ['DELETE'] )
@cross_origin( origins = ['http://127.0.0.1:5500'] )
def api_delete_one( id ):
    data = {
        "id" : id
    }
    Todo.delete_one( data )
    return jsonify( {} ), 204

@app.route( '/api/add/todo', methods = ['POST'] )
@cross_origin( origins = ['http://127.0.0.1:5500'], headers = ['Content-type'] )
def api_add_one():
    new_todo = json.loads( request.data.decode( 'UTF-8' ) ) 
    todo_id = Todo.create( new_todo )
    data = {
        "id" : todo_id,
        "message" : "todo added successfully"
    }
    return jsonify( data ), 201
