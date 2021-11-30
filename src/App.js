import React, {useEffect, useState} from 'react';
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
    // todoData数组
    const [todoData, setTodoData] = useState([]);
    // 未完成任务的数量
    const [todoCount, setTodoCount] = useState(0);
    // 搜索过滤后的todoData
    const [filteredTodoData, setFilteredTodoData] = useState([]);



    // 更新待办数量
    function updateTodoCount(newTodoData) {
        let count = 0;
        newTodoData.forEach(todo => {
            if (todo.completed === false) {
                count++;
            }
        })
        setTodoCount(count);
    }

    // 每次更新待办列表后就更新localStorage
    function updateLocalData(newTodoData) {
        if (window.localStorage.getItem('todoData')) {
            window.localStorage.removeItem('todoData');
        }
        window.localStorage.setItem('todoData', JSON.stringify(newTodoData));
    }

    // 添加新待办
    function handleAddTodo(todo) {
        const newTodoData = todoData.slice();
        newTodoData.push({
            task: todo,
            id: Date.now(),
            completed: false
        })
        setTodoData(newTodoData);
        updateTodoCount(newTodoData);
        updateLocalData(newTodoData);
    }

    // 处理任务状态改变
    function handleStatusChange(newTodo) {
        const newTodoData = todoData.slice();
        newTodoData.forEach(todo => {
            if (newTodo.id === todo.id) {
                todo.completed = newTodo.completed;
            }

        })
        setTodoData(newTodoData);
        updateTodoCount(newTodoData);
        updateLocalData(newTodoData);
    }

    // 处理删除事件
    function handleDeleteItem(id) {
        const currentTodo = todoData.slice();
        const newTodoData = currentTodo.filter((todo) => {
            return todo.id !== id
        });
        setTodoData(newTodoData);
        updateTodoCount(newTodoData);
        updateLocalData(newTodoData);
    }

    // 删除已完成任务
    function deleteCompleted() {
        let confirm = window.confirm('此操作将会清空已完成任务列表，是否继续？')
        if (confirm) {
            let count = 0;
            const currentTodo = todoData.slice();
            currentTodo.forEach(todo => {
                if (todo.completed === true) {
                    count++;
                }
            })
            if (count === 0) {
                alert('您当前没有已完成的事项，快去完成吧～');
                return;
            }
            const newTodoData = currentTodo.filter((todo) => {
                return todo.completed === false;
            })
            setTodoData(newTodoData);
            updateLocalData(newTodoData);
        }
    }

    // 处理搜索关键词变化
    function handleKeywordChange(keyword) {
        const currentTodos = todoData.slice();
        let filteredData = [];
        if (keyword.trim() === '') {
            setFilteredTodoData([])
        } else {
            filteredData = currentTodos.filter(todo => {
                return todo.task.indexOf(keyword) !== -1;
            });
            setFilteredTodoData(filteredData);
        }
    }

    useEffect(() =>{
        // 初始化todoData
        function initTodoData() {
            if (window.localStorage.getItem('todoData')) {
                const newTodoData = JSON.parse(window.localStorage.getItem('todoData'));
                setTodoData(newTodoData);
                updateTodoCount(newTodoData);
            }
        }
        initTodoData();
    },[])

    return (
        <div className="todo-app-container">
            <h2>Welcome to your {"Todo"} App!</h2>
            <span>您当前有{todoCount}件待办</span>
            <TodoForm
                onAddTodo={handleAddTodo}
                handleDeleteCompleted={deleteCompleted}
                handleKeywordChange={handleKeywordChange}
            />
            <TodoList
                onStatusChange={handleStatusChange}
                onDeleteItem={handleDeleteItem}
                todoData={todoData}
                filteredData={filteredTodoData}
            />
        </div>
    );
}

export default App;
