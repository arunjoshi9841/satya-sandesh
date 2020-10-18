import React, { useEffect, useState } from 'react';
import { Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getLabels, handleLabel, deleteLabel } from './labelSlice';
import LabelCard from './LabelCard';
import CreateLabel from './CreateLabel';
import LabelDialog from './LabelDialog';
const Labels = () => {
  const dispatch = useDispatch();
  const _loading = useSelector((state) => state.label.isLoading);
  const _labels = useSelector((state) => state.label.labels);
  const [isOpen, setOpen] = useState(false);
  const [selected, setSelected] = useState({ labelId: -1 });
  useEffect(() => {
    dispatch(getLabels());
  }, []);
  const handleSubmit = (data) => {
    dispatch(handleLabel(data));
  };
  const handleOpen = (selection) => {
    setOpen(true);
    setSelected(selection);
  };
  const handleDelete=(id)=>{
    dispatch(deleteLabel(id));
  }
  return (
    <Spin tip='Loading...' size='large' spinning={_loading}>
      <div>
        <p className='text-2xl bold text-center max-w-xs lg:top-12 lg:text-left'>
          Labels
        </p>
        <div className='flex flex-col md:flex-row mt-12 justify-center items-center'>
            <CreateLabel handler={handleOpen} />
          <div className='flex flex-wrap justify-center md:justify-start items-center'>
            {_labels.map((label, index) => (
              <LabelCard label={label} handler={handleOpen} key={index} handleDelete={handleDelete}/>
            ))}
          </div>
        </div>

        {isOpen && (
          <LabelDialog
            label={selected}
            open={isOpen}
            close={() => setOpen(false)}
            handler={handleSubmit}
          />
        )}
      </div>
    </Spin>
  );
};

export default Labels;
