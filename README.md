# Team Resource Manager (TRM)

![Java](https://img.shields.io/badge/Backend-Java%20Spring%20Boot-green) ![React](https://img.shields.io/badge/Frontend-React.js%20%2B%20Tailwind-blue) ![Database](https://img.shields.io/badge/Database-H2%20%2F%20MySQL-orange)

A Full-Stack Enterprise Dashboard for managing employees, projects, and financial resources. Built with a robust **Spring Boot** backend and a responsive **React** frontend.

## 🚀 Features

- **Employee Management:** Add, edit, and remove employees with real-time database updates.
- **Kanban Board:** Interactive drag-and-drop style project tracking (To Do, In Progress, Done).
- **Financial Analytics:** Visual breakdown of budget, income, and expenses using Recharts.
- **Dark Mode:** Fully integrated system-wide dark theme.
- **Calendar Integration:** Visual deadline tracking for active projects.

## 🛠️ Tech Stack

### **Backend (Java)**
- **Framework:** Spring Boot 3.0
- **Database:** H2 In-Memory (Dev) / MySQL (Prod)
- **API:** RESTful Endpoints
- **Tools:** Maven, Lombok, Hibernate JPA

### **Frontend (React)**
- **Framework:** React.js (Vite)
- **Styling:** Tailwind CSS
- **Charts:** Recharts
- **Icons:** Lucide React

## 📸 Screenshots

| **Dashboard** | **Dark Mode** |
|:---:|:---:|
| ![Dashboard](./screenshots/dashboard.png) | ![Dark Mode](./screenshots/darkmode.png) |

## 🔧 Getting Started

### 1. Backend Setup
```bash
cd manager
./mvnw spring-boot:run
```

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### That is a fair decision. Sometimes it is better to be transparent. Even if the bar says "86% JavaScript," any recruiter reading "Spring Boot" in your resume or README will understand that the heavy lifting is done by Java.

To revert the repository to its natural state, we just need to delete the .gitattributes file you created.

Step 1: Revert the Language Stats
Run these commands in your IntelliJ Terminal to delete the file and update GitHub:

Bash
# 1. Delete the file locally
rm .gitattributes
# (On Windows PowerShell, use: Remove-Item .gitattributes)

# 2. Commit the deletion
git add .
git commit -m "Revert: Remove gitattributes to show natural language stats"

# 3. Push to GitHub
git push
Step 2: The Final Touch (README.md)
Since the language bar is skewed, we must add a professional README.md. This is the first thing people see, and it will immediately tell them: "This is a Java Spring Boot Application."

In IntelliJ, right-click the root folder (manager).

Select New > File.

Name it: README.md.

Paste this professional documentation:

Markdown
# Team Resource Manager (TRM)

![Java](https://img.shields.io/badge/Backend-Java%20Spring%20Boot-green) ![React](https://img.shields.io/badge/Frontend-React.js%20%2B%20Tailwind-blue) ![Database](https://img.shields.io/badge/Database-H2%20%2F%20MySQL-orange)

A Full-Stack Enterprise Dashboard for managing employees, projects, and financial resources. Built with a robust **Spring Boot** backend and a responsive **React** frontend.

## 🚀 Features

- **Employee Management:** Add, edit, and remove employees with real-time database updates.
- **Kanban Board:** Interactive drag-and-drop style project tracking (To Do, In Progress, Done).
- **Financial Analytics:** Visual breakdown of budget, income, and expenses using Recharts.
- **Dark Mode:** Fully integrated system-wide dark theme.
- **Calendar Integration:** Visual deadline tracking for active projects.

## 🛠️ Tech Stack

### **Backend (Java)**
- **Framework:** Spring Boot 3.0
- **Database:** H2 In-Memory (Dev) / MySQL (Prod)
- **API:** RESTful Endpoints
- **Tools:** Maven, Lombok, Hibernate JPA

### **Frontend (React)**
- **Framework:** React.js (Vite)
- **Styling:** Tailwind CSS
- **Charts:** Recharts
- **Icons:** Lucide React

## 📸 Screenshots

| **Dashboard** | **Dark Mode** |
|:---:|:---:|
| ![Dashboard](./screenshots/dashboard.png) | ![Dark Mode](./screenshots/darkmode.png) |

## 🔧 Getting Started

### Developed by Ansh Kumar Singh

### **Step 3: Push the README**
```bash
git add README.md
git commit -m "Docs: Add professional README"
git push
```
