package com.teamresource.manager.ui;

import com.teamresource.manager.entity.ActivityLog;
import com.teamresource.manager.service.DashboardService;
import com.vaadin.flow.component.UI;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.button.ButtonVariant;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.H2;
import com.vaadin.flow.component.html.H3;
import com.vaadin.flow.component.html.Paragraph;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.component.orderedlayout.FlexComponent;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.router.RouteAlias;
import jakarta.annotation.security.PermitAll;

import java.math.BigDecimal;
import java.text.NumberFormat;
import java.time.format.DateTimeFormatter;
import java.util.Locale;

@Route(value = "", layout = MainLayout.class)
@RouteAlias(value = "dashboard", layout = MainLayout.class)
@PageTitle("Dashboard | Team Resource Manager")
@PermitAll
public class DashboardView extends VerticalLayout {

    private final DashboardService dashboardService;
    private final NumberFormat currencyFormat = NumberFormat.getCurrencyInstance(Locale.US);

    public DashboardView(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
        setSizeFull();
        setPadding(true);
        setSpacing(true);

        createHeroHeader();
        createKpiGrid();
        createQuickActions();
        createActivitySection();
    }

    private void createHeroHeader() {
        H2 welcome = new H2("Enterprise Resource Overview");
        welcome.getStyle().set("margin", "0");

        Paragraph sub = new Paragraph("Live operations metrics, active sprint workloads, and cash flow balance");
        sub.getStyle().set("color", "var(--lumo-secondary-text-color)").set("margin-top", "0.25rem");

        add(welcome, sub);
    }

    private void createKpiGrid() {
        HorizontalLayout kpiLayout = new HorizontalLayout();
        kpiLayout.setWidthFull();
        kpiLayout.setSpacing(true);

        long employees = dashboardService.getEmployeeCount();
        long activeProjects = dashboardService.getActiveProjectCount();
        BigDecimal income = dashboardService.getTotalIncome();
        BigDecimal expenses = dashboardService.getTotalExpenses();
        BigDecimal net = income.subtract(expenses);

        kpiLayout.add(
                createCard("Total Personnel", String.valueOf(employees), VaadinIcon.USERS, "var(--lumo-primary-color)"),
                createCard("Active Projects", String.valueOf(activeProjects), VaadinIcon.TASKS, "#059669"),
                createCard("Total Revenue", currencyFormat.format(income), VaadinIcon.ARROW_UP, "#10B981"),
                createCard("Total Expenses", currencyFormat.format(expenses), VaadinIcon.ARROW_DOWN, "#EF4444"),
                createCard("Net Cash Flow", currencyFormat.format(net), VaadinIcon.CHART_LINE, net.compareTo(BigDecimal.ZERO) >= 0 ? "#10B981" : "#EF4444")
        );

        add(kpiLayout);
    }

    private Div createCard(String title, String value, VaadinIcon icon, String color) {
        Div card = new Div();
        card.getStyle()
                .set("background-color", "var(--lumo-base-color)")
                .set("border", "1px solid var(--lumo-contrast-10pct)")
                .set("border-radius", "0.75rem")
                .set("padding", "1.25rem")
                .set("flex", "1")
                .set("box-shadow", "0 1px 3px 0 rgba(0, 0, 0, 0.05)");

        HorizontalLayout top = new HorizontalLayout();
        top.setWidthFull();
        top.setJustifyContentMode(FlexComponent.JustifyContentMode.BETWEEN);

        Span titleSpan = new Span(title);
        titleSpan.getStyle()
                .set("font-size", "0.8125rem")
                .set("font-weight", "600")
                .set("text-transform", "uppercase")
                .set("letter-spacing", "0.05em")
                .set("color", "var(--lumo-secondary-text-color)");

        com.vaadin.flow.component.icon.Icon cardIcon = icon.create();
        cardIcon.getStyle().set("color", color);

        top.add(titleSpan, cardIcon);

        H3 valueHeader = new H3(value);
        valueHeader.getStyle()
                .set("margin", "0.5rem 0 0 0")
                .set("font-size", "1.75rem")
                .set("font-weight", "700");

        card.add(top, valueHeader);
        return card;
    }

    private void createQuickActions() {
        HorizontalLayout actions = new HorizontalLayout();
        actions.setWidthFull();
        actions.setDefaultVerticalComponentAlignment(FlexComponent.Alignment.CENTER);

        Span label = new Span("Quick Navigation:");
        label.getStyle().set("font-weight", "600").set("color", "var(--lumo-secondary-text-color)");

        Button btnEmployees = new Button("Employee Directory", VaadinIcon.USERS.create(), e -> UI.getCurrent().navigate(EmployeeView.class));
        btnEmployees.addThemeVariants(ButtonVariant.LUMO_PRIMARY);

        Button btnProjects = new Button("Projects Board", VaadinIcon.TASKS.create(), e -> UI.getCurrent().navigate(ProjectView.class));
        btnProjects.addThemeVariants(ButtonVariant.LUMO_SUCCESS);

        Button btnFinance = new Button("Finance Ledger", VaadinIcon.MONEY.create(), e -> UI.getCurrent().navigate(FinanceView.class));
        btnFinance.addThemeVariants(ButtonVariant.LUMO_CONTRAST);

        Button btnCalendar = new Button("Schedule", VaadinIcon.CALENDAR.create(), e -> UI.getCurrent().navigate(CalendarView.class));

        actions.add(label, btnEmployees, btnProjects, btnFinance, btnCalendar);
        add(actions);
    }

    private void createActivitySection() {
        VerticalLayout section = new VerticalLayout();
        section.setWidthFull();
        section.setPadding(false);

        H3 heading = new H3("Recent Audit Activity");
        heading.getStyle().set("margin-top", "1rem");

        Grid<ActivityLog> activityGrid = new Grid<>(ActivityLog.class, false);
        activityGrid.setWidthFull();
        activityGrid.setAllRowsVisible(true);

        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("MMM dd, yyyy HH:mm");

        activityGrid.addColumn(ActivityLog::getAction).setHeader("Action").setAutoWidth(true);
        activityGrid.addColumn(ActivityLog::getEntityType).setHeader("Entity").setAutoWidth(true);
        activityGrid.addColumn(a -> "ID #" + a.getEntityId()).setHeader("Target Ref").setAutoWidth(true);
        activityGrid.addColumn(a -> a.getPerformedAt() != null ? dtf.format(a.getPerformedAt()) : "Just now")
                .setHeader("Timestamp").setAutoWidth(true);

        activityGrid.setItems(dashboardService.getRecentActivities());

        section.add(heading, activityGrid);
        add(section);
    }
}
