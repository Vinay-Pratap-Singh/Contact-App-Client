import React, { useState } from "react";
import axios from "axios";

const AddCard = (props) => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState(undefined);

  const addContact = async (event) => {
    event.preventDefault();

    const response = await axios.post("/addcontact", {
      name: name,
      phone: number,
    });

    const data = response.data;
    alert(data);
    setName("");
    setNumber("");
    //   setting the change to render the newly added contacts
    props.setNewchange(!props.newchange);
  };

  return (
    <form type="POST" onSubmit={addContact} className="absolute divCenter border-2 border-white w-[70%] bg-gray-300 rounded-lg">
      <input
        className="bg-transparent text-sm m-2"
        type="text"
        placeholder="Enter Contact Name"
        required
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <input
        className="bg-transparent text-sm m-2"
        type="number"
        placeholder="Enter Mobile Number"
        minLength={10}
        maxLength={10}
        required
        value={number}
        onChange={(event) => setNumber(event.target.value)}
      />
      <button className="text-lg font-bold w-full py-1 bg-gray-700 text-white rounded-br-lg rounded-bl-lg mt-2">Add Contact</button>
    </form>
  );
};

export default AddCard;
