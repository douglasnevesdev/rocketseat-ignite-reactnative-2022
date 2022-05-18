import { createContext, ReactNode, useContext, useState, useEffect } from 'react';
import * as AuthSession from 'expo-auth-session';
import * as AppleAuthentication from 'expo-apple-authentication';
const { REDIRECT_URI } = process.env;
const { CLIENT_ID } = process.env;
import AsyncStorage from '@react-native-async-storage/async-storage';

interface IAuthProviderProps{
  children: ReactNode;
}

interface User{
  id: string;
  name: string;
  email: string;
  photo?: string;
}

interface IAuthContextData{
  user: User;
  signInWithGoogle(): Promise<void>;
  signInWithApple(): Promise<void>;
  signOut(): Promise<void>;
  userStorageLoading: boolean;
}

interface AuthorizationResponse{
  params: {
    access_token: string;
  };
  type: string;
}


/** 
 * 
 *  O que esse hook faz ?
 *  Etapa 1. Cria um contexto (O contexto compartilha informações com toda a aplicação)
 *  Etapa 2. Função aonde criamos o provider (vai ficar em torno das rotas) e iniciamos 
 *           o valor do contexto, neste caso [];
 *  Etapa 3. Função aonde obtemos as informações do contexto em qualquer lugar da aplicação.
 *  Etapa 4. Exportamos a função de provider para colocar em volta de onde precisa (Todas as telas) 
 *           e de obter o contexto em qualquer lugar da aplicação.
 * 
 */


// Etapa 1
//Criação do contexto que sera utilizado em qualquer lugar da aplicação.
//Poderia ter qualquer nome e precisa de um valor inicial, neste caso [];
const AuthContext = createContext({} as IAuthContextData);


// Etapa 2
//Função que cria o provider e inicia o valor
function AuthProvider({children}: IAuthProviderProps){

  const [user, setUser] = useState<User>({} as User);
  const [userStorageLoading, setUserStorageLoading] = useState(true);

  const dataKeyUser = "@gofinances:user";

  //Função para autenticação com o google
  async function signInWithGoogle(){

    //Tento realizar a conexão com o google e se não tiver sucesso retorno um erro
    try{

      const RESPONSE_TYPE = 'token';
      //A função encodeURI substitui os espacos por uma combinação de caracteres.
      const SCOPE = encodeURI('profile email');

    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

    const { params, type } = await AuthSession.startAsync({ authUrl }) as AuthorizationResponse;

    //Uma vez que tenho conexão, verifico se o retorno do google na autenticação do usuario ocorreu com sucesso.
    if(type === 'success'){
      const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`);
      const userInfo = await response.json();

      //Cria um objeto do tipo de usuario que esperamos
      const userLogged = {
        id: String(userInfo.id),
        email: userInfo.email,
        name: userInfo.given_name,
        photo: userInfo.picture
      }

      //Salva usuario no estado e adiciona no repositorio local do celular.
      setUser(userLogged);
      await AsyncStorage.setItem(dataKeyUser, JSON.stringify(userLogged));


    }

    }catch(error){
      throw new Error(error as string);
    }
  }


  //Função para autenticação com a apple
  async function signInWithApple(){
    try{
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL
        ]
      });

      if(credential){

        const name = credential.fullName!.givenName!;
        const photo = `https://ui-avatars.com/api/?name=${name}&length=1`;

        const userLogged = {
          id: credential.user,
          email: credential.email!,
          name,
          photo
        }

        //Salva usuario no estado e adiciona no repositorio local do celular.
        setUser(userLogged);
        await AsyncStorage.setItem(dataKeyUser, JSON.stringify(userLogged));

      }

        
    }catch(error){
      throw new Error(error as string);
    }
  }


  //Logout
  async function signOut(){
    setUser({} as User);
    await AsyncStorage.removeItem(dataKeyUser);
  }


  //Verifica se os dados do usuario existe na memoria do celular.
  useEffect(() => {

    async function loadUserStorageDate(){
      
      const userStorage = await AsyncStorage.getItem(dataKeyUser);
      
      if(userStorage){
        const userLogged = JSON.parse(userStorage) as User;  
        setUser(userLogged);
      }

      setUserStorageLoading(false);
    }

    loadUserStorageDate();

  }, []);



  return (
    <AuthContext.Provider value={{user, signInWithGoogle, signInWithApple, signOut, userStorageLoading }} >
      {children}
    </AuthContext.Provider>
  )
}


// Etapa 3
//Função que obtem o contexto para os valores serem obtidos em qualquer lugar da aplicação.
function useAuth(){
  const context = useContext(AuthContext);
  return context;
}


// Etapa 4
export  { AuthProvider, useAuth }
