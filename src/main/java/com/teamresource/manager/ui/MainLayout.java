package com.teamresource.manager.ui;

import com.teamresource.manager.config.SecurityService;
import com.teamresource.manager.entity.Employee;
import com.teamresource.manager.entity.Project;
import com.teamresource.manager.entity.Transaction;
import com.teamresource.manager.service.EmployeeService;
import com.teamresource.manager.service.FinanceService;
import com.teamresource.manager.service.ProjectService;
import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.Key;
import com.vaadin.flow.component.applayout.AppLayout;
import com.vaadin.flow.component.applayout.DrawerToggle;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.button.ButtonVariant;
import com.vaadin.flow.component.contextmenu.ContextMenu;
import com.vaadin.flow.component.contextmenu.MenuItem;
import com.vaadin.flow.component.html.H1;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.icon.Icon;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.component.orderedlayout.FlexComponent;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.sidenav.SideNav;
import com.vaadin.flow.component.sidenav.SideNavItem;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.data.value.ValueChangeMode;
import com.vaadin.flow.dom.ThemeList;
import com.vaadin.flow.theme.lumo.Lumo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;

public class MainLayout extends AppLayout {

    private final SecurityService securityService;
    private final EmployeeService employeeService;
    private final ProjectService projectService;
    private final FinanceService financeService;

    public MainLayout(SecurityService securityService) {
        this(securityService, null, null, null);
    }

    @Autowired
    public MainLayout(SecurityService securityService,
                      @Autowired(required = false) EmployeeService employeeService,
                      @Autowired(required = false) ProjectService projectService,
                      @Autowired(required = false) FinanceService financeService) {
        this.securityService = securityService;
        this.employeeService = employeeService;
        this.projectService = projectService;
        this.financeService = financeService;
        createHeader();
        createDrawer();
    }

    private void createHeader() {
        H1 logo = new H1("TRM");
        logo.addClassNames("text-l", "m-m");
        logo.getStyle()
                .set("font-size", "1.25rem")
                .set("margin", "0")
                .set("font-weight", "800")
                .set("color", "var(--lumo-primary-color)");

        Span title = new Span("Team Resource Manager");
        title.getStyle()
                .set("font-weight", "600")
                .set("color", "var(--lumo-header-text-color)");

        Component quickBar = createQuickBar();

        Button themeToggle = new Button(VaadinIcon.MOON.create(), click -> {
            ThemeList themeList = getElement().getThemeList();
            if (themeList.contains(Lumo.DARK)) {
                themeList.remove(Lumo.DARK);
                click.getSource().setIcon(VaadinIcon.MOON.create());
            } else {
                themeList.add(Lumo.DARK);
                click.getSource().setIcon(VaadinIcon.SUN_O.create());
            }
        });
        themeToggle.addThemeVariants(ButtonVariant.LUMO_TERTIARY);
        themeToggle.setTooltipText("Toggle Dark/Light Mode");

        UserDetails user = securityService.getAuthenticatedUser();
        String username = user != null ? user.getUsername() : "Admin";

        Span userBadge = new Span(username);
        userBadge.getStyle()
                .set("font-size", "0.875rem")
                .set("padding", "0.25rem 0.75rem")
                .set("border-radius", "9999px")
                .set("background-color", "var(--lumo-contrast-5pct)")
                .set("font-weight", "500");

        Button logout = new Button("Sign out", VaadinIcon.SIGN_OUT.create(), e -> securityService.logout());
        logout.addThemeVariants(ButtonVariant.LUMO_TERTIARY, ButtonVariant.LUMO_ERROR);

        HorizontalLayout headerRight = new HorizontalLayout(themeToggle, userBadge, logout);
        headerRight.setDefaultVerticalComponentAlignment(FlexComponent.Alignment.CENTER);
        headerRight.setSpacing(true);

        HorizontalLayout header = new HorizontalLayout(new DrawerToggle(), logo, title, quickBar, headerRight);
        header.setDefaultVerticalComponentAlignment(FlexComponent.Alignment.CENTER);
        header.expand(title);
        header.setWidthFull();
        header.addClassNames("py-0", "px-m");
        header.getStyle()
                .set("border-bottom", "1px solid var(--lumo-contrast-10pct)")
                .set("padding", "0.5rem 1rem");

        addToNavbar(header);
    }

