import { createAction } from '@reduxjs/toolkit';

const makeTodosTasks = createAction('todo/addTasks');
const makeTodosColumns = createAction('todo/addColumns');
const makeTodosColumnOrder = createAction('todo/addColumnOrder');

const changeTasksOrder = createAction('todo/changeTaskOrder');
const changeColumnOrder = createAction('todo/changeColumnOrder');
const changeTasksColumnDirection = createAction(
  'todo/changeTasksColumnDirection',
);

export default {
  makeTodosTasks,
  makeTodosColumns,
  makeTodosColumnOrder,
  changeTasksOrder,
  changeColumnOrder,
  changeTasksColumnDirection,
};
