import React from "react";
import '../style/Todo.css'

function Todo(props) {
    const todo = props.todo;
    const status = props.todo.completed;

    function handleStatusChange(e) {
        let newTodo = Object.assign({}, todo);
        newTodo.completed = e.target.checked;
        props.onStatusChange(newTodo);
    }

    function handleDeleteItem(id) {
        props.onDeleteItem(id);
    }

    return (

        <div className="todo-item">
            <input type="checkbox" checked={status}
                   onChange={handleStatusChange.bind(this)}
                   disabled={status}
            />
            <span className={`todo-item-text ${status ? 'done' : 'undone'}`}>{todo.task} </span>
            <button className="todo-item-delete" onClick={handleDeleteItem.bind(this, todo.id)}>X</button>
        </div>
    )
}

export default Todo;