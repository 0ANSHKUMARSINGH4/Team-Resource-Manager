package com.teamresource.manager.ui;

import com.teamresource.manager.entity.Project;
import com.teamresource.manager.service.ProjectService;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.button.ButtonVariant;
import com.vaadin.flow.component.datepicker.DatePicker;
import com.vaadin.flow.component.dialog.Dialog;
import com.vaadin.flow.component.formlayout.FormLayout;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.H2;
import com.vaadin.flow.component.html.H4;
import com.vaadin.flow.component.html.Paragraph;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.component.notification.NotificationVariant;
import com.vaadin.flow.component.orderedlayout.FlexComponent;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.BigDecimalField;
import com.vaadin.flow.component.textfield.TextArea;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;
import jakarta.annotation.security.PermitAll;

import java.text.NumberFormat;
import java.util.List;
import java.util.Locale;

@Route(value = "projects", layout = MainLayout.class)
@PageTitle("Projects & Sprints | Team Resource Manager")
@PermitAll
public class ProjectView extends VerticalLayout {

    private final ProjectService projectService;
    private final HorizontalLayout boardLayout = new HorizontalLayout();
    private final NumberFormat currencyFormat = NumberFormat.getCurrencyInstance(Locale.US);

    public ProjectView(ProjectService projectService) {
        this.projectService = projectService;
        setSizeFull();
        setPadding(true);

        H2 header = new H2("Projects & Sprint Board");
        header.getStyle().set("margin", "0");

        Button addProjectBtn = new Button("New Project", VaadinIcon.PLUS.create(), click -> openProjectDialog(new Project()));
        addProjectBtn.addThemeVariants(ButtonVariant.LUMO_PRIMARY);

        HorizontalLayout topBar = new HorizontalLayout(header, addProjectBtn);
        topBar.setWidthFull();
        topBar.setDefaultVerticalComponentAlignment(FlexComponent.Alignment.CENTER);
        topBar.setJustifyContentMode(FlexComponent.JustifyContentMode.BETWEEN);

        boardLayout.setSizeFull();
        boardLayout.setSpacing(true);

        refreshBoard();

        add(topBar, boardLayout);
    }

    private void refreshBoard() {
        boardLayout.removeAll();

        List<Project> allProjects = projectService.findAll();
        List<Project> todoProjects = allProjects.stream().filter(p -> "TODO".equalsIgnoreCase(p.getStatus())).toList();
        List<Project> inProgressProjects = allProjects.stream().filter(p -> "IN_PROGRESS".equalsIgnoreCase(p.getStatus())).toList();
        List<Project> doneProjects = allProjects.stream().filter(p -> "DONE".equalsIgnoreCase(p.getStatus())).toList();

        boardLayout.add(
                createColumn("To Do", todoProjects, "#64748B", "TODO"),
                createColumn("In Progress", inProgressProjects, "#3B82F6", "IN_PROGRESS"),
                createColumn("Completed", doneProjects, "#10B981", "DONE")
        );
    }

    private VerticalLayout createColumn(String title, List<Project> projects, String accentColor, String statusCode) {
        VerticalLayout col = new VerticalLayout();
        col.setWidth("33%");
        col.getStyle()
                .set("background-color", "var(--lumo-contrast-5pct)")
                .set("border-radius", "0.75rem")
                .set("padding", "1rem")
                .set("overflow-y", "auto");

        HorizontalLayout colHeader = new HorizontalLayout();
        colHeader.setWidthFull();
        colHeader.setJustifyContentMode(FlexComponent.JustifyContentMode.BETWEEN);
        colHeader.setDefaultVerticalComponentAlignment(FlexComponent.Alignment.CENTER);

        H4 colTitle = new H4(title);
        colTitle.getStyle().set("margin", "0");

        Span countBadge = new Span(String.valueOf(projects.size()));
        countBadge.getElement().getThemeList().add("badge");
        countBadge.getStyle().set("background-color", accentColor).set("color", "white");

        colHeader.add(colTitle, countBadge);
        col.add(colHeader);

        for (Project project : projects) {
            col.add(createProjectCard(project));
        }

        return col;
    }

