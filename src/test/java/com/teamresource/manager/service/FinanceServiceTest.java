package com.teamresource.manager.service;

import com.teamresource.manager.entity.Transaction;
import com.teamresource.manager.repository.TransactionRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class FinanceServiceTest {

    @Mock
    private TransactionRepository transactionRepository;

    @InjectMocks
    private FinanceService financeService;

    @Test
    void testNetIncomeCalculation() {
        when(transactionRepository.sumTotalIncome()).thenReturn(new BigDecimal("100000.00"));
        when(transactionRepository.sumTotalExpense()).thenReturn(new BigDecimal("40000.00"));

        BigDecimal net = financeService.getNetIncome();
        assertNotNull(net);
        assertEquals(new BigDecimal("60000.00"), net);
    }

    @Test
    void testProfitMarginCalculation() {
        when(transactionRepository.sumTotalIncome()).thenReturn(new BigDecimal("100000.00"));
        when(transactionRepository.sumTotalExpense()).thenReturn(new BigDecimal("20000.00"));

        double margin = financeService.getProfitMargin();
        assertEquals(80.0, margin, 0.01);
    }
}
