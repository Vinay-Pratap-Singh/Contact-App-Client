import React, { useState } from "react";
import axios from "axios";

const DisplayCard = (props) => {
  // state for changing the user name and number
  const [name, setName] = useState(props.element.name);
  const [number, setNumber] = useState(props.element.phone);

  // checking that the input box can be edited or not
  const [editable, setEditable] = useState(false);

  // array of some color for the name logo
  const colors = [
    "red",
    "purple",
    "green",
    "violet",
    "darkcyan",
    "darkmagenta",
    "darkslateblue",
    "darkturquoise",
  ];

  // function to display the pop up card
  const showCard = (event) => {
    const parentElement = event.target.parentElement.parentElement;
    const element = parentElement.nextElementSibling;
    element.classList.toggle("hidden");
  };

  // function to  close the pop up card
  const closeCard = (event) => {
    const element = event.target.parentElement;
    element.classList.toggle("hidden");
  };

  // function to delete a contact
  const deleteContact = async () => {
    const response = await axios.post("/deletecontact", {
      id: props.element._id,
    });
    alert(response.data.message);
    props.setNewchange(!props.newchange);
  };

  // function for updating the contact details
  const changeContact = async (event) => {
    const text = event.target.innerText;
    if (text === "Edit") {
      setEditable(true);
      event.target.innerText = "Update";
    }

    else if (editable && text === "Update") {
      const response = await axios.post("/updatecontact", {
        id: props.element._id,
        name,
        phone: number,
      });
      setEditable(false);
      event.target.innerText = "Edit";
      alert(response.data.message);
      props.setNewchange(!props.newchange);
    }
  };

  // choosing the random color for contact icon
  const color = colors[Math.floor(Math.random() * colors.length)];

  return (
    <div className="mb-4">
      {/* card details */}
      <div className="flex items-center gap-4">
        {/* user logo */}
        <p
          style={{ backgroundColor: color }}
          className="w-8 h-8 rounded-[50%] flex items-center justify-center font-medium text-white"
        >
          {props.element.name[0].toUpperCase()}
        </p>
        <div>
          <h3
            onClick={showCard}
            className="font-semibold text-base cursor-pointer"
          >
            {props.element.name}
          </h3>
          <p className="text-xs text-gray-600">{props.element.phone}</p>
        </div>
      </div>

      {/* pop up card */}
      <div className="hidden absolute border-2 border-white p-2 w-[70%] divCenter bg-gray-300">
        {/* close button for card */}
        <p
          onClick={closeCard}
          className="bg-gray-300 w-fit rounded-[50%] px-3 py-1 cursor-pointer font-bold absolute right-4"
        >
          x
        </p>

        <input
          type="text"
          placeholder="Enter new name"
          value={name}
          onChange={(event) => {
            if (editable) setName(event.target.value);
          }}
          className="font-semibold text-lg bg-transparent"
        />
        <input
          type="number"
          placeholder="Enter new number"
          value={number}
          onChange={(event) => {
            if (editable) setNumber(event.target.value);
          }}
          className="text-sm text-gray-500 mb-4 bg-transparent"
        />

        {/* call, message and video call icons */}
        <div className="flex items-center justify-around mb-6">
          <i className="fa-solid fa-phone bg-gray-400 p-2 rounded-[50%] cursor-pointer"></i>
          <i className="fa-solid fa-message bg-gray-400 p-2 rounded-[50%] cursor-pointer"></i>
          <i className="fa-solid fa-video bg-gray-400 p-2 rounded-[50%] cursor-pointer"></i>
        </div>

        {/* buttons for edit and delete */}
        <div className="flex items-center justify-evenly">
          <button
            className="text-base font-bold border-2 border-white px-4"
            onClick={changeContact}
          >
            Edit
          </button>
          <button
            className="text-base font-bold border-2 border-white px-4"
            onClick={deleteContact}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DisplayCard;
