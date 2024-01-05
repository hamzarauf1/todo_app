import React, { useState, useEffect } from "react";
import { Card, Input, Button, Select, message, Form } from "antd";
import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import { useForm } from "antd/lib/form/Form";
import TextArea from "antd/es/input/TextArea";
import TaskTable from "./TaskTable";
import { v4 as uuidv4 } from "uuid";

const { Option } = Select;

const layout = {
  labelCol: {
    flex: "110px",
  },
  wrapperCol: {
    flex: 1,
  },
};

const TaskForm = () => {
  const [form] = useForm();
  // const [tasks, setTasks] = useState(() => {
  //   const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  //   return storedTasks;
  // });

  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const saveTasksToLocalStorage = (updatedTasks) => {
    const index = uuidv4();
    updatedTasks[index] = updatedTasks;
    console.log(index);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const handleAddTask = () => {
    const { title, description, priority, status } = form.getFieldsValue();

    if (title.trim() === "") {
      message.error("Title cannot be empty");
      return;
    }

    const newTaskItem = {
      title,
      description,
      priority,
      status,
    };

    if (editingIndex !== null) {
      const updatedTasks = [...tasks];
      updatedTasks[editingIndex] = newTaskItem;
      setTasks(updatedTasks);
      setEditingIndex(null);
      saveTasksToLocalStorage(updatedTasks);
      message.success("Task updated successfully");
      form.resetFields();
    } else {
      const updatedTasks = [...tasks, newTaskItem];
      setTasks(updatedTasks);
      saveTasksToLocalStorage(updatedTasks);
      message.success("Task added successfully");
      form.resetFields();
    }
  };

  const handleEditTask = (index) => {
    const taskToEdit = tasks[index];
    form.setFieldsValue({
      title: taskToEdit.title,
      description: taskToEdit.description || "",
      priority: taskToEdit.priority || "low",
      status: taskToEdit.status || "todo",
    });
    setEditingIndex(index);
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    setEditingIndex(null);
    saveTasksToLocalStorage(updatedTasks);
    message.success("Task deleted successfully");
  };

  const handleStatusChange = (index, status) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].status = status;
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
  };

  return (
    <>
      <Card>
        <Form
          {...layout}
          form={form}
          name="wrap"
          onFinish={handleAddTask}
          colon={false}
          style={{
            maxWidth: "auto",
          }}
        >
          <Form.Item
            name="title"
            label="Title"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input size="large" placeholder="Title" />
          </Form.Item>

          <Form.Item name="description" label="Description">
            <TextArea
              style={{ width: "100%", marginTop: 10 }}
              rows={4}
              placeholder="Description (optional)"
            />
          </Form.Item>

          <Form.Item name="priority" label="Priority">
            <Select
              size="large"
              style={{ width: "100%", marginTop: 10 }}
              placeholder="Priority"
              defaultValue="Low"
            >
              <Option value="Low">Low</Option>
              <Option value="Medium">Medium</Option>
              <Option value="High">High</Option>
            </Select>
          </Form.Item>

          <Form.Item style={{ marginTop: 10, marginLeft: "110px" }}>
            <Button
              type="primary"
              htmlType="submit"
              icon={editingIndex !== null ? <EditOutlined /> : <PlusOutlined />}
            >
              {editingIndex !== null ? "Update Task" : "Add Task"}
            </Button>
          </Form.Item>
        </Form>
      </Card>

      <div>
        <TaskTable
          tasks={tasks}
          setTasks={setTasks}
          handleEditTask={handleEditTask}
          handleDeleteTask={handleDeleteTask}
          handleStatusChange={handleStatusChange}
          editingIndex={editingIndex}
        />
      </div>
    </>
  );
};

export default TaskForm;
