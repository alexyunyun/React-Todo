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
    const [todoData, setTodoData] = useState([])

    function handleAddTodo(todo) {
        const newTodoData = todoData.slice();
        newTodoData.push({
            task:todo,
            id:Date.now(),
            completed: false
        })
        setTodoData(newTodoData);
    }

    function handleStatusChange(newTodo) {
        const newTodoData = todoData.slice();
        newTodoData.forEach(todo => {
            if (newTodo.id === todo.id) {
                todo.completed = newTodo.completed;
            }
        })
        setTodoData(newTodoData)
    }

    function handleDeleteItem(id) {
        const currentTodo = todoData.slice();
        const newTodoData = currentTodo.filter((todo) => {
            return todo.id !== id
        });
        setTodoData(newTodoData);
    }

    return (
        <div className="todo-app-container">
            <h2>Welcome to your {"Todo"} App!</h2>
            <TodoForm onAddTodo={handleAddTodo}/>
            <TodoList
                onStatusChange={handleStatusChange}
                onDeleteItem={handleDeleteItem}
                todoData={todoData}
            />
        </div>
    );
}

export default App;
