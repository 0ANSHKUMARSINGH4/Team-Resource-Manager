package com.teamresource.manager;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    // This interface gives us magical methods like .findAll(), .save(), .count()
    // without writing a single line of SQL!
}