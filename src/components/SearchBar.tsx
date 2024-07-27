"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import FormErrorComponent from "./FormError";
const SearchBarComponent = () => {
  const [input, setInput] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const handleClick = () => {
    if (input === "" || input.trim() === "") {
      setError(true);
      return;
    }
    setError(false);
    // console.log(input);
    setInput("");
  };
  return (
    <div className="flex justify-center items-center gap-3 m-4 mb-6">
      <Input
        type="text"
        placeholder="...add a quick to-do or select an option from below"
        value={input}
        onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
          setInput(e.target.value);
        }}
        className="w-2/6"
      />
      <Button className="bg-[#3C5556]" onClick={handleClick}>
        Add Task
      </Button>
      {error && <FormErrorComponent message="Please Enter the task" />}
    </div>
  );
};

export default SearchBarComponent;
