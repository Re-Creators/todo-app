import styled from "styled-components";
import { TransitionGroup, CSSTransition } from "react-transition-group";

function Todos({ todos, updateTodo }) {
  return (
    <TransitionGroup component={Container}>
      {todos.map((todo) => (
        <CSSTransition key={todo.id} timeout={300} classNames="transition">
          <Todo key={todo.id} isCompleted={todo.isCompleted}>
            <label>
              <input
                type="checkbox"
                checked={todo.isCompleted}
                onChange={() => updateTodo(todo.id)}
              />
              {todo.name}
            </label>
          </Todo>
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
}

export default Todos;

const Container = styled.div`
  margin-top: 16px;

  .transition-enter {
    opacity: 0;
    transform: translate(0, -10px);
  }

  .transition-enter-active {
    opacity: 1;
    transform: translate(0, 0);
    transition: all 300ms ease-in;
  }

  .transition-exit {
    opacity: 1;
    transform: translate(0, 0);
  }

  .transition-exit-active {
    opacity: 0;
    transform: translate(-100px, 0);
    transition: all 300ms ease-in;
  }
`;

const Todo = styled.div`
  margin-bottom: 10px;

  input {
    width: 20px;
    height: 20px;
    margin-right: 10px;
  }

  label {
    display: flex;
    align-items: center;
    text-decoration: ${(props) =>
      props.isCompleted ? "line-through" : "none"};
  }
`;
