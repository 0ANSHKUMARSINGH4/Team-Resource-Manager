package com.teamresource.manager.ui;

import com.teamresource.manager.entity.Employee;
import com.teamresource.manager.service.EmployeeService;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.button.ButtonVariant;
import com.vaadin.flow.component.combobox.ComboBox;
import com.vaadin.flow.component.dialog.Dialog;
import com.vaadin.flow.component.formlayout.FormLayout;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.html.H2;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.component.notification.NotificationVariant;
import com.vaadin.flow.component.orderedlayout.FlexComponent;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.BigDecimalField;
import com.vaadin.flow.component.textfield.EmailField;
import com.vaadin.flow.component.textfield.IntegerField;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.data.binder.BeanValidationBinder;
import com.vaadin.flow.data.binder.Binder;
import com.vaadin.flow.data.value.ValueChangeMode;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;
import jakarta.annotation.security.PermitAll;

import java.text.NumberFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

@Route(value = "employees", layout = MainLayout.class)
@PageTitle("Employees | Team Resource Manager")
@PermitAll
public class EmployeeView extends VerticalLayout {

    private final EmployeeService employeeService;
    private final Grid<Employee> grid = new Grid<>(Employee.class, false);
    private final TextField filterText = new TextField();
    private final ComboBox<String> departmentFilter = new ComboBox<>();
    private final NumberFormat currencyFormat = NumberFormat.getCurrencyInstance(Locale.US);

    public EmployeeView(EmployeeService employeeService) {
        this.employeeService = employeeService;
        setSizeFull();
        setPadding(true);

        H2 header = new H2("Talent & Employee Directory");
        header.getStyle().set("margin", "0");

        configureGrid();
        updateList();

        add(header, getToolbar(), grid);
    }

    private HorizontalLayout getToolbar() {
        filterText.setPlaceholder("Search employees...");
        filterText.setClearButtonVisible(true);
        filterText.setValueChangeMode(ValueChangeMode.LAZY);
        filterText.addValueChangeListener(e -> updateList());
        filterText.setWidth("280px");
        filterText.setPrefixComponent(VaadinIcon.SEARCH.create());

        List<String> depts = new ArrayList<>();
        depts.add("All");
        depts.addAll(employeeService.getDepartments());
        departmentFilter.setItems(depts);
        departmentFilter.setValue("All");
        departmentFilter.setWidth("200px");
        departmentFilter.addValueChangeListener(e -> updateList());

        Button addEmployeeButton = new Button("Add Employee", VaadinIcon.PLUS.create(), click -> openEmployeeDialog(new Employee()));
        addEmployeeButton.addThemeVariants(ButtonVariant.LUMO_PRIMARY);

        HorizontalLayout toolbar = new HorizontalLayout(filterText, departmentFilter, addEmployeeButton);
        toolbar.setWidthFull();
        toolbar.setDefaultVerticalComponentAlignment(FlexComponent.Alignment.CENTER);
        return toolbar;
    }