    private Component createQuickBar() {
        TextField quickBar = new TextField();
        quickBar.setPlaceholder("Quick Bar (Search records, pages... ⌘K)");
        quickBar.setPrefixComponent(VaadinIcon.SEARCH.create());
        quickBar.setClearButtonVisible(true);
        quickBar.setValueChangeMode(ValueChangeMode.EAGER);
        quickBar.setWidth("340px");
        quickBar.getStyle()
                .set("margin", "0 1rem")
                .set("font-size", "0.85rem");

        ContextMenu resultsMenu = new ContextMenu(quickBar);
        resultsMenu.setOpenOnClick(true);

        quickBar.addValueChangeListener(event -> {
            String query = event.getValue() != null ? event.getValue().trim() : "";
            updateQuickBarResults(resultsMenu, quickBar, query);
        });

        quickBar.addKeyDownListener(Key.ENTER, event -> {
            String query = quickBar.getValue() != null ? quickBar.getValue().trim() : "";
            if (!query.isEmpty()) {
                handleQuickBarEnter(query);
                quickBar.clear();
                resultsMenu.close();
            }
        });

        return quickBar;
    }

    private void updateQuickBarResults(ContextMenu menu, TextField quickBar, String query) {
        menu.removeAll();
        if (query == null || query.trim().isEmpty()) {
            menu.close();
            return;
        }
        String q = query.trim().toLowerCase();

        boolean hasResults = false;

        // 1. Pages
        List<PageItem> pages = List.of(
                new PageItem("Dashboard", DashboardView.class, VaadinIcon.DASHBOARD),
                new PageItem("Employees", EmployeeView.class, VaadinIcon.USERS),
                new PageItem("Projects & Sprints", ProjectView.class, VaadinIcon.TASKS),
                new PageItem("Finance Ledger", FinanceView.class, VaadinIcon.MONEY_EXCHANGE),
                new PageItem("Calendar", CalendarView.class, VaadinIcon.CALENDAR),
                new PageItem("Settings", SettingsView.class, VaadinIcon.COG)
        );

        for (PageItem page : pages) {
            if (q.isEmpty() || page.title().toLowerCase().contains(q)) {
                hasResults = true;
                menu.addItem(createItemComponent(page.icon(), page.title(), "Page"), e -> {
                    getUI().ifPresent(ui -> ui.navigate(page.viewClass()));
                });
            }
        }

        // 2. Employees (if service available and query not empty)
        if (!q.isEmpty() && employeeService != null) {
            try {
                List<Employee> emps = employeeService.findAll(query, "");
                int count = 0;
                for (Employee emp : emps) {
                    if (count++ >= 4) break;
                    hasResults = true;
                    String label = emp.getName() + " (" + (emp.getDepartment() != null ? emp.getDepartment() : "Staff") + ")";
                    menu.addItem(createItemComponent(VaadinIcon.USER, label, "Employee"), e -> {
                        getUI().ifPresent(ui -> ui.navigate(EmployeeView.class));
                    });
                }
            } catch (Exception ignored) {
            }
        }

        // 3. Projects (if service available and query not empty)
        if (!q.isEmpty() && projectService != null) {
            try {
                List<Project> projs = projectService.findAll();
                int count = 0;
                for (Project proj : projs) {
                    if (proj.getTitle() != null && proj.getTitle().toLowerCase().contains(q)) {
                        if (count++ >= 4) break;
                        hasResults = true;
                        String label = proj.getTitle() + " [" + proj.getStatus() + "]";
                        menu.addItem(createItemComponent(VaadinIcon.TASKS, label, "Project"), e -> {
                            getUI().ifPresent(ui -> ui.navigate(ProjectView.class));
                        });
                    }
                }
            } catch (Exception ignored) {
            }
        }

        // 4. Finance (if service available and query not empty)
        if (!q.isEmpty() && financeService != null) {
            try {
                List<Transaction> txs = financeService.findAll();
                int count = 0;
                for (Transaction tx : txs) {
                    if (tx.getDescription() != null && tx.getDescription().toLowerCase().contains(q)) {
                        if (count++ >= 4) break;
                        hasResults = true;
                        String amountStr = tx.getAmount() != null ? "$" + tx.getAmount() : "";
                        String label = tx.getDescription() + " (" + amountStr + ")";
                        menu.addItem(createItemComponent(VaadinIcon.MONEY, label, "Finance"), e -> {
                            getUI().ifPresent(ui -> ui.navigate(FinanceView.class));
                        });
                    }
                }
            } catch (Exception ignored) {
            }
        }

        if (!hasResults && !q.isEmpty()) {
            MenuItem emptyItem = menu.addItem("No matching records found for \"" + query + "\"");
            emptyItem.setEnabled(false);
        }

        menu.getElement().executeJs("if (this.open) { const rect = $0.getBoundingClientRect(); this.open({clientX: rect.left, clientY: rect.bottom}); }", quickBar.getElement());
    }

