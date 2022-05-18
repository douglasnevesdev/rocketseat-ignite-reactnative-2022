import React from 'react';
import { ThemeProvider } from 'styled-components';
import theme from './src/global/styles/theme';
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_700Bold } from '@expo-google-fonts/poppins';
import AppLoading from 'expo-app-loading';
import { NavigationContainer } from '@react-navigation/native';
import { AppRoutes } from './src/routes/app.routes';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';
import { StatusBar } from 'react-native';


export default function App() {
  //Obtenho a informação se a fonte foi carregado, caso não, seguramos a tela de splash.
  const [fontsLoaded] = useFonts({
    Poppins_400Regular, Poppins_500Medium, Poppins_700Bold
  });
  //Enquanto as fontes não estão disponiveis o splash acontece.
  if(!fontsLoaded){
    return <AppLoading/>
  }
  return (
    <NavigationContainer>
      <ThemeProvider theme={theme}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.primary}/>
        <AppRoutes />
      </ThemeProvider>
    </NavigationContainer>
  );
}


