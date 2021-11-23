import styled from "styled-components";
import Todos from "./Todos";
import { useState } from "react";

function All({ todos, updateTodo, addTodo }) {
  const [name, setName] = useState("");

  function sumbitTodo() {
    setName("");
    addTodo(name);
  }

  function onKeyEnter(e) {
    if (e.key === "Enter") {
      sumbitTodo();
    }
  }
  return (
    <StyledContainer>
      <StyledInputContainer>
        <input
          type="text"
          placeholder="Add guest"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={onKeyEnter}
        />
        <button onClick={sumbitTodo}>Add</button>
      </StyledInputContainer>
      <Todos todos={todos} updateTodo={updateTodo} />
    </StyledContainer>
  );
}

export default All;

const StyledContainer = styled.div``;

const StyledInputContainer = styled.div`
  display: flex;
  justify-content: space-between;

  input {
    width: 75%;
    padding: 14px 12px;
    outline: none;
    border: 1px solid #bdbdbd;
    border-radius: 12px;

    @media (max-width: 768px) {
      width: 65%;
    }
  }

  button {
    background-color: #2f80ed;
    padding: 14px 40px;
    border: none;
    color: white;
    border-radius: 12px;
    cursor: pointer;

    @media (max-width: 768px) {
      padding: 14px 24px;
    }

    &:active {
      transform: translateY(1px);
    }
  }
`;
