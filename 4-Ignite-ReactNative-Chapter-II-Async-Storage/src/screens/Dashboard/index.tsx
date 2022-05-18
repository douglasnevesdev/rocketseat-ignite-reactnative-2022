import React, { useEffect, useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { HighlightCard } from '../../components/HighlightCard';
import { TransactionCard, TransactionCardProps } from '../../components/TransactionCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components';
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
  LogoutButton,
  LoadContainer
} from './styles';

export interface DataListProps extends TransactionCardProps{
  id: string;
}

interface  HighlightProps{
  amount: string;
  lastTransactions: string;
}
interface HighlightData {
  entries: HighlightProps;
  expensives: HighlightProps;
  total: HighlightProps;
}


export function Dashboard(){

  const [isLoading, setIsLoading] = useState(true); 
  const [transactions, setTransactions] = useState<DataListProps[]>([]);
  const [highlightData, setHighlightData] = useState<HighlightData>({} as HighlightData);

  const theme = useTheme();

  function getLastTransactionDate(collection: DataListProps[], type: 'positive' | 'negative'){
    
    //Obtem a data maior.
    const lastTransaction = 
      //apply aceita uma matriz e aplica a matriz como parâmetros à função real
      //pois max não aceita um array como entrada
      new Date(Math.max.apply(Math, collection
      .filter( (transaction) => transaction.type === type)
      .map( (transaction) => new Date(transaction.date).getTime())));

    //Formata a data
    return `${lastTransaction.getDate()} de ${lastTransaction.toLocaleString('pt-BR', { month: 'long' } )}`;

  }

  async function loadTransactions(){

    const dataKey = "@gofinances:transactions";

    const response = await AsyncStorage.getItem(dataKey);

    const transactions = response ? JSON.parse(response): [];

    let entriesTotal = 0;
    let expenseveTotal = 0;

    const transactionsFormatted:DataListProps[] = transactions.map( (item: DataListProps) => {

      //Calcula total positivo
      if(item.type === 'positive'){
        entriesTotal += Number(item.amount);
      }else{
        expenseveTotal += Number(item.amount);
      }



      //Formatações
      const amount = Number(item.amount).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

        const date = Intl.DateTimeFormat('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: '2-digit',
        }).format(new Date(item.date));


      //Retorna lista para ser exibida
      return {
         id: item.id,
         name: item.name,
         amount,
         type: item.type,
         category: item.category,
         date
      }

    });


    setTransactions(transactionsFormatted);

    const lastTransactionEntries = getLastTransactionDate(transactions, 'positive');
    const lastTransactionExpensives = getLastTransactionDate(transactions, 'negative');
    const totalInterval = `01 a ${lastTransactionExpensives}`;

    const total = entriesTotal - expenseveTotal;

    setHighlightData({
      entries: {
        amount: entriesTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransactions: `Última entrada dia ${lastTransactionEntries}`,

      },
      expensives: {
        amount: expenseveTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransactions:  `Última saida dia ${lastTransactionExpensives}`,
      },
      total: {
        amount: total.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransactions: totalInterval
      }
    });

    setIsLoading(false);

  }


  useEffect(() => {
    //AsyncStorage.removeItem("@gofinances:transactions");
    loadTransactions();
  },[]);


  useFocusEffect(useCallback(() => {
    loadTransactions();
  }, []));


  return(
      <Container>

        { 
        isLoading ?  
          <LoadContainer>
            <ActivityIndicator color={theme.colors.primary} size="large"/>
          </LoadContainer> :
        <>

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
                  amount={highlightData.entries.amount} 
                  lastTransaction={highlightData.entries.lastTransactions}
                  type="up"
                />

                <HighlightCard 
                  title="Saídas"
                  amount={highlightData.expensives.amount}  
                  lastTransaction={highlightData.expensives.lastTransactions}
                  type="down"
                />

                <HighlightCard 
                  title="Total"
                  amount={highlightData.total.amount}  
                  lastTransaction={highlightData.total.lastTransactions}
                  type="total"
                />

              </HighlightCards>

              <Transactions>
                <Title>Listagem</Title>

                <TransactionList
                  data={transactions}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => (
                    <TransactionCard data={item} />
                  )}
                />
              

              </Transactions>
          
        </> 
        } 
   
      </Container>
  )
}
