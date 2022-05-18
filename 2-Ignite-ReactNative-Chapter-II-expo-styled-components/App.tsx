import React from 'react';
import { Dashboard } from './src/screens/Dashboard';
import { ThemeProvider } from 'styled-components';
import theme from './src/global/styles/theme';
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_700Bold } from '@expo-google-fonts/poppins';
import AppLoading from 'expo-app-loading';

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
    <ThemeProvider theme={theme}>
      <Dashboard />
    </ThemeProvider>
  );
}


