import React from "react";

const Card = () => {
  const showCard = (event) => {
    const parentElement = event.target.parentElement.parentElement;
    const element = parentElement.nextElementSibling;
    element.classList.toggle("hidden");
  };

  const closeCard = (event) => {
    const element = event.target.parentElement;
    element.classList.toggle("hidden");
  };

  return (
      <div>
          {/* card details */}
      <div className="flex items-center gap-4">
        {/* user logo */}
        <p className="bg-gray-500 w-8 h-8 rounded-[50%] flex items-center justify-center font-bold text-white">
          V
        </p>
        <div>
          <h3 onClick={showCard} className="font-semibold text-lg cursor-pointer">
            Vinay Pratap Singh
          </h3>
          <p className="text-sm text-gray-500">1234567890</p>
        </div>
      </div>

      {/* pop up card */}
      <div className=" absolute border-2 border-white p-2 w-[70%] divCenter">
        {/* close button for card */}
        <p onClick={closeCard} className="bg-gray-300 w-fit rounded-[50%] px-3 py-1 cursor-pointer font-bold absolute right-4">x</p>

        <h3 className="font-semibold text-lg">Vinay</h3>
        <p className="text-sm text-gray-500 mb-4">1234567890</p>

        {/* call, message and video call icons */}
        <div className="flex items-center justify-around mb-6">
          <i className="fa-solid fa-phone bg-gray-400 p-2 rounded-[50%] cursor-pointer"></i>
          <i className="fa-solid fa-message bg-gray-400 p-2 rounded-[50%] cursor-pointer"></i>
          <i className="fa-solid fa-video bg-gray-400 p-2 rounded-[50%] cursor-pointer"></i>
        </div>

        {/* buttons for edit and delete */}
        <div className="flex items-center justify-evenly">
          <button className="text-base font-bold border-2 border-white px-4">Edit</button>
          <button className="text-base font-bold border-2 border-white px-4">Delete</button>
        </div>
      </div>
    </div>
  );
};

export default Card;
