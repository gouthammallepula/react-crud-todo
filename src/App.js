import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import ListItem from './Listitem';

class App extends Component {
  constructor() {
    super();
    this.state = {
      newTodo: '',
      bool: false,
      editingIndex: null,
      todos: [{
        id: 1,
        name: "play pubg!"
      }, {
        id: 2,
        name: "Buy some clothes!"
      }, {
        id: 3,
        name: "write some code!"
      }]
    };
    this.handleChange = this.handleChange.bind(this);
    this.addTodo = this.addTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.editTodo = this.editTodo.bind(this);
    this.updateTodo = this.updateTodo.bind(this);
    this.generateTodoID = this.generateTodoID.bind(this);
  }

  handleChange(event) {
    //console.log(event.target.name, event.target.value);
    this.setState({
      newTodo: event.target.value
    });
  };
  generateTodoID() {
    const lastTodo = this.state.todos[this.state.todos.length - 1];
    if (lastTodo) {
      return lastTodo + 1;
    }
    return 1;
  };
  addTodo(event) {
    if (this.state.newTodo == "") {
      alert("Enter a Todo First!");
      return;
    }
    const Todo = {
      name: this.state.newTodo,
      id: this.generateTodoID()
    };
    // state is immutable, we can only use setState()
    const oldTodos = this.state.todos;
    oldTodos.push(Todo);
    this.setState({
      todos: oldTodos,
      newTodo: ""
    });
  };
  updateTodo() {
    const todo = this.state.todos[this.state.editingIndex];
    todo.name = this.state.newTodo;
    const todos = this.state.todos;
    todos[this.state.editingIndex] = todo;
    this.setState({
      todos: todos,
      bool: false,
      editingIndex: null,
      newTodo: ""
    });
  };
  deleteTodo(index) {
    const todos = this.state.todos;
    delete todos[index];
    this.setState({ todos });
  };
  editTodo(index) {
    const todo = this.state.todos[index];
    this.setState({
      newTodo: todo.name,
      bool: true,
      editingIndex: index
    });
  };
  render() {
    // console.log(this.state.newTodo);
    return (
      <div className="container center">
        <h2 className="text-center p-2">Add Todos!</h2>
        <input name="input" value={this.state.newTodo} onChange={this.handleChange} type="text" className="my-4 form-control" placeholder="Enter text..." />
        <button onClick={this.state.bool ? this.updateTodo : this.addTodo} className="btn-info form-control mb-3"> {this.state.bool ? 'Update Todo' : 'Add Todo'} </button>
        <ul hidden={this.state.bool} className="list-group">
          {this.state.todos.map((item, index) => {
            return <ListItem
              item={item}
              editTodo={() => { this.editTodo(index); }}
              deleteTodo={() => { this.deleteTodo(index); }}
            />;
          })}
        </ul>
      </div>
    );
  }
}

export default App;
