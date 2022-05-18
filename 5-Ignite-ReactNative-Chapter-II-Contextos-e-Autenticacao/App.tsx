import React from 'react';
import { ThemeProvider } from 'styled-components';
import theme from './src/global/styles/theme';
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_700Bold } from '@expo-google-fonts/poppins';
import AppLoading from 'expo-app-loading';
import { Routes } from './src/routes';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';
import { StatusBar } from 'react-native';
import { AuthProvider, useAuth } from './src/hooks/auth';


export default function App() {
  //Obtenho a informação se a fonte foi carregado, caso não, seguramos a tela de splash.
  const [fontsLoaded] = useFonts({
    Poppins_400Regular, Poppins_500Medium, Poppins_700Bold
  });

  //Antes do app iniciar, atraves do hook de autenticação é verificado se o usuario possui dados no celular.
  //O useStorageLoading informa se o carregamento do Async esta ocorrendo, caso sim ele fica na splash.
  //Observe que o hook é carregado no inicio do aplicativo, porque ele é usado como Contexto.
  const { userStorageLoading } = useAuth();


  //Enquanto as fontes não estão disponiveis o splash acontece, o mesmo ocorre enquanto esta verificando se existe dados na memoria que identifica o usuario se ele tiver autenticado anteriormente.
  if(!fontsLoaded || userStorageLoading){
    return <AppLoading/>
  }
  return (
      <ThemeProvider theme={theme}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.primary}/>
      <AuthProvider>
        <Routes />
      </AuthProvider>
      </ThemeProvider>
  );
}