    private void configureGrid() {
        grid.setSizeFull();
        grid.addColumn(Employee::getName).setHeader("Name").setSortable(true).setAutoWidth(true);
        grid.addColumn(Employee::getEmail).setHeader("Email").setSortable(true).setAutoWidth(true);
        grid.addColumn(Employee::getDepartment).setHeader("Department").setSortable(true).setAutoWidth(true);
        grid.addColumn(Employee::getDesignation).setHeader("Designation").setAutoWidth(true);

        grid.addComponentColumn(emp -> {
            Span badge = new Span(emp.getStatus());
            badge.getElement().getThemeList().add("badge");
            if ("PERMANENT".equalsIgnoreCase(emp.getStatus())) {
                badge.getElement().getThemeList().add("success");
            } else {
                badge.getElement().getThemeList().add("contrast");
            }
            return badge;
        }).setHeader("Status").setAutoWidth(true);

        grid.addColumn(emp -> emp.getWorkMode() != null ? emp.getWorkMode() : "ON_SITE")
                .setHeader("Work Mode").setAutoWidth(true);

        grid.addColumn(emp -> emp.getSalary() != null ? currencyFormat.format(emp.getSalary()) : "$0.00")
                .setHeader("Annual Salary").setSortable(true).setAutoWidth(true);

        grid.addComponentColumn(emp -> {
            Button editBtn = new Button(VaadinIcon.EDIT.create(), click -> openEmployeeDialog(emp));
            editBtn.addThemeVariants(ButtonVariant.LUMO_TERTIARY);

            Button deleteBtn = new Button(VaadinIcon.TRASH.create(), click -> {
                employeeService.delete(emp);
                updateList();
                Notification.show("Employee deleted: " + emp.getName(), 3000, Notification.Position.BOTTOM_END);
            });
            deleteBtn.addThemeVariants(ButtonVariant.LUMO_TERTIARY, ButtonVariant.LUMO_ERROR);

            return new HorizontalLayout(editBtn, deleteBtn);
        }).setHeader("Actions").setAutoWidth(true);
    }

    private void updateList() {
        grid.setItems(employeeService.findAll(filterText.getValue(), departmentFilter.getValue()));
    }

    private void openEmployeeDialog(Employee employee) {
        Dialog dialog = new Dialog();
        dialog.setHeaderTitle(employee.getId() == null ? "Add New Employee" : "Edit Employee Details");

        TextField nameField = new TextField("Full Name");
        EmailField emailField = new EmailField("Email Address");
        TextField deptField = new TextField("Department");
        TextField desigField = new TextField("Designation");
        IntegerField ageField = new IntegerField("Age");
        TextField phoneField = new TextField("Phone");
        ComboBox<String> statusField = new ComboBox<>("Status", "PERMANENT", "CONTRACTOR", "INTERN");
        ComboBox<String> workModeField = new ComboBox<>("Work Mode", "ON_SITE", "HYBRID", "REMOTE");
        BigDecimalField salaryField = new BigDecimalField("Annual Salary ($)");

        FormLayout formLayout = new FormLayout();
        formLayout.add(nameField, emailField, deptField, desigField, ageField, phoneField, statusField, workModeField, salaryField);
        formLayout.setResponsiveSteps(
                new FormLayout.ResponsiveStep("0", 1),
                new FormLayout.ResponsiveStep("500px", 2)
        );

        Binder<Employee> binder = new BeanValidationBinder<>(Employee.class);
        binder.forField(nameField).asRequired("Name is required").bind(Employee::getName, Employee::setName);
        binder.forField(emailField).asRequired("Email is required").bind(Employee::getEmail, Employee::setEmail);
        binder.forField(deptField).asRequired("Department is required").bind(Employee::getDepartment, Employee::setDepartment);
        binder.forField(desigField).bind(Employee::getDesignation, Employee::setDesignation);
        binder.forField(ageField).bind(Employee::getAge, Employee::setAge);
        binder.forField(phoneField).bind(Employee::getPhone, Employee::setPhone);
        binder.forField(statusField).bind(Employee::getStatus, Employee::setStatus);
        binder.forField(workModeField).bind(Employee::getWorkMode, Employee::setWorkMode);
        binder.forField(salaryField).bind(Employee::getSalary, Employee::setSalary);

        binder.readBean(employee);

        Button saveButton = new Button("Save", e -> {
            if (binder.writeBeanIfValid(employee)) {
                employeeService.save(employee);
                updateList();
                dialog.close();
                Notification notif = Notification.show("Employee saved successfully!", 3000, Notification.Position.BOTTOM_END);
                notif.addThemeVariants(NotificationVariant.LUMO_SUCCESS);
            }
        });
        saveButton.addThemeVariants(ButtonVariant.LUMO_PRIMARY);

        Button cancelButton = new Button("Cancel", e -> dialog.close());

        dialog.add(formLayout);
        dialog.getFooter().add(cancelButton, saveButton);
        dialog.open();
    }
}
