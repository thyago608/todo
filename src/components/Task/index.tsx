import { Trash, Check } from "phosphor-react";
import { ITask } from "types/Task";
import styles from "./styles.module.css";

interface TaskProps {
  data: ITask;
  onDeleteTask: (id: string) => void;
  onCheckedTask: (id: string) => void;
}

export function Task({ data, onCheckedTask, onDeleteTask }: TaskProps) {
  return (
    <div className={styles.container}>
      <button
        type="button"
        className={`${
          data.isChecked ? styles.checkedButton : styles.unCheckedButton
        }`}
        onClick={() => onCheckedTask(data.id)}
      >
        <div className={styles.containerIcon}>
          <Check size={18} weight="bold" />
        </div>
        <p>{data.content}</p>
      </button>
      <button
        type="button"
        className={styles.deleteButton}
        onClick={() => onDeleteTask(data.id)}
      >
        <Trash size={18} weight="bold" />
      </button>
    </div>
  );
}
