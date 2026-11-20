package com.teamresource.manager.repository;

import com.teamresource.manager.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long>, JpaSpecificationExecutor<Employee> {
    Optional<Employee> findByEmail(String email);
    boolean existsByEmail(String email);
    boolean existsByEmailAndIdNot(String email, Long id);

    @Query("SELECT e FROM Employee e WHERE " +
           "(:query IS NULL OR :query = '' OR LOWER(e.name) LIKE LOWER(CONCAT('%', :query, '%')) OR LOWER(e.email) LIKE LOWER(CONCAT('%', :query, '%')) OR LOWER(e.designation) LIKE LOWER(CONCAT('%', :query, '%'))) AND " +
           "(:dept IS NULL OR :dept = '' OR e.department = :dept)")
    List<Employee> searchEmployees(@Param("query") String query, @Param("dept") String dept);

    @Query("SELECT DISTINCT e.department FROM Employee e WHERE e.department IS NOT NULL ORDER BY e.department")
    List<String> findAllDepartments();

    @Query("SELECT e.department, COUNT(e) FROM Employee e GROUP BY e.department")
    List<Object[]> countEmployeesByDepartment();

    @Query("SELECT e.status, COUNT(e) FROM Employee e GROUP BY e.status")
    List<Object[]> countEmployeesByStatus();

    @Query("SELECT e.workMode, COUNT(e) FROM Employee e GROUP BY e.workMode")
    List<Object[]> countEmployeesByWorkMode();

    @Query("SELECT AVG(e.disciplineScore) FROM Employee e")
    Double getAverageDisciplineScore();
}
