package com.teamresource.manager.employee.repository;

import com.teamresource.manager.employee.entity.Employee;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long>, JpaSpecificationExecutor<Employee> {

    Optional<Employee> findByEmail(String email);

    boolean existsByEmail(String email);

    boolean existsByEmailAndIdNot(String email, Long id);

    Page<Employee> findByNameContainingIgnoreCaseOrDepartmentContainingIgnoreCase(
            String name,
            String department,
            Pageable pageable
    );

    @Query("SELECT e.department, COUNT(e) FROM Employee e GROUP BY e.department")
    List<Object[]> countEmployeesByDepartment();

    @Query("SELECT e.status, COUNT(e) FROM Employee e GROUP BY e.status")
    List<Object[]> countEmployeesByStatus();

    @Query("SELECT e.workMode, COUNT(e) FROM Employee e GROUP BY e.workMode")
    List<Object[]> countEmployeesByWorkMode();

    @Query("SELECT AVG(e.disciplineScore) FROM Employee e")
    Double getAverageDisciplineScore();
}
