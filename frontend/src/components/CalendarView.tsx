import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import type { Task } from "../types/Tasks";

interface CalendarViewProps {
    tasks: Task[];
}

export const CalendarView = ({ tasks }: CalendarViewProps) => {
    const events = tasks.map((task, index) => ({
        id: index.toString(),
        title: task.title,
        date: task.deadline,
    }));
    return <FullCalendar plugins={[dayGridPlugin]} initialView="dayGridMonth" events={events} />
}