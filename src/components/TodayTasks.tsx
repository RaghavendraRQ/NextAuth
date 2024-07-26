'use client';
import React from "react";
import { useQuery } from "@tanstack/react-query";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import { getTodos } from "@/data/todos";

interface TodayTasksComponentProps {
  title: string;
  todoList: { id: string; task: string }[];
}

const TodayTasksComponent = ({ title, todoList }: TodayTasksComponentProps) => {
  const { data, status, fetchStatus } = useQuery({
    queryKey: ['todo'],
    queryFn: getTodos,
    select: (data) => data.map((todo) => ({ id: todo.id, title: todo.title, completed: todo.completed })),
  })
  if (status === 'pending') {
    return <div>Loading...</div>
  }
  if (status === 'error') {
    return <div>Error</div>
  }
  const todos = data.slice(0, 4)

  return (
    <Card className="w-1/4">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{new Date().toLocaleDateString()}</CardDescription>
      </CardHeader>
      <CardContent>
        <ul>
          {todos.map((todo) => (
            <li key={todo.id} className={todo.completed ? 'line-through' : ''}>{todo.title}</li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Add a Task</Button>
      </CardFooter>
    </Card>
  );
};

export default TodayTasksComponent;
