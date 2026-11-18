package com.teamresource.manager.config;

import com.teamresource.manager.entity.ActivityLog;
import com.teamresource.manager.entity.Employee;
import com.teamresource.manager.entity.Event;
import com.teamresource.manager.entity.Project;
import com.teamresource.manager.entity.Transaction;
import com.teamresource.manager.entity.User;
import com.teamresource.manager.repository.ActivityLogRepository;
import com.teamresource.manager.repository.EmployeeRepository;
import com.teamresource.manager.repository.EventRepository;
import com.teamresource.manager.repository.ProjectRepository;
import com.teamresource.manager.repository.TransactionRepository;
import com.teamresource.manager.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(DataSeeder.class);

    private final UserRepository userRepository;
    private final EmployeeRepository employeeRepository;
    private final ProjectRepository projectRepository;
    private final TransactionRepository transactionRepository;
    private final EventRepository eventRepository;
    private final ActivityLogRepository activityLogRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public void run(String... args) {
        seedAdminUser();
        seedEmployees();
        seedProjects();
        seedTransactions();
        seedEvents();
        seedActivityLogs();
    }

    private void seedAdminUser() {
        if (!userRepository.existsByEmail("admin@trm.com")) {
            User admin = User.builder()
                    .email("admin@trm.com")
                    .passwordHash(passwordEncoder.encode("admin123"))
                    .fullName("Admin Manager")
                    .role("MANAGER")
                    .build();
            userRepository.save(admin);
            log.info("Default admin user seeded: admin@trm.com / admin123");
        }
    }

    private void seedEmployees() {
        if (employeeRepository.count() == 0) {
            List<Employee> employees = List.of(
                    Employee.builder()
                            .name("Sarah Connor")
                            .email("sarah.connor@trm.com")
                            .department("Engineering")
                            .designation("Staff Platform Architect")
                            .age(34)
                            .phone("+1 555-0101")
                            .status("PERMANENT")
                            .workMode("HYBRID")
                            .disciplineScore(98)
                            .joinDate(LocalDate.of(2021, 3, 15))
                            .salary(new BigDecimal("135000.00"))
                            .build(),
                    Employee.builder()
                            .name("Alex Rivera")
                            .email("alex.rivera@trm.com")
                            .department("Engineering")
                            .designation("Senior Backend Engineer")
                            .age(29)
                            .phone("+1 555-0102")
                            .status("PERMANENT")
                            .workMode("REMOTE")
                            .disciplineScore(95)
                            .joinDate(LocalDate.of(2022, 6, 1))
                            .salary(new BigDecimal("115000.00"))
                            .build(),
                    Employee.builder()
                            .name("Elena Rostova")
                            .email("elena.rostova@trm.com")
                            .department("Design")
                            .designation("Lead UX Strategist")
                            .age(31)
                            .phone("+1 555-0103")
                            .status("PERMANENT")
                            .workMode("ON_SITE")
                            .disciplineScore(92)
                            .joinDate(LocalDate.of(2023, 1, 10))
                            .salary(new BigDecimal("105000.00"))
                            .build(),
                    Employee.builder()
                            .name("Marcus Vance")
                            .email("marcus.vance@trm.com")
                            .department("Product")
                            .designation("Principal Product Director")
                            .age(42)
                            .phone("+1 555-0104")
                            .status("PERMANENT")
                            .workMode("HYBRID")
                            .disciplineScore(99)
                            .joinDate(LocalDate.of(2020, 8, 1))
                            .salary(new BigDecimal("150000.00"))
                            .build(),
                    Employee.builder()
                            .name("Priya Sharma")
                            .email("priya.sharma@trm.com")
                            .department("Engineering")
                            .designation("Senior Frontend Developer")
                            .age(27)
                            .phone("+1 555-0105")
                            .status("PERMANENT")
                            .workMode("REMOTE")
                            .disciplineScore(94)
                            .joinDate(LocalDate.of(2023, 4, 15))
                            .salary(new BigDecimal("98000.00"))
                            .build(),
                    Employee.builder()
                            .name("David Chen")
                            .email("david.chen@trm.com")
                            .department("Marketing")
                            .designation("Growth Marketing Lead")
                            .age(33)
                            .phone("+1 555-0106")
                            .status("PERMANENT")
                            .workMode("ON_SITE")
                            .disciplineScore(89)
                            .joinDate(LocalDate.of(2022, 10, 1))
                            .salary(new BigDecimal("95000.00"))
                            .build(),
                    Employee.builder()
                            .name("Chloe Dubois")
                            .email("chloe.dubois@trm.com")
                            .department("Sales")
                            .designation("Enterprise Account Executive")
                            .age(36)
                            .phone("+1 555-0107")
                            .status("PERMANENT")
                            .workMode("HYBRID")
                            .disciplineScore(96)
                            .joinDate(LocalDate.of(2021, 11, 15))
                            .salary(new BigDecimal("120000.00"))
                            .build()
            );
            employeeRepository.saveAll(employees);
            log.info("Seeded 7 initial employees");
        }
    }

    private void seedProjects() {
        if (projectRepository.count() == 0) {
            List<Project> projects = List.of(
                    Project.builder()
                            .title("CRM Core Modernization")
                            .description("Complete architectural overhaul to pure Java & Vaadin reactive UI")
                            .status("IN_PROGRESS")
                            .startDate(LocalDate.of(2026, 1, 10))
                            .deadline(LocalDate.of(2026, 4, 30))
                            .budget(new BigDecimal("85000.00"))
                            .build(),
                    Project.builder()
                            .title("Global Enterprise Pipeline")
                            .description("Automated sales workflows and enterprise lead scoring integration")
                            .status("TODO")
                            .startDate(LocalDate.of(2026, 3, 1))
                            .deadline(LocalDate.of(2026, 6, 30))
                            .budget(new BigDecimal("60000.00"))
                            .build(),
                    Project.builder()
                            .title("Cloud Infrastructure Hardening")
                            .description("Multi-region failover, PostgreSQL tuning and zero-downtime CI/CD")
                            .status("DONE")
                            .startDate(LocalDate.of(2025, 9, 1))
                            .deadline(LocalDate.of(2026, 1, 15))
                            .budget(new BigDecimal("45000.00"))
                            .build(),
                    Project.builder()
                            .title("Talent Intelligence Suite")
                            .description("Employee skill graph matrix and performance analytics dashboard")
                            .status("IN_PROGRESS")
                            .startDate(LocalDate.of(2026, 2, 1))
                            .deadline(LocalDate.of(2026, 5, 15))
                            .budget(new BigDecimal("52000.00"))
                            .build()
            );
            projectRepository.saveAll(projects);
            log.info("Seeded 4 sample projects");
        }
    }

    private void seedTransactions() {
        if (transactionRepository.count() == 0) {
            List<Transaction> transactions = List.of(
                    Transaction.builder()
                            .description("Enterprise Client Retainer - Acme Corp")
                            .amount(new BigDecimal("45000.00"))
                            .type("INCOME")
                            .category("CLIENT_PAYMENT")
                            .transactionDate(LocalDate.now().minusDays(5))
                            .build(),
                    Transaction.builder()
                            .description("Cloud Hosting & GPU Clusters (AWS)")
                            .amount(new BigDecimal("14500.00"))
                            .type("EXPENSE")
                            .category("INFRASTRUCTURE")
                            .transactionDate(LocalDate.now().minusDays(10))
                            .build(),
                    Transaction.builder()
                            .description("SaaS Software Licensing (Figma, GitHub, JetBrains)")
                            .amount(new BigDecimal("3200.00"))
                            .type("EXPENSE")
                            .category("LICENSES")
                            .transactionDate(LocalDate.now().minusDays(14))
                            .build(),
                    Transaction.builder()
                            .description("Quarterly Consulting Services - TechVentures")
                            .amount(new BigDecimal("38000.00"))
                            .type("INCOME")
                            .category("CONSULTING")
                            .transactionDate(LocalDate.now().minusDays(20))
                            .build(),
                    Transaction.builder()
                            .description("Team Payroll & Benefits")
                            .amount(new BigDecimal("68000.00"))
                            .type("EXPENSE")
                            .category("SALARY")
                            .transactionDate(LocalDate.now().minusDays(25))
                            .build()
            );
            transactionRepository.saveAll(transactions);
            log.info("Seeded 5 sample transactions");
        }
    }

    private void seedEvents() {
        if (eventRepository.count() == 0) {
            List<Event> events = List.of(
                    Event.builder()
                            .title("Sprint Review & Product Demo")
                            .description("Showcase pure Java Vaadin CRM release to stakeholders")
                            .startTime(LocalDateTime.now().plusDays(2).withHour(10).withMinute(0))
                            .endTime(LocalDateTime.now().plusDays(2).withHour(11).withMinute(30))
                            .type("MEETING")
                            .build(),
                    Event.builder()
                            .title("Q1 Budget & Financial Planning")
                            .description("Executive quarterly financial allocation and burn audit")
                            .startTime(LocalDateTime.now().plusDays(5).withHour(14).withMinute(0))
                            .endTime(LocalDateTime.now().plusDays(5).withHour(15).withMinute(30))
                            .type("FINANCE")
                            .build(),
                    Event.builder()
                            .title("Engineering Architecture Sync")
                            .description("PostgreSQL schema indexing and query optimization review")
                            .startTime(LocalDateTime.now().plusDays(7).withHour(16).withMinute(0))
                            .endTime(LocalDateTime.now().plusDays(7).withHour(17).withMinute(0))
                            .type("TECHNICAL")
                            .build()
            );
            eventRepository.saveAll(events);
            log.info("Seeded sample calendar events");
        }
    }

    private void seedActivityLogs() {
        if (activityLogRepository.count() == 0) {
            List<ActivityLog> logs = List.of(
                    ActivityLog.builder()
                            .action("CREATED")
                            .entityType("PROJECT")
                            .entityId(1L)
                            .performedAt(LocalDateTime.now().minusHours(2))
                            .build(),
                    ActivityLog.builder()
                            .action("UPDATED")
                            .entityType("EMPLOYEE")
                            .entityId(1L)
                            .performedAt(LocalDateTime.now().minusHours(5))
                            .build(),
                    ActivityLog.builder()
                            .action("RECORDED")
                            .entityType("TRANSACTION")
                            .entityId(1L)
                            .performedAt(LocalDateTime.now().minusHours(8))
                            .build()
            );
            activityLogRepository.saveAll(logs);
            log.info("Seeded sample activity logs");
        }
    }
}
