package com.teamresource.manager.service;

import com.teamresource.manager.entity.Transaction;
import com.teamresource.manager.repository.TransactionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;

@Service
@RequiredArgsConstructor
public class FinanceService {

    private final TransactionRepository transactionRepository;

    @Transactional(readOnly = true)
    public List<Transaction> findAll() {
        return transactionRepository.findAllByOrderByTransactionDateDesc();
    }

    @Transactional(readOnly = true)
    public BigDecimal getTotalIncome() {
        BigDecimal sum = transactionRepository.sumTotalIncome();
        return sum != null ? sum : BigDecimal.ZERO;
    }

    @Transactional(readOnly = true)
    public BigDecimal getTotalExpenses() {
        BigDecimal sum = transactionRepository.sumTotalExpense();
        return sum != null ? sum : BigDecimal.ZERO;
    }

    @Transactional(readOnly = true)
    public BigDecimal getNetIncome() {
        return getTotalIncome().subtract(getTotalExpenses());
    }

    @Transactional(readOnly = true)
    public double getProfitMargin() {
        BigDecimal income = getTotalIncome();
        if (income.compareTo(BigDecimal.ZERO) <= 0) {
            return 0.0;
        }
        return getNetIncome()
                .divide(income, 4, RoundingMode.HALF_UP)
                .multiply(new BigDecimal("100"))
                .doubleValue();
    }

    @Transactional
    public Transaction save(Transaction transaction) {
        return transactionRepository.save(transaction);
    }

    @Transactional
    public void delete(Transaction transaction) {
        transactionRepository.delete(transaction);
    }
}
