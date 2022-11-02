import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import "@testing-library/jest-dom";
import { Home } from ".";

describe("Home Page", () => {
  it("should render field to add task", () => {
    render(<Home />);

    const formAddNewTask = screen.getByRole("form");
    const buttonCreateNewTask = screen.getByRole("button", {
      name: /criar/i,
    });
    const taskInput = screen.getByRole("textbox");

    expect(formAddNewTask).toBeInTheDocument();
    expect(taskInput).toBeInTheDocument();
    expect(buttonCreateNewTask).toBeInTheDocument();
    expect(buttonCreateNewTask).toHaveAttribute("disabled");
  });

  it("should render empty to-do list", () => {
    render(<Home />);

    expect(
      screen.getByText(
        "Você ainda não tem tarefas cadastradas Crie tarefas e organize seus itens a fazer"
      )
    ).toBeInTheDocument();
  });

  it("should be possible to register new task", () => {
    render(<Home />);
    const handleAddNewTask = vi.fn();

    const formAddNewTask = screen.getByRole("form");
    const input = screen.getByRole("textbox");
    const buttonCreateNewTask = screen.getByRole("button", {
      name: /criar/i,
    });

    fireEvent.change(input, {
      target: {
        value: "Any task",
      },
    });

    buttonCreateNewTask.removeAttribute("disabled");
    formAddNewTask.onsubmit = handleAddNewTask;
    fireEvent.click(buttonCreateNewTask);

    expect(handleAddNewTask).toHaveBeenCalled();
    expect(buttonCreateNewTask).toHaveAttribute("disabled");
    expect(input).toHaveValue("");
    expect(screen.getByText("Any task")).toBeInTheDocument();
  });
});
