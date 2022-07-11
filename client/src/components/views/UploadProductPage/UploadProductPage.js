import React, { useState } from "react";
import { Typography, Button, Form, Input } from "antd";
import FileUpload from "../../Utils/FileUpload";

const { TextArea } = Input;

const Continents = [
  { key: 1, value: "Africa" },
  { key: 2, value: "Europe" },
  { key: 3, value: "Asia" },
  { key: 4, value: "North America" },
  { key: 5, value: "South America" },
  { key: 6, value: "Australia" },
  { key: 7, value: "North America" },
];

function UploadProductPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [Continent, setContinent] = useState(1);

  const [images, setImages] = useState([]);

  const titleChangeHandelr = (e) => {
    setTitle(e.target.value);
  };
  const descriptionChangeHandler = (e) => {
    setDescription(e.target.value);
  };
  const priceChangeHandler = (e) => {
    setPrice(e.target.value);
  };

  const continentChangeHandler = (e) => {
    setContinent(e.target.value);
  };

  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h2 level={2}>여행 상품 업로드</h2>
      </div>
      <Form>
        <FileUpload />
        <br />
        <br />
        <label>이름</label>
        <Input onChange={titleChangeHandelr} value={title} />
        <br />
        <br />
        <label>설명</label>
        <TextArea onChange={descriptionChangeHandler} value={description} />
        <br />
        <br />
        <label>가격($)</label>
        <Input type="number" onChange={priceChangeHandler} value={price} />
        <br />
        <br />
        <select onChange={continentChangeHandler} value={Continent}>
          {Continents.map((item) => (
            <option key={item.key} value={item.key}>
              {item.value}
            </option>
          ))}
        </select>
        <br />
        <br />
        <Button>확인</Button>
      </Form>
    </div>
  );
}

export default UploadProductPage;
