package com.teamresource.manager.seed;

import com.teamresource.manager.auth.entity.User;
import com.teamresource.manager.auth.repository.UserRepository;
import com.teamresource.manager.employee.entity.Employee;
import com.teamresource.manager.employee.repository.EmployeeRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Component
@Profile("dev")
@RequiredArgsConstructor
@Slf4j
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final EmployeeRepository employeeRepository;
    private final PasswordEncoder passwordEncoder;
    private final JdbcTemplate jdbcTemplate;

    @Override
    public void run(String... args) {
        seedUsers();
        seedEmployees();
        seedProjects();
        seedTransactions();
    }

    private void seedUsers() {
        if (userRepository.count() == 0) {
            User admin = User.builder()
                    .email("admin@trm.com")
                    .passwordHash(passwordEncoder.encode("admin123"))
                    .fullName("Admin User")
                    .role("ADMIN")
                    .build();
            userRepository.save(admin);
            log.info("Default admin user seeded: admin@trm.com / admin123");
        }
    }

    private void seedEmployees() {
        if (employeeRepository.count() == 0) {
            Long managerId = userRepository.findByEmail("admin@trm.com")
                    .map(User::getId)
                    .orElse(null);

            List<Employee> employees = List.of(
                    Employee.builder()
                            .name("Sarah Connor")
                            .email("sarah.connor@trm.com")
                            .department("Engineering")
                            .designation("Lead Architect")
                            .age(34)
                            .phone("+1 555-0101")
                            .status("PERMANENT")
                            .workMode("REMOTE")
                            .disciplineScore(98)
                            .joinDate(LocalDate.of(2022, 3, 15))
                            .salary(new BigDecimal("120000.00"))
                            .managerId(managerId)
                            .avatarUrl("https://images.unsplash.com/photo-1494790108377-be9c29b29330")
                            .build(),
                    Employee.builder()
                            .name("John Doe")
                            .email("john.doe@trm.com")
                            .department("Engineering")
                            .designation("Senior Backend Engineer")
                            .age(29)
                            .phone("+1 555-0102")
                            .status("PERMANENT")
                            .workMode("HYBRID")
                            .disciplineScore(92)
                            .joinDate(LocalDate.of(2023, 1, 10))
                            .salary(new BigDecimal("95000.00"))
                            .managerId(managerId)
                            .avatarUrl("https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d")
                            .build(),
                    Employee.builder()
                            .name("Alice Smith")
                            .email("alice.smith@trm.com")
                            .department("Design")
                            .designation("UI/UX Designer")
                            .age(27)
                            .phone("+1 555-0103")
                            .status("CONTRACT")
                            .workMode("ON_SITE")
                            .disciplineScore(88)
                            .joinDate(LocalDate.of(2023, 6, 1))
                            .salary(new BigDecimal("75000.00"))
                            .managerId(managerId)
                            .avatarUrl("https://images.unsplash.com/photo-1438761681033-6461ffad8d80")
                            .build(),
                    Employee.builder()
                            .name("Bob Johnson")
                            .email("bob.johnson@trm.com")
                            .department("Marketing")
                            .designation("Marketing Manager")
                            .age(38)
                            .phone("+1 555-0104")
                            .status("PERMANENT")
                            .workMode("ON_SITE")
                            .disciplineScore(90)
                            .joinDate(LocalDate.of(2021, 11, 20))
                            .salary(new BigDecimal("85000.00"))
                            .managerId(managerId)
                            .avatarUrl("https://images.unsplash.com/photo-1500648767791-00dcc994a43e")
                            .build(),
                    Employee.builder()
                            .name("Emma Watson")
                            .email("emma.watson@trm.com")
                            .department("Product")
                            .designation("Product Lead")
                            .age(32)
                            .phone("+1 555-0105")
                            .status("PERMANENT")
                            .workMode("HYBRID")
                            .disciplineScore(96)
                            .joinDate(LocalDate.of(2022, 8, 1))
                            .salary(new BigDecimal("110000.00"))
                            .managerId(managerId)
                            .avatarUrl("https://images.unsplash.com/photo-1534528741775-53994a69daeb")
                            .build(),
                    Employee.builder()
                            .name("Michael Brown")
                            .email("michael.brown@trm.com")
                            .department("Engineering")
                            .designation("Frontend Engineer")
                            .age(25)
                            .phone("+1 555-0106")
                            .status("PERMANENT")
                            .workMode("REMOTE")
                            .disciplineScore(85)
                            .joinDate(LocalDate.of(2024, 2, 15))
                            .salary(new BigDecimal("80000.00"))
                            .managerId(managerId)
                            .avatarUrl("https://images.unsplash.com/photo-1519085360753-af0119f7cbe7")
                            .build(),
                    Employee.builder()
                            .name("Sophia Garcia")
                            .email("sophia.garcia@trm.com")
                            .department("HR")
                            .designation("Talent Acquisition")
                            .age(30)
                            .phone("+1 555-0107")
                            .status("PERMANENT")
                            .workMode("ON_SITE")
                            .disciplineScore(94)
                            .joinDate(LocalDate.of(2023, 4, 10))
                            .salary(new BigDecimal("68000.00"))
                            .managerId(managerId)
                            .avatarUrl("https://images.unsplash.com/photo-1517841905240-472988babdf9")
                            .build(),
                    Employee.builder()
                            .name("David Miller")
                            .email("david.miller@trm.com")
                            .department("Finance")
                            .designation("Financial Analyst")
                            .age(35)
                            .phone("+1 555-0108")
                            .status("CONTRACT")
                            .workMode("HYBRID")
                            .disciplineScore(91)
                            .joinDate(LocalDate.of(2022, 10, 5))
                            .salary(new BigDecimal("82000.00"))
                            .managerId(managerId)
                            .avatarUrl("https://images.unsplash.com/photo-1472099645785-5658abf4ff4e")
                            .build(),
                    Employee.builder()
                            .name("Olivia Davis")
                            .email("olivia.davis@trm.com")
                            .department("Sales")
                            .designation("Account Executive")
                            .age(28)
                            .phone("+1 555-0109")
                            .status("PERMANENT")
                            .workMode("ON_SITE")
                            .disciplineScore(89)
                            .joinDate(LocalDate.of(2023, 9, 1))
                            .salary(new BigDecimal("72000.00"))
                            .managerId(managerId)
                            .avatarUrl("https://images.unsplash.com/photo-1544005313-94ddf0286df2")
                            .build(),
                    Employee.builder()
                            .name("Lucas Martinez")
                            .email("lucas.martinez@trm.com")
                            .department("Engineering")
                            .designation("DevOps Intern")
                            .age(22)
                            .phone("+1 555-0110")
                            .status("INTERN")
                            .workMode("REMOTE")
                            .disciplineScore(87)
                            .joinDate(LocalDate.of(2024, 6, 1))
                            .salary(new BigDecimal("45000.00"))
                            .managerId(managerId)
                            .avatarUrl("https://images.unsplash.com/photo-1506794778202-cad84cf45f1d")
                            .build()
            );

            employeeRepository.saveAll(employees);
            log.info("Seeded 10 initial employees");
        }
    }

    private void seedProjects() {
        Integer count = jdbcTemplate.queryForObject("SELECT COUNT(*) FROM projects", Integer.class);
        if (count == null || count == 0) {
            Long userId = userRepository.findByEmail("admin@trm.com")
                    .map(User::getId)
                    .orElse(1L);

            jdbcTemplate.update(
                    "INSERT INTO projects (title, description, status, start_date, deadline, budget, created_by) " +
                            "VALUES (?, ?, ?, ?, ?, ?, ?)",
                    "CRM Modernization",
                    "Rebuilding the core CRM platform with modern layered architecture",
                    "IN_PROGRESS",
                    LocalDate.of(2026, 1, 15),
                    LocalDate.of(2026, 6, 30),
                    new BigDecimal("250000.00"),
                    userId
            );

            jdbcTemplate.update(
                    "INSERT INTO projects (title, description, status, start_date, deadline, budget, created_by) " +
                            "VALUES (?, ?, ?, ?, ?, ?, ?)",
                    "Mobile App Redesign",
                    "Revamping iOS and Android apps with new UI design system",
                    "TODO",
                    LocalDate.of(2026, 3, 1),
                    LocalDate.of(2026, 8, 15),
                    new BigDecimal("150000.00"),
                    userId
            );

            jdbcTemplate.update(
                    "INSERT INTO projects (title, description, status, start_date, deadline, budget, created_by) " +
                            "VALUES (?, ?, ?, ?, ?, ?, ?)",
                    "Cloud Migration Phase 2",
                    "Migrating on-prem database workloads to AWS RDS PostgreSQL",
                    "DONE",
                    LocalDate.of(2025, 9, 1),
                    LocalDate.of(2026, 1, 31),
                    new BigDecimal("180000.00"),
                    userId
            );

            log.info("Seeded 3 sample projects");
        }
    }

    private void seedTransactions() {
        Integer count = jdbcTemplate.queryForObject("SELECT COUNT(*) FROM transactions", Integer.class);
        if (count == null || count == 0) {
            Long userId = userRepository.findByEmail("admin@trm.com")
                    .map(User::getId)
                    .orElse(1L);

            jdbcTemplate.update(
                    "INSERT INTO transactions (description, amount, type, category, transaction_date, recorded_by) " +
                            "VALUES (?, ?, ?, ?, ?, ?)",
                    "Q1 Cloud Infrastructure (AWS)",
                    new BigDecimal("14500.00"),
                    "EXPENSE",
                    "SERVER",
                    LocalDate.of(2026, 2, 1),
                    userId
            );

            jdbcTemplate.update(
                    "INSERT INTO transactions (description, amount, type, category, transaction_date, recorded_by) " +
                            "VALUES (?, ?, ?, ?, ?, ?)",
                    "Enterprise Client Retainer - Acme Corp",
                    new BigDecimal("45000.00"),
                    "INCOME",
                    "CLIENT_PAYMENT",
                    LocalDate.of(2026, 2, 5),
                    userId
            );

            jdbcTemplate.update(
                    "INSERT INTO transactions (description, amount, type, category, transaction_date, recorded_by) " +
                            "VALUES (?, ?, ?, ?, ?, ?)",
                    "Design Tooling Licenses (Figma & Adobe)",
                    new BigDecimal("3200.00"),
                    "EXPENSE",
                    "LICENSE",
                    LocalDate.of(2026, 2, 10),
                    userId
            );

            jdbcTemplate.update(
                    "INSERT INTO transactions (description, amount, type, category, transaction_date, recorded_by) " +
                            "VALUES (?, ?, ?, ?, ?, ?)",
                    "January Employee Payroll",
                    new BigDecimal("89000.00"),
                    "EXPENSE",
                    "SALARY",
                    LocalDate.of(2026, 1, 31),
                    userId
            );

            log.info("Seeded sample transactions");
        }
    }
}
