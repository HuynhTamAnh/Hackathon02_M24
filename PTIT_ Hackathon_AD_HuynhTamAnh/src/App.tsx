import React, { useState, useEffect } from "react";
import {
  Card,
  Typography,
  Input,
  Button,
  Checkbox,
  List,
  Space,
  Modal,
  message,
} from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  Todo as ITodo,
  initialTodos,
} from "./PTIT_ Hackathon_AD_HuynhTamAnh/data";

const { Title } = Typography;

const App: React.FC = () => {
  const [todos, setTodos] = useState<ITodo[]>(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : initialTodos;
  });
  const [newTodo, setNewTodo] = useState("");
  const [editingTodo, setEditingTodo] = useState<ITodo | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (!newTodo.trim()) {
      setError("Tên công việc không được để trống");
      return;
    }
    if (
      todos.some(
        (todo) => todo.name.toLowerCase() === newTodo.trim().toLowerCase()
      )
    ) {
      setError("Tên công việc không được phép trùng");
      return;
    }
    const newTodoItem: ITodo = {
      id: Date.now(),
      name: newTodo.trim(),
      completed: false,
    };
    setTodos((prevTodos) => [...prevTodos, newTodoItem]);
    setNewTodo("");
    setError("");
  };

  const deleteTodo = (id: number) => {
    Modal.confirm({
      title: "Xác nhận xóa",
      content: "Bạn có chắc chắn muốn xóa công việc này?",
      onOk() {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
      },
    });
  };

  const editTodo = (todo: ITodo) => {
    setEditingTodo(todo);
    setNewTodo(todo.name);
  };

  const updateTodo = () => {
    if (!newTodo.trim()) {
      setError("Tên công việc không được để trống");
      return;
    }
    if (
      todos.some(
        (todo) =>
          todo.name.toLowerCase() === newTodo.trim().toLowerCase() &&
          todo.id !== editingTodo?.id
      )
    ) {
      setError("Tên công việc không được phép trùng");
      return;
    }
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === editingTodo?.id ? { ...todo, name: newTodo.trim() } : todo
      )
    );
    setNewTodo("");
    setEditingTodo(null);
    setError("");
  };

  const onCheckboxChange = (todoId: number) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
      )
    );
    checkAllCompleted();
  };

  const checkAllCompleted = () => {
    return todos.length > 0 && todos.every((todo) => todo.completed);
  };

  const completedTodosCount = todos.filter((todo) => todo.completed).length;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "white",
      }}
    >
      <Card style={{ width: 600, boxShadow: "0 0 10px rgba(0,0,0,0.1)" }}>
        <Title level={4} style={{ textAlign: "center" }}>
          Danh sách công việc
        </Title>
        <Space style={{ width: "100%", marginBottom: 16, gap: "8px" }}>
          <Input
            style={{ flex: 1, width: "475px" }}
            placeholder="Nhập tên công việc"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onPressEnter={editingTodo ? updateTodo : addTodo}
          />
          <Button type="primary" onClick={editingTodo ? updateTodo : addTodo}>
            {editingTodo ? "Cập nhật" : "Thêm"}
          </Button>
        </Space>
        {error && <div style={{ color: "red", marginBottom: 16 }}>{error}</div>}
        <List
          dataSource={todos}
          renderItem={(item) => (
            <List.Item>
              <Checkbox
                checked={item.completed}
                onChange={() => onCheckboxChange(item.id)}
              >
                <span
                  style={{
                    textDecoration: item.completed ? "line-through" : "none",
                    color: item.completed ? "#999" : "inherit",
                  }}
                >
                  {item.name}
                </span>
              </Checkbox>
              <Space>
                <EditOutlined
                  style={{ color: "#1890ff" }}
                  onClick={() => editTodo(item)}
                />
                <DeleteOutlined
                  style={{ color: "#ff4d4f" }}
                  onClick={() => deleteTodo(item.id)}
                />
              </Space>
            </List.Item>
          )}
        />
        <div style={{ marginTop: 16, textAlign: "center" }}>
          <span>
            Công việc đã hoàn thành: {completedTodosCount} / {todos.length}
            <br />
            {checkAllCompleted() && (
              <span style={{ color: "green" }}>Hoàn thành tất cả!</span>
            )}
          </span>
        </div>
      </Card>
    </div>
  );
};

export default App;
