import React from "react";
import Card from "./components/Card";

const App = () => {
  return (
    <div className="h-[90vh] w-96 bg-[#efefef] text-gray-800 p-4 relative rounded-lg">
      {/* header part */}
      <header className="mb-4 text-center">
        <div className="flex items-center justify-evenly mb-2">
          <h1 className="text-[22px] font-bold ">Contacts</h1>
          <i className="fa-solid fa-plus font-extrabold bg-gray-300 rounded-[50%] p-2 cursor-pointer"></i>
        </div>

        <input className="px-2 py-1 text-sm font-medium bg-transparent border-white border-[2px] rounded-[20px]" type="text" placeholder="Search the Contact" />
      </header>

      {/* main body to render contacts */}
      <main>
        <Card />
      </main>
    </div>
  );
};

export default App;
