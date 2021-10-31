import React from "react";
import TodoList from "./Todo/TodoList";
import Context from "./context";

function App() {
  const [todos, setTodos] = React.useState([                /*Первый элемент - state, второй - функция которая может менять state*/
    {id: 1, completed: false, title: "Купить хлеб"},
    {id: 2, completed: false, title: "Купить молоко"},
    {id: 3, completed: false, title: "Купить масло"}
  ])
  

  function toggleTodo(id) {
    setTodos(
      todos.map(todo => {                                 /*Переопределяем массив. На каждой итеррации принимаем объект todo*/
        if (todo.id===id) {                               /*Если id элемента массива равно id пришедшему на счетчик toggleTodo*/
          todo.completed = !todo.completed    
        }
      return todo
    })
    )
  }

  function removeTodo(id) {
    setTodos(todos.filter(todo => todo.id !== id))        /*на каждой итеррации получаем todo, сравниваем его id с входящим.*/
  }                                                       /*Если id не совпадает - оставляем его в массиве*/

  return (
    <Context.Provider value = {{removeTodo}}>             {/*первые скобки - js, вторые - объект*/}
      <div className="wrapper">
        <h1>React tutorial</h1>
        <TodoList todos={todos} onToggle={toggleTodo}/>
      </div>
    </Context.Provider>
  );
}

export default App;
