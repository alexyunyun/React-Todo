// your components will all go in this `component` directory.
// feel free to change this component.js into TodoList.js
import React from "react";
import Todo from './Todo'

function TodoList(props) {
    const completedTask = [];
    const unCompletedTask = [];

    function getRenderData(todoList) {
        todoList.forEach((todo) => {
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
    }

    if (props.filteredData.length === 0) {
        getRenderData(props.todoData);
    } else {
        getRenderData(props.filteredData);
    }

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
                <div>
                    {unCompletedTask}
                </div>
            </div>
            <div>
                <h3 className="completed-task-title">
                    已完成
                </h3>
                <div>
                    {completedTask}
                </div>
            </div>
        </div>
    )
}

export default TodoList