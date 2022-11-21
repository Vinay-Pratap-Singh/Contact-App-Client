import React, { useState } from "react";
import axios from "axios";

const AddCard = (props) => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

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
    <form
      type="POST"
      onSubmit={addContact}
      className="divCenter absolute border-2 border-white w-[70%] bg-[#E3F0F4] rounded-lg"
    >
      <div className="m-2 relative mt-4">
        <input
          className="bg-transparent border border-gray-300 text-sm py-[6px] px-2 w-full rounded-md"
          type="text"
          required
          value={name}
          onChange={(event) => setName(event.target.value)}
        />

        <label className="text-sm text-gray-500 absolute top-2 left-2">
          Contact Name
        </label>
      </div>

      <div className="m-2 relative mt-4">
        <input
          className="bg-transparent border border-gray-300 text-sm py-[6px] px-2 w-full rounded-md"
          type="number"
          minLength={10}
          maxLength={10}
          required
          value={number}
          onChange={(event) => setNumber(event.target.value)}
        />

        <label className="text-sm text-gray-500 absolute top-2 left-2">Contact Number</label>
      </div>

      <button className="text-lg font-bold w-full py-1 bg-gray-700 text-white rounded-br-lg rounded-bl-lg mt-2">
        Add Contact
      </button>
    </form>
  );
};

export default AddCard;
