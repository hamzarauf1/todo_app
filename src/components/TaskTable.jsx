import React from "react";
import { Row, Col } from "antd";
import DraggableCard from "./DraggableCard";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const TaskTable = ({
  tasks,
  setTasks,
  handleEditTask,
  handleDeleteTask,
  handleStatusChange,
  editingIndex,
}) => {
  const moveCard = (dragIndex, hoverIndex) => {
    const draggedTask = tasks[dragIndex];

    const updatedTasks = [...tasks];
    updatedTasks.splice(dragIndex, 1);
    updatedTasks.splice(hoverIndex, 0, draggedTask);
    setTasks(updatedTasks);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Row gutter={16}>
        {tasks.map((task, index) => (
          <Col span={8} key={index}>
            <DraggableCard
              task={task}
              index={index}
              handleEditTask={handleEditTask}
              handleDeleteTask={handleDeleteTask}
              handleStatusChange={handleStatusChange}
              editingIndex={editingIndex}
              moveCard={moveCard}
            />
          </Col>
        ))}
      </Row>
    </DndProvider>
  );
};

export default TaskTable;
