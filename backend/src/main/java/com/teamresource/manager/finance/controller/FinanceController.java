package com.teamresource.manager.finance.controller;

import com.teamresource.manager.finance.dto.FinanceSummaryResponse;
import com.teamresource.manager.finance.dto.TransactionRequest;
import com.teamresource.manager.finance.dto.TransactionResponse;
import com.teamresource.manager.finance.service.FinanceService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/finance")
@RequiredArgsConstructor
@Tag(name = "Finance & Ledger", description = "Endpoints for tracking financial transactions, gross burn, margins, and cash flow")
public class FinanceController {

    private final FinanceService financeService;

    @GetMapping("/transactions")
    @Operation(summary = "Get all transactions", description = "Retrieves double-entry ledger transactions")
    public ResponseEntity<List<TransactionResponse>> getAllTransactions() {
        return ResponseEntity.ok(financeService.getAllTransactions());
    }

    @PostMapping("/transactions")
    @Operation(summary = "Create transaction", description = "Records a new revenue or expense transaction")
    public ResponseEntity<TransactionResponse> createTransaction(
            @Valid @RequestBody TransactionRequest request,
            @AuthenticationPrincipal Object principal
    ) {
        Long userId = 1L;
        TransactionResponse response = financeService.createTransaction(request, userId);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/summary")
    @Operation(summary = "Get finance summary", description = "Returns aggregated annual budget, expenses, and net margins")
    public ResponseEntity<FinanceSummaryResponse> getFinanceSummary() {
        return ResponseEntity.ok(financeService.getFinanceSummary());
    }

    @DeleteMapping("/transactions/{id}")
    @Operation(summary = "Delete transaction", description = "Deletes a ledger entry by ID")
    public ResponseEntity<Void> deleteTransaction(@PathVariable Long id) {
        financeService.deleteTransaction(id);
        return ResponseEntity.noContent().build();
    }
}
