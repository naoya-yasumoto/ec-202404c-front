import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Item from '../components/Item';
import axios from 'axios';
import Navbar from '../components/Navbar';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  padding: 20px;
`;

const Title = styled.h3`
  text-align: center;
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 15px;
`;

const Column = styled.div`
  flex: 1;
  padding: 10px;
`;

const Image = styled.img`
  width: 100%;
  border-radius: 8px;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
`;

const RadioLabel = styled.label`
  margin-right: 15px;
`;

const Select = styled.select`
  width: 100%;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #f0ad4e;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
`;

const TotalPrice = styled.span`
  display: block;
  margin-top: 20px;
  font-size: 1.2em;
  font-weight: bold;
`;

const ItemDetail: React.FC = () => {

  const { id } = useParams();
  const [items, setItems] = useState([]);

  useEffect(() => {
    const getChatsAsync = async () => {
      const response = await axios.get('http://192.168.16.130:8080/ec-202404c/items/set');
      console.log("responseDetailpage", response.data.items[0]);
      console.log("Item ID from URL:", id);
      setItems(response.data.items[0]);
    }
    getChatsAsync();
  }, [])


  return (
    <Container>
      <form action="cart_list.html">
        <Title>商品詳細</Title>
        <h1>この商品のID:{id}</h1>
        <Row>
          <Column>
            <Image src="../static/img_pizza/1.jpg" alt="じゃがバターベーコン" />
          </Column>
          <Column>
            <div>
              <h4>じゃがバターベーコン{id}</h4>
              <p>
                マイルドな味付けのカレーに大きくカットしたポテトをのせた、バターとチーズの風味が食欲をそそるお子様でも楽しめる商品です。
              </p>
            </div>
          </Column>
        </Row>
        <FormGroup>
          <Label>サイズ</Label>
          <RadioLabel>
            <input type="radio" name="size" defaultChecked />
            <span>&nbsp;М&nbsp;</span>&nbsp;&nbsp;1,380円(税抜)
          </RadioLabel>
          <RadioLabel>
            <input type="radio" name="size" />
            <span>&nbsp;Ｌ&nbsp;</span>&nbsp;&nbsp;2,380円(税抜)
          </RadioLabel>
        </FormGroup>
        <FormGroup>
          <Label>数量:</Label>
          <Select name="quantity">
            {[...Array(12)].map((_, i) => (
              <option key={i} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </Select>
        </FormGroup>
        <FormGroup>
          <TotalPrice>この商品金額：38,000 円(税抜)</TotalPrice>
        </FormGroup>
        <FormGroup>
          <Button type="submit">カートに入れる</Button>
        </FormGroup>
      </form>
    </Container>
  );
};

export default ItemDetail;
