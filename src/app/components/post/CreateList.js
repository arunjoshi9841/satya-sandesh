import React from 'react';

const CreateList = ({handleChange}) => {
    return (
        <div className="flex flex-col justify-center items-center shadow-md p-4 hover:opacity-50 cursor-pointer m-2 w-60" onClick={handleChange}>
      <div>
        <img src="assets/add_post.svg" alt="new entry" className="w-48"/>
      </div>
      <p className="text-xl py-8">नयाँ लेख सिर्जना गर्नुहोस्</p>
    </div>
    );
};

export default CreateList;