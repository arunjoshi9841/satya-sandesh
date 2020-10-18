import React from 'react';
const initLabel ={
    labelId: -1,
    name: '',
    color:'',
    isNavigation: false,
}
const CreateLabel = ({handler}) => {
    const handleClick=()=>{
        handler(initLabel);
    }
    return (
        <div className="flex flex-col justify-center items-center shadow-md p-4 hover:opacity-50 cursor-pointer m-2 w-48" onClick={handleClick}>
      <div>
        <img src="assets/add_label.svg" alt="new entry" className="w-48"/>
      </div>
      <p className="text-xl py-8">Create new Label</p>
    </div>
    );
};

export default CreateLabel;