import React, { useState, useEffect } from 'react';
import { Modal, Tag, Input, Checkbox  } from 'antd';
import { TagOutlined } from '@ant-design/icons';
import { SketchPicker } from 'react-color';
const LabelDialog = ({ label, open, close, handler }) => {
  const [name, setName] = useState(label.name);
  const [color, setColor] = useState(label.color);
  const [isNavigation, setIsNavigation] = useState(label.isNavigation);
  const [isValid, setIsValid] = useState(false);
  useEffect(() => {
    if (name.length > 0 && color.length > 0) {
      setIsValid(true);
    }
  }, [name, color]);
  const handleColorChange = (color) => {
    setColor(color.hex);
  };
  const handleSubmit=()=>{
    let data = {
      labelId: label.labelId,
      name: name,
      color: color,
      isNavigation: isNavigation
    }
    handler(data);
    close();
  }
  return (
    <Modal
      title='Label'
      visible={true}
      onOk={handleSubmit}
      onCancel={close}      
      okButtonProps={{disabled: !isValid}}
      width={340}
    >
      <p className='text-base mb-2'>Provide a name for the label:</p>
      <Input
        size='middle'
        prefix={<TagOutlined />}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <p className='text-base mt-4 mb-2'>Select a color for the label:</p>
      <SketchPicker
        color={color !== '' ? color : '#FFFFFF'}
        onChangeComplete={handleColorChange}
      />
      <div className="text-base mt-4 mb-2">
      <Checkbox onChange={(e)=>setIsNavigation(e.target.checked)} checked={isNavigation}>Navigation button</Checkbox>
      </div>
      {isValid && (
        <div>
          <p className='text-base mt-4 mb-2'>Result:</p>
          <Tag color={color}>{name}</Tag>
        </div>
      )}
    </Modal>
  );
};

export default LabelDialog;
