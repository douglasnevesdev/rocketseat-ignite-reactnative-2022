import React from 'react';
import { TextInputProps } from 'react-native';
import { Container, Error } from './styles';
import { Input } from '../Input';
import { Control, Controller } from 'react-hook-form';

interface Props extends TextInputProps{
  //Control é usado pelo react-hook-form para controlar os dados do formulario.
  control: Control,
  name: string,
  error: string,
}

/**
 * O Control é como uma assinatura que informa que um input pertence a determinado formulario, ex: nome e idade pertence ao * formulario cujo control foi declarado como formDev.
 */

export function InputForm({ control, name , error, ...rest}: Props){
  return(
    <Container>
      
      <Controller 
        name={name} 
        control={control} 
        render={({ field: { onChange, value } }) =>
         ( <Input onChangeText={onChange} value={value} {...rest} /> )} 
        />
        { error && <Error>{error}</Error> }

    </Container>
  );
}