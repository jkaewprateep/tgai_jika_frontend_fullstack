"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useTheme } from "@/context/ThemeContext";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";

import { Navigate } from "react-router-dom";

import GlobalVariables from "../../app/[locale]/globalclass";
import Navbar from "@/components/Navbar";

// interface CalendarEvent {
//   id: string;
//   title: string;
//   start: string;
//   end?: string;
// }

// const initialEvents: CalendarEvent[] = [
//   {
//     id: "1",
//     title: "PM Plan - Example",
//     start: "2024-10-30",
//   },
// ];

const Home: React.FC = () => {
  // const history = useHistory();

  const [username, setUsername] = useState({ value: "robot_1" });
  const [password, setPassword] = useState({ value: "1234" });

  const ref = useRef({
    authen: false,
  });

  function authentication(username: string, password: string) {
    if (username === "robot_1" && password === "1234") {
      // navigate("/main", {
      //   replace: false,
      //   state: { username: username },
      // });
      // alert("Welcome " + username);
      // alert(window.location.href);

      let target = window.location.href;
      // alert(window.location.href.substring(25, 25 + username.length));

      if (
        window.location.href.substring(25, 25 + username.length) !== username
      ) {
        target = window.location.href + "?" + username;
      }
      // if (window.location.href.substring(0, 32) !== ""  ){
      //   target = window.location.href + "?" + username;
      // }

      //
      // GlobalVariables.createVariables();
      // GlobalVariables.setXP(username);
      // GlobalVariables.setAuthen(true);

      // alert(GlobalVariables.getAuthen());

      // ref.current.authen = true;

      // http://localhost:3000/th
      window.location.replace(target);
      return true;
    }
    return false;
  }

  // const t = useTranslations("home");
  // const { isDarkMode, toggleTheme } = useTheme();

  // const [events, setEvents] = useState<CalendarEvent[]>(initialEvents);

  // const handleDateClick = (arg: any) => {
  //   alert("Date clicked: " + arg.dateStr);
  // };

  // const handleEventDrop = (eventDropInfo: any) => {
  //   const updatedEvents = events.map((event) =>
  //     event.id === eventDropInfo.event.id
  //       ? { ...event, start: eventDropInfo.event.startStr }
  //       : event
  //   );
  //   setEvents(updatedEvents);
  // };

  useEffect(() => {}, []);

  return (
    <div className="flex bg-cover bg-center bg-no-repeat min-h-screen w-full overflow-auto  dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="w-full relative flex flex-col md:items-center md:justify-center p-8 space-y-6">
        <div className="text-center relative rounded-3xl shadow-lg p-4 md:p-8 bg-white bg-opacity-40 dark:bg-gray-800 dark:bg-opacity-60 transition-colors duration-300">
          {/* <div className="flex bg-cover bg-center bg-no-repeat min-h-screen w-full overflow-auto  dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <div className="w-full relative flex flex-col md:items-center md:justify-center p-8 space-y-6">
          <div className="text-center relative rounded-3xl shadow-lg w-full max-w-4xl p-4 md:p-8 bg-white bg-opacity-40 dark:bg-gray-800 dark:bg-opacity-60 transition-colors duration-300"> */}
          {/*<div className="flex justify-center">
            <Image
              src={isDarkMode ? '/limbic-white-logo.webp' : '/limbic-logo.webp'}
              width={400}
              height={400}
              alt="Logo"
            />
          </div>*/}
          {/* <FullCalendar
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
          /> */}
          <table>
            <tbody>
              <tr>
                <td>
                  <label>Username</label>
                </td>
                <td>
                  <input
                    className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    type="text"
                    id="username_textbox"
                    name="username_textbox"
                    value={username.value}
                    onChange={(e) => setUsername({ value: e.target.value })}
                    // value={buyprice.data}
                    // onChange={handleStockpricechange}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>Password</label>
                </td>
                <td>
                  <input
                    className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    type="password"
                    id="password_textbox"
                    name="password_textbox"
                    value={password.value}
                    onChange={(e) => setPassword({ value: e.target.value })}
                    // value={buyprice.data}
                    // onChange={handleStockpricechange}
                  />
                </td>
              </tr>
              <tr>
                <td></td>
                <td>
                  <button
                    className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition-all duration-200"
                    style={{ float: "right" }}
                    type="button"
                    onClick={() => authentication("robot_1", "1234")}
                  >
                    Login
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          {/* </div>
        </div>
      </div> */}
        </div>
      </div>
    </div>
  );
};

export default Home;