    private HorizontalLayout createItemComponent(VaadinIcon icon, String text, String category) {
        HorizontalLayout layout = new HorizontalLayout();
        layout.setDefaultVerticalComponentAlignment(FlexComponent.Alignment.CENTER);
        layout.setSpacing(true);

        Icon vaadinIcon = icon.create();
        vaadinIcon.setSize("14px");
        vaadinIcon.setColor("var(--lumo-primary-color)");

        Span textSpan = new Span(text);
        textSpan.getStyle().set("font-size", "0.85rem").set("font-weight", "500");

        Span badge = new Span(category);
        badge.getStyle()
                .set("font-size", "0.7rem")
                .set("padding", "0.1rem 0.4rem")
                .set("border-radius", "4px")
                .set("background-color", "var(--lumo-contrast-10pct)")
                .set("color", "var(--lumo-secondary-text-color)")
                .set("margin-left", "auto");

        layout.add(vaadinIcon, textSpan, badge);
        layout.setWidthFull();
        return layout;
    }

    private void handleQuickBarEnter(String query) {
        String q = query.toLowerCase();
        if (q.contains("dash")) {
            getUI().ifPresent(ui -> ui.navigate(DashboardView.class));
        } else if (q.contains("emp") || q.contains("user") || q.contains("people")) {
            getUI().ifPresent(ui -> ui.navigate(EmployeeView.class));
        } else if (q.contains("proj") || q.contains("task") || q.contains("kanban")) {
            getUI().ifPresent(ui -> ui.navigate(ProjectView.class));
        } else if (q.contains("fin") || q.contains("money") || q.contains("tx") || q.contains("pay")) {
            getUI().ifPresent(ui -> ui.navigate(FinanceView.class));
        } else if (q.contains("cal") || q.contains("event")) {
            getUI().ifPresent(ui -> ui.navigate(CalendarView.class));
        } else if (q.contains("set")) {
            getUI().ifPresent(ui -> ui.navigate(SettingsView.class));
        } else if (employeeService != null && !employeeService.findAll(query, "").isEmpty()) {
            getUI().ifPresent(ui -> ui.navigate(EmployeeView.class));
        } else {
            getUI().ifPresent(ui -> ui.navigate(EmployeeView.class));
        }
    }

