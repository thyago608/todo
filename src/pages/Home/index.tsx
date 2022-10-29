import { FormEvent, useState } from "react";
import { CreateButton } from "../../components/CreateButton";
import { Input } from "../../components/Input";
import { Task } from "../../components/Task";
import styles from "./styles.module.css";

export function Home() {
  const [tasks, setTasks] = useState<string[]>([]);
  const [newTask, setNewTask] = useState("");

  function handleAddNewTask(event: FormEvent) {
    event.preventDefault();

    setTasks((oldState) => [...oldState, newTask]);
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
      <Task />
      <Task />
      <Task />
      <Task />
      <Task />
      <Task />
    </div>
  );

  const isNewTaskEmpty = newTask.length === 0;

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
              Tarefas criadas <span>0</span>
            </strong>
            <strong className={styles.completedTasksLabel}>
              Concluídas <span>0</span>
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
