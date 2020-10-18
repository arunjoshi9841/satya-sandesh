import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import instance from "../../../api";
import { Editor } from "@tinymce/tinymce-react";
import { setPost, post, handleSave } from "./postSlice";
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import useDebounce from "./useDebounce";
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
const EditorContainer = () => {
  const dispatch = useDispatch();
  const _post = useSelector(post);
  const _saving = useSelector((state)=>state.post.isSaving);  
  const _loading = useSelector((state)=>state.post.isLoading);
  const [text, setText] = useState(_post.bodyText);
  const debounceTerm = useDebounce(text, 500);
  useEffect(() => {
    if(_post.articleId!==-1 && !_saving && !_loading){
      dispatch(
        setPost({
          ..._post,
          bodyText: text,
        })
      );
      dispatch(handleSave());
    }
  }, [debounceTerm]);  
  const handleChange = (editorContent) => {
    setText(editorContent);
  };
  return (
    _post.articleId!==-1&&<div>
      <Spin indicator={antIcon} spinning={_saving} style={{zIndex: "100", float: "right", width: "32px", position: "relative", top: "5px", right: "37px"}}/>
      <textarea id="image-tools" lang="ne"></textarea>
      <div className="hidden">
        <Editor
          initialValue={_post.bodyText}
          apiKey="69wc2vhmm2yzueziz6zq2oa9fkhu9ycg9aq1pd447yqhgm58"
          onEditorChange={handleChange}
          init={{
            selector: "textarea#image-tools",
            height: 500,
            images_dataimg_filter: function(img) {
              return img.hasAttribute('internal-blob');
          },
            plugins: [
              "advlist autolink lists link image charmap print preview anchor",
              "searchreplace visualblocks code fullscreen",
              "insertdatetime media table paste imagetools wordcount",
            ],
            /* we override default upload handler to simulate successful upload*/
            images_upload_handler: function (blobInfo, success, failure) {
              const file = blobInfo.base64();
              instance
                .post(`api/articles/upload?article_id=${_post.article_id}`, {
                  image: file,
                })
                .then((response) => {
                  success(response.data)
                })
                .catch((e) => {                  
                  failure("Image upload failed");
                });
            },
            toolbar:
              "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image",
          }}          
        />
      </div>
    </div>
  );
};

export default EditorContainer;
