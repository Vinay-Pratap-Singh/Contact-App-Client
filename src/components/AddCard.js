import React, { useState } from "react";
import axios from "axios";

const AddCard = (props) => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  const addContact = async (event) => {
    event.preventDefault();

    const response = await axios.post("https://contact-app-server-production.up.railway.app/addcontact", {
      name: name,
      phone: number,
    });

    const data = response.data;
    alert(data);
    setName("");
    setNumber("");

    //  setting the change to render the newly added contacts
    props.setNewchange(!props.newchange);

    // hiding the add card pop up
    props.setShowform(!props.showForm);

    // changing the symbol of add button
    props.setBtnSymbol("+");
  };

  return (
    <form
      type="POST"
      onSubmit={addContact}
      className="divCenter absolute shadow-[3px_3px_3px_gray,-3px_-3px_3px_white] w-[70%] bg-[#E5E7EB] rounded-lg"
    >
      <div className="m-2 relative mt-4">
        <input
          className="bg-transparent text-sm py-2 px-2 w-full rounded-md shadow-[inset_1px_1px_1px_gray,inset_-1px_-1px_1px_white]"
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
          className="bg-transparent text-sm py-2 px-2 w-full rounded-md shadow-[inset_1px_1px_1px_gray,inset_-1px_-1px_1px_white]"
          type="number"
          minLength={10}
          maxLength={10}
          required
          value={number}
          onChange={(event) => setNumber(event.target.value)}
        />

        <label className="text-sm text-gray-500 absolute top-2 left-2">Contact Number</label>
      </div>

      <button className="text-lg font-bold w-full py-1 bg-gray-400 text-white rounded-br-lg rounded-bl-lg mt-3 hover:bg-gray-500 transition duration-300 ease-in-out">
        Add Contact
      </button>
    </form>
  );
};

export default AddCard;
