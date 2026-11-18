package com.teamresource.manager.finance.service;

import com.teamresource.manager.finance.dto.FinanceSummaryResponse;
import com.teamresource.manager.finance.dto.TransactionRequest;
import com.teamresource.manager.finance.dto.TransactionResponse;
import com.teamresource.manager.finance.entity.Transaction;
import com.teamresource.manager.finance.repository.TransactionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class FinanceServiceImpl implements FinanceService {

    private final TransactionRepository transactionRepository;

    @Override
    @Transactional(readOnly = true)
    public List<TransactionResponse> getAllTransactions() {
        return transactionRepository.findAllByOrderByTransactionDateDesc().stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    @Transactional
    public TransactionResponse createTransaction(TransactionRequest request, Long userId) {
        String type = request.getType().toUpperCase();
        LocalDate date = request.getTransactionDate() != null ? request.getTransactionDate() : LocalDate.now();

        Transaction transaction = Transaction.builder()
                .description(request.getDescription())
                .amount(request.getAmount())
                .type(type)
                .category(request.getCategory() != null ? request.getCategory().toUpperCase() : "GENERAL")
                .transactionDate(date)
                .recordedBy(userId)
                .build();

        Transaction saved = transactionRepository.save(transaction);
        return mapToResponse(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public FinanceSummaryResponse getFinanceSummary() {
        BigDecimal totalIncome = transactionRepository.sumTotalIncome();
        BigDecimal totalExpenses = transactionRepository.sumTotalExpense();
        BigDecimal netIncome = totalIncome.subtract(totalExpenses);

        BigDecimal annualBudget = new BigDecimal("128000.00");

        double profitMargin = 0.0;
        if (totalIncome.compareTo(BigDecimal.ZERO) > 0) {
            profitMargin = netIncome
                    .divide(totalIncome, 4, RoundingMode.HALF_UP)
                    .multiply(new BigDecimal("100"))
                    .doubleValue();
        }

        List<Map<String, Object>> cashFlow = new ArrayList<>();
        String[] months = {"Jan", "Feb", "Mar", "Apr", "May", "Jun"};
        int[] incomeVals = {35000, 42000, 48000, 52000, 58000, 64000};
        int[] expenseVals = {18000, 22000, 20000, 24000, 21000, 25000};

        for (int i = 0; i < months.length; i++) {
            Map<String, Object> point = new HashMap<>();
            point.put("month", months[i]);
            point.put("income", incomeVals[i]);
            point.put("expenses", expenseVals[i]);
            point.put("net", incomeVals[i] - expenseVals[i]);
            cashFlow.add(point);
        }

        return FinanceSummaryResponse.builder()
                .totalBudget(annualBudget)
                .totalExpenses(totalExpenses)
                .totalIncome(totalIncome)
                .netIncome(netIncome)
                .profitMargin(Math.round(profitMargin * 10.0) / 10.0)
                .monthlyCashFlow(cashFlow)
                .build();
    }

    @Override
    @Transactional
    public void deleteTransaction(Long id) {
        if (!transactionRepository.existsById(id)) {
            throw new IllegalArgumentException("Transaction not found with id: " + id);
        }
        transactionRepository.deleteById(id);
    }

    private TransactionResponse mapToResponse(Transaction t) {
        return TransactionResponse.builder()
                .id(t.getId())
                .description(t.getDescription())
                .amount(t.getAmount())
                .type(t.getType())
                .category(t.getCategory())
                .transactionDate(t.getTransactionDate())
                .recordedBy(t.getRecordedBy())
                .createdAt(t.getCreatedAt())
                .build();
    }
}
