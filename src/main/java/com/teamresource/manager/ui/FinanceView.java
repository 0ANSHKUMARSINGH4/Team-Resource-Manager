package com.teamresource.manager.ui;

import com.teamresource.manager.entity.Transaction;
import com.teamresource.manager.service.FinanceService;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.button.ButtonVariant;
import com.vaadin.flow.component.combobox.ComboBox;
import com.vaadin.flow.component.datepicker.DatePicker;
import com.vaadin.flow.component.dialog.Dialog;
import com.vaadin.flow.component.formlayout.FormLayout;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.H2;
import com.vaadin.flow.component.html.H4;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.component.notification.NotificationVariant;
import com.vaadin.flow.component.orderedlayout.FlexComponent;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.BigDecimalField;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;
import jakarta.annotation.security.PermitAll;

import java.math.BigDecimal;
import java.text.NumberFormat;
import java.time.LocalDate;
import java.util.Locale;

@Route(value = "finance", layout = MainLayout.class)
@PageTitle("Finance Ledger | Team Resource Manager")
@PermitAll
public class FinanceView extends VerticalLayout {

    private final FinanceService financeService;
    private final Grid<Transaction> grid = new Grid<>(Transaction.class, false);
    private final HorizontalLayout kpiLayout = new HorizontalLayout();
    private final NumberFormat currencyFormat = NumberFormat.getCurrencyInstance(Locale.US);

    public FinanceView(FinanceService financeService) {
        this.financeService = financeService;
        setSizeFull();
        setPadding(true);

        H2 header = new H2("Financial Ledger & Cash Flow");
        header.getStyle().set("margin", "0");

        Button addTxBtn = new Button("Record Transaction", VaadinIcon.PLUS.create(), click -> openTransactionDialog());
        addTxBtn.addThemeVariants(ButtonVariant.LUMO_PRIMARY);

        HorizontalLayout topBar = new HorizontalLayout(header, addTxBtn);
        topBar.setWidthFull();
        topBar.setDefaultVerticalComponentAlignment(FlexComponent.Alignment.CENTER);
        topBar.setJustifyContentMode(FlexComponent.JustifyContentMode.BETWEEN);

        kpiLayout.setWidthFull();
        kpiLayout.setSpacing(true);

        configureGrid();
        refresh();

        add(topBar, kpiLayout, grid);
    }

    private void refresh() {
        kpiLayout.removeAll();

        BigDecimal income = financeService.getTotalIncome();
        BigDecimal expense = financeService.getTotalExpenses();
        BigDecimal net = financeService.getNetIncome();
        double margin = financeService.getProfitMargin();

        kpiLayout.add(
                createKpiCard("Total Income", currencyFormat.format(income), VaadinIcon.ARROW_UP, "#10B981"),
                createKpiCard("Total Expenses", currencyFormat.format(expense), VaadinIcon.ARROW_DOWN, "#EF4444"),
                createKpiCard("Net Operating Income", currencyFormat.format(net), VaadinIcon.CHART_LINE, net.compareTo(BigDecimal.ZERO) >= 0 ? "#10B981" : "#EF4444"),
                createKpiCard("Operating Margin", String.format("%.1f%%", margin), VaadinIcon.TRENDING_UP, "#3B82F6")
        );

        grid.setItems(financeService.findAll());
    }

    private Div createKpiCard(String title, String val, VaadinIcon icon, String color) {
        Div card = new Div();
        card.getStyle()
                .set("background-color", "var(--lumo-base-color)")
                .set("border", "1px solid var(--lumo-contrast-10pct)")
                .set("border-radius", "0.5rem")
                .set("padding", "1rem")
                .set("flex", "1");

        Span t = new Span(title);
        t.getStyle().set("font-size", "0.75rem").set("font-weight", "600").set("text-transform", "uppercase").set("color", "var(--lumo-secondary-text-color)");

        H4 v = new H4(val);
        v.getStyle().set("margin", "0.25rem 0 0 0").set("font-size", "1.5rem").set("color", color);

        card.add(t, v);
        return card;
    }

