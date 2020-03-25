import React, { Component } from 'react';
import styled from 'styled-components';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { connect } from 'react-redux';
import todoActions from '../redux/todo/todoActions';
import InnerListFroApp from './InnerListForApp';
import '../base.css';

const Container = styled.div`
  margin: 0 auto;
  padding-top: 3rem;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const DEFAULT_TASKS = {
  'task-1': { id: 'task-1', content: 'Take out the garbage' },
  'task-2': { id: 'task-2', content: 'Watch my favorite show' },
  'task-3': { id: 'task-3', content: 'Charge my phone' },
  'task-4': { id: 'task-4', content: 'Cook dinner' },
};

const DEFAULT_COLUMNS = {
  'column-1': {
    id: 'column-1',
    title: 'To do',
    taskIds: ['task-1', 'task-2', 'task-3', 'task-4'],
  },
  'column-2': {
    id: 'column-2',
    title: 'In progress',
    taskIds: [],
  },
  'column-3': {
    id: 'column-3',
    title: 'Done',
    taskIds: [],
  },
};

const DEFAULT_COLUMN_ORDER = ['column-1', 'column-2', 'column-3'];

class App extends Component {
  componentDidMount() {
    const {
      makeTodosTasks,
      makeTodosColumns,
      makeTodosColumnOrder,
    } = this.props;
    makeTodosTasks(DEFAULT_TASKS);
    makeTodosColumns(DEFAULT_COLUMNS);
    makeTodosColumnOrder(DEFAULT_COLUMN_ORDER);
  }

  onDragStart = (start, provided) => {
    provided.announce(
      `You have lifted the task in position ${start.source.index + 1}`,
    );
  };

  onDragUpdate = (update, provided) => {
    const message = update.destination
      ? `You have moved the task to position ${update.source.index + 1}`
      : 'You are currently noy over a droppable area';

    provided.announce(message);
  };

  onDragEnd = (result, provided) => {
    const message = result.destination
      ? `You have moved the task from position ${result.source.index +
          1} to ${result.destination.index + 1}`
      : `The task has been returned to its starting position of ${result.source
          .index + 1}`;

    provided.announce(message);

    const { destination, source, draggableId, type } = result;
    const {
      columns,
      columnOrder,
      changeColumnOrder,
      changeTasksOrder,
      changeTasksColumnDirection,
    } = this.props;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === 'column') {
      const newColumnOrder = [...columnOrder];
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      changeColumnOrder(newColumnOrder);
      return;
    }

    const start = columns[source.droppableId];
    const finish = columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = [...start.taskIds];
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };

      const NewAsignColums = {
        ...columns,
        [newColumn.id]: newColumn,
      };

      changeTasksOrder(NewAsignColums);
      return;
    }

    const startTaskIds = [...start.taskIds];
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTaskIds = [...finish.taskIds];
    finishTaskIds.splice(destination.index, 0, draggableId);

    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    const NewAsignColums = {
      ...columns,
      [newStart.id]: newStart,
      [newFinish.id]: newFinish,
    };

    changeTasksColumnDirection(NewAsignColums);
  };

  render() {
    const { columns, columnOrder, tasks } = this.props;
    return (
      <DragDropContext
        key={'DND-context'}
        onDragEnd={this.onDragEnd}
        onDragStart={this.onDragStart}
        onDragUpdate={this.onDragUpdate}
      >
        <Droppable
          droppableId="all-columns"
          direction="horizontal"
          type="column"
        >
          {provided => (
            <Container {...provided.droppableProps} ref={provided.innerRef}>
              {columnOrder.map((columnId, index) => {
                const column = columns[columnId];
                return (
                  <InnerListFroApp
                    key={column.id}
                    column={column}
                    taskMap={tasks}
                    index={index}
                  />
                );
              })}
              {provided.placeholder}
            </Container>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}

const mapStateToProps = ({ todo }) => {
  return {
    tasks: todo.tasks,
    columns: todo.columns,
    columnOrder: todo.columnOrder,
  };
};

const mapDispatchToProps = {
  makeTodosTasks: todoActions.makeTodosTasks,
  makeTodosColumns: todoActions.makeTodosColumns,
  makeTodosColumnOrder: todoActions.makeTodosColumnOrder,
  changeColumnOrder: todoActions.changeColumnOrder,
  changeTasksOrder: todoActions.changeTasksOrder,
  changeTasksColumnDirection: todoActions.changeTasksColumnDirection,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
