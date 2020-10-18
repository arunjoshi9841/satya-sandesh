import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DateSegment from '../../utils/DateSegment';
import Footer from '../../utils/Footer';
import { getQuote } from '../quotes/quoteSlice';
import Articles from './Articles';
import Featured from './Featured';
import Headlines from './Headlines';
import { getData} from './homeSlice';
import LoadingComponent from './LoadingComponent';
import Quotes from './Quotes';
const Home = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.home.isLoading);
  const quote = useSelector((state) => state.quote.quote);
  useEffect(() => {
    dispatch(getData());
    dispatch(getQuote());
  }, []);
  return (
    <div className='flex-grow flex flex-col'>
      <div className='flex flex-wrap justify-between px-4'>
        <DateSegment />
        <div className='text-xs'>{quote.quote && <Quotes quote={quote} />}</div>
      </div>
      {!loading ? (
        <div className="flex-grow">
          <Headlines/>
          <Featured />
          <Articles />
        </div>
      ) : (
        <LoadingComponent />
      )}
        <Footer />
    </div>
  );
};

export default Home;
