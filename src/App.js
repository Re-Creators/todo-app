import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";
import "./App.css";
import Active from "./components/Active";
import All from "./components/All";
import Completed from "./components/Completed";

function App() {
  const [activeTab, setActiveTab] = useState(1);
  const [todos, setTodos] = useState(() => {
    // getting stored value
    const saved = localStorage.getItem("todos");
    const initialValue = JSON.parse(saved);
    return initialValue || [];
  });

  function updateTodo(id) {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          todo.isCompleted = !todo.isCompleted;
        }

        return todo;
      })
    );
  }

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  function addTodo(name) {
    let newTodo = {
      id: uuidv4(),
      name: name,
      isCompleted: false,
    };
    setTodos([...todos, newTodo]);
  }

  function deleteTodo(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  function clearTodos() {
    setTodos(todos.filter((todo) => !todo.isCompleted));
  }

  return (
    <div className="App">
      <Container>
        <h2>#todo</h2>
        <Tabs>
          <Tab onClick={() => setActiveTab(1)}>All</Tab>
          <Tab onClick={() => setActiveTab(2)}>Active</Tab>
          <Tab onClick={() => setActiveTab(3)}>Completed</Tab>
          <Indicator active={activeTab}>
            <div></div>
          </Indicator>
        </Tabs>
        <TabsPanel>
          {activeTab === 1 && (
            <All todos={todos} updateTodo={updateTodo} addTodo={addTodo} />
          )}
          {activeTab === 2 && (
            <Active
              todos={todos.filter((todo) => !todo.isCompleted)}
              updateTodo={updateTodo}
              addTodo={addTodo}
            />
          )}
          {activeTab === 3 && (
            <Completed
              todos={todos.filter((todo) => todo.isCompleted)}
              deleteTodo={deleteTodo}
              updateTodo={updateTodo}
              clearTodos={clearTodos}
            />
          )}
        </TabsPanel>
      </Container>
      <Footer>
        created by <span>Re-Creators</span> - devChallenges.io
      </Footer>
    </div>
  );
}

export default App;
const Container = styled.div`
  width: 40%;
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;

  @media (max-width: 996px) {
    width: 80%;
  }

  h2 {
    text-align: center;
    font-family: "Raleway", sans-serif;
    font-size: 36px;
  }
`;

const Tabs = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  margin-top: 28px;

  &::after {
    content: "";
    position: absolute;
    left: 0px;
    right: 0px;
    height: 2px;
    background-color: #bdbdbd;
    bottom: 0;
  }
`;

const Tab = styled.div`
  text-align: center;
  position: relative;
  padding-bottom: 14px;
  cursor: pointer;
  width: 100%;
  font-weight: 600;
`;

const Indicator = styled.div`
  position: absolute;
  transition: left 0.3s ease-out;
  left: calc(100% / 3 * ${(props) => props.active - 1});
  width: calc(100% / 3);
  bottom: 0;
  display: flex;
  justify-content: center;

  div {
    width: 40%;
    height: 5px;
    background-color: blue;
    border-radius: 4px 4px 0px 0px;
  }
`;

const TabsPanel = styled.div`
  margin-top: 18px;
  width: 100%;
`;

const Footer = styled.footer`
  margin: 24px 0px;
  text-align: center;
  color: #828282;
  span {
    font-weight: bold;
    text-decoration: underline;
  }

  position: absolute;
  bottom: 0;
`;
