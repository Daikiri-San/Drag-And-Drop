import React, { Component } from 'react';
import Column from './column';

export default class InnerListFroApp extends Component {
  shouldComponentUpdate(nextProps) {
    const { column, taskMap, index } = this.props;
    if (
      nextProps.column === column &&
      nextProps.taskMap === taskMap &&
      nextProps.index === index
    ) {
      return false;
    }
    return true;
  }
  render() {
    const { column, taskMap, index } = this.props;
    const tasks = column.taskIds.map(taskId => taskMap[taskId]);
    return <Column column={column} tasks={tasks} index={index} />;
  }
}
