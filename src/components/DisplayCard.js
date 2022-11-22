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
  const showCard = () => {
    const element = document.getElementById("displayPopUp");
    if (element.style.display === "none") {
      element.style.display = "block";
    } else {
      element.style.display = "none";
      const myBtn = document.getElementById("editDeleteBtn");
      myBtn.innerText = "Edit";
      setEditable(false);
    }
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
    } else if (editable && text === "Update") {
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
    <div className="mb-4 mx-2">
      {/* card details */}
      <div
        onClick={showCard}
        className="flex items-center gap-4 shadow-[inset_1px_1px_1px_gray,inset_-1px_-1px_1px_white] hover:shadow-[1px_1px_1px_gray,-1px_-1px_1px_white] px-2 py-1 transition duration-700 ease-in-out cursor-pointer group"
      >
        {/* user logo */}
        <p
          style={{ backgroundColor: color }}
          className="w-8 h-8 rounded-[50%] flex items-center justify-center font-normal text-white group-hover:shadow-[1px_1px_1px_gray,-1px_-1px_1px_white]"
        >
          {props.element.name[0].toUpperCase()}
        </p>
        <div>
          <h3 className="font-semibold text-[15px] text-gray-700 cursor-pointer group-hover:text-gray-900 capitalize">
            {props.element.name}
          </h3>
          <p className="text-xs text-gray-500 group-hover:font-medium">
            {props.element.phone}
          </p>
        </div>
      </div>

      {/* pop up card */}
      <div
        id="displayPopUp"
        className="hidden absolute divCenter shadow-[3px_3px_3px_gray,-3px_-3px_3px_white] w-[70%] bg-[#E5E7EB] rounded-lg p-2"
      >
        {/* close button for card */}
        <p
          onClick={showCard}
          className="font-semibold text-sm hover:scale-[1.1] rounded-[50%] px-[11px] py-1 cursor-pointer absolute right-3 top-[22px] text-cyan-500 shadow-[1px_1px_1px_gray,-1px_-1px_1px_white] transition-all"
        >
          x
        </p>

        <input
          type="text"
          value={name}
          onChange={(event) => {
            if (editable) setName(event.target.value);
          }}
          className="bg-transparent text-base text-gray-700 font-semibold py-1 px-2 w-full rounded-md shadow-[1px_1px_1px_gray,-1px_-1px_1px_white] mt-3 capitalize"
        />
        <input
          type="number"
          value={number}
          onChange={(event) => {
            if (editable) setNumber(event.target.value);
          }}
          className="bg-transparent text-base text-gray-700 font-semibold py-1 px-2 w-full rounded-md shadow-[1px_1px_1px_gray,-1px_-1px_1px_white] mt-3"
        />

        {/* call, message and video call icons */}
        <div className="flex items-center justify-around my-4">
          <i className="fa-solid fa-phone p-2 rounded-[50%] shadow-[2px_2px_2px_gray,-2px_-2px_2px_white] text-blue-800 font-bold cursor-pointer hover:scale-[1.1] transition-all"></i>
          <i className="fa-solid fa-message p-2 rounded-[50%] shadow-[2px_2px_2px_gray,-2px_-2px_2px_white] text-cyan-600 font-bold cursor-pointer hover:scale-[1.1] transition-all"></i>
          <i className="fa-solid fa-video p-2 rounded-[50%] shadow-[2px_2px_2px_gray,-2px_-2px_2px_white] text-pink-600 font-bold cursor-pointer hover:scale-[1.1] transition-all"></i>
        </div>

        {/* buttons for edit and delete */}
        <div className="flex items-center justify-evenly">
          <button
            id="editDeleteBtn"
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
