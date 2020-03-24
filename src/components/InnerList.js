import React, { Component } from 'react';
import Task from './task';

export default class InnnerList extends Component {
  shouldComponentUpdate(nextProps) {
    const { tasks } = this.props;
    if (nextProps.tasks === tasks) {
      return false;
    }
    return true;
  }

  render() {
    const { tasks } = this.props;
    return tasks.map((task, index) => (
      <Task key={task.id} task={task} index={index} />
    ));
  }
}
