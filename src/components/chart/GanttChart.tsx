import React, { useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsGantt from 'highcharts/modules/gantt';
import HighchartsExporting from 'highcharts/modules/exporting';

HighchartsGantt(Highcharts);
HighchartsExporting(Highcharts);

const GanttChart = () => {
  const [tasks, setTasks] = useState([
    {
      name: 'Task 1',
      start: Date.UTC(2024, 9, 30),
      end: Date.UTC(2024, 10, 2),
      completed: 0.5,
      color: '#74b9ff',
    },
    {
      name: 'Task 2',
      start: Date.UTC(2024, 10, 1),
      end: Date.UTC(2024, 10, 4),
      dependency: 'Task 1',
      completed: 0.8,
      color: '#81ecec',
    },
  ]);

  const [selectedTask, setSelectedTask] = useState<{
    index: number | null;
    name: string;
    start: string;
    end: string;
    completed: number;
    color: string;
  }>({
    index: null,
    name: '',
    start: '',
    end: '',
    completed: 0,
    color: '#55efc4',
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setSelectedTask({
      index: null,
      name: '',
      start: '',
      end: '',
      completed: 0,
      color: '#55efc4',
    });
    setIsEditing(false);
    setIsModalOpen(false);
  };

  const handleAddTask = () => {
    const startDate = Date.UTC(
      parseInt(selectedTask.start.split('-')[0]),
      parseInt(selectedTask.start.split('-')[1]) - 1,
      parseInt(selectedTask.start.split('-')[2])
    );
    const endDate = Date.UTC(
      parseInt(selectedTask.end.split('-')[0]),
      parseInt(selectedTask.end.split('-')[1]) - 1,
      parseInt(selectedTask.end.split('-')[2])
    );

    const newTask = {
      name: selectedTask.name,
      start: startDate,
      end: endDate,
      completed: selectedTask.completed / 100,
      color: selectedTask.color,
    };

    setTasks([...tasks, newTask]);
    closeModal();
  };

  const handleEditTask = () => {
    const startDate = Date.UTC(
      parseInt(selectedTask.start.split('-')[0]),
      parseInt(selectedTask.start.split('-')[1]) - 1,
      parseInt(selectedTask.start.split('-')[2])
    );
    const endDate = Date.UTC(
      parseInt(selectedTask.end.split('-')[0]),
      parseInt(selectedTask.end.split('-')[1]) - 1,
      parseInt(selectedTask.end.split('-')[2])
    );

    const updatedTasks = [...tasks];
    if (selectedTask.index !== null) {
      updatedTasks[selectedTask.index] = {
        ...updatedTasks[selectedTask.index],
        name: selectedTask.name,
        start: startDate,
        end: endDate,
        completed: selectedTask.completed / 100,
        color: selectedTask.color,
      };
    }

    setTasks(updatedTasks);
    closeModal();
  };

  const handleDeleteTask = (index: number) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const options = {
    chart: {
      type: 'gantt',
      backgroundColor: '#f4f4f9',
    },
    title: {
      text: 'Project Timeline',
      style: {
        fontFamily: 'Arial, sans-serif',
        fontWeight: 'bold',
        color: '#333',
      },
    },
    xAxis: {
      type: 'datetime',
      gridLineColor: '#dfe6e9',
    },
    yAxis: {
      labels: {
        style: {
          color: '#636e72',
          fontSize: '12px',
        },
      },
    },
    series: [
      {
        name: 'Project 1',
        data: tasks.map((task, index) => ({
          ...task,
          dataLabels: {
            enabled: true,
            format: '{point.name}',
            style: {
              color: '#2d3436',
              fontSize: '12px',
            },
          },
          events: {
            click: () => {
              const taskStart = new Date(task.start)
                .toISOString()
                .split('T')[0];
              const taskEnd = new Date(task.end).toISOString().split('T')[0];
              setSelectedTask({
                index,
                name: task.name,
                start: taskStart,
                end: taskEnd,
                completed: task.completed * 100,
                color: task.color,
              });
              setIsEditing(true);
              openModal();
            },
          },
        })),
      },
    ],
    tooltip: {
      backgroundColor: '#2d3436',
      style: {
        color: '#ffffff',
      },
      pointFormat: `<b>{point.name}</b><br/>Start: {point.start:%e %b %Y}<br/>End: {point.end:%e %b %Y}`,
    },
    plotOptions: {
      series: {
        borderColor: '#636e72',
        states: {
          hover: {
            color: '#00cec9',
          },
        },
      },
    },
    credits: {
      enabled: false,
    },
    exporting: {
      enabled: true,
    },
  };

  return (
    <div className="p-5 bg-gray-100 dark:bg-gray-900 rounded-lg">
      <HighchartsReact
        highcharts={Highcharts}
        constructorType={'ganttChart'}
        options={options}
      />

      <button
        onClick={() => {
          setIsEditing(false);
          openModal();
        }}
        className="px-6 py-3 mt-5 text-white bg-green-600 rounded-lg hover:bg-green-700 transition duration-300"
      >
        Add Task
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg w-96 shadow-lg">
            <h3 className="text-lg font-bold text-center mb-4 text-gray-900 dark:text-gray-100">
              {isEditing ? 'Edit Task' : 'Add New Task'}
            </h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (isEditing) {
                  handleEditTask();
                } else {
                  handleAddTask();
                }
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Task Name:
                </label>
                <input
                  type="text"
                  value={selectedTask.name}
                  onChange={(e) =>
                    setSelectedTask({ ...selectedTask, name: e.target.value })
                  }
                  required
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Start Date:
                </label>
                <input
                  type="date"
                  value={selectedTask.start}
                  onChange={(e) =>
                    setSelectedTask({ ...selectedTask, start: e.target.value })
                  }
                  required
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  End Date:
                </label>
                <input
                  type="date"
                  value={selectedTask.end}
                  onChange={(e) =>
                    setSelectedTask({ ...selectedTask, end: e.target.value })
                  }
                  required
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Progress (%):
                </label>
                <input
                  type="number"
                  value={selectedTask.completed}
                  onChange={(e) =>
                    setSelectedTask({
                      ...selectedTask,
                      completed: Number(e.target.value),
                    })
                  }
                  required
                  min="0"
                  max="100"
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Task Color:
                </label>
                <input
                  type="color"
                  value={selectedTask.color}
                  onChange={(e) =>
                    setSelectedTask({
                      ...selectedTask,
                      color: e.target.value,
                    })
                  }
                  required
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                />
              </div>
              <button
                type="submit"
                className="w-full p-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300"
              >
                {isEditing ? 'Save Changes' : 'Add Task'}
              </button>
              <button
                type="button"
                onClick={closeModal}
                className="w-full p-3 mt-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="mt-5">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Current Tasks
        </h3>
        <ul className="space-y-3 mt-3">
          {tasks.map((task, index) => (
            <li
              key={index}
              className="flex justify-between items-center text-gray-800 dark:text-gray-200"
            >
              <span>
                {task.name} - Start: {new Date(task.start).toLocaleDateString()}{' '}
                - End: {new Date(task.end).toLocaleDateString()}
              </span>
              <button
                onClick={() => handleDeleteTask(index)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default GanttChart;
