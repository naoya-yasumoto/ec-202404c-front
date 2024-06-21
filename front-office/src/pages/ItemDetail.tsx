import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Item from '../components/Item';
import axios from 'axios';

import styled from 'styled-components';
import { HOST_IP } from '../config';

const Container = styled.div`
  width: 100%;
  // padding: 20px;
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

interface Item {
  bottomId: number;
  description: string;
  id: number;
  imagePath: string;
  itemType: string;
  name: string;
  price: number;
  topId: number;
}

interface AddCartRequest {
  itemId: number;
  name: string;
  size: string;
  quantity: number;
  price: number;
}

const ItemDetail: React.FC = () => {

  const { id } = useParams();
  const [item, setItem] = useState<Item | null>(null);

  useEffect(() => {
    const getChatsAsync = async () => {
      const response = await axios.get(`http://${HOST_IP}:8080/ec-202404c/item/${id}`);
      console.log("responseDetailpage", response.data);
      console.log("Item ID from URL:", id);
      setItem(response.data);
    }
    getChatsAsync();
  }, [id])


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const size = formData.get('size');
    const quantity = formData.get('quantity');

    const cartItem: AddCartRequest = {
      itemId: item.id,
      name: item.name,
      size: "M",
      quantity: 1,
      price: item.price*quantity,
    };

    console.log(cartItem)
  };

  if(item===null){
    return
  }

  return (
    <Container>
      {/* <Navbar /> */}
      <form action="cart_list.html"  onSubmit={handleSubmit}>
        <Title>商品詳細</Title>
        <h1>この商品のID:{id}</h1>
        <Row>
          <Column>
            <Image src={`http://${HOST_IP}:9090/img/`+item.imagePath} alt="じゃがバターベーコン" />
          </Column>
          <Column>
            <div>
              <h4>{item.name}</h4>
              <p>
              {item.description}
              </p>
            </div>
          </Column>
        </Row>
        <FormGroup>
          <Label>サイズ</Label>
          <RadioLabel>
            <input type="radio" name="size" defaultChecked />
            <span>&nbsp;М&nbsp;</span>&nbsp;&nbsp;{item.price}円(税抜)
          </RadioLabel>
          <RadioLabel>
            <input type="radio" name="size" />
            <span>&nbsp;Ｌ&nbsp;</span>&nbsp;&nbsp;{item.price}円(税抜)
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
          <TotalPrice>この商品金額：{item.price}円(税抜)</TotalPrice>
        </FormGroup>
        <FormGroup>
          <Button type="submit">カートに入れる</Button>
        </FormGroup>
      </form>
    </Container>
  );
};

export default ItemDetail;
