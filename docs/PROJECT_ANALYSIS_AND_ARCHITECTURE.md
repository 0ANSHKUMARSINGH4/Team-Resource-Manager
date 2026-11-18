# Team Resource Manager — Full Project Analysis & Rebuild Architecture

> **Document Version:** 2.4 — Interactive CRM Landing Suite: 4-Mode Hero Sandbox Console, Smartphone Dock Showcase & Tactile Product Tour  
> **Date:** 2026-11-18  
> **Status:** 🟢 Live Cloud Deployments (Render + Vercel) + Interactive Landing Suite (`98c0aea`+) → Phase 2 Data & Pipeline In Progress

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Current Codebase Inventory](#2-current-codebase-inventory)
3. [Critical Bugs & Faults](#3-critical-bugs--faults)
4. [Architectural Shortcomings](#4-architectural-shortcomings)
5. [Code Quality Issues](#5-code-quality-issues)
6. [Security Vulnerabilities](#6-security-vulnerabilities)
7. [What's Missing (Feature Gaps)](#7-whats-missing-feature-gaps)
8. [New Architecture Blueprint](#8-new-architecture-blueprint)
9. [Tech Stack Decisions](#9-tech-stack-decisions)
10. [Database Schema Design](#10-database-schema-design)
11. [API Design (RESTful)](#11-api-design-restful)
12. [Frontend Architecture](#12-frontend-architecture)
13. [New Features Roadmap](#13-new-features-roadmap)
14. [Project Structure (Target)](#14-project-structure-target)
15. [Implementation Phases](#15-implementation-phases)
16. [Changelog](#16-changelog)

---

## 1. Executive Summary

The **Team Resource Manager (TRM)** is a full-stack demo/portfolio application with a Spring Boot 4 backend and a React (Vite + Tailwind) frontend. It attempts to provide employee management, a kanban board, financial analytics, and a calendar view.

**Verdict:** The project is a UI-focused prototype with significant architectural, security, and functional gaps that make it unsuitable for production or even serious demo use. The backend is a thin CRUD shell with hardcoded data, the frontend is a single 630-line monolith, and there is no authentication, no real data flow for 70% of the features, and several outright bugs.

### Score Card

| Dimension | Score | Notes |
|---|---|---|
| **Architecture** | 2/10 | No layered architecture, no service layer, flat package |
| **Backend Completeness** | 2/10 | Only Employee CRUD; projects, finance, calendar are fake |
| **Frontend Completeness** | 4/10 | UI exists but is a single monolith component |
| **Security** | 1/10 | No auth, CORS `*`, H2 console exposed, passwords in config |
| **Testing** | 1/10 | Single empty context-loads test |
| **DevOps / CI/CD** | 2/10 | Dockerfile present but fragile; no CI pipeline |
| **Code Quality** | 3/10 | No separation of concerns, Lombok conflicts, stale CSS |
| **Data Integrity** | 2/10 | In-memory DB, no validation, division-by-zero risk |

---

## 2. Current Codebase Inventory

### Files (32 total)

| Layer | Files | Lines of Code |
|---|---|---|
| **Backend (Java)** | 5 source + 1 test + 1 config | ~160 |
| **Frontend (React)** | 4 source (App.jsx is 630 lines) | ~690 |
| **Config / Build** | pom.xml, Dockerfile, .gitignore, etc. | ~200 |
| **Total** | 32 files | ~1,050 |

### Git History

16 commits total — mostly cosmetic fixes (favicon, README, GitHub language stats manipulation). No feature branches, no conventional commit messages, no tags or releases.

---

## 3. Critical Bugs & Faults

> [!CAUTION]
> These will cause runtime errors or incorrect behavior.

### 3.1 Division by Zero in `/api/stats`
```java
// DashboardController.java line 37
"permanentRate", (permanentCount * 100) / totalEmployees + "%"
```
If `totalEmployees` is 0 (e.g., all employees deleted), this **throws an `ArithmeticException`** and returns a 500 error. The entire dashboard breaks.

### 3.2 `App.css` Conflicts with the Real Layout
[App.css](file:///C:/Users/KIIT/Desktop/Let's%20Rebuild%20It/Product%201%20(CRM)/frontend/src/App.css) contains the default Vite template CSS:
```css
#root {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}
```
This **constrains the root to 1280px and centers it with padding**, fighting the full-width `flex h-screen` layout. The layout works only because Tailwind utilities override some of this, but it causes subtle spacing issues.

### 3.3 Stray Empty `git` File
A file named [`git`](file:///C:/Users/KIIT/Desktop/Let's%20Rebuild%20It/Product%201%20(CRM)/git) exists at the project root — an empty file, likely created by accident (`touch git` instead of running a git command). It should be deleted.

### 3.4 Hardcoded Remote API URL
```javascript
// App.jsx line 119
const API_URL = "https://team-resource-backend.onrender.com/api";
```
The local URL is **commented out**. Anyone cloning this repo and running locally gets broken API calls. Should use environment variables.

### 3.5 Calendar Hardcoded to February 2026
The calendar renders exactly 28 days starting from day 1, hardcoded as "February 2026". It doesn't account for months with different day counts, doesn't show the correct starting weekday, and cannot navigate between months.

### 3.6 `index.css` Body Background Fights Dark Mode
```css
body { background-color: #F8F9FD; }
```
This light-mode background is hard-set and never toggles, so in dark mode the body flash is light-colored.

### 3.7 Missing Add Employee Modal
The `isModalOpen` state exists and is toggled, but **the modal JSX for adding employees is completely absent from the render tree**. Clicking "Add" opens nothing — the modal was likely deleted by accident.

### 3.8 Redundant Manual Getter Defeating Lombok
```java
// Employee.java line 34-37
// Manual Getter to fix the error
public String getStatus() { return this.status; }
```
The `@Data` annotation already generates this. The comment "to fix the error" suggests a Lombok configuration issue that was band-aided rather than properly fixed.

---

## 4. Architectural Shortcomings

### 4.1 Backend: No Layered Architecture

The entire backend is a flat package with **zero separation**:

```
com.teamresource.manager/
├── ManagerApplication.java   ← Entry point
├── Employee.java             ← Entity
├── EmployeeRepository.java   ← Repository
├── DashboardController.java  ← Controller (directly calls repository)
└── DataSeeder.java           ← Seed data
```

**Missing layers:**
- ❌ **Service Layer** — business logic lives in the controller
- ❌ **DTO Layer** — entities are exposed directly to the API (JPA lazy-loading bombs, circular references)
- ❌ **Exception Handling** — no `@ControllerAdvice`, no error responses
- ❌ **Validation** — no `@Valid`, no bean validation annotations
- ❌ **Configuration classes** — CORS config is an annotation, no `WebMvcConfigurer`

### 4.2 Frontend: God Component Anti-Pattern

**All 630 lines live in a single `App.jsx`**:
- Dashboard, Finance, Employees, Projects, Calendar, Settings, Profile — all in one function
- Conditional rendering via `activePage === '...'` instead of a router
- No custom hooks, no context, no state management
- Sub-components (`SidebarItem`, `Card`, `StatCard`, `Badge`) are defined but co-located in the same file

### 4.3 No Client-Side Routing

There's no React Router. The "pages" are just conditional blocks. This means:
- ❌ No URL-based navigation (can't bookmark or share a page)
- ❌ Browser back/forward doesn't work
- ❌ No code splitting / lazy loading possible

### 4.4 Fake Data Everywhere

| Feature | Backend-Backed? | Reality |
|---|---|---|
| Employee List | ✅ Real CRUD | Only feature that works end-to-end |
| Dashboard Stats | ⚠️ Partially | `jobViews`, `jobApplied`, `resigned` are **hardcoded to 3342, 77, 17** |
| Projects / Kanban | ❌ Fake | Client-side state, lost on refresh |
| Finance / Transactions | ❌ Fake | Hardcoded array, no persistence |
| Calendar | ❌ Fake | Hardcoded to Feb 2026, no dynamic data |
| Profile | ❌ Fake | Client-side state, lost on refresh |
| Charts | ❌ Fake | All chart data is hardcoded arrays |

### 4.5 No Database Migration Strategy

Using `spring.jpa.hibernate.ddl-auto=update` in all environments. This is dangerous in production — schema changes can cause data loss. No Flyway or Liquibase.

---

## 5. Code Quality Issues

### 5.1 Unused Imports and Variables
- `Camera`, `Search`, `Bell`, `Shield` icons imported but several are used only in Settings
- `getAvatarColor` defined with 9 colors but only used in the employee table

### 5.2 No TypeScript
The frontend uses plain JSX with no type safety. `@types/react` and `@types/react-dom` are in devDependencies but are useless without TypeScript.

### 5.3 Inconsistent Error Handling
```javascript
// Some errors are console.error, some are alert()
catch (error) { console.error("Backend error", error); }
catch (err) { alert("Error adding employee"); }
```

### 5.4 No Form Validation
The add-employee form has no validation beyond HTML `required`. You can submit an employee with age = -500 or an empty department.

### 5.5 `package-lock.json` Committed but Large
At 10,000+ lines, it's properly committed (good), but the project name is just "frontend" with version "0.0.0".

---

## 6. Security Vulnerabilities

> [!WARNING]
> These are serious issues that must be addressed before any deployment.

| Issue | Severity | Location |
|---|---|---|
| **No authentication at all** | 🔴 Critical | Entire application is open |
| **CORS `origins = "*"`** | 🔴 Critical | [DashboardController.java#L9](file:///C:/Users/KIIT/Desktop/Let's%20Rebuild%20It/Product%201%20(CRM)/src/main/java/com/teamresource/manager/DashboardController.java#L9) |
| **H2 Console exposed with `web-allow-others=true`** | 🔴 Critical | [application.properties#L25](file:///C:/Users/KIIT/Desktop/Let's%20Rebuild%20It/Product%201%20(CRM)/src/main/resources/application.properties#L25) — anyone can access database |
| **DB password in plain text in properties** | 🟡 Medium | `password=password` |
| **No CSRF protection** | 🟡 Medium | No Spring Security at all |
| **No rate limiting** | 🟡 Medium | API can be hammered |
| **No input sanitization** | 🟡 Medium | XSS possible through employee names |

---

## 7. What's Missing (Feature Gaps)

### Must-Have for a CRM/Resource Manager

- ❌ **Authentication & Authorization** (login, roles, permissions)
- ❌ **Employee Edit** (can only add/delete, not update)
- ❌ **Employee Search & Filter** (no search, no department filter)
- ❌ **Pagination** (all employees loaded at once)
- ❌ **Real Project CRUD** (backend persistence)
- ❌ **Real Financial Data** (backend persistence)
- ❌ **Dynamic Calendar** (month navigation, real events)
- ❌ **Notifications System**
- ❌ **Audit Trail / Activity Log**
- ❌ **File Upload** (employee photos, documents)
- ❌ **Export Functionality** (CSV, PDF reports)
- ❌ **Email Integration**
- ❌ **Multi-tenancy** (teams/organizations)

### Nice-to-Have

- ❌ Real-time updates (WebSocket)
- ❌ Dashboard customization (drag-to-rearrange widgets)
- ❌ Time tracking
- ❌ Leave management
- ❌ Performance reviews
- ❌ **Integration APIs** (Slack, Google Calendar)

---

### 7.1 Competitive CRM Analysis: Industry Leaders vs TRM

To build a category-defining CRM and Resource Management tool, we conducted a benchmark across the market leaders: **Salesforce Sales Cloud**, **HubSpot CRM**, **Attio**, **Monday.com Work OS**, and **Linear**.

#### 1. Core Feature & Functionality Comparison Matrix

| Capability | Salesforce | HubSpot | Attio / Monday | TRM Current Status | What TRM Must Add to Win |
|---|---|---|---|---|---|
| **Contact & Deal Pipeline** | Comprehensive, multi-stage, customizable sales stages | Visual drag-drop deal pipeline | Flexible custom object views (List, Board, Table) | Kanban exists but is project-centric; no dedicated Deal/Client pipeline | **Client & Account Directory** tied directly to Projects & Financial deals |
| **Resource Capacity Planning** | Requires third-party AppExchange add-on | Not available (sales focus only) | Visual workload heatmaps | Table with static allocation count | **Interactive Bandwidth Heatmap** showing available hours & overload alerts |
| **Activity Timeline & Audit** | Exhaustive activity history (calls, emails, tasks) | Unified contact timeline | Real-time collaborative stream | Database table `activity_log` created, but no UI feed yet | **Global Activity Timeline** on Dashboard showing recent events & edits |
| **Financial & Margin Intelligence** | CPQ module (very complex, enterprise cost) | Quotes & Payments add-on | Basic formula columns | Cash flow chart + transaction ledger | **Project-Level Profitability**: Link transactions directly to client projects |
| **Automations & Workflows** | Flow Builder (complex, high learning curve) | Workflows engine (tiered paywall) | Trigger-action automations | Not present | **Smart Event Triggers** (e.g. notify when project budget > 80% or employee overloaded) |
| **Universal Command Bar** | Global search dropdown | Global search | Command palette (`Cmd+K` / `Ctrl+K`) | Standard search input | **Global Quick Command Bar (`Ctrl+K`)** to search across employees, projects, transactions |
| **Communication Hub** | Email integration (Outlook/Gmail) | 2-way email sync & tracking | Email sync + rich notes | None | **Quick Notes & Communication Log** per employee / client project |
| **Data Import & Export** | Data Loader tool | CSV import wizard | Instant CSV/Sheets sync | Basic CSV plan | **Drag-and-Drop CSV Import Wizard** with column mapping preview |

#### 2. Design & UX Transformation Strategy

Top modern SaaS tools (Linear, Attio, Supabase, Vercel) have completely redefined what enterprise software feels like. To elevate TRM from an administrative dashboard into a product users love:

* **Bento Grid Architecture**: Adopt multi-card modular bento layouts (as implemented on our new marketing homepage) across the inner app analytics views.
* **Ambient Lighting & Glassmorphism Depth**: Subtle background radial gradients, backdrop blurs, and layered elevations (`slate-800` to `slate-900`) instead of flat monotone surfaces.
* **Micro-interactions & Optimistic UI**: When dragging a Kanban card or updating an employee status, update the UI instantly (optimistic mutations via TanStack Query) while persisting in the background.
* **Keyboard-First Navigation (`Ctrl + K`)**: Power-user command palette allowing users to jump between pages, create new employees, and log transactions without touching the mouse.
* **Status Pill System**: High-contrast, semantic pill badges (`bg-emerald-500/15 text-emerald-400 border border-emerald-500/30`) that are instantly readable in both light and dark themes.

---

---

## 8. New Architecture Blueprint

```mermaid
graph TB
    subgraph "Client Layer"
        UI["React 19 + TypeScript<br/>Vite + Tailwind CSS"]
        Router["React Router v7<br/>File-based routing"]
        State["Zustand<br/>Global State"]
        Query["TanStack Query<br/>Server State"]
    end

    subgraph "API Gateway"
        GW["Spring Cloud Gateway<br/>(Future)"]
    end

    subgraph "Backend Layer"
        API["REST Controllers<br/>Versioned: /api/v1/*"]
        Security["Spring Security 6<br/>JWT + OAuth2"]
        Service["Service Layer<br/>Business Logic"]
        Mapper["MapStruct<br/>DTO ↔ Entity"]
        Valid["Jakarta Validation<br/>Bean Validation"]
    end

    subgraph "Data Layer"
        Repo["Spring Data JPA<br/>Repositories"]
        Cache["Redis Cache<br/>(Future)"]
        DB["PostgreSQL<br/>Primary Database"]
        Flyway["Flyway<br/>Schema Migrations"]
    end

    subgraph "Cross-Cutting"
        Log["SLF4J + Logback"]
        Metrics["Actuator + Micrometer"]
        Docs["SpringDoc OpenAPI"]
        Errors["Global Exception Handler"]
    end

    UI --> Router --> State
    UI --> Query --> API
    API --> Security --> Service
    Service --> Mapper --> Repo
    Repo --> DB
    Flyway --> DB
    Service --> Cache
    API --> Errors
    API --> Valid
    Service --> Log
    API --> Docs
    API --> Metrics
```

### Layered Backend Architecture

```
com.teamresource.manager/
├── config/                    # Security, CORS, WebMvc, OpenAPI configs
│   ├── SecurityConfig.java
│   ├── CorsConfig.java
│   └── OpenApiConfig.java
├── auth/                      # Authentication module
│   ├── controller/
│   ├── service/
│   ├── dto/
│   └── entity/
├── employee/                  # Employee module (domain-driven)
│   ├── controller/
│   │   └── EmployeeController.java
│   ├── service/
│   │   ├── EmployeeService.java
│   │   └── EmployeeServiceImpl.java
│   ├── repository/
│   │   └── EmployeeRepository.java
│   ├── dto/
│   │   ├── EmployeeRequest.java
│   │   ├── EmployeeResponse.java
│   │   └── EmployeeMapper.java
│   ├── entity/
│   │   └── Employee.java
│   └── exception/
│       └── EmployeeNotFoundException.java
├── project/                   # Project module
│   ├── controller/
│   ├── service/
│   ├── repository/
│   ├── dto/
│   └── entity/
├── finance/                   # Finance module
│   ├── controller/
│   ├── service/
│   ├── repository/
│   ├── dto/
│   └── entity/
├── dashboard/                 # Dashboard aggregation
│   ├── controller/
│   ├── service/
│   └── dto/
├── common/                    # Shared utilities
│   ├── exception/
│   │   ├── GlobalExceptionHandler.java
│   │   └── ApiError.java
│   ├── dto/
│   │   └── PagedResponse.java
│   └── audit/
│       └── AuditableEntity.java
└── ManagerApplication.java
```

---

## 9. Tech Stack Decisions

### Backend

| Current | → New | Rationale |
|---|---|---|
| Spring Boot 4.0.2 | **Spring Boot 4.0.x** (keep) | Latest stable, good choice |
| H2 in-memory | **PostgreSQL 16** | Production-grade, persistent |
| No auth | **Spring Security 6 + JWT** | Industry standard |
| No migrations | **Flyway** | Version-controlled schema |
| No validation | **Jakarta Validation** | Bean-level constraints |
| No docs | **SpringDoc OpenAPI 3** | Auto-generated Swagger UI |
| Lombok | **Lombok + MapStruct** | Clean DTOs |
| No testing | **JUnit 5 + Mockito + Testcontainers** | Proper test pyramid |

### Frontend

| Current | → New | Rationale |
|---|---|---|
| React JSX | **React + TypeScript** | Type safety |
| No router | **React Router v7** | Real navigation, code splitting |
| useState everything | **Zustand** (UI) + **TanStack Query** (server) | Scalable state management |
| Single App.jsx | **Feature-based folder structure** | Maintainability |
| axios | **TanStack Query + axios** | Caching, retry, optimistic updates |
| No form lib | **React Hook Form + Zod** | Validation |
| No toast/notifications | **Sonner** | Beautiful toast notifications |
| No testing | **Vitest + React Testing Library** | Component tests |

### DevOps

| Current | → New | Rationale |
|---|---|---|
| Dockerfile (fragile) | **Multi-stage Dockerfile + docker-compose** | Full local dev env |
| No CI | **GitHub Actions** | Automated testing & deploy |
| No env management | **.env files + Spring Profiles** | Environment separation |

---

## 10. Database Schema Design

```mermaid
erDiagram
    USERS ||--o{ EMPLOYEES : manages
    USERS {
        bigint id PK
        varchar email UK
        varchar password_hash
        varchar full_name
        varchar role "ADMIN, MANAGER, VIEWER"
        timestamp created_at
        timestamp updated_at
    }
    
    EMPLOYEES {
        bigint id PK
        varchar name
        varchar email UK
        varchar department
        varchar designation
        int age
        varchar phone
        varchar status "PERMANENT, CONTRACT, INTERN"
        varchar work_mode "ON_SITE, REMOTE, HYBRID"
        int discipline_score
        date join_date
        decimal salary
        bigint manager_id FK
        varchar avatar_url
        timestamp created_at
        timestamp updated_at
    }

    PROJECTS ||--o{ PROJECT_MEMBERS : has
    EMPLOYEES ||--o{ PROJECT_MEMBERS : "assigned to"
    PROJECTS {
        bigint id PK
        varchar title
        text description
        varchar status "TODO, IN_PROGRESS, REVIEW, DONE"
        date start_date
        date deadline
        decimal budget
        bigint created_by FK
        timestamp created_at
        timestamp updated_at
    }

    PROJECT_MEMBERS {
        bigint id PK
        bigint project_id FK
        bigint employee_id FK
        varchar role "LEAD, MEMBER"
    }

    TRANSACTIONS {
        bigint id PK
        varchar description
        decimal amount
        varchar type "INCOME, EXPENSE"
        varchar category "SALARY, SERVER, LICENSE, CLIENT_PAYMENT"
        date transaction_date
        bigint recorded_by FK
        timestamp created_at
    }

    EVENTS {
        bigint id PK
        varchar title
        text description
        timestamp start_time
        timestamp end_time
        varchar type "MEETING, DEADLINE, HOLIDAY, REVIEW"
        bigint project_id FK
        bigint created_by FK
    }

    ACTIVITY_LOG {
        bigint id PK
        varchar action "CREATED, UPDATED, DELETED"
        varchar entity_type
        bigint entity_id
        jsonb old_values
        jsonb new_values
        bigint performed_by FK
        timestamp performed_at
    }
```

---

## 11. API Design (RESTful)

### Authentication
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/v1/auth/register` | Register new user |
| POST | `/api/v1/auth/login` | Login, returns JWT |
| POST | `/api/v1/auth/refresh` | Refresh token |
| POST | `/api/v1/auth/logout` | Invalidate token |

### Employees
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/v1/employees` | List (paginated, filterable, searchable) |
| GET | `/api/v1/employees/{id}` | Get single employee |
| POST | `/api/v1/employees` | Create employee |
| PUT | `/api/v1/employees/{id}` | Update employee |
| DELETE | `/api/v1/employees/{id}` | Delete employee |
| GET | `/api/v1/employees/stats` | Employee statistics |
| GET | `/api/v1/employees/export?format=csv` | Export to CSV |

### Projects
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/v1/projects` | List all projects |
| GET | `/api/v1/projects/{id}` | Get project details |
| POST | `/api/v1/projects` | Create project |
| PUT | `/api/v1/projects/{id}` | Update project |
| PATCH | `/api/v1/projects/{id}/status` | Update status only |
| DELETE | `/api/v1/projects/{id}` | Delete project |
| POST | `/api/v1/projects/{id}/members` | Add member |
| DELETE | `/api/v1/projects/{id}/members/{empId}` | Remove member |

### Finance
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/v1/finance/transactions` | List transactions (paginated) |
| POST | `/api/v1/finance/transactions` | Record transaction |
| GET | `/api/v1/finance/summary` | Budget/income/expense summary |
| GET | `/api/v1/finance/cashflow?period=monthly` | Cash flow data for charts |

### Dashboard
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/v1/dashboard/overview` | Aggregated stats for cards |
| GET | `/api/v1/dashboard/trends` | Task trend data for charts |
| GET | `/api/v1/dashboard/activity` | Recent activity feed |

### Calendar / Events
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/v1/events?month=2&year=2026` | Events for a month |
| POST | `/api/v1/events` | Create event |
| PUT | `/api/v1/events/{id}` | Update event |
| DELETE | `/api/v1/events/{id}` | Delete event |

---

## 12. Frontend Architecture

### Directory Structure
```
frontend/src/
├── app/
│   ├── routes/                 # React Router file-based routes
│   │   ├── _layout.tsx         # Root layout (sidebar + header)
│   │   ├── dashboard.tsx
│   │   ├── employees/
│   │   │   ├── index.tsx       # Employee list
│   │   │   └── $id.tsx         # Employee detail
│   │   ├── projects/
│   │   │   ├── index.tsx       # Kanban board
│   │   │   └── $id.tsx         # Project detail
│   │   ├── finance.tsx
│   │   ├── calendar.tsx
│   │   ├── settings.tsx
│   │   ├── profile.tsx
│   │   └── auth/
│   │       ├── login.tsx
│   │       └── register.tsx
│   └── router.tsx              # Router configuration
├── components/
│   ├── ui/                     # Reusable primitives
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Badge.tsx
│   │   ├── Modal.tsx
│   │   ├── Table.tsx
│   │   ├── Input.tsx
│   │   ├── Select.tsx
│   │   ├── Avatar.tsx
│   │   └── StatCard.tsx
│   ├── layout/
│   │   ├── Sidebar.tsx
│   │   ├── Header.tsx
│   │   ├── MobileMenu.tsx
│   │   └── PageContainer.tsx
│   └── charts/
│       ├── BarChart.tsx
│       ├── PieChart.tsx
│       └── AreaChart.tsx
├── features/
│   ├── auth/
│   │   ├── api.ts              # Auth API calls
│   │   ├── store.ts            # Auth Zustand store
│   │   └── types.ts
│   ├── employees/
│   │   ├── api.ts
│   │   ├── hooks.ts            # useEmployees, useEmployee, etc.
│   │   ├── types.ts
│   │   └── components/
│   │       ├── EmployeeTable.tsx
│   │       ├── EmployeeForm.tsx
│   │       └── EmployeeFilters.tsx
│   ├── projects/
│   │   ├── api.ts
│   │   ├── hooks.ts
│   │   ├── types.ts
│   │   └── components/
│   │       ├── KanbanBoard.tsx
│   │       ├── KanbanColumn.tsx
│   │       ├── ProjectCard.tsx
│   │       └── ProjectForm.tsx
│   ├── finance/
│   │   ├── api.ts
│   │   ├── hooks.ts
│   │   ├── types.ts
│   │   └── components/
│   │       ├── TransactionTable.tsx
│   │       └── CashFlowChart.tsx
│   └── dashboard/
│       ├── api.ts
│       ├── hooks.ts
│       └── components/
│           ├── StatsGrid.tsx
│           ├── TaskTrends.tsx
│           └── DistributionChart.tsx
├── hooks/                      # Shared custom hooks
│   ├── useAuth.ts
│   ├── useDarkMode.ts
│   └── useDebounce.ts
├── lib/
│   ├── axios.ts                # Configured axios instance
│   ├── queryClient.ts          # TanStack Query client
│   └── utils.ts                # Utility functions
├── stores/
│   ├── themeStore.ts
│   └── uiStore.ts
├── types/
│   └── index.ts                # Shared TypeScript types
├── styles/
│   └── globals.css             # Tailwind directives only
├── main.tsx
└── vite-env.d.ts
```

---

## 13. New Features Roadmap

### Phase 1 — Foundation (Weeks 1–2) — COMPLETED 🟢
- [x] Project audit and documentation *(this document)*
- [x] Set up new project structure (backend + frontend isolation)
- [x] PostgreSQL + Flyway migrations (V1 to V4)
- [x] Spring Security 6 + JWT authentication (jjwt 0.12.6)
- [x] Login / Register pages (React Hook Form + Zod)
- [x] Protected routes with React Router v7
- [x] Employee full CRUD (Create, Read, Update, Delete) + Pagination & Search
- [x] Reusable UI Component Library (Card, Modal, Button, Badge, Input, Select, etc.)
- [x] TypeScript conversion across the entire frontend

### Phase 2 — Core Features (Weeks 3–4)
- [x] Project management backend (full CRUD)
- [x] Kanban board with drag-and-drop (dnd-kit)
- [ ] Project-Employee assignment
- [x] Finance module backend (transactions CRUD)
- [x] Dynamic dashboard with real aggregated stats
- [x] Toast notifications (Sonner)
- [x] Form validation (React Hook Form + Zod)

### Phase 3 — Calendar & Analytics (Weeks 5–6)
- [ ] Event/Calendar backend
- [ ] Dynamic calendar with month navigation
- [ ] Real chart data from API
- [ ] Employee export (CSV download)
- [ ] Activity/audit log
- [ ] Profile management (with avatar upload)

### Phase 4 — Polish & Deploy (Weeks 7–8)
- [ ] Comprehensive error handling (global exception handler)
- [ ] Loading skeletons and empty states
- [ ] Responsive design QA pass
- [ ] Unit tests (backend: JUnit + Mockito)
- [ ] Integration tests (Testcontainers)
- [ ] Frontend tests (Vitest + React Testing Library)
- [ ] OpenAPI/Swagger documentation
- [ ] Docker Compose (app + PostgreSQL)
- [ ] GitHub Actions CI/CD pipeline
- [ ] Production deployment

### Phase 5 — Advanced Features (Future)
- [ ] Role-based access control (Admin/Manager/Viewer)
- [ ] Real-time notifications (WebSocket)
- [ ] Leave management
- [ ] Performance reviews
- [ ] Time tracking
- [ ] Slack / Google Calendar integration
- [ ] Multi-tenant support
- [ ] Redis caching
- [ ] Batch operations (bulk employee import)

---

## 14. Project Structure (Target)

```
Team-Resource-Manager/
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/teamresource/manager/
│   │   │   │   └── (see Section 8 architecture)
│   │   │   └── resources/
│   │   │       ├── application.yml
│   │   │       ├── application-dev.yml
│   │   │       ├── application-prod.yml
│   │   │       └── db/migration/
│   │   │           ├── V1__create_users_table.sql
│   │   │           ├── V2__create_employees_table.sql
│   │   │           ├── V3__create_projects_table.sql
│   │   │           └── V4__create_finance_tables.sql
│   │   └── test/
│   │       └── java/com/teamresource/manager/
│   │           ├── employee/
│   │           │   ├── EmployeeControllerTest.java
│   │           │   └── EmployeeServiceTest.java
│   │           └── auth/
│   │               └── AuthControllerTest.java
│   ├── pom.xml
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   └── (see Section 12 architecture)
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   └── Dockerfile
├── docker-compose.yml
├── .github/
│   └── workflows/
│       ├── backend-ci.yml
│       └── frontend-ci.yml
├── .env.example
├── README.md
└── docs/
    └── API.md
```

---

## 15. Implementation Phases

```mermaid
flowchart LR
    A["Phase 1<br/>Foundation<br/>Auth + Employee CRUD<br/>Weeks 1-2"] --> B["Phase 2<br/>Core Features<br/>Projects + Finance<br/>Weeks 3-4"]
    B --> C["Phase 3<br/>Calendar & Analytics<br/>Events + Charts<br/>Weeks 5-6"]
    C --> D["Phase 4<br/>Polish & Deploy<br/>Tests + CI/CD<br/>Weeks 7-8"]
    D --> E["Phase 5<br/>Advanced<br/>RBAC + Real-time<br/>Ongoing"]

    style A fill:#EF4444,color:#fff
    style B fill:#F59E0B,color:#fff
    style C fill:#3B82F6,color:#fff
    style D fill:#10B981,color:#fff
    style E fill:#8B5CF6,color:#fff
```

> [!IMPORTANT]
> **Push Reminders:** Push to remote after completing each Phase milestone, and after any session with 3+ meaningful commits. Use conventional commit messages: `feat:`, `fix:`, `refactor:`, `docs:`, `test:`, `chore:`.

---

## 16. Changelog

| Date | Version | Changes |
|---|---|---|
| 2026-11-11 | 1.0 | Initial audit: full codebase analysis, bug catalog, architecture blueprint, roadmap |
| 2026-11-11 | 1.1 | Phase 1 Foundation complete: Backend Spring Security JWT, Flyway V1-V4, full Employee CRUD & tests; Frontend converted to TypeScript, React Router v7, Zustand, TanStack Query, UI primitives. |
| 2026-11-17 | 1.2 | Phase 1 milestone successfully pushed to GitHub repository (`origin/main` at `490d1df`). All 5 foundation commits verified and live. |
| 2026-11-17 | 1.6 | Added Vercel SPA rewrites configuration (`37d57b4`) preventing 404s on browser reloads and direct URLs. |
| 2026-11-18 | 1.7 | Built and deployed modern SaaS CRM marketing homepage inspired by Salesforce/Attio/Linear with bento grid, pricing tiers, comparison matrix, interactive dashboard preview, and full competitive CRM benchmark (`61e9de7`). |
| 2026-11-18 | 1.8 | Added interactive 4-pillar Product Tour with contextual live mocks, dynamic Salesforce-grade ROI Value Calculator, and FAQ accordion (`ff53669`). Pushed to `origin/main`. |
| 2026-11-18 | 1.9 | Implemented smartphone-style App Drawer & Sidebar Dock Customizer (`bb8b9dd`). |
| 2026-11-18 | 2.0 | Converted App Drawer from modal into dedicated full-page view (`/apps`) with interactive HTML5 Drag-and-Drop (`647d48f`). |
| 2026-11-18 | 2.1 | Fixed drag-and-drop mechanism (`8b7f88e`): Resolved browser `application/json` dataTransfer stripping via `text/plain` + global memory buffer, added animated drop target zones, and added arrow reorder buttons. |
| 2026-11-18 | 2.2 | Designed and integrated custom matching `AppDrawerLogo` (`3f79676`): 2x2 smartphone app matrix in a violet-indigo-pink gradient squircle with micro-dots matching TRM core modules and ambient pulse indicator. |
| 2026-11-18 | 2.3 | **Competitive CRM UX Suite**: Delivered Phase 1 high-impact items from `CRM_COMPETITIVE_ANALYSIS.md`: Global `⌘K`/`Ctrl+K` Command Palette, Slide-Over 360° Employee Drawer with Overview/Audit Timeline/Private Notes tabs, Notification Center dropdown with badge counter, Skeleton Loaders (`TableSkeleton`, `DashboardSkeleton`, etc.), Breadcrumb Navigation, CSV Export, and enhanced Button variants. |
| 2026-11-18 | 2.4 | **Interactive CRM Landing Page Suite**: Upgraded the pre-login marketing homepage inspired by Attio, Linear, and Salesforce: (1) Hero 4-Mode Interactive Sandbox Console (Executive KPI, Movable Kanban Cards, Searchable Talent Directory, Working ⌘K Prompt), (2) One-Click Demo Credentials copy pill (`admin@trm.com` / `admin123`), (3) Dedicated Smartphone App Drawer & Dock Customizer Showcase (`AppDrawerShowcase.tsx`), (4) Tactile Interactive Product Tour with live multi-column task shifting and real-time Revenue/Burn/Gross Margin sliders, (5) Competitive Showdown table updated with TRM's modern differentiator capabilities. |
| 2026-11-18 | 2.5 | **Interactive Drag-and-Drop Kanban Board & Live Finance Ledger Suite**: (1) Fixed sticky header scroll-bleed z-index collision (`z-40` & `relative z-1`) and styled notification badge inside circular ring pill, (2) Built collapsible desktop sidebar (`w-64` ↔ `w-20`) with smooth animation and centered tooltip icons, (3) Added hovering elevation cards and micro-interactions across landing page and app cards, (4) Implemented `@dnd-kit` multi-column Drag-and-Drop Kanban Board (`/projects`) with optimistic UI status mutations and real-time sync, (5) Implemented end-to-end Finance API integration (`/finance`) with double-entry ledger backend, annual burn analytics, dynamic cash flow chart, CSV export, and transaction modal. |
| 2026-11-18 | 2.6 | **Refinements & Navigation Harmony Suite**: (1) Confined App Drawer exclusively to sidebar, (2) Dynamic Calendar default to current date with "Today" quick button & day badge, (3) Harmonized outer card side boundaries in Projects & Sprints with uniform slots that expand cleanly only on added content or stage shift, (4) Upgraded expandable/collapsible Quick Bar in navbar (`w-36` ↔ `w-80`) with deduplication across views, (5) Confined sidebar collapse/expand toggle exclusively to navbar, (6) Managed clean, uniform green bubbles (budget pills & completion badges) with balanced avatar grouping. |
| 2026-11-18 | 2.7 | **Render Cloud Deployment Resilience Suite**: Resolved Render backend deployment failure (`https://team-resource-backend.onrender.com`): (1) Replaced dialect-specific `AUTO_INCREMENT` with standard ANSI SQL `GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY` in Flyway V1-V4 migrations for complete PostgreSQL & H2 compatibility, (2) Created `DatabaseConfig.java` to parse Render's dynamic PostgreSQL `DATABASE_URL` (`postgres://user:pass@host:port/db`) into valid JDBC URLs with credentials, (3) Explicitly declared `${lombok.version}` in Maven compiler plugin annotationProcessorPaths, (4) Upgraded Dockerfiles to Ubuntu Jammy (`eclipse-temurin:17-jre-jammy`) and shell exec entrypoint `-Dserver.port=${PORT:-8080}` for dynamic Render port binding, (5) Made `backend/mvnw` executable in git (`100755`), (6) Sanitized JPQL sum queries in `TransactionRepository` and null-guarded `FinanceServiceImpl`. |

*This document will be updated as we implement each phase.*

---

> **Next Steps:** Confirm the architecture direction and tech stack choices, then we begin Phase 1 — setting up the new project structure and implementing authentication.
