import React, { useEffect, useState } from "react";
import DisplayCard from "./components/DisplayCard";
import axios from "axios";
import AddCard from "./components/AddCard";

const App = () => {
  // for running use effect once crud being performed
  const [newchange, setNewchange] = useState(true);

  // for storing the data from the backend
  const [data, setData] = useState([]);

  // for show and hide the add contact form
  const [showForm, setShowform] = useState(false);

  // for storing the keyword for filtering the data
  const [filter, setFilter] = useState("");

  // function for toggling the form
  const toggleShowform = (event) => {
    setShowform(!showForm);
    if (event.target.innerHTML === "+") event.target.innerHTML = "-";
    else event.target.innerHTML = "+";
  };

  // function for filtering out the data on search
  const filterContact = (event) => {
    setFilter(event.target.value);
    setData(
      data.filter((element) => element.name.toLowerCase().includes(filter.toLowerCase()))
    );   
  };

  useEffect(() => {
    const contactDetails = async () => {
      const response = await axios.post("/displaycontact");
      setData(...[response.data]);
    };
    contactDetails();
  }, [newchange]);

  return (
    <div className="h-[90vh] w-80 bg-white text-gray-800 p-4 relative rounded-lg">
      {/* header part */}
      <header className="mb-4 text-center">
        <div className="mb-2 relative">
          <h1 className="text-[22px] font-bold ">Contact</h1>
          <p
            onClick={toggleShowform}
            className="font-semibold text-lg border border-gray-100 rounded-[50%] px-3 py-1 cursor-pointer absolute right-2 top-0 shadow-sm text-cyan-500"
          >
            +
          </p>
        </div>

        <input
          className="px-2 py-1 text-sm text-center font-medium border-gray-300 border-[1.5px] rounded-[20px] bg-gray-100"
          type="text"
          placeholder="Search the Contact"
          value={filter}
          onChange={filterContact}
        />
      </header>

      {/* main body to render contacts */}
      <main>
        {data.map((element) => {
          return (
            <DisplayCard
              name={element.name}
              number={element.phone}
              key={element._id}
              setNewchange={setNewchange}
              newchange={newchange}
            />
          );
        })}

        {showForm && (
          <AddCard setNewchange={setNewchange} newchange={newchange} />
        )}
      </main>
    </div>
  );
};

export default App;
