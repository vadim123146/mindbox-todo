import React, { useState, useMemo } from 'react';
import { TodoInput } from './TodoInput';
import { TodoItem } from './TodoItem';
import { FilterButtons } from './FilterButtons';
import { useTodos } from '../hooks/useTodos';
import { FilterType } from '../types/todo';

export const TodoApp: React.FC = () => {
  const { todos, addTodo, toggleTodo, clearCompleted } = useTodos();
  const [filter, setFilter] = useState<FilterType>('all');

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case 'active':
        return todos.filter(todo => !todo.completed);
      case 'completed':
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  const activeTodosCount = useMemo(
    () => todos.filter(todo => !todo.completed).length,
    [todos]
  );

  const completedTodosCount = useMemo(
    () => todos.filter(todo => todo.completed).length,
    [todos]
  );

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            ToDo App
          </h1>
          <p className="text-gray-600">
            Управляйте своими задачами эффективно
          </p>
        </header>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <TodoInput onAdd={addTodo} />

          <div className="space-y-2" data-testid="todo-list">
            {filteredTodos.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                {filter === 'all' && 'Нет задач. Добавьте первую!'}
                {filter === 'active' && 'Нет активных задач'}
                {filter === 'completed' && 'Нет завершённых задач'}
              </div>
            ) : (
              filteredTodos.map(todo => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={toggleTodo}
                />
              ))
            )}
          </div>

          {todos.length > 0 && (
            <FilterButtons
              activeFilter={filter}
              onFilterChange={setFilter}
              activeTodosCount={activeTodosCount}
              completedTodosCount={completedTodosCount}
              onClearCompleted={clearCompleted}
            />
          )}
        </div>

        <footer className="text-center mt-8 text-gray-500 text-sm">
          Mindbox Frontend Intern Test Assignment
        </footer>
      </div>
    </div>
  );
};
