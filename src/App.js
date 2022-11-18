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

  // function for toggling the form
  const toggleShowform = (event) => {
    setShowform(!showForm);
    if (event.target.innerHTML === "+") event.target.innerHTML = "-";
    else event.target.innerHTML = "+";
  }

  useEffect(() => {
    const contactDetails = async () => {
      const response = await axios.post("/displaycontact");
      setData(...[response.data]);
    };
    contactDetails();
  },[newchange]);

  return (
    <div className="h-[90vh] w-96 bg-[#efefef] text-gray-800 p-4 relative rounded-lg">
      {/* header part */}
      <header className="mb-4 text-center">
        <div className="flex items-center justify-evenly mb-2">
          <h1 className="text-[22px] font-bold ">Contacts</h1>
          <p onClick={toggleShowform} className="font-bold text-lg bg-gray-300 rounded-[50%] px-3 py-1 cursor-pointer">+</p>
        </div>

        <input className="px-2 py-1 text-sm font-medium bg-transparent border-white border-[2px] rounded-[20px]" type="text" placeholder="Search the Contact" />
      </header>

      {/* main body to render contacts */}
      <main>
        {
          data.map((element) => {
            return <DisplayCard name={element.name} number={element.phone} key={element._id} setNewchange={setNewchange} newchange={newchange} />
          })
        }

        {
          showForm && (<AddCard setNewchange={setNewchange} newchange={newchange} />)
        }
        
      </main>
    </div>
  );
};

export default App;
