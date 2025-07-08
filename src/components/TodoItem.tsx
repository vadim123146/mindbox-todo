import React from 'react';
import { Check } from 'lucide-react';
import { Todo } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle }) => {
  return (
    <div
      className={`flex items-center gap-3 p-3 border rounded-lg transition-all ${
        todo.completed
          ? 'bg-gray-50 border-gray-200'
          : 'bg-white border-gray-300 hover:border-gray-400'
      }`}
      data-testid="todo-item"
    >
      <button
        onClick={() => onToggle(todo.id)}
        className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
          todo.completed
            ? 'bg-green-500 border-green-500 text-white'
            : 'border-gray-300 hover:border-green-400'
        }`}
        data-testid="toggle-button"
      >
        {todo.completed && <Check size={16} />}
      </button>
      <span
        className={`flex-1 transition-all ${
          todo.completed
            ? 'text-gray-500 line-through'
            : 'text-gray-900'
        }`}
      >
        {todo.text}
      </span>
    </div>
  );
};
