import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { StatusBar } from 'react-native';
import Logo from '../../assets/logo.svg';
import { Car } from '../../components/Car';

import {
  Container,
  Header,
  TotalCars,
  HeaderContent
} from './styles';

export function Home() {

  const carDataOne = {
    brand: "Audi",
    name: "RS 5 Coupé",
    rent: {
      period: "AO DIA",
      price: 120,
    },
    thumbnail: "https://freepngimg.com/thumb/audi/35227-5-audi-rs5-red.png"
  }

  const carDataTwo = {
    brand: "Porsche",
    name: "Panamera",
    rent: {
      period: "AO DIA",
      price: 340,
    },
    thumbnail: "https://purepng.com/public/uploads/large/purepng.com-porsche-panamera-white-carcarvehicletransportporsche-961524659258pfvb8.png"
  }

  return (
    <Container>
      <StatusBar barStyle="light-content" backgroundColor='transparent' translucent />
      <Header>
        <HeaderContent>
          <Logo
            width={RFValue(108)}
            height={RFValue(12)}
          />
          <TotalCars>
            Total de 12 carros.
          </TotalCars>
        </HeaderContent>
      </Header>

      <Car data={carDataOne} />
      <Car data={carDataTwo} />


    </Container>
  );
}