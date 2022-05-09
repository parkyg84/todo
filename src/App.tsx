import React, { useRef, useCallback, useReducer } from 'react';
import './App.css';
import TodoTemplate from './components/TodoTemplate'
import TodoInsert from './components/TodoInsert'
import TodoList from './components/TodoList';

function createBulkTodos() {
  const array = [];
  for (let i = 1; i <= 1; i++) {
    array.push({
      id: i,
      text: `할 일 ${i}`,
      checked: false
    })
  }
  return array
}

function todoReducer(todos, action) {
  switch (action.type) {
    case 'INSERT':
      // {type:'INSERT',todo:{id:1,text:'todo',checked:false}}
      return todos.concat(action.todo)
    case 'REMOVE':
      // {type:'REMOVE',id:1}
      return todos.filter(todo => todo.id !== action.id)
    case 'TOGGLE':
      // {type:'TOGGLE',id:1}
      return todos.map(todo => todo.id === action.id ? { ...todo, checked: !todo.checked } : todo)
    default:
      return todos
  }
}

const App = () => {
  // 세번째에 함수를 넣어 처음에 렌더링 될 때만 함수가 호출 되도록 했다.
  const [todos, dispatch] = useReducer(todoReducer, undefined, createBulkTodos)

  // 고윳값으로 사용될 id
  // ref를 사용해 변수 담기
  const nextId = useRef(2501);

  const onInsert = useCallback(
      text => {
        const todo = {
          id: nextId.current,
          text,
          checked: false
        }

        dispatch({ type: 'INSERT', todo })
        nextId.current += 1
      }, [] // 이에따라 감시 안해도 된다.
  )

  const onRemove = useCallback(
      id => {
        dispatch({ type: 'REMOVE', id })
      }, []
  )

  const onToggle = useCallback(
      id => {
        dispatch({ type: 'TOGGLE', id })
      }, []
  )

  return (
      <div className="App">
          <TodoTemplate>
              <TodoInsert onInsert={onInsert} />
              <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
          </TodoTemplate>
      </div>
  );
}
export default App;
