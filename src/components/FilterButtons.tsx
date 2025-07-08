import React from 'react';
import { X } from 'lucide-react';
import { FilterType } from '../types/todo';

interface FilterButtonsProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  activeTodosCount: number;
  completedTodosCount: number;
  onClearCompleted: () => void;
}

export const FilterButtons: React.FC<FilterButtonsProps> = ({
  activeFilter,
  onFilterChange,
  activeTodosCount,
  completedTodosCount,
  onClearCompleted
}) => {
  const filters: { key: FilterType; label: string }[] = [
    { key: 'all', label: 'Все' },
    { key: 'active', label: 'Активные' },
    { key: 'completed', label: 'Завершённые' }
  ];

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6 p-4 bg-gray-50 rounded-lg">
      <div className="text-sm text-gray-600" data-testid="remaining-count">
        Осталось задач: <span className="font-semibold">{activeTodosCount}</span>
      </div>
      
      <div className="flex gap-1">
        {filters.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => onFilterChange(key)}
            className={`px-3 py-2 text-sm rounded-md transition-colors ${
              activeFilter === key
                ? 'bg-blue-500 text-white'
                : 'text-gray-600 hover:bg-gray-200'
            }`}
            data-testid={`filter-${key}`}
          >
            {label}
          </button>
        ))}
      </div>

      {completedTodosCount > 0 && (
        <button
          onClick={onClearCompleted}
          className="px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors flex items-center gap-1"
          data-testid="clear-completed"
        >
          <X size={16} />
          Очистить завершённые
        </button>
      )}
    </div>
  );
};
