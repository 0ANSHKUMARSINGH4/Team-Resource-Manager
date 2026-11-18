package com.teamresource.manager.repository;

import com.teamresource.manager.entity.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    List<Transaction> findAllByOrderByTransactionDateDesc();

    @Query("SELECT SUM(t.amount) FROM Transaction t WHERE UPPER(t.type) = 'INCOME'")
    BigDecimal sumTotalIncome();

    @Query("SELECT SUM(t.amount) FROM Transaction t WHERE UPPER(t.type) = 'EXPENSE'")
    BigDecimal sumTotalExpense();
}
