import React, { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import styles from "./Layout.module.css";

export default function Layout({ children }) {
  const [collapsed, setCollapsed] = useState(false);

  const handleMenuClick = () => {
    setCollapsed((prev) => !prev);
  };

  return (
    <div
      className={`${styles.appRoot} ${
        collapsed ? styles.appRootCollapsed : ""
      }`}
    >
      <Navbar onMenuClick={handleMenuClick} />

      <div className={styles.appBody}>
        <Sidebar collapsed={collapsed} />

        <main className={styles.appContent}>
          <div className={styles.innerShell}>{children}</div>
        </main>
      </div>
    </div>
  );
}
