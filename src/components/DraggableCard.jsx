import React from "react";
import { Card, Button, Select, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { ItemTypes } from "./ItemTypes";
import { useDrag, useDrop } from "react-dnd";

const { Option } = Select;

const DraggableCard = ({
  task,
  index,
  handleEditTask,
  handleDeleteTask,
  handleStatusChange,
  editingIndex,
  moveCard,
}) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.CARD,
    item: { index },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const [, drop] = useDrop({
    accept: ItemTypes.CARD,
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveCard(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <div
      ref={(node) => drag(drop(node))}
      style={{
        opacity: isDragging ? 0.5 : 1,
        fontSize: 25,
        cursor: "move",
      }}
    >
      <Card
        style={{
          height: "240px",
          overflow: "hidden",
          marginTop: 8,
          marginBottom: 8,
        }}
        actions={[
          <Button
            type="link"
            onClick={() => handleEditTask(index)}
            icon={<EditOutlined />}
          >
            Edit
          </Button>,
          <Popconfirm
            title="Are you sure you want to delete this task?"
            onConfirm={() => handleDeleteTask(index)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" icon={<DeleteOutlined />} danger>
              Delete
            </Button>
          </Popconfirm>,
        ]}
      >
        <div>
          <strong>{task.title}</strong>
          {task.description && (
            <p style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
              {task.description}
            </p>
          )}
          <p>Priority: {task.priority}</p>
          {editingIndex === null && (
            <Select
              style={{ width: 120, marginRight: 8 }}
              defaultValue="todo"
              value={task.status}
              onChange={(value) => handleStatusChange(index, value)}
            >
              <Option value="todo">Todo</Option>
              <Option value="inprogress">In Progress</Option>
              <Option value="done">Done</Option>
            </Select>
          )}
        </div>
      </Card>
    </div>
  );
};

export default DraggableCard;
