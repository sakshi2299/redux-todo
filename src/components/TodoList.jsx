import React, { useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { addTodo } from '../actioncreators/actioncreators';
import { deleteTodo } from '../actioncreators/actioncreators';
import { toggleTodo } from '../actioncreators/actioncreators';
const TodoListWrapper = styled.div`
  padding: 15px;
  background-color: #efefef;
  color: #000000;
  height: 100vh;
`;

const TodoListHeading = styled.h1`
  color: #ff0000;
  margin: 0px 0px 15px 0px;
  font-size: 20px;
`;

const TodoInput = styled.input`
  padding: 5px 15px;
  height: 40px;
  border-radius: 8px;
  border: 1px solid #eee;
  width: 100%;
  margin-bottom: 20px;
`;

const TodoListItems = styled.div`
  background-color: #ffffff;
  padding: 5px 15px;
`;

const ListItem = styled.div`
  padding: 10px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const DeleteButton = styled.button`
  background-color: #ff0000;
  color: #ffffff;
  border: none;
  border-radius: 100%;
  width: 25px;
  height: 25px;
  cursor: pointer;
`;

const DoneButton = styled.button`
  background-color: #00ff00;
  color: #000000;
  border: none;
  border-radius: 100%;
  width: 25px;
  height: 25px;
  margin-right: 5px;
  cursor: pointer;
`;

const AddButton = styled.button`
  background-color: #007bff;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
`;

const HeadingRenderer = ({ title, count }) => (
  <TodoListHeading>
    {title} <span>({count})</span>
  </TodoListHeading>
);

const ListingRenderer = ({ items, onDelete, onToggleDone }) => (
  <TodoListItems>
    {items.map((item) => (
      <ListItem key={item.id}>
        {item.done ? <del>{item.title}</del> : <span>{item.title}</span>}
        <span>
          <DoneButton onClick={() => onToggleDone(item.id)}>
            {item.done ? '☑' : '☐'}
          </DoneButton>
          <DeleteButton onClick={() => onDelete(item.id)}>&times;</DeleteButton>
        </span>
      </ListItem>
    ))}
  </TodoListItems>
);

const TodoList = ({ todos, addTodo, deleteTodo, toggleTodo }) => {
  const [newItem, setNewItem] = useState('');

  const handleAddItem = () => {
    if (newItem.trim() !== '') {
      const newTodo = {
        id: Date.now(),
        title: newItem,
        done: false,
      };

      addTodo(newTodo);
      setNewItem('');
    }
  };

  const handleDeleteItem = (id) => {
    deleteTodo(id);
  };

  const handleToggleDone = (id) => {
    toggleTodo(id);
  };

  return (
    <TodoListWrapper>
      <HeadingRenderer title="My Todo List" count={todos.length} />
      <TodoInput
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
        placeholder="Add new item"
      />
      <AddButton onClick={handleAddItem}>Add</AddButton>
      <ListingRenderer items={todos} onDelete={handleDeleteItem} onToggleDone={handleToggleDone} />
    </TodoListWrapper>
  );
};

const mapStateToProps = (state) => ({
  todos: state.todos,
});

const mapDispatchToProps = {
  addTodo,
  deleteTodo,
  toggleTodo,
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
