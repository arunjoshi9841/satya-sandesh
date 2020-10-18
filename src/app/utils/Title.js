import React from 'react';

const Title = ({title}) => {
    return (
        <p className="text-2xl pb-2 bold mb-6 border-b-4 border-primary">        
        <span className="px-2"> {title}</span>
      </p>
    );
};

export default Title;