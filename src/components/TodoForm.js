import React, {useState} from "react";

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

    return (
        <div>
            <h1>待办事项</h1>
            <input type="text" className="todo-input" value={todo} onKeyUp={handleEnterKeyUp} onChange={handleTextChange}/>
            <button onClick={handleAddTodo}>添加</button>
        </div>
    )
}

export default TodoForm;