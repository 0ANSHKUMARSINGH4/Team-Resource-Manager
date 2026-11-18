package com.teamresource.manager.ui;

import com.teamresource.manager.entity.Event;
import com.teamresource.manager.repository.EventRepository;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.button.ButtonVariant;
import com.vaadin.flow.component.combobox.ComboBox;
import com.vaadin.flow.component.datetimepicker.DateTimePicker;
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
import com.vaadin.flow.component.textfield.TextArea;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;
import jakarta.annotation.security.PermitAll;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Route(value = "calendar", layout = MainLayout.class)
@PageTitle("Calendar & Events | Team Resource Manager")
@PermitAll
public class CalendarView extends VerticalLayout {

    private final EventRepository eventRepository;
    private final Grid<Event> grid = new Grid<>(Event.class, false);
    private final DateTimeFormatter dtf = DateTimeFormatter.ofPattern("MMM dd, yyyy HH:mm");

    public CalendarView(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
        setSizeFull();
        setPadding(true);

        H2 header = new H2("Team Calendar & Scheduled Events");
        header.getStyle().set("margin", "0");

        Button addEventBtn = new Button("Schedule Event", VaadinIcon.CALENDAR_USER.create(), click -> openEventDialog());
        addEventBtn.addThemeVariants(ButtonVariant.LUMO_PRIMARY);

        HorizontalLayout topBar = new HorizontalLayout(header, addEventBtn);
        topBar.setWidthFull();
        topBar.setDefaultVerticalComponentAlignment(FlexComponent.Alignment.CENTER);
        topBar.setJustifyContentMode(FlexComponent.JustifyContentMode.BETWEEN);

        configureGrid();
        refresh();

        add(topBar, grid);
    }

    private void configureGrid() {
        grid.setSizeFull();
        grid.addColumn(Event::getTitle).setHeader("Event Title").setAutoWidth(true).setSortable(true);
        grid.addColumn(Event::getDescription).setHeader("Agenda / Notes").setAutoWidth(true);

        grid.addComponentColumn(ev -> {
            Span typeBadge = new Span(ev.getType() != null ? ev.getType() : "MEETING");
            typeBadge.getElement().getThemeList().add("badge");
            return typeBadge;
        }).setHeader("Category").setAutoWidth(true);

        grid.addColumn(ev -> ev.getStartTime() != null ? dtf.format(ev.getStartTime()) : "TBD")
                .setHeader("Start Time").setSortable(true).setAutoWidth(true);

        grid.addColumn(ev -> ev.getEndTime() != null ? dtf.format(ev.getEndTime()) : "TBD")
                .setHeader("End Time").setAutoWidth(true);

        grid.addComponentColumn(ev -> {
            Button delBtn = new Button(VaadinIcon.TRASH.create(), click -> {
                eventRepository.delete(ev);
                refresh();
                Notification.show("Event removed", 2000, Notification.Position.BOTTOM_END);
            });
            delBtn.addThemeVariants(ButtonVariant.LUMO_TERTIARY, ButtonVariant.LUMO_ERROR, ButtonVariant.LUMO_SMALL);
            return delBtn;
        }).setHeader("Actions").setAutoWidth(true);
    }

    private void refresh() {
        grid.setItems(eventRepository.findAllByOrderByStartTimeAsc());
    }

    private void openEventDialog() {
        Dialog dialog = new Dialog();
        dialog.setHeaderTitle("Schedule Team Event");

        TextField titleField = new TextField("Event Title");
        titleField.setRequired(true);

        TextArea descField = new TextArea("Description / Agenda");

        ComboBox<String> typeField = new ComboBox<>("Event Category", "MEETING", "FINANCE", "TECHNICAL", "ALL_HANDS", "ONE_ON_ONE");
        typeField.setValue("MEETING");

        DateTimePicker startTime = new DateTimePicker("Start Time");
        startTime.setValue(LocalDateTime.now().plusDays(1).withHour(10).withMinute(0));

        DateTimePicker endTime = new DateTimePicker("End Time");
        endTime.setValue(LocalDateTime.now().plusDays(1).withHour(11).withMinute(0));

        FormLayout formLayout = new FormLayout(titleField, descField, typeField, startTime, endTime);

        Button saveBtn = new Button("Schedule", click -> {
            if (titleField.isEmpty()) {
                Notification.show("Title is required", 3000, Notification.Position.MIDDLE);
                return;
            }

            Event event = Event.builder()
                    .title(titleField.getValue())
                    .description(descField.getValue())
                    .type(typeField.getValue())
                    .startTime(startTime.getValue())
                    .endTime(endTime.getValue())
                    .build();

            eventRepository.save(event);
            refresh();
            dialog.close();
            Notification notif = Notification.show("Event scheduled!", 3000, Notification.Position.BOTTOM_END);
            notif.addThemeVariants(NotificationVariant.LUMO_SUCCESS);
        });
        saveBtn.addThemeVariants(ButtonVariant.LUMO_PRIMARY);

        Button cancelBtn = new Button("Cancel", e -> dialog.close());

        dialog.add(formLayout);
        dialog.getFooter().add(cancelBtn, saveBtn);
        dialog.open();
    }
}
