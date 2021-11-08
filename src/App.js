import React, {useEffect} from "react";
import TodoList from "./Todo/TodoList";
import Context from "./context";
import Loader from "./Loader";
import Modal from "./Modal/Modal";

const AddTodo = React.lazy( ()=> import('./Todo/AddTodo') )

function App() {
  const [todos, setTodos] = React.useState([])                /*Первый элемент - state, второй - функция которая может менять state*/
  const [loading, setLoading] = React.useState(true)

  useEffect(()=>{
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
      .then(response => response.json())
      .then(todos => {
        setTimeout(()=> {
          setTodos(todos)
          setLoading(false)
        }, 2000)
      })
  }, [])
  

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

  
  function addTodo(title) {
    setTodos(
      todos.concat([
        {
        title: title,
        id: Date.now(),
        completed: false
        }
      ])
    )
  }

  return (
    <Context.Provider value = {{removeTodo : removeTodo}}>             {/*первые скобки - js, вторые - объект*/}
      <div className="wrapper">
        <h1>React tutorial</h1>
        <Modal />
        <React.Suspense fallback = {<p>Loading....</p>}>
          <AddTodo onCreate={addTodo}/>
        </React.Suspense>
        

        {loading && <Loader />}

        {todos.length ? (                                       /*Если длина массива не равна 0, выводим TodoList, иначе параграф No todos*/
          <TodoList todos={todos} onToggle={toggleTodo}/>
        ) : (
          loading ? null : 
            (<p>No todos!</p>)
        )}
        
      </div>
    </Context.Provider>
  );
}

export default App;
