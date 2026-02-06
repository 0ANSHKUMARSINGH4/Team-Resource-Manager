package com.teamresource.manager;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import java.util.List;

@Component
public class DataSeeder implements CommandLineRunner {

    private final EmployeeRepository employeeRepository;

    public DataSeeder(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        if (employeeRepository.count() == 0) {
            List<Employee> employees = List.of(
                    new Employee("Justin Lipshutz", "Marketing", 22, 100, "Permanent"),
                    new Employee("Marcus Culhane", "Finance", 24, 95, "Contract"),
                    new Employee("Leo Stanton", "R&D", 28, 89, "Permanent"),
                    new Employee("Sasha Cohen", "HR", 25, 92, "Permanent"),
                    new Employee("Michael Scott", "Marketing", 40, 75, "Contract"),
                    new Employee("Dwight Schrute", "Sales", 35, 99, "Permanent"),
                    new Employee("Jim Halpert", "Sales", 32, 85, "Permanent"),
                    new Employee("Pam Beesly", "Admin", 30, 88, "Permanent"),
                    new Employee("Ryan Howard", "Temp", 26, 60, "Contract"),
                    new Employee("Stanley Hudson", "Sales", 55, 70, "Permanent")
            );

            employeeRepository.saveAll(employees);
            System.out.println("✅ Database seeded with " + employees.size() + " employees!");
        }
    }
}