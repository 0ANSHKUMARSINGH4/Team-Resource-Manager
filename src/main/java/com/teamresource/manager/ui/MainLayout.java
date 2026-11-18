package com.teamresource.manager.ui;

import com.teamresource.manager.config.SecurityService;
import com.vaadin.flow.component.applayout.AppLayout;
import com.vaadin.flow.component.applayout.DrawerToggle;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.button.ButtonVariant;
import com.vaadin.flow.component.html.H1;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.component.orderedlayout.FlexComponent;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.sidenav.SideNav;
import com.vaadin.flow.component.sidenav.SideNavItem;
import com.vaadin.flow.dom.ThemeList;
import com.vaadin.flow.theme.lumo.Lumo;
import org.springframework.security.core.userdetails.UserDetails;

public class MainLayout extends AppLayout {

    private final SecurityService securityService;

    public MainLayout(SecurityService securityService) {
        this.securityService = securityService;
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

        HorizontalLayout header = new HorizontalLayout(new DrawerToggle(), logo, title, headerRight);
        header.setDefaultVerticalComponentAlignment(FlexComponent.Alignment.CENTER);
        header.expand(title);
        header.setWidthFull();
        header.addClassNames("py-0", "px-m");
        header.getStyle()
                .set("border-bottom", "1px solid var(--lumo-contrast-10pct)")
                .set("padding", "0.5rem 1rem");

        addToNavbar(header);
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
}
