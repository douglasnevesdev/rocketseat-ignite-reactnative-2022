import React, { useState } from 'react';
import { Alert, Modal, TouchableWithoutFeedback, Keyboard} from 'react-native';
import { Button } from '../../components/Forms/Button';
import { CategorySelectButton } from '../../components/Forms/CategorySelectButton';
import { InputForm } from '../../components/Forms/InputForm';
import { useForm } from 'react-hook-form';
import { TransactionTypeButton } from '../../components/Forms/TransactionTypeButton';
import { Container, Header, Title, Form, Fields, TransactionTypes } from './styles';
import { CategorySelect } from '../../screens/CategorySelect';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

export function Register(){

  
  interface FormData{
    //name: string;
    //amount: string;
    [name: string]: any;
  }

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

  const [transactionType, setTransactionType] = useState('');

  //Modal
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria',
  });


  function handleTransactionsTypeSelect(type: 'up' | 'down'){
    setTransactionType(type);
  }

  // Close Modal
  function handleOpenSelectCategoryModal(){
    setCategoryModalOpen(true);
  }

  function handleCloseSelectCategoryModal(){
    setCategoryModalOpen(false);
  }

  function handleRegister(form: FormData) {

    if(!transactionType)
      return Alert.alert('Selecione o tipo da transação');
    
    if(category.key === 'category') 
      return Alert.alert('Selecione a categoria');

   

    const data = {
      name: form.name,
      amount: form.amount,
      transactionType,
      category: category.key,
    };

    console.log(data);
  }

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver:  yupResolver(schema)
  });


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
                onPress={() => handleTransactionsTypeSelect('up')}
                isActive={transactionType === 'up'}
              />
              <TransactionTypeButton 
                title='Outcome' 
                type='down' 
                onPress={() => handleTransactionsTypeSelect('down')}
                isActive={transactionType === 'down'}
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