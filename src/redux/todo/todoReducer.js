import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import todoActions from './todoActions';

const addTasks = (_, { payload }) => payload;
const addColumns = (_, { payload }) => payload;
const addColumnOrder = (_, { payload }) => [...payload];
const changeColumnOrder = (_, { payload }) => [...payload];
const changeTasksOrder = (_, { payload }) => payload;
const changeTasksColumnDirection = (_, { payload }) => payload;

const tasks = createReducer(
  {},
  {
    [todoActions.makeTodosTasks]: addTasks,
  },
);

const columns = createReducer(
  {},
  {
    [todoActions.makeTodosColumns]: addColumns,
    [todoActions.changeTasksOrder]: changeTasksOrder,
    [todoActions.changeTasksColumnDirection]: changeTasksColumnDirection,
  },
);

const columnOrder = createReducer([], {
  [todoActions.makeTodosColumnOrder]: addColumnOrder,
  [todoActions.changeColumnOrder]: changeColumnOrder,
});

const todoReducer = combineReducers({
  tasks,
  columns,
  columnOrder,
});

export default todoReducer;
