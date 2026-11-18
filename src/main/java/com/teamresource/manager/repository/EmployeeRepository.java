package com.teamresource.manager.repository;

import com.teamresource.manager.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    Optional<Employee> findByEmail(String email);
    boolean existsByEmail(String email);

    @Query("SELECT e FROM Employee e WHERE " +
           "(:query IS NULL OR :query = '' OR LOWER(e.name) LIKE LOWER(CONCAT('%', :query, '%')) OR LOWER(e.email) LIKE LOWER(CONCAT('%', :query, '%')) OR LOWER(e.designation) LIKE LOWER(CONCAT('%', :query, '%'))) AND " +
           "(:dept IS NULL OR :dept = '' OR e.department = :dept)")
    List<Employee> searchEmployees(@Param("query") String query, @Param("dept") String dept);

    @Query("SELECT DISTINCT e.department FROM Employee e WHERE e.department IS NOT NULL ORDER BY e.department")
    List<String> findAllDepartments();
}
