// your components will all go in this `component` directory.
// feel free to change this component.js into TodoList.js
import React from "react";
import Todo from './Todo'

function TodoList(props) {
    const completedTask = [];
    const unCompletedTask = [];
    props.todoData.forEach((todo) => {
        if (todo.completed) {
            completedTask.push(
                <Todo
                    key={todo.id}
                    todo={todo}
                    onStatusChange={onStatusChange.bind(this)}
                    onDeleteItem={onDeleteItem.bind(this)}
                />
            );
        } else {
            unCompletedTask.push(
                <Todo
                    key={todo.id}
                    todo={todo}
                    onStatusChange={onStatusChange.bind(this)}
                    onDeleteItem={onDeleteItem.bind(this)}
                />
            );
        }
    })

    function onStatusChange(newTodo) {
        props.onStatusChange(newTodo);
    }

    function onDeleteItem(id) {
        props.onDeleteItem(id);
    }

    return (
        <div>
            <div>
                <h3 className="uncompleted-task-title">
                    待办
                </h3>
                {unCompletedTask}
            </div>
            <div>
                <h3 className="completed-task-title">
                    已完成
                </h3>
                {completedTask}
            </div>

        </div>
    )
}

export default TodoList