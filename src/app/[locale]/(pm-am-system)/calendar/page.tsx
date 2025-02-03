'use client';

import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';

interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  end?: string;
}

const initialEvents: CalendarEvent[] = [
  {
    id: '1',
    title: 'PM Plan - Example',
    start: '2024-10-30',
  },
];

const CalendarPage: React.FC = () => {
  const [events, setEvents] = useState<CalendarEvent[]>(initialEvents);

  const handleDateClick = (arg: any) => {
    alert('Date clicked: ' + arg.dateStr);
  };

  const handleEventDrop = (eventDropInfo: any) => {
    const updatedEvents = events.map((event) =>
      event.id === eventDropInfo.event.id
        ? { ...event, start: eventDropInfo.event.startStr }
        : event
    );
    setEvents(updatedEvents);
  };

  return (
    <div className="mx-auto h-screen p-4 overflow-auto bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-lg shadow-lg transition-colors duration-300">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-blue-600">Schedule</h1>
        <button className="bg-red-500 text-white py-1 px-3 rounded">
          Instruction
        </button>
      </div>

      {/* Filter Section */}
      <div className="mb-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <input
            type="text"
            className="border p-2 rounded"
            placeholder="Select Machine / Device"
          />
          <input
            type="text"
            className="border p-2 rounded"
            placeholder="Status"
          />
          <input
            type="text"
            className="border p-2 rounded"
            placeholder="Department"
          />
          <select className="border p-2 rounded">
            <option>Location</option>
            <option>Factory</option>
            <option>Warehouse</option>
          </select>
          <input
            type="text"
            className="border p-2 rounded"
            placeholder="Checklist Type"
          />
          <input
            type="text"
            className="border p-2 rounded"
            placeholder="Risk Level"
          />
        </div>
        <button className="mt-4 bg-blue-600 text-white py-2 px-4 rounded">
          Filter
        </button>
      </div>

      {/* FullCalendar Component */}
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
        initialView="dayGridMonth"
        events={events}
        dateClick={handleDateClick}
        editable={true}
        droppable={true}
        eventDrop={handleEventDrop}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
      />

      {/* Legend */}
      <div className="mt-4">
        <h2 className="text-lg font-bold mb-2">Legend</h2>
        <div className="flex space-x-4">
          <label className="inline-flex items-center">
            <input type="radio" className="form-radio text-blue-600" />
            <span className="ml-2">PM Plan</span>
          </label>
          <label className="inline-flex items-center">
            <input type="radio" className="form-radio text-green-600" />
            <span className="ml-2">Ongoing PM/AM</span>
          </label>
          <label className="inline-flex items-center">
            <input type="radio" className="form-radio text-orange-600" />
            <span className="ml-2">Pass all</span>
          </label>
          <label className="inline-flex items-center">
            <input type="radio" className="form-radio text-red-600" />
            <span className="ml-2">Overdue / Forge</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
