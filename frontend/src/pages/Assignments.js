import React from "react";
import AssignmentForm from "../components/Assignment/AssignmentForm";
import AssignmentTable from "../components/Assignment/AssignmentTable";
import styles from "../components/Layout/Layout.module.css";

export default function Assignments() {
  return (
    <div>
      <h1>Assign Tasks</h1>
      <div className={styles.card}>
        <AssignmentForm />
      </div>

      <div className={`${styles.card} ${styles.tableCard}`}>
        <AssignmentTable />
      </div>
    </div>
  );
}
