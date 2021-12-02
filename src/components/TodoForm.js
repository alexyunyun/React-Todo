import React, {useState} from "react";
import SearchBar from "./SearchBar";
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

    function handleKeywordChange(keyword) {
        props.handleKeywordChange(keyword);
    }
    return (
        <div className="todo-form">
            <div style={{width: '100%',display: 'flex',justifyContent: 'flex-between'}}>
                <h1 style={{display:'inline-block'}}>待办事项</h1>
                <SearchBar handleKeywordChange={handleKeywordChange}/>
            </div>
            <div className="todo-add-box">
                <input type="text" className="todo-input" value={todo}
                       onKeyUp={handleEnterKeyUp}
                       onChange={handleTextChange}
                        placeholder="在这里添加todo"
                />
                <button onClick={handleAddTodo}>添加</button>
            </div>
            <div>
                <button onClick={deleteCompleted} className="clear-completed-button">清除已完成</button>
            </div>
        </div>
    )
}

export default TodoForm;