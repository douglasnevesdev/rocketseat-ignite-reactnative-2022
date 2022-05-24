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
 DateValue,
 Content,
 Footer
} from './styles';
import { StatusBar } from 'react-native';
import { Button } from '../../components/Button';
import { Calendar } from '../../components/Calendar';

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

        <Content>
          <Calendar/>
        </Content>

        <Footer>
          <Button title="Confirmar"/>
        </Footer>

     </Container>
  );
}