import React, {useState} from "react";
import '../style/TodoForm.css';
function TodoForm(props) {
    const [todo, setTodo] = useState('');

    function handleTextChange(e) {
        setTodo(e.target.value);
    }

    function handleEnterKeyUp(e) {
        if (e.keyCode === 13) {
            handleAddTodo()
        }
    }

    function handleAddTodo() {
        if (todo.trim() === '') {
            alert('待办事项不能为空哦～');
            return;
        }
        props.onAddTodo(todo);
        setTodo('');
    }

    function deleteCompleted() {
        props.handleDeleteCompleted();
    }
    return (
        <div className="todo-form">
            <h1>待办事项</h1>
            <div className="todo-add-box">
                <input type="text" className="todo-input" value={todo} onKeyUp={handleEnterKeyUp} onChange={handleTextChange}/>
                <button onClick={handleAddTodo}>添加</button>
            </div>
            <div>
                <button onClick={deleteCompleted} className="clear-completed-button">清除已完成</button>
            </div>
        </div>
    )
}

export default TodoForm;