import React, { Component } from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

const Container = styled.div`
  border: 0.2rem solid tomato;
  border-radius: 1rem;
  padding: 1rem;
  background-color: ${props => (props.isDragging ? '#b50000' : '#333333')};
  margin-bottom: 1rem;
`;

export default class Task extends Component {
  render() {
    const { task, index } = this.props;
    return (
      <Draggable draggableId={task.id} index={index}>
        {(provided, snapshot) => (
          <Container
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
            aria-roledescription="Press space bar to lift the task"
          >
            {task.content}
          </Container>
        )}
      </Draggable>
    );
  }
}
