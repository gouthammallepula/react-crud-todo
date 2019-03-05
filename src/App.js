import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import ListItem from './Listitem';
import axios from 'axios';
import loadingGif from './loading.gif';

class App extends Component {
  constructor() {
    super();
    this.state = {
      newTodo: '',
      editing: false,
      editingIndex: null,
      notification: null,
      notificationDanger: null,
      todos: [],
      loading: true
    };
    this.apiurl = "https://5c7e89c808d03100141af438.mockapi.io";

    this.alert = this.alert.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addTodo = this.addTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.editTodo = this.editTodo.bind(this);
    this.updateTodo = this.updateTodo.bind(this);
    this.generateTodoID = this.generateTodoID.bind(this);
  }

  async componentDidMount() {
    //console.log("Mounted");
    const response = await axios.get(`${this.apiurl}/todos`);
    //console.log(response);
    setTimeout(() => {
      this.setState({
        todos: response.data,
        loading: false
      });
    }, 2000);
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
  async addTodo(event) {
    if (this.state.newTodo === "") {
      this.alert("Enter a Todo First!", "danger");
      return;
    } else if (this.state.newTodo.length < 5) {
      this.alert("Size should be at least 5 characters", "danger");
      return;
    }
    const Todo = {
      id: this.generateTodoID(),
      name: this.state.newTodo
    };
    // state is immutable, we can only use setState()
    await axios.post(`${this.apiurl}/todos`, Todo);
    const oldTodos = this.state.todos;
    oldTodos.push(Todo);
    this.setState({
      todos: oldTodos,
      newTodo: ""
    });
  };
  async updateTodo() {
    if (this.state.newTodo.length < 5) {
      this.alert("Size should be at least 5 characters", "danger");
      return;
    }
    const todo = this.state.todos[this.state.editingIndex];
    const response = await axios.put(`${this.apiurl}/todos/${todo.id}`, {
      name: this.state.newTodo
    });
    todo.name = this.state.newTodo;
    const todos = this.state.todos;
    todos[this.state.editingIndex] = response.data;
    this.setState({
      todos: todos,
      bool: false,
      editingIndex: null,
      newTodo: ""
    });
    this.alert("Updated Successfully!");
  };
  async deleteTodo(index) {
    const todos = this.state.todos;
    const todo = todos[index];
    await axios.delete(`${this.apiurl}/todos/${todo.id}`);
    delete todos[index];
    this.setState({ todos });
    this.alert("Todo Deleted Successfully!");
  };
  editTodo(index) {
    const todo = this.state.todos[index];
    this.setState({
      newTodo: todo.name,
      bool: true,
      editingIndex: index
    });
  };
  alert(notification, lvl) {
    if (lvl === "danger") {
      this.setState({
        notificationDanger: notification
      });
    } else {
      this.setState({
        notification
      });
    }
    setTimeout(() => {
      this.setState({
        notification: null,
        notificationDanger: null
      });
    }, 2000);
  };
  render() {
    // console.log(this.state.newTodo);
    return (
      <div className="container center todoText">
        <h2 className="text-center p-2 todoTitle">Add Todos!</h2>
        <input name="input" value={this.state.newTodo} onChange={this.handleChange} type="text" className="my-4 form-control" placeholder="Enter text..." />
        {
          this.state.notification &&
          <div className="alert alert-success">
            <p className="text-center">{this.state.notification}</p>
          </div>
        }
        {
          this.state.notificationDanger &&
          <div className="alert alert-danger">
            <p className="text-center">{this.state.notificationDanger}</p>
          </div>
        }
        <button onClick={this.state.bool ? this.updateTodo : this.addTodo} className="btn-success form-control mb-3"> {this.state.bool ? 'Update Todo' : 'Add Todo'} </button>
        {
          this.state.loading &&
          <img src={loadingGif} />
        }
        <ul hidden={this.state.editing || this.state.loading} className="list-group">
          {this.state.todos.map((item, index) => {
            return <ListItem
              item={item} key={index}
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
