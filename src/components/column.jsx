import React, { Component } from 'react';
import styled from 'styled-components';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import InnerList from './InnerList';

const Container = styled.div`
  margin: 1rem;
  border: 0.2rem solid tomato;
  border-radius: 0.5rem;
  background-color: #333333;

  display: flex;
  flex-direction: column;
`;

const Title = styled.h3`
  text-align: center;
  font-size: 3rem;
  font-weight: 500;
  padding: 1rem;
`;

const TaskList = styled.div`
  font-size: 2rem;
  padding: 1rem;
  background-color: ${props => (props.isDraggingOver ? '#ff0022' : 'inherit')};
  transition: background-color 0.2s ease;
  flex-grow: 1;
  min-width: 28rem;
  min-height: 12rem;
`;

export default class Column extends Component {
  render() {
    const { column, tasks, index } = this.props;
    return (
      <Draggable draggableId={column.id} index={index}>
        {({ draggableProps, dragHandleProps, innerRef }) => (
          <Container {...draggableProps} ref={innerRef}>
            <Title {...dragHandleProps}>{column.title}</Title>
            <Droppable droppableId={column.id} type="task">
              {(provided, snapshot) => (
                <TaskList
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  isDraggingOver={snapshot.isDraggingOver}
                >
                  <InnerList tasks={tasks} />
                  {provided.placeholder}
                </TaskList>
              )}
            </Droppable>
          </Container>
        )}
      </Draggable>
    );
  }
}
