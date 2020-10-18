import { Collapse, Form, Input, Select, Tag } from "antd";
import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import Upload from "../../utils/Upload";
import { headerImageUpdate, post, setHeaderImageUrl, setPost } from "./postSlice";
import Title from "../../utils/Title";
const Initialize = () => {
  const dispatch = useDispatch();
  const _post = useSelector(post);
  const _labels = useSelector((state)=>state.label.labels);
  const [form] = Form.useForm();
  useEffect(()=>{
    form.setFieldsValue({title: _post.title, summary: _post.summary, labels: _post.labels})
  }, [_post])
  const handleChange = (e) => {
    dispatch(
      setPost({
        ..._post,
        [e.target.id]: e.target.value,
      })
    );
  };
  const handleLabelChange = (value) => {
    dispatch(
      setPost({
        labels: value,
      })
    );
  };
  const uploadImage = (image) => {
    dispatch(setHeaderImageUrl(image));
  };
  const updateHeaderImage=(image)=>{
    dispatch(headerImageUpdate(image));
  } 
  return (
    <div className="flex-grow px-6">      
      <Title title={_post.articleId===-1? "लेख सिर्जना गर्नुहोस्": "लेख परिमार्जन गर्नुहोस्"}/>     
      <Form      
        form ={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        layout="horizontal"
        size="large"
      >
        <Form.Item
          name="title"
          label="शीर्षक प्रदान दिनुहोस्"
          initialValue={_post.title}
          rules={[
            {
              required: true,
              message: "Please enter a title for your article",
            },
          ]}
        >
          <Input onChange={handleChange} value={_post.title} lang="ne" />
        </Form.Item>
        <Form.Item
          name="summary"
          label="सारांश प्रदान गर्नुहोस्"
          initialValue={_post.summary}
          rules={[
            {
              required: true,
              message: "Please enter a summary for your article",
            },
          ]}
          help={
            "Should be no more than 300 characters and no less than 50 characters"
          }
        >
          <Input.TextArea
            onChange={handleChange}
            value={_post.summary}
            rows={4}
            lang="ne"
          />
        </Form.Item>
        <Form.Item label="लेबलहरू">
          <Select mode="tags" onChange={handleLabelChange} value={_post.labels}>
            {_labels.map((label, index) => (
              <Select.Option value={label.labelId} key={index}>
                <Tag color={label.color} style={{ marginRight: 3 }}>
                  {label.name}
                </Tag>
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        {_post.articleId === -1 ? (
          <Form.Item label="हेडर तस्वीर अपलोड गर्नुहोस्">
            <Upload handleUpload={uploadImage} url={_post.thumbnail} />
          </Form.Item>
        ) : (
          <Collapse>
            <Collapse.Panel header="हेडर तस्वीर परिवर्तन गर्नुहोस्" key="1">
            <Form.Item label="हेडर तस्वीर अपलोड गर्नुहोस्">
            <Upload handleUpload={updateHeaderImage} url={_post.thumbnail} />
          </Form.Item>
            </Collapse.Panel>
          </Collapse>
        )}
      </Form>
    </div>
  );
};

export default Initialize;