    private Div createProjectCard(Project project) {
        Div card = new Div();
        card.getStyle()
                .set("background-color", "var(--lumo-base-color)")
                .set("border", "1px solid var(--lumo-contrast-10pct)")
                .set("border-radius", "0.5rem")
                .set("padding", "1rem")
                .set("margin-top", "0.5rem")
                .set("width", "100%")
                .set("box-shadow", "0 1px 2px 0 rgba(0,0,0,0.05)");

        H4 title = new H4(project.getTitle());
        title.getStyle().set("margin", "0 0 0.5rem 0");

        Paragraph desc = new Paragraph(project.getDescription() != null ? project.getDescription() : "No description");
        desc.getStyle().set("font-size", "0.875rem").set("color", "var(--lumo-secondary-text-color)").set("margin", "0 0 0.75rem 0");

        HorizontalLayout meta = new HorizontalLayout();
        meta.setWidthFull();
        meta.setJustifyContentMode(FlexComponent.JustifyContentMode.BETWEEN);

        Span budgetSpan = new Span(project.getBudget() != null ? currencyFormat.format(project.getBudget()) : "$0");
        budgetSpan.getStyle().set("font-weight", "600").set("font-size", "0.8125rem").set("color", "#10B981");

        Span deadlineSpan = new Span(project.getDeadline() != null ? project.getDeadline().toString() : "No deadline");
        deadlineSpan.getStyle().set("font-size", "0.75rem").set("color", "var(--lumo-tertiary-text-color)");

        meta.add(budgetSpan, deadlineSpan);

        HorizontalLayout actions = new HorizontalLayout();
        actions.setWidthFull();
        actions.getStyle().set("margin-top", "0.75rem");

        if (!"TODO".equalsIgnoreCase(project.getStatus())) {
            Button backBtn = new Button(VaadinIcon.ARROW_LEFT.create(), click -> {
                String prev = "DONE".equalsIgnoreCase(project.getStatus()) ? "IN_PROGRESS" : "TODO";
                projectService.updateStatus(project.getId(), prev);
                refreshBoard();
            });
            backBtn.addThemeVariants(ButtonVariant.LUMO_TERTIARY, ButtonVariant.LUMO_SMALL);
            backBtn.setTooltipText("Shift back");
            actions.add(backBtn);
        }

        if (!"DONE".equalsIgnoreCase(project.getStatus())) {
            Button forwardBtn = new Button(VaadinIcon.ARROW_RIGHT.create(), click -> {
                String next = "TODO".equalsIgnoreCase(project.getStatus()) ? "IN_PROGRESS" : "DONE";
                projectService.updateStatus(project.getId(), next);
                refreshBoard();
            });
            forwardBtn.addThemeVariants(ButtonVariant.LUMO_TERTIARY, ButtonVariant.LUMO_SUCCESS, ButtonVariant.LUMO_SMALL);
            forwardBtn.setTooltipText("Advance stage");
            actions.add(forwardBtn);
        }

        Button editBtn = new Button(VaadinIcon.EDIT.create(), click -> openProjectDialog(project));
        editBtn.addThemeVariants(ButtonVariant.LUMO_TERTIARY, ButtonVariant.LUMO_SMALL);

        Button deleteBtn = new Button(VaadinIcon.TRASH.create(), click -> {
            projectService.delete(project);
            refreshBoard();
        });
        deleteBtn.addThemeVariants(ButtonVariant.LUMO_TERTIARY, ButtonVariant.LUMO_ERROR, ButtonVariant.LUMO_SMALL);

        actions.add(editBtn, deleteBtn);
        card.add(title, desc, meta, actions);
        return card;
    }

    private void openProjectDialog(Project project) {
        Dialog dialog = new Dialog();
        dialog.setHeaderTitle(project.getId() == null ? "Create Project" : "Edit Project");

        TextField titleField = new TextField("Project Title");
        titleField.setRequired(true);
        titleField.setValue(project.getTitle() != null ? project.getTitle() : "");

        TextArea descField = new TextArea("Description");
        descField.setValue(project.getDescription() != null ? project.getDescription() : "");

        DatePicker startDate = new DatePicker("Start Date");
        startDate.setValue(project.getStartDate());

        DatePicker deadline = new DatePicker("Deadline");
        deadline.setValue(project.getDeadline());

        BigDecimalField budgetField = new BigDecimalField("Allocated Budget ($)");
        budgetField.setValue(project.getBudget());

        FormLayout formLayout = new FormLayout(titleField, descField, startDate, deadline, budgetField);

        Button saveBtn = new Button("Save Project", e -> {
            if (titleField.isEmpty()) {
                Notification.show("Title is required", 3000, Notification.Position.MIDDLE);
                return;
            }
            project.setTitle(titleField.getValue());
            project.setDescription(descField.getValue());
            project.setStartDate(startDate.getValue());
            project.setDeadline(deadline.getValue());
            project.setBudget(budgetField.getValue());

            projectService.save(project);
            refreshBoard();
            dialog.close();
            Notification notif = Notification.show("Project saved!", 3000, Notification.Position.BOTTOM_END);
            notif.addThemeVariants(NotificationVariant.LUMO_SUCCESS);
        });
        saveBtn.addThemeVariants(ButtonVariant.LUMO_PRIMARY);

        Button cancelBtn = new Button("Cancel", e -> dialog.close());

        dialog.add(formLayout);
        dialog.getFooter().add(cancelBtn, saveBtn);
        dialog.open();
    }
}
