import React, { useCallback, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HistoryCard } from '../../components/HistoryCard';
import { Container, Header, Title, Content, ChartCointaner, MonthSelect, MonthSelectButton, MonthSelectIcon, Month, LoadContainer  } from './styles';
import { categories } from '../../utils/categories';
import { useFocusEffect } from '@react-navigation/native';
import { VictoryPie } from 'victory-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { addMonths, subMonths, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ActivityIndicator } from 'react-native';
import { useAuth } from '../../hooks/auth';

interface TransactionData {
  type: 'positive' | 'negative';
  name: string;
  amount: string;
  category: string;
  date: string;
}

interface CategoryData {
  key: string;
  name: string;
  totalFormatted: string;
  total: number;
  color: string;
  percent: string;
}

export function Resume() {

  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>([]);

  const theme = useTheme();

  const { user } = useAuth();

  function handleDateChange(actions: 'next' | 'prev'){
    if(actions === 'next'){
      setSelectedDate(addMonths(selectedDate, 1));
    }else{
      setSelectedDate(subMonths(selectedDate, 1));
    }
  }


  async function loadData() {

    setIsLoading(true);

    const dataKey = `@gofinances:transactions_user:${user.id}`;
    //Pego os dados do AsyncStorage
    const response = await AsyncStorage.getItem(dataKey);

    const responseFormatted = response ? JSON.parse(response) : [];

    //Obtem os valores negativos, verificando tambem a data
    const expensives = responseFormatted.filter((expensive: TransactionData) => 
    expensive.type === 'negative' && 
    new Date(expensive.date).getMonth() === selectedDate.getMonth() &&
    new Date(expensive.date).getFullYear() === selectedDate.getFullYear());

    const expensivesTotal = expensives.reduce((acumullator: number, expensive: TransactionData) => {
      return acumullator + Number(expensive.amount);
    }, 0);

    const totalByCategory:CategoryData[] = [];

    //Percorro as categorias
    categories.forEach(category => {

      let categorySum = 0;

      //Percorro os valores negativos que foram filtrados
      expensives.forEach((expensive: TransactionData) => {
        if (expensive.category === category.key) {
          categorySum += Number(expensive.amount);
        }
      });

      if(categorySum > 0){

        const totalFormatted = categorySum
        .toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        });


        const percent = `${(categorySum / expensivesTotal * 100).toFixed(0)}`;


        totalByCategory.push({
          key: category.key,
          name: category.name,
          color: category.color,
          total: categorySum,
          totalFormatted,
          percent
        });
      }



    });

    setTotalByCategories(totalByCategory);
    setIsLoading(false);

  }

  useFocusEffect(useCallback(()=> {
    loadData();
  }, [selectedDate]));



  return (
    <Container>

      <Header>
        <Title>Resumo por categoria</Title>
      </Header>

      {
      isLoading ?  

      <LoadContainer>
        <ActivityIndicator color={theme.colors.primary} size="large"/>
      </LoadContainer> :
        

            <Content
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ 
                paddingHorizontal: 24,
                paddingBottom: useBottomTabBarHeight() 
              }} 
            > 

            <MonthSelect>

              <MonthSelectButton onPress={() => handleDateChange('prev')}>
                <MonthSelectIcon name="chevron-left"/>
              </MonthSelectButton>

              <Month>{ format(selectedDate, 'MMMM, yyyy', { locale: ptBR }) }</Month>

              <MonthSelectButton onPress={() => handleDateChange('next')}>
                <MonthSelectIcon name="chevron-right"/>
              </MonthSelectButton>

            </MonthSelect>
            

            <ChartCointaner>
              <VictoryPie 
                data={totalByCategories} 
                colorScale={totalByCategories.map(category => category.color)}
                x="percent"
                y="total"
                style={{
                  labels: { fontSize: RFValue(18), fontWeight: 'bold', fill: theme.colors.shape }
                }}
                labelRadius={80}
              />
            </ChartCointaner>


            {
              totalByCategories.map( item => (
                  <HistoryCard
                  key={item.key}
                  title={item.name}
                  amount={item.totalFormatted}
                  color={item.color} 
                  />
              ))
            }
            </Content> 
     
    }
    </Container>
  );
}