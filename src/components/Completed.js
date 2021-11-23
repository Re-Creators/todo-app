import styled from "styled-components";
import { TransitionGroup, CSSTransition } from "react-transition-group";

function Completed({ deleteTodo, updateTodo, todos, clearTodos }) {
  return (
    <Container component="div">
      <TransitionGroup>
        {todos.map((todo) => (
          <CSSTransition
            key={todo.id}
            timeout={300}
            classNames="transition"
            unmountOnExit
          >
            <Todo>
              <label>
                <input
                  type="checkbox"
                  checked={todo.isCompleted}
                  onChange={() => updateTodo(todo.id)}
                />
                {todo.name}
              </label>
              <span
                className="material-icons"
                onClick={() => deleteTodo(todo.id)}
              >
                delete
              </span>
            </Todo>
          </CSSTransition>
        ))}
      </TransitionGroup>
      {todos.length > 0 && (
        <DeleteAll onClick={() => clearTodos()}>
          <span className="material-icons icon">delete</span>
          <span>Delete All</span>
        </DeleteAll>
      )}
    </Container>
  );
}

export default Completed;

const Container = styled.div`
  margin-top: 16px;

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
  display: flex;

  label {
    flex: 1;
    text-decoration: line-through;
    display: flex;
    align-items: center;

    input {
      width: 20px;
      height: 20px;
      margin-right: 10px;
    }
  }

  span {
    cursor: pointer;
    color: #bdbdbd;
  }
`;

const DeleteAll = styled.button`
  display: flex;
  align-items: center;
  padding: 10px 18px;
  background-color: #eb5757;
  border-radius: 4px;
  color: white;
  width: auto;
  cursor: pointer;
  border: none;
  margin-top: 37px;
  float: right;
`;
