import React from 'react';
import { BackButton } from '../../components/BackButton';
import { useTheme } from 'styled-components';
import ArrowSvg from '../../assets/arrow.svg';

import {
 Container,
 Header,
 Title,
 RentalPeriod,
 DateInfo,
 DateTitle,
 DateValue
} from './styles';
import { StatusBar } from 'react-native';

export function Sheduling(){

  const theme =  useTheme();

  return (
     <Container>
       <Header>
        <StatusBar barStyle="light-content" backgroundColor='transparent' translucent />
          <BackButton onPress={() => {}} color={theme.colors.shape} />
          <Title>
            Escolha uma{'\n'}
            data de início e  {'\n'}
            fim do aluguel
          </Title>

          <RentalPeriod>

            <DateInfo>
              <DateTitle>DE</DateTitle>
              <DateValue selected={false}></DateValue>
            </DateInfo>

            <ArrowSvg/>


            <DateInfo>
              <DateTitle>ATE</DateTitle>
              <DateValue selected={false}></DateValue>
            </DateInfo>



          </RentalPeriod>

       

       </Header>
     </Container>
  );
}