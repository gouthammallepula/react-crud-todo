import React from 'react';
import ReactDOM from 'react-dom';

const ListItem = (props) => {
    return <li className="list-group-item">
        {props.item.name}
        <button onClick={props.deleteTodo} className="btn-del btn-sm btn btn-danger ml-2">X</button>
        <button onClick={props.editTodo} className="btn-del btn-sm btn btn-info">Update</button>
    </li>;
};

export default ListItem;