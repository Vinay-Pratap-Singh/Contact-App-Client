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
    <form className="absolute divCenter border-2 border-white p-2 w-[70%] bg-gray-300">
      <input
        className="bg-transparent "
        type="text"
        placeholder="Enter Contact Name"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <input
        className="bg-transparent"
        type="number"
        placeholder="Enter Mobile Number"
        minLength={10}
        maxLength={10}
        value={number}
        onChange={(event) => setNumber(event.target.value)}
      />
      <button onClick={addContact}>Add Contact</button>
    </form>
  );
};

export default AddCard;
