package com.teamresource.manager.finance.service;

import com.teamresource.manager.finance.dto.FinanceSummaryResponse;
import com.teamresource.manager.finance.dto.TransactionRequest;
import com.teamresource.manager.finance.dto.TransactionResponse;

import java.util.List;

public interface FinanceService {

    List<TransactionResponse> getAllTransactions();

    TransactionResponse createTransaction(TransactionRequest request, Long userId);

    FinanceSummaryResponse getFinanceSummary();

    void deleteTransaction(Long id);
}