    private Component createQuickBar() {
        TextField quickBar = new TextField();
        quickBar.setPlaceholder("Quick Bar (Search records, pages... ⌘K)");
        quickBar.setPrefixComponent(VaadinIcon.SEARCH.create());
        quickBar.setClearButtonVisible(true);
        quickBar.setValueChangeMode(ValueChangeMode.EAGER);
        quickBar.setWidth("340px");
        quickBar.getStyle()
                .set("margin", "0 1rem")
                .set("font-size", "0.85rem");

        ContextMenu resultsMenu = new ContextMenu(quickBar);
        resultsMenu.setOpenOnClick(true);

        quickBar.addValueChangeListener(event -> {
            String query = event.getValue() != null ? event.getValue().trim() : "";
            updateQuickBarResults(resultsMenu, quickBar, query);
        });

        quickBar.addKeyDownListener(Key.ENTER, event -> {
            String query = quickBar.getValue() != null ? quickBar.getValue().trim() : "";
            if (!query.isEmpty()) {
                handleQuickBarEnter(query);
                quickBar.clear();
                resultsMenu.close();
            }
        });

        return quickBar;
    }

    private void updateQuickBarResults(ContextMenu menu, TextField quickBar, String query) {
        menu.removeAll();
        String q = query.toLowerCase();

        boolean hasResults = false;

        // 1. Pages
        List<PageItem> pages = List.of(
                new PageItem("Dashboard", DashboardView.class, VaadinIcon.DASHBOARD),
                new PageItem("Employees", EmployeeView.class, VaadinIcon.USERS),
                new PageItem("Projects & Sprints", ProjectView.class, VaadinIcon.TASKS),
                new PageItem("Finance Ledger", FinanceView.class, VaadinIcon.MONEY_EXCHANGE),
                new PageItem("Calendar", CalendarView.class, VaadinIcon.CALENDAR),
                new PageItem("Settings", SettingsView.class, VaadinIcon.COG)
        );

        for (PageItem page : pages) {
            if (q.isEmpty() || page.title().toLowerCase().contains(q)) {
                hasResults = true;
                menu.addItem(createItemComponent(page.icon(), page.title(), "Page"), e -> {
                    getUI().ifPresent(ui -> ui.navigate(page.viewClass()));
                });
            }
        }

        // 2. Employees (if service available and query not empty)
        if (!q.isEmpty() && employeeService != null) {
            try {
                List<Employee> emps = employeeService.findAll(query, "");
                int count = 0;
                for (Employee emp : emps) {
                    if (count++ >= 4) break;
                    hasResults = true;
                    String label = emp.getName() + " (" + (emp.getDepartment() != null ? emp.getDepartment() : "Staff") + ")";
                    menu.addItem(createItemComponent(VaadinIcon.USER, label, "Employee"), e -> {
                        getUI().ifPresent(ui -> ui.navigate(EmployeeView.class));
                    });
                }
            } catch (Exception ignored) {
            }
        }

        // 3. Projects (if service available and query not empty)
        if (!q.isEmpty() && projectService != null) {
            try {
                List<Project> projs = projectService.findAll();
                int count = 0;
                for (Project proj : projs) {
                    if (proj.getTitle() != null && proj.getTitle().toLowerCase().contains(q)) {
                        if (count++ >= 4) break;
                        hasResults = true;
                        String label = proj.getTitle() + " [" + proj.getStatus() + "]";
                        menu.addItem(createItemComponent(VaadinIcon.TASKS, label, "Project"), e -> {
                            getUI().ifPresent(ui -> ui.navigate(ProjectView.class));
                        });
                    }
                }
            } catch (Exception ignored) {
            }
        }

        // 4. Finance (if service available and query not empty)
        if (!q.isEmpty() && financeService != null) {
            try {
                List<Transaction> txs = financeService.findAll();
                int count = 0;
                for (Transaction tx : txs) {
                    if (tx.getDescription() != null && tx.getDescription().toLowerCase().contains(q)) {
                        if (count++ >= 4) break;
                        hasResults = true;
                        String amountStr = tx.getAmount() != null ? "$" + tx.getAmount() : "";
                        String label = tx.getDescription() + " (" + amountStr + ")";
                        menu.addItem(createItemComponent(VaadinIcon.MONEY, label, "Finance"), e -> {
                            getUI().ifPresent(ui -> ui.navigate(FinanceView.class));
                        });
                    }
                }
            } catch (Exception ignored) {
            }
        }

        if (!hasResults && !q.isEmpty()) {
            MenuItem emptyItem = menu.addItem("No matching records found for \"" + query + "\"");
            emptyItem.setEnabled(false);
        }

        menu.getElement().executeJs("if (this.open) { const rect = $0.getBoundingClientRect(); this.open({clientX: rect.left, clientY: rect.bottom}); }", quickBar.getElement());
    }

