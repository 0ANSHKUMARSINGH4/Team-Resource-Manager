package com.teamresource.manager.ui;

import com.teamresource.manager.config.SecurityService;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.button.ButtonVariant;
import com.vaadin.flow.component.formlayout.FormLayout;
import com.vaadin.flow.component.html.H2;
import com.vaadin.flow.component.html.H3;
import com.vaadin.flow.component.html.Paragraph;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.component.notification.NotificationVariant;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;
import jakarta.annotation.security.PermitAll;
import org.springframework.security.core.userdetails.UserDetails;

@Route(value = "settings", layout = MainLayout.class)
@PageTitle("Settings | Team Resource Manager")
@PermitAll
public class SettingsView extends VerticalLayout {

    public SettingsView(SecurityService securityService) {
        setSizeFull();
        setPadding(true);
        setMaxWidth("800px");

        H2 header = new H2("Account & Platform Settings");
        header.getStyle().set("margin", "0");

        Paragraph sub = new Paragraph("Manage your CRM operator profile, security preferences, and system defaults");
        sub.getStyle().set("color", "var(--lumo-secondary-text-color)");

        H3 profileHead = new H3("Operator Profile");

        UserDetails user = securityService.getAuthenticatedUser();
        String currentEmail = user != null ? user.getUsername() : "admin@trm.com";

        TextField emailField = new TextField("Login Email");
        emailField.setValue(currentEmail);
        emailField.setReadOnly(true);

        TextField nameField = new TextField("Display Name");
        nameField.setValue("Admin Manager");

        TextField roleField = new TextField("System Authority");
        roleField.setValue("ROLE_MANAGER (Full Access)");
        roleField.setReadOnly(true);

        TextField envField = new TextField("Runtime Architecture");
        envField.setValue("Java 21 + Spring Boot 3.4 + Vaadin Flow 24");
        envField.setReadOnly(true);

        FormLayout formLayout = new FormLayout(nameField, emailField, roleField, envField);

        Button saveBtn = new Button("Update Preferences", e -> {
            Notification notif = Notification.show("Settings saved successfully!", 3000, Notification.Position.BOTTOM_END);
            notif.addThemeVariants(NotificationVariant.LUMO_SUCCESS);
        });
        saveBtn.addThemeVariants(ButtonVariant.LUMO_PRIMARY);

        add(header, sub, profileHead, formLayout, saveBtn);
    }
}
