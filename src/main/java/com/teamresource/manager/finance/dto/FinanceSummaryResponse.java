package com.teamresource.manager.finance.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FinanceSummaryResponse {

    private BigDecimal totalBudget;
    private BigDecimal totalExpenses;
    private BigDecimal totalIncome;
    private BigDecimal netIncome;
    private Double profitMargin;
    private List<Map<String, Object>> monthlyCashFlow;
}
