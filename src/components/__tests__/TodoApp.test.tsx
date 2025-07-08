import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TodoApp } from '../TodoApp';

test('добавление новой задачи', async () => {
  const user = userEvent.setup();
  render(<TodoApp />);
  
  const input = screen.getByTestId('todo-input');
  const addButton = screen.getByTestId('add-button');
  
  await user.type(input, 'Новая задача');
  await user.click(addButton);
  
  expect(screen.getByText('Новая задача')).toBeInTheDocument();
});

test('переключение статуса задачи', async () => {
  const user = userEvent.setup();
  render(<TodoApp />);
  
  // Добавляем задачу
  const input = screen.getByTestId('todo-input');
  await user.type(input, 'Тестовая задача');
  await user.click(screen.getByTestId('add-button'));
  
  // Переключаем статус
  const toggleButton = screen.getByTestId('toggle-button');
  await user.click(toggleButton);
  
  expect(screen.getByText('Тестовая задача')).toHaveClass('line-through');
});

test('фильтрация задач', async () => {
  const user = userEvent.setup();
  render(<TodoApp />);
  
  // Добавляем задачи
  const input = screen.getByTestId('todo-input');
  await user.type(input, 'Активная задача');
  await user.click(screen.getByTestId('add-button'));
  
  await user.type(input, 'Завершённая задача');
  await user.click(screen.getByTestId('add-button'));
  
  // Завершаем вторую задачу
  const toggleButtons = screen.getAllByTestId('toggle-button');
  await user.click(toggleButtons[1]);
  
  // Фильтруем активные
  await user.click(screen.getByTestId('filter-active'));
  
  expect(screen.getByText('Активная задача')).toBeInTheDocument();
  expect(screen.queryByText('Завершённая задача')).not.toBeInTheDocument();
});
