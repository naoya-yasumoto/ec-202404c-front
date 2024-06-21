import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Item from '../components/Item';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import styled from 'styled-components';
import { HOST_IP } from '../config';
import { addItemSchema} from '../utils/addItemSchema';
import { z } from 'zod';

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
  userId: number;
  size: string;
  quantity: number;
  price: number;
}

const ItemDetail: React.FC = () => {

  const { id } = useParams<{ id: string }>();
  const [item, setItem] = useState<Item | null>(null);

  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [selectedSize, setSelectedSize] = useState<string>("M");
  const [selectedQuantity, setSelectedQuantity] = useState<number>(1);

  type ItemFormData = z.infer<typeof addItemSchema>;


  const { register, handleSubmit,  watch, formState: { errors } } = useForm<ItemFormData>({
    resolver: zodResolver(addItemSchema)
  });

  const watchedQuantity = watch('quantity', 1);

  useEffect(() => {
    const getItemAsync = async () => {
      const response = await axios.get(`http://${HOST_IP}:8080/ec-202404c/item/${id}`);
      setItem(response.data);
      setTotalPrice(response.data.price); // Initialize with default price
    }
    getItemAsync();
  }, [id]);

  useEffect(() => {
    if (item) {
      const quantity = Number(watchedQuantity);
      setTotalPrice(item.price * quantity);
    }
  }, [watchedQuantity, item]);


  const onSubmit = async (data: ItemFormData) => {
    if (!item) return;

    const cartItem: AddCartRequest = {
      itemId: item.id,
      userId: 2, 
      quantity: data.quantity,
      size: data.size,
      price: totalPrice
    };

    console.log(cartItem);

    try {
      const response = await axios.post(`http://${HOST_IP}:8080/ec-202404c/cart/add`, cartItem);
      console.log(response);
      // Handle success, e.g., redirect or show success message
    } catch (error) {
      // Handle error
      console.error("There was an error adding the item to the cart!", error);
    }
  };

  if(item===null){
    return
  }

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Title>商品詳細</Title>
        <h1>この商品のID:{id}</h1>
        <Row>
          <Column>
            <Image src={`http://${HOST_IP}:9090/img/${item.imagePath}`} alt={item.name} />
          </Column>
          <Column>
            <div>
              <h4>{item.name}</h4>
              <p>{item.description}</p>
            </div>
          </Column>
        </Row>
        <FormGroup>
          <Label>サイズ</Label>
          <RadioLabel>
            <input
              type="radio"
              value="M"
              {...register('size')}
              defaultChecked
              onChange={() => setSelectedSize('M')}
            />
            <span>&nbsp;М&nbsp;</span>&nbsp;&nbsp;{item.price}円(税抜)
          </RadioLabel>
          <RadioLabel>
            <input
              type="radio"
              value="L"
              {...register('size')}
              onChange={() => setSelectedSize('L')}
            />
            <span>&nbsp;Ｌ&nbsp;</span>&nbsp;&nbsp;{item.price}円(税抜) {/* Example for larger size */}
          </RadioLabel>
          {errors.size && <p>{errors.size.message}</p>}
        </FormGroup>
        <FormGroup>
          <Label>数量:</Label>
          <Select {...register('quantity')} defaultValue="1" onChange={(e) => setSelectedQuantity(Number(e.target.value))}>
            {[...Array(12)].map((_, i) => (
              <option key={i} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </Select>
          {errors.quantity && <p>{errors.quantity.message}</p>}
        </FormGroup>
        <FormGroup>
          <TotalPrice>この商品金額：{totalPrice}円(税抜)</TotalPrice>
        </FormGroup>
        <FormGroup>
          <Button type="submit">カートに入れる</Button>
        </FormGroup>
      </form>
    </Container>
  );
};

export default ItemDetail;
