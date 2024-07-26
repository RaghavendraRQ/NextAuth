export type todo = {
  userId: 1;
  id: 1;
  title: "delectus aut autem";
  completed: false;
};

export const getTodos = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos");
  const data = await res.json();
  return data as todo[];
};
