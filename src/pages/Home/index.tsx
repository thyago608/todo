import { FormEvent, useState } from "react";
import { v4 } from "uuid";
import { CreateButton } from "components/CreateButton";
import { Input } from "components/Input";
import { Task } from "components/Task";
import { ITask } from "types/Task";
import styles from "./styles.module.css";

export function Home() {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [newTask, setNewTask] = useState("");

  function handleAddNewTask(event: FormEvent) {
    event.preventDefault();

    setTasks((oldState) => [
      ...oldState,
      { id: v4(), content: newTask, isChecked: false },
    ]);
    setNewTask("");
  }

  function handleDeleteTask(taskId: string) {
    const newListTasks = tasks.filter((task) => task.id !== taskId);

    setTasks(newListTasks);
  }

  function handleCheckedTask(taskId: string) {
    const updatedToDoList = tasks.map((task) =>
      task.id === taskId ? { ...task, isChecked: !task.isChecked } : task
    );

    setTasks(updatedToDoList);
  }

  const EmptyListComponent = (
    <div className={styles.emptinessMessage}>
      <img src="/clipboard.svg" alt="clipboard" title="clipboard" />
      <p>
        Você ainda não tem tarefas cadastradas Crie tarefas e organize seus
        itens a fazer
      </p>
    </div>
  );

  const ListTasksComponent = (
    <div className={styles.list}>
      {tasks.map((task) => (
        <Task
          key={task.id}
          data={task}
          onDeleteTask={handleDeleteTask}
          onCheckedTask={handleCheckedTask}
        />
      ))}
    </div>
  );

  const isNewTaskEmpty = newTask.length === 0;
  const totalTasksCompleted = tasks.filter((task) => task.isChecked).length;
  const messageCompleted =
    totalTasksCompleted > 0 ? `${totalTasksCompleted} de ${tasks.length}` : 0;

  return (
    <main className={styles.root}>
      <div className={styles.container}>
        <section className={styles.sectionAddNewTask}>
          <form onSubmit={handleAddNewTask}>
            <Input
              placeholder="Adicione uma nova tarefa"
              value={newTask}
              onChange={(event) => setNewTask(event.target.value)}
            />
            <CreateButton type="submit" disabled={isNewTaskEmpty} />
          </form>
        </section>
        <section className={styles.sectionTasks}>
          <header>
            <strong className={styles.createdTasksLabel}>
              Tarefas criadas <span>{tasks.length}</span>
            </strong>
            <strong className={styles.completedTasksLabel}>
              Concluídas <span>{messageCompleted}</span>
            </strong>
          </header>
          <div className={styles.listTasks}>
            {tasks.length === 0 ? EmptyListComponent : ListTasksComponent}
          </div>
        </section>
      </div>
    </main>
  );
}
