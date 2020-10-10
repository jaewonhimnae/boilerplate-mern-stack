import React, { useState } from "react";
import { Form, Input, Button, Upload, Select, Modal } from "antd";
import "./style.scss";
import PictureWallPage from "./PictureWallPage";
function UploadProductPage() {
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState("vertical");

  const onFormLayoutChange = ({ layout }) => {
    setFormLayout(layout);
    console.log("lay.", layout);
  };

  const { Option } = Select;

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };

  const buttonItemLayout = {
    wrapperCol: { span: 14, offset: 4 },
  };

  return (
    <div className="upload-product">
      <div className="upload-product__header">
        <h1>Upload Product</h1>
      </div>
      <Form
        {...formItemLayout}
        layout={formLayout}
        form={form}
        initialValues={{ layout: formLayout }}
        onValuesChange={onFormLayoutChange}
      >
        <Form.Item>
          <PictureWallPage />
        </Form.Item>
        <Form.Item label="Title">
          <Input placeholder="Title" />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input.TextArea />
        </Form.Item>
        <Form.Item label="Price">
          <Input placeholder="$" />
        </Form.Item>
        <Form.Item label="Region">
          <Select defaultValue="Asian" style={{ width: "30%" }}>
            <Option value="asia">Asia</Option>
            <Option value="america">America</Option>
            <Option value="europe">Europe</Option>
          </Select>
        </Form.Item>
        <Form.Item {...buttonItemLayout}>
          <Button type="primary">Submit</Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default UploadProductPage;
