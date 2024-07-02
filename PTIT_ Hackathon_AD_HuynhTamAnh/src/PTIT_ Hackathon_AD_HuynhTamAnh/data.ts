export interface Todo {
  id: number;
  name: string;
  completed: boolean;
}

export const initialTodos: Todo[] = [
  { id: 1, name: "Learn ReactJS basics", completed: true },
  { id: 2, name: "Practice ReactJS", completed: false },
  { id: 3, name: "Learn Redux", completed: false },
  { id: 4, name: "Code portfolio in React", completed: false },
  { id: 5, name: "Learn React Native", completed: false },
];
