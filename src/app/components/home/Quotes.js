import React from 'react';

const Quotes = ({ quote }) => {
  return (
    <div className='py-2'>
      <p className='font-bold text-lg'>हप्ताको भनाइ:</p>

      <p className='text-base'>
        <span className='text-2xl font-serif'>&#8220; </span>
        {quote.quote}
        <span className='text-2xl font-serif'> &#8221;</span>
      </p>
      <p className='flex justify-end font-bold'> -{quote.author}</p>
    </div>
  );
};

export default Quotes;
