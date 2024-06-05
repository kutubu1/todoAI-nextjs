"use client";
import React, { FC, useState } from 'react';
import { TodoItem } from './TodoItem';
import { nanoid } from 'nanoid';
import { Todo } from '../types/todo'; // Assuming the correct path for Todo type
import { useCopilotAction, useCopilotReadable } from '@copilotkit/react-core';

export const TodoList: FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState<string>('');
  useCopilotReadable({
    description: "The user's todo list.",
    value: todos,
  })

  useCopilotAction({
    name: "updateTodoList",
    description: "Update the users todo list",

    parameters: [
      {
        name: "items",
        type: "object[]",
        description: "The new and updated todo list items.",
        attributes: [
          {
            name: "id",
            type: "string",
            description: "The id of the todo item. when creating a new todo item, just make up a new id.",
          },
          {
            name: "text",
            type: "string",
            description: "The text of the todo item",
          },
          {
            name: "isCompleted",
            type: "boolean",
            description: "The completion status of the todo item.",
          },
          {
            name: 'assignedTo',
            type: "string",
            description: "The person assigned to the todo item. If you don't know, assign it to 'YOU' ",
            requred: true,
          },
        ],
      },
    ],

    handler: ({items}) => {
      console.log(items);

      const newTodos = [...todos];

      for (const item of items){
        const existingItemIndex = newTodos.findIndex(
          (todo) => todo.id === item.id
        );

        if (existingItemIndex !== -1) {
          newTodos[existingItemIndex] = item;
        }
        else{
          newTodos.push(item);
        }
      }

      setTodos(newTodos);
    },
    render: "Updating the todo list...",
  })

  useCopilotAction({
    name: "deleteTodo",
    description: "Delete a todo item",
    parameters: [
      {
       name: "id",
       type: "string",
       description: "The id of the todo item to delete.", 
      },
    ],

    handler: ({id}) => {
      setTodos(todos.filter((todo) => todo.id !== id));
    },

    render: "Deleting a todo item...",
  })

  const addTodo = () => {
    if (input.trim() !== '') {
      const newTodo: Todo = {
        id: nanoid(),
        text: input.trim(),
        isCompleted: false,
      };
      setTodos([...todos, newTodo]);
      setInput('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const assignPerson = (id: string, person: string | null) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, assignedTo: person ? person : undefined } : todo
      )
    );
  };

  return (
    <div>
      <div className="flex mb-4">
        <input
          className="border rounded-md p-2 flex-1 mr-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button className="bg-blue-500 rounded-md p-2 text-white" onClick={addTodo}>
          Add Todo
        </button>
      </div>

      {todos.length > 0 && (
        <div className="border rounded-lg">
          {todos.map((todo, index) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              deleteTodo={deleteTodo}
              assignPerson={assignPerson}
              hasBorder={index !== todos.length - 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};