    private void configureGrid() {
        grid.setSizeFull();
        grid.addColumn(Transaction::getTransactionDate).setHeader("Date").setSortable(true).setAutoWidth(true);
        grid.addColumn(Transaction::getDescription).setHeader("Description").setAutoWidth(true);

        grid.addComponentColumn(tx -> {
            Span badge = new Span(tx.getCategory() != null ? tx.getCategory() : "GENERAL");
            badge.getElement().getThemeList().add("badge");
            return badge;
        }).setHeader("Category").setAutoWidth(true);

        grid.addComponentColumn(tx -> {
            Span typeBadge = new Span(tx.getType());
            typeBadge.getElement().getThemeList().add("badge");
            if ("INCOME".equalsIgnoreCase(tx.getType())) {
                typeBadge.getElement().getThemeList().add("success");
            } else {
                typeBadge.getElement().getThemeList().add("error");
            }
            return typeBadge;
        }).setHeader("Type").setAutoWidth(true);

        grid.addColumn(tx -> {
            String sign = "INCOME".equalsIgnoreCase(tx.getType()) ? "+" : "-";
            return sign + currencyFormat.format(tx.getAmount());
        }).setHeader("Amount").setSortable(true).setAutoWidth(true);

        grid.addComponentColumn(tx -> {
            Button delBtn = new Button(VaadinIcon.TRASH.create(), click -> {
                financeService.delete(tx);
                refresh();
                Notification.show("Transaction removed", 2500, Notification.Position.BOTTOM_END);
            });
            delBtn.addThemeVariants(ButtonVariant.LUMO_TERTIARY, ButtonVariant.LUMO_ERROR, ButtonVariant.LUMO_SMALL);
            return delBtn;
        }).setHeader("Actions").setAutoWidth(true);
    }

    private void openTransactionDialog() {
        Dialog dialog = new Dialog();
        dialog.setHeaderTitle("Record Ledger Transaction");

        TextField descField = new TextField("Description");
        descField.setRequired(true);

        BigDecimalField amountField = new BigDecimalField("Amount ($)");
        amountField.setRequiredIndicatorVisible(true);

        ComboBox<String> typeField = new ComboBox<>("Type", "INCOME", "EXPENSE");
        typeField.setValue("INCOME");

        ComboBox<String> categoryField = new ComboBox<>("Category", "CLIENT_PAYMENT", "INFRASTRUCTURE", "LICENSES", "SALARY", "MARKETING", "GENERAL");
        categoryField.setValue("CLIENT_PAYMENT");

        DatePicker datePicker = new DatePicker("Transaction Date");
        datePicker.setValue(LocalDate.now());

        FormLayout formLayout = new FormLayout(descField, amountField, typeField, categoryField, datePicker);

        Button saveBtn = new Button("Save Transaction", click -> {
            if (descField.isEmpty() || amountField.isEmpty()) {
                Notification.show("Please provide description and amount", 3000, Notification.Position.MIDDLE);
                return;
            }

            Transaction tx = Transaction.builder()
                    .description(descField.getValue())
                    .amount(amountField.getValue())
                    .type(typeField.getValue())
                    .category(categoryField.getValue())
                    .transactionDate(datePicker.getValue() != null ? datePicker.getValue() : LocalDate.now())
                    .build();

            financeService.save(tx);
            refresh();
            dialog.close();
            Notification notif = Notification.show("Transaction recorded successfully!", 3000, Notification.Position.BOTTOM_END);
            notif.addThemeVariants(NotificationVariant.LUMO_SUCCESS);
        });
        saveBtn.addThemeVariants(ButtonVariant.LUMO_PRIMARY);

        Button cancelBtn = new Button("Cancel", e -> dialog.close());

        dialog.add(formLayout);
        dialog.getFooter().add(cancelBtn, saveBtn);
        dialog.open();
    }
}
