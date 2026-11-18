package com.teamresource.manager.ui;

import com.vaadin.flow.component.html.H1;
import com.vaadin.flow.component.html.Paragraph;
import com.vaadin.flow.component.login.LoginForm;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.BeforeEnterEvent;
import com.vaadin.flow.router.BeforeEnterObserver;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.server.auth.AnonymousAllowed;

@Route("login")
@PageTitle("Login | Team Resource Manager")
@AnonymousAllowed
public class LoginView extends VerticalLayout implements BeforeEnterObserver {

    private final LoginForm login = new LoginForm();

    public LoginView() {
        addClassName("login-view");
        setSizeFull();
        setAlignItems(Alignment.CENTER);
        setJustifyContentMode(JustifyContentMode.CENTER);

        login.setAction("login");

        H1 title = new H1("Team Resource Manager");
        title.getStyle()
                .set("margin", "0")
                .set("color", "var(--lumo-primary-color)")
                .set("font-weight", "800");

        Paragraph subtitle = new Paragraph("Enterprise Resource & Operations Platform (Pure Java)");
        subtitle.getStyle()
                .set("color", "var(--lumo-secondary-text-color)")
                .set("margin-top", "0.25rem")
                .set("margin-bottom", "1.5rem");

        Paragraph hint = new Paragraph("Default credentials: admin@trm.com / admin123");
        hint.getStyle()
                .set("font-size", "0.875rem")
                .set("padding", "0.5rem 1rem")
                .set("border-radius", "0.5rem")
                .set("background-color", "var(--lumo-contrast-5pct)")
                .set("color", "var(--lumo-secondary-text-color)");

        add(title, subtitle, login, hint);
    }

    @Override
    public void beforeEnter(BeforeEnterEvent beforeEnterEvent) {
        if (beforeEnterEvent.getLocation()
                .getQueryParameters()
                .getParameters()
                .containsKey("error")) {
            login.setError(true);
        }
    }
}
