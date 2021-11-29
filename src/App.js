import React, {useState} from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import './style/App.css'

function App() {
    // you will need a place to store your state in this component.
    // design `App` to be the parent component of your application.
    // this component is going to take care of state, and any change handlers you need to work with your state
    /*
    todoData的数据如下所示:
    todoData:[{
        task: '',
        id: Date.now(),
        completed: false
    }]
    * */
    //todoData数组
    const [todoData, setTodoData] = useState([]);
    // 未完成任务的数量
    const [todoCount,setTodoCount] =useState(0);
    function handleAddTodo(todo) {
        const newTodoData = todoData.slice();
        newTodoData.push({
            task: todo,
            id: Date.now(),
            completed: false
        })
        let count = 0;
        newTodoData.forEach(todo=>{
            if (todo.completed === false) {
                count++;
            }
        })
        setTodoCount(count);
        setTodoData(newTodoData);
    }

    function handleStatusChange(newTodo) {
        const newTodoData = todoData.slice();
        let count = 0;
        newTodoData.forEach(todo => {
            if (newTodo.id === todo.id) {
                todo.completed = newTodo.completed;
            }
            if (todo.completed===false) {
                count++;
            }
        })
        setTodoData(newTodoData);
        setTodoCount(count);
    }

    function handleDeleteItem(id) {
        let count = 0;
        const currentTodo = todoData.slice();
        const newTodoData = currentTodo.filter((todo) => {
            return todo.id !== id
        });
        newTodoData.forEach(todo=>{
            if (todo.completed === false) {
                count++;
            }
        })
        setTodoData(newTodoData);
        setTodoCount(count);
    }

    function deleteCompleted() {
        let confirm = window.confirm('此操作将会清空已完成任务列表，是否继续？')
        if (confirm) {
            let count = 0;
            const currentTodo = todoData.slice();
            currentTodo.forEach(todo=>{
                if (todo.completed === true) {
                    count++;
                }
            })
            if (count ===0) {
                alert('您当前没有已完成的事项，快去完成吧～');
                return;
            }
            const newTodoData = currentTodo.filter((todo) => {
                console.log('todo',todo);
                return todo.completed === false;
            })
            setTodoData(newTodoData)
        }
    }

    return (
        <div className="todo-app-container">
            <h2>Welcome to your {"Todo"} App!</h2>
            <span>您当前有{todoCount}件待办</span>
            <TodoForm
                onAddTodo={handleAddTodo}
                handleDeleteCompleted={deleteCompleted}
            />
            <TodoList
                onStatusChange={handleStatusChange}
                onDeleteItem={handleDeleteItem}
                todoData={todoData}
            />
        </div>
    );
}

export default App;
