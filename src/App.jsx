import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar';
import { v4 as uuidv4 } from 'uuid';

const App = () => {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([]);
  const [showFininshed, setShowFininshed] = useState(true)

useEffect(() => {
  let todoString = localStorage.getItem("todos")
  if(todoString){
    let todos = JSON.parse(localStorage.getItem("todos"))
    setTodos(todos)
  }

}, [])


const toggleFinished = (e) => {
setShowFininshed(!showFininshed)
}

  const saveToLocal = () => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

 const handleChange = (e) => {
  setTodo(e.target.value)
 }

const handleAdd = () => {
  setTodos([...todos, {id:uuidv4(), todo, iscompleted: false}]);
  setTodo("")
  saveToLocal()
}
const handleEdit = (e, id) => {
  let t = todos.filter(i =>i.id === id)
  setTodo(t[0].todo)
  let newTodos = todos.filter(item => {
    return item.id!==id
  });
  setTodos(newTodos)
  saveToLocal()
}

const handleDelete = (e, id) => {
  let index = todos.findIndex(item => {
    return item.id === id;
  })
  let newTodos = todos.filter(item => {
    return item.id!==id
  });
  setTodos(newTodos)
}

const handleCheckbox = (e) => {
let id = e.target.name;
let index = todos.findIndex(item => {
  return item.id = id;
})
let newTodos = [...todos];
newTodos[index].iscompleted = !newTodos[index].iscompleted;
setTodos(newTodos)
saveToLocal()
}


  return (
    <div>
      <Navbar />
      <div className=" mx-auto md:mx-10 px-4 py-6 rounded-xl p-4 md:p-5 bg-violet-100 min-h-[80vw]">
      <div className="addTodo mb-4 ">
    <h2 className='text-lg md:text-xl font-bold'>Add a Todo</h2>
    <input type="text" className='w-2/4' value={todo} onChange={handleChange} />
    <button onClick={handleAdd} disabled={todo.length <3} className='bg-violet-800 hover:bg-violet-950 text-white px-3 py-1 rounded-md mx-5 text-sm font-bold '>Save</button>
  </div>
  <input onChange={toggleFinished} type="checkbox" checked={showFininshed}/> Show Finished
  <h2 className='text-lg font-bold mb-3'>Your Todos</h2>
  
  <div className="todos">
    {todos.length === 0 && <div>Nothing to display</div>}
    {todos.map(item => {
    return <div key={item.id} className="todo flex py-2 justify-between w-[80%] ">
      <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.iscompleted} id="" />
<div className={item.iscompleted ? "line-through" : ""}>{item.todo}</div>
<div className="buttons flex">
  <button onClick={(e) => handleEdit(e, item.id)} className='bg-violet-800 hover:bg-violet-950 px-2 py-1 text-white text-sm font-bold rounded-md mx-2'>Edit</button>
  <button onClick={(e) => handleDelete(e, item.id)} className='bg-violet-800 hover:bg-violet-950 px-2 py-1 mx-1 text-white font-bold text-sm rounded-md'>Delete</button>
</div>
    </div>
    })}
  </div>
      </div>
    </div>
  )
}

export default App
