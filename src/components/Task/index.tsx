import { useState } from "react";
import { Trash, Check } from "phosphor-react";
import styles from "./styles.module.css";

export function Task() {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div className={styles.container}>
      <button
        type="button"
        className={`${
          isChecked ? styles.checkedButton : styles.unCheckedButton
        }`}
        onClick={() => setIsChecked(!isChecked)}
      >
        <div className={styles.containerIcon}>
          <Check size={18} weight="bold" />
        </div>
        <p>
          Integer urna interdum massa libero auctor neque turpis turpis semper.
          Duis vel sed fames integer.
        </p>
      </button>

      <button type="button" className={styles.deleteButton}>
        <Trash size={18} weight="bold" />
      </button>
    </div>
  );
}
