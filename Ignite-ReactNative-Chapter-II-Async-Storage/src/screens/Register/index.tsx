import React, { useState } from 'react';
import { Alert, Modal, TouchableWithoutFeedback, Keyboard} from 'react-native';
import { Button } from '../../components/Forms/Button';
import { CategorySelectButton } from '../../components/Forms/CategorySelectButton';
import { InputForm } from '../../components/Forms/InputForm';
import { TransactionTypeButton } from '../../components/Forms/TransactionTypeButton';
import { Container, Header, Title, Form, Fields, TransactionTypes } from './styles';
import { CategorySelect } from '../../screens/CategorySelect';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid  from 'react-native-uuid';
import { useForm } from 'react-hook-form';
import { useNavigation, NavigationProp, ParamListBase } from '@react-navigation/native';

interface FormData{
  //name: string;
  //amount: string;
  [name: string]: any;
}

export function Register(){

  const { navigate }: NavigationProp<ParamListBase> =  useNavigation();

  const schema = Yup.object().shape({
    name: Yup
    .string()
    .required('Nome é obrigatorio'),
    amount: Yup
    .number()
    .typeError('Informe um valor númerico')
    .positive('O valor não pode ser negativo')
    .required('O valor é obrigatório.')
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver:  yupResolver(schema)
  });

  const [transactionType, setTransactionType] = useState('');

  //Modal
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria',
  });


  function handleTransactionsTypeSelect(type: 'positive' | 'negative'){
    setTransactionType(type);
  }

  // Close Modal
  function handleOpenSelectCategoryModal(){
    setCategoryModalOpen(true);
  }

  function handleCloseSelectCategoryModal(){
    setCategoryModalOpen(false);
  }

  async function handleRegister(form: FormData) {

    const dataKey = "@gofinances:transactions";

    if(!transactionType)
      return Alert.alert('Selecione o tipo da transação');
    
    if(category.key === 'category') 
      return Alert.alert('Selecione a categoria');

    const newTransaction = {
      id: String(uuid.v4()),
      name: form.name,
      amount: form.amount,
      type: transactionType,
      category: category.key,
      date: new Date()
    };

    try{

      const data = await AsyncStorage.getItem(dataKey);
      const currentData = data ? JSON.parse(data) : [];
      const dataFormated = [
        ...currentData,
        newTransaction
      ];
      await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormated));

      //Gera o reset do formulario apos salvar as informações.
      reset();
      setTransactionType('');
      setCategory({
        key: 'category',
        name: 'Categoria'
      });

      navigate("Listagem");

    }catch(error){
      console.log(error);
      Alert.alert("Não foi possível salvar")
    }
  }

  /*
  useEffect(() => {
  
    
    async function removeAll(){
      await AsyncStorage.removeItem(dataKey);
    }
    removeAll();
    

    async function loadData(){
      const data = await AsyncStorage.getItem(dataKey);
      console.log(JSON.parse(data!));
    }
    loadData();

  }, []);
  */
  

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <Container>

        <Header>
          <Title>Cadastro</Title>
        </Header>

        <Form>

          <Fields>
            <InputForm name="name" 
              control={control} 
              placeholder='Nome' 
              autoCapitalize='sentences'
              autoCorrect={false}
              error={errors.name && errors.name.message}
            />
            <InputForm name="amount" 
              control={control} 
              placeholder='Preço' 
              keyboardType='numeric'
              error={errors.amount && errors.amount.message}
            />
            <TransactionTypes>
              <TransactionTypeButton 
                title='Income' 
                type='up' 
                onPress={() => handleTransactionsTypeSelect('positive')}
                isActive={transactionType === 'positive'}
              />
              <TransactionTypeButton 
                title='Outcome' 
                type='down' 
                onPress={() => handleTransactionsTypeSelect('negative')}
                isActive={transactionType === 'negative'}
              />
            </TransactionTypes>

            <CategorySelectButton title={category.name} onPress={handleOpenSelectCategoryModal}/>

          </Fields>

          <Button title='Enviar' onPress={handleSubmit(handleRegister)} />

        </Form>

        <Modal visible={categoryModalOpen}>
          <CategorySelect 
            category={category}
            setCategory={setCategory}
            closeSelectCategory={handleCloseSelectCategoryModal}
          />
        </Modal>

    </Container>
    </TouchableWithoutFeedback>
  );
}