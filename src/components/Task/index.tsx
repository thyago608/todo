import { Trash, Check } from "phosphor-react";
import { ITask } from "types/Task";
import styles from "./styles.module.css";

interface TaskProps {
  data: ITask;
  onDeleteTask: (id: string) => void;
  onCheckedTask: (id: string) => void;
}

export function Task({ data, onCheckedTask, onDeleteTask }: TaskProps) {
  function handleDeleteTask() {
    onDeleteTask(data.id);
  }

  function handleCheckedTask() {
    onCheckedTask(data.id);
  }

  const taskButtonClass = data.isChecked
    ? styles.checkedButton
    : styles.unCheckedButton;
  const taskButtonTitle = data.isChecked ? "Desmarcar" : "Marcar";

  return (
    <li className={styles.container}>
      <button
        type="button"
        className={taskButtonClass}
        onClick={handleCheckedTask}
        title={taskButtonTitle}
      >
        <div className={styles.containerIcon}>
          <Check size={18} weight="bold" />
        </div>
        <p>{data.content}</p>
      </button>
      <button
        type="button"
        className={styles.deleteButton}
        onClick={handleDeleteTask}
        title="Deletar tarefa"
      >
        <Trash size={18} weight="bold" />
      </button>
    </li>
  );
}