    private HorizontalLayout createItemComponent(VaadinIcon icon, String text, String category) {
        HorizontalLayout layout = new HorizontalLayout();
        layout.setDefaultVerticalComponentAlignment(FlexComponent.Alignment.CENTER);
        layout.setSpacing(true);

        Icon vaadinIcon = icon.create();
        vaadinIcon.setSize("14px");
        vaadinIcon.setColor("var(--lumo-primary-color)");

        Span textSpan = new Span(text);
        textSpan.getStyle().set("font-size", "0.85rem").set("font-weight", "500");

        Span badge = new Span(category);
        badge.getStyle()
                .set("font-size", "0.7rem")
                .set("padding", "0.1rem 0.4rem")
                .set("border-radius", "4px")
                .set("background-color", "var(--lumo-contrast-10pct)")
                .set("color", "var(--lumo-secondary-text-color)")
                .set("margin-left", "auto");

        layout.add(vaadinIcon, textSpan, badge);
        layout.setWidthFull();
        return layout;
    }

    private void handleQuickBarEnter(String query) {
        String q = query.toLowerCase();
        if (q.contains("dash")) {
            getUI().ifPresent(ui -> ui.navigate(DashboardView.class));
        } else if (q.contains("emp") || q.contains("user") || q.contains("people")) {
            getUI().ifPresent(ui -> ui.navigate(EmployeeView.class));
        } else if (q.contains("proj") || q.contains("task") || q.contains("kanban")) {
            getUI().ifPresent(ui -> ui.navigate(ProjectView.class));
        } else if (q.contains("fin") || q.contains("money") || q.contains("tx") || q.contains("pay")) {
            getUI().ifPresent(ui -> ui.navigate(FinanceView.class));
        } else if (q.contains("cal") || q.contains("event")) {
            getUI().ifPresent(ui -> ui.navigate(CalendarView.class));
        } else if (q.contains("set")) {
            getUI().ifPresent(ui -> ui.navigate(SettingsView.class));
        } else if (employeeService != null && !employeeService.findAll(query, "").isEmpty()) {
            getUI().ifPresent(ui -> ui.navigate(EmployeeView.class));
        } else {
            getUI().ifPresent(ui -> ui.navigate(EmployeeView.class));
        }
    }

    private void createDrawer() {
        SideNav nav = new SideNav();
        nav.addItem(new SideNavItem("Dashboard", DashboardView.class, VaadinIcon.DASHBOARD.create()));
        nav.addItem(new SideNavItem("Employees", EmployeeView.class, VaadinIcon.USERS.create()));
        nav.addItem(new SideNavItem("Projects & Sprints", ProjectView.class, VaadinIcon.TASKS.create()));
        nav.addItem(new SideNavItem("Finance Ledger", FinanceView.class, VaadinIcon.MONEY_EXCHANGE.create()));
        nav.addItem(new SideNavItem("Calendar", CalendarView.class, VaadinIcon.CALENDAR.create()));
        nav.addItem(new SideNavItem("Settings", SettingsView.class, VaadinIcon.COG.create()));

        VerticalLayout drawerLayout = new VerticalLayout(nav);
        drawerLayout.setSizeFull();
        drawerLayout.setPadding(true);

        addToDrawer(drawerLayout);
    }

    private record PageItem(String title, Class<? extends Component> viewClass, VaadinIcon icon) {
    }
}
