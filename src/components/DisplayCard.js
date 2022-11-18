import React from "react";
import axios from "axios";

const DisplayCard = (props) => {
  const showCard = (event) => {
    const parentElement = event.target.parentElement.parentElement;
    const element = parentElement.nextElementSibling;
    element.classList.toggle("hidden");
  };

  const closeCard = (event) => {
    const element = event.target.parentElement;
    element.classList.toggle("hidden");
  };

  const deleteContact = async () => {
    const number = props.number;
    const response = await axios.post("deletecontact", { phone: number });
    alert(response.data);
    props.setNewchange(!props.newchange);
  }

  return (
    <div className="mb-4">
      {/* card details */}
      <div className="flex items-center gap-4">
        {/* user logo */}
        <p className="bg-gray-500 w-8 h-8 rounded-[50%] flex items-center justify-center font-bold text-white">
          {props.name[0].toUpperCase()}
        </p>
        <div>
          <h3
            onClick={showCard}
            className="font-semibold text-lg cursor-pointer"
          >
            {props.name}
          </h3>
          <p className="text-sm text-gray-500">{props.number}</p>
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

        <h3 className="font-semibold text-lg">{props.name}</h3>
        <p className="text-sm text-gray-500 mb-4">{props.number}</p>

        {/* call, message and video call icons */}
        <div className="flex items-center justify-around mb-6">
          <i className="fa-solid fa-phone bg-gray-400 p-2 rounded-[50%] cursor-pointer"></i>
          <i className="fa-solid fa-message bg-gray-400 p-2 rounded-[50%] cursor-pointer"></i>
          <i className="fa-solid fa-video bg-gray-400 p-2 rounded-[50%] cursor-pointer"></i>
        </div>

        {/* buttons for edit and delete */}
        <div className="flex items-center justify-evenly">
          <button className="text-base font-bold border-2 border-white px-4">
            Edit
          </button>
          <button className="text-base font-bold border-2 border-white px-4" onClick={deleteContact}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DisplayCard;