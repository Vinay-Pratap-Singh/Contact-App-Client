import React, { useEffect, useState } from "react";
import DisplayCard from "./components/DisplayCard";
import axios from "axios";
import AddCard from "./components/AddCard";

const App = () => {
  // for running use effect once crud being performed
  const [newchange, setNewchange] = useState(true);

  // for storing the data from the backend
  const [data, setData] = useState([]);
  const [orgData, setOrgData] = useState([]);

  // for show and hide the add contact form
  const [showForm, setShowform] = useState(false);

  // handling + or - symbol in button
  const [btnSymbol, setBtnSymbol] = useState("+");

  // for storing the keyword for filtering the data
  const [filterData, setFilterData] = useState("");

  // function for toggling the form
  const toggleShowform = (event) => {
    setShowform(!showForm);
    if (showForm) setBtnSymbol("+");
    else setBtnSymbol("-");
  };

  // function for filtering out the data on search
  const filterContact = (event) => {
    let fData = event.target.value
    setFilterData(fData);
    if (fData === "") {
     setData(orgData)
    } else {
      setData(orgData.filter((element) => element.name.toLowerCase().includes(fData.toLowerCase())));   
    }
  };

  // getting the data from the database
  useEffect(() => {
    const contactDetails = async () => {
      const response = await axios.post("https://contact-app-server-production.up.railway.app/displaycontact");
      setData(response.data);
      setOrgData(response.data);
    };
    contactDetails();
  }, [newchange]);


  return (
    <div className="h-[90vh] w-80 bg-[#E5E7EB] text-gray-500 p-4 relative rounded-xl shadow-[3px_3px_3px_gray,-3px_-3px_3px_white]">
      {/* header part */}
      <header className="mb-4 text-center">
        <div className="mb-2 relative">
          <h1 className="text-[22px] font-bold text-gray-700">Contact</h1>
          <p
            onClick={toggleShowform}
            className="font-semibold text-lg hover:scale-[1.1] rounded-[50%] px-3 py-1 cursor-pointer absolute right-2 top-0  text-cyan-500 shadow-[1px_1px_1px_gray,-1px_-1px_1px_white] transition-all"
          >
            {btnSymbol}
          </p>
        </div>

        <input
          className="px-2 py-1 text-sm text-center font-medium border-gray-300 border-[1.5px] rounded-[20px] bg-gray-100 focus:border-gray-500 animate-all duration-75"
          type="text"
          placeholder="Search the Contact"
          value={filterData}
          onChange={filterContact}
        />
      </header>

      {/* main body to render contacts */}
      <main className="w-full max-h-[85%] overflow-y-scroll">
        {data.map((element) => {
          return (
            <DisplayCard
              element={element}
              setNewchange={setNewchange}
              newchange={newchange}
              key={element._id}
            />
          );
        })}

        {showForm && (
          <AddCard setNewchange={setNewchange} newchange={newchange} setShowform={setShowform} showForm={showForm} setBtnSymbol={setBtnSymbol} />
        )}
      </main>
    </div>
  );
};

export default App;
