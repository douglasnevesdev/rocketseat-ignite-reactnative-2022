import React from 'react';
import { HighlightCard } from '../../components/HighlightCard';
import { TransactionCard, TransactionCardProps } from '../../components/TransactionCard';
import {
  Container, 
  Header, 
  UserInfo, 
  Photo,
  User, 
  UserGreenting, 
  UserName, 
  UserWrapper, 
  Icon, 
  HighlightCards, 
  Transactions, 
  Title,
  TransactionList,
  LogoutButton
} from './styles';

export interface DataListProps extends TransactionCardProps{
  id: string;
}


export function Dashboard(){

  const data: DataListProps[] = [
  {
    id: '1',
    type: 'positive',
    title: 'Desenvolvimento de site',
    amount: 'R$ 12.000,00',
    category: {
      name: 'Vendas', 
      icon: 'dollar-sign' 
    }, 
    date:"23/04/2022"
  },
  {
    id: '2',
    type: 'negative',
    title: 'Hamburgaria Pizzy',
    amount: 'R$ 59,00',
    category: {
      name: 'Alimentação', 
      icon: 'coffee' 
    }, 
    date:"20/04/2022"
  }, 
  {
    id: '3',
    type: 'negative',
    title: 'Aluguel do apartamento',
    amount: 'R$ 1.200,00',
    category: {
      name: 'Casa', 
      icon: 'shopping-bag' 
    }, 
    date:"18/04/2022"
  }
];


  return(
    <>
      <Container>

        <Header>

          <UserWrapper>
          <UserInfo>
            <Photo source={{ uri:  'https://avatars.githubusercontent.com/u/30028379?v=4'}}/>
            <User>
              <UserGreenting>Olá,</UserGreenting>
              <UserName>Douglas</UserName>
            </User>
          </UserInfo>
          <LogoutButton onPress={() => {}}>
            <Icon name="power"/>
          </LogoutButton>
          </UserWrapper>

 

        </Header>

        <HighlightCards>

          <HighlightCard 
            title="Entradas"
            amount="R$ 17.400,00" 
            lastTransaction='Ultima entrada dia 13 de abril.' 
            type="up"
          />

          <HighlightCard 
            title="Saídas"
            amount="R$ 1.259,00" 
            lastTransaction='Ultimasaida dia 03 de abril.' 
            type="down"
          />

          <HighlightCard 
            title="Total"
            amount="R$ 16.141,00" 
            lastTransaction='01 a 16 de abril.' 
            type="total"
          />

        </HighlightCards>

        <Transactions>
          <Title>Listagem</Title>

          <TransactionList
             data={data}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TransactionCard data={item} />
            )}
          />
         

        </Transactions>

   
      </Container>
    </>
  )
}
