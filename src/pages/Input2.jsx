import { useEffect, useState } from 'react';
import axios from 'axios';
import { rightTable2DataState, tableDataState } from '../state/todoState';
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { TailSpin } from 'react-loader-spinner';
import { toast, ToastContainer } from 'react-toastify';

const Input2 = () => {
  const nav = useNavigate();
  const [tableData, setTableData] = useRecoilState(tableDataState);
  const [rightTableData, setRightTableData] =
    useRecoilState(rightTable2DataState);
  const [leftTableData, setLeftTableData] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const [loading, setLoading] = useState(false);

  const backToHome = () => {
    nav('/');
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get('https://jsonplaceholder.typicode.com/todos')
      .then((response) => {
        const todos = response.data;
        const randomTodos = todos.sort(() => 0.5 - Math.random()).slice(0, 10);
        setLeftTableData(randomTodos);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, [refresh]);

  const checkIfRowExistsInMainTable = (row) => {
    const rowExists = tableData.find((item) => item.id === row.id);
    if (rowExists) {
      return true;
    }
  };

  const moveRowToRightTable = (row) => {
    if (checkIfRowExistsInMainTable(row)) {
      toast.error('Task already exists in Main Table', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    const rowWithPageId = { ...row, pageid: 'input2' };
    setRightTableData([...rightTableData, rowWithPageId]);
    setLeftTableData(leftTableData.filter((item) => item.id !== row.id));
  };

  const moveRowToLeftTable = (row) => {
    setRightTableData(rightTableData.filter((item) => item.id !== row.id));
    setLeftTableData([...leftTableData, row]);
  };

  const addrightTableDataToTableData = () => {
    setTableData([...tableData, ...rightTableData]);
    setRightTableData([]);
  };

  const refreshTableData = () => {
    setRefresh(refresh + 1);
  };

  return (
    <div className="relative w-screen h-fit min-h-screen p-4">
      <button
        onClick={backToHome}
        className="home absolute btn btn-error right-5 top-5 z-10"
      >
        Back to Home Page
      </button>
      <h1 className="text-4xl font-bold text-center mb-4">Input 2</h1>
      <h2 className="text-2xl text-center mb-8">
        Todo List - Manage your tasks efficiently
      </h2>
      <div className="flex justify-around gap-3">
        <div className="w-1/2 flex flex-col items-center">
          <h3 className="text-xl font-semibold mb-2">Available Tasks</h3>
          <button
            className="btn btn-success w-50 mb-2 refresh"
            onClick={refreshTableData}
          >
            Refresh
          </button>
          {loading ? (
            <TailSpin
              height="50"
              width="50"
              color="#4fa94d"
              ariaLabel="tail-spin-loading"
              radius="1"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          ) : (
            <table className="table w-full">
              <thead>
                <tr>
                  <th className="w-[10%]">ID</th>
                  <th className="w-[70%]">Title</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className="left-table-data">
                {leftTableData.map((row) => (
                  <tr key={row.id} className="left-table-row">
                    <td>{row.id}</td>
                    <td>
                      <div className="btn btn-accent w-full p-2 text-black font-normal h-fit rounded-2xl">
                        {row.title}
                      </div>
                    </td>
                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={() => moveRowToRightTable(row)}
                      >
                        Send Right
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <div className="w-[10vw] flex flex-col items-center justify-center">
          <button className="btn btn-circle bg-amber-400 m-4">{`>`}</button>
        </div>
        <div className="w-1/2 flex flex-col items-center">
          <h3 className="text-xl font-semibold mb-2">Selected Tasks</h3>
          <button
            className="btn btn-success w-50 mb-2"
            onClick={addrightTableDataToTableData}
          >
            Add to Main Table
          </button>
          <table className="table w-full">
            <thead>
              <tr>
                <th className="w-[10%]">ID</th>
                <th className="w-[70%]">Title</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="right-table-data">
              {rightTableData.map((row) => (
                <tr key={row.id} className="right-table-row">
                  <td>
                    <div>{row.id}</div>
                  </td>
                  <td>
                    <div className="btn btn-accent w-full p-2 text-black font-normal h-fit rounded-2xl">
                      {row.title}
                    </div>
                  </td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => moveRowToLeftTable(row)}
                    >
                      Send Back
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Input2;
