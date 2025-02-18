import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import {
  rightTable1DataState,
  rightTable2DataState,
  tableDataState,
} from '../state/todoState';

const Home = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useRecoilState(tableDataState);
  const [rightTable1Data, setRightTable1Data] =
    useRecoilState(rightTable1DataState);
  const [rightTable2Data, setRightTable2Data] =
    useRecoilState(rightTable2DataState);
  const [newTask, setNewTask] = useState('');
  const [userTasks, setUserTasks] = useState([]);

  const generateNextId = () => {
    if (userTasks.length === 0) return 'U01';
    const lastTaskId = userTasks[userTasks.length - 1].id;
    const numericPart = parseInt(lastTaskId.slice(1), 10);
    const nextNumericPart = numericPart + 1;
    return `U${nextNumericPart.toString().padStart(2, '0')}`;
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (newTask.trim() === '') return;
    const newTaskObj = { id: generateNextId(), title: newTask, pageid: 'Home' };
    setTasks([...tasks, newTaskObj]);
    setUserTasks([...userTasks, newTaskObj]);
    setNewTask('');
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const handleSendBack = (taskId) => {
    const taskToSendBack = tasks.find((task) => task.id === taskId);
    const updatedRightTable1Data = [...rightTable1Data];
    const updatedRightTable2Data = [...rightTable2Data];

    if (taskToSendBack.pageid === 'input1') {
      updatedRightTable1Data.push(taskToSendBack);
    } else if (taskToSendBack.pageid === 'input2') {
      updatedRightTable2Data.push(taskToSendBack);
    }

    setRightTable1Data(updatedRightTable1Data);
    setRightTable2Data(updatedRightTable2Data);
    setTasks(tasks.filter((task) => task.id !== taskId));
  };
  const handleClearTasks = () => {
    const updatedRightTable1Data = [...rightTable1Data];
    const updatedRightTable2Data = [...rightTable2Data];
    const remainingTasks = [];

    tasks.forEach((task) => {
      if (task.pageid === 'input1') {
        updatedRightTable1Data.push(task);
      } else if (task.pageid === 'input2') {
        updatedRightTable2Data.push(task);
      } else {
        remainingTasks.push(task);
      }
    });

    setRightTable1Data(updatedRightTable1Data);
    setRightTable2Data(updatedRightTable2Data);
    setTasks([]);
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center px-8">
      <h1 className="text-5xl font-bold mt-15">Welcome to the Todo List</h1>
      <p className="text-xl mt-4">
        Manage your tasks efficiently and effectively
      </p>
      <div className="w-full flex items-center mt-40 h-[30vh] gap-4">
        <div className="w-full items-center flex h-full flex-col gap-4">
          <h2 className="text-2xl font-bold">Create your Task</h2>
          <form
            className="mt-4 w-full flex flex-col px-10 items-center gap-4 mb-10"
            onSubmit={handleAddTask}
          >
            <div className="flex w-full gap-3">
              <input
                type="text"
                placeholder="Enter your Task"
                className="new-todo w-full border p-2 text-center"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
              />
            </div>
            <button className="add-todo btn btn-primary w-full" type="submit">
              Add Task
            </button>
          </form>
        </div>
        <h2 className="text-3xl font-bold">OR</h2>
        <div className="w-full items-center h-full flex flex-col gap-4">
          <h2 className="text-2xl font-bold">Choose from these lists</h2>
          <div className="mt-4 w-full flex flex-col px-10 gap-4 justify-center">
            <button
              className="input1 btn btn-warning"
              onClick={() => navigate('/input1')}
            >
              Input 1
            </button>
            <button
              className="input2 btn btn-accent"
              onClick={() => navigate('/input2')}
            >
              Input 2
            </button>
          </div>
        </div>
      </div>
      <div className="flex items-center mt-8 w-full justify-center">
        <h2 className="text-2xl font-bold ">Your Tasks</h2>
        <div className="flex items-center w-fit h-fit absolute right-10">
          <button
            onClick={handleClearTasks}
            className="clear-todo btn btn-error w-20 m-4"
          >
            Clear
          </button>
          <button
            onClick={() => setTasks([])}
            className="purge-todo btn btn-error w-20 m-4"
          >
            Purge
          </button>
        </div>
      </div>
      <table className="mt-4 w-full max-w-full table-auto border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-200 p-2 w-[20vw]">ID</th>
            <th className="border border-gray-200 p-2 w-[50vw]">title</th>
            <th className="border border-gray-200 p-2 w-[20vw]">Actions</th>
          </tr>
        </thead>
        <tbody className="table-data">
          {tasks.map((task, index) => (
            <tr key={index}>
              <td className="border border-gray-200 p-2 {`${task.id}`}">
                {task.id}
              </td>
              <td className="border border-gray-200 p-2">
                <div
                  className={`${
                    task.pageid === 'input1'
                      ? 'btn-warning'
                      : task.pageid === 'input2'
                        ? 'btn-accent'
                        : 'btn-primary'
                  } todo-list-item  btn w-full p-2 rounded-2xl`}
                >
                  {' '}
                  {task.title}
                </div>
              </td>
              <td className="border border-gray-200 p-2 flex gap-4 justify-center">
                <button
                  onClick={() => handleSendBack(task.id)}
                  className="send-back-todo btn btn-info"
                >
                  Send Back
                </button>
                <button
                  className="delete-todo btn btn-danger"
                  onClick={() => handleDeleteTask(task.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
