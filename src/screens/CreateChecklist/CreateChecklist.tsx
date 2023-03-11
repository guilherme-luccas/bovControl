import React, {useEffect, useState} from 'react';

import {useRoute} from '@react-navigation/native';
import {useNetInfo} from '@react-native-community/netinfo';

import {
  ButonSubmit,
  Container,
  Error,
  InputContainer,
  InputFiled,
  Scroll,
  SelectField,
  Title,
} from './styles';

import {CheckIcon} from 'native-base';
import {Checklist} from '../../infra/interfaces/interfaces';

import {Controller, useForm} from 'react-hook-form';

import {
  createItemRemoteDB,
  updateItemRemoteDB,
} from '../../infra/remoteDatabase/repository/Repository';

import {
  createItemOfflineDB,
  updateItemsOfflineDB,
} from '../../infra/offlineDatabase/repository/Repository';

export default function CreateChecklist() {
  const route = useRoute();
  const isOnline = useNetInfo().isConnected;

  const item: Checklist = route.params;

  const isEditChecklist = !!item;

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      FarmerName: isEditChecklist ? item.from.name : '',
      FarmName: isEditChecklist ? item.farmer.name : '',
      FarmCity: isEditChecklist ? item.farmer.city : '',
      SupervisorName: isEditChecklist ? item.to.name : '',
      NumbersOfCowsHead: isEditChecklist
        ? String(item.number_of_cows_head)
        : '',
      AmountOfMilkProduced: isEditChecklist
        ? String(item.amount_of_milk_produced)
        : '',
    },
  });

  const [checklistType, setChecklistType] = useState(
    isEditChecklist ? item.type : '',
  );

  const [hadSupervision, setHadSupervision] = useState(
    isEditChecklist ? String(item.had_supervision) : 'false',
  );
  const [errorChecklistType, setErrorChecklistType] = useState(false);
  const [errorHadSupervision, setErrorHadSuperVision] = useState(false);

  const booleandSupervision = hadSupervision == 'true' ? true : false;

  const onSubmit = data => {
    if (!checklistType) {
      setErrorChecklistType(true);
      return;
    }
    if (!hadSupervision) {
      setErrorChecklistType(true);
      return;
    }
    try {
      if (isOnline) {
        const body = [
          {
            _id: isEditChecklist
              ? item._id
              : String(Math.floor(Math.random() * 100103020)),
            type: checklistType.toUpperCase(),
            amount_of_milk_produced: Number(data.AmountOfMilkProduced),
            number_of_cows_head: Number(data.NumbersOfCowsHead),
            farmer: {
              name: String(data.FarmName).toUpperCase(),
              city: String(data.FarmCity).toUpperCase(),
            },
            from: {
              name: String(data.FarmerName).toUpperCase(),
            },
            to: {
              name: String(data.SupervisorName).toUpperCase(),
            },
            had_supervision: booleandSupervision,
            created_at: isEditChecklist
              ? String(item.created_at)
              : String(new Date()),
            updated_at: String(new Date()),
            location: {
              latitude: 25.5,
              longitude: 32.5,
            },
          },
        ];
        if (!isEditChecklist) {
          createItemRemoteDB(body);
          createItemOfflineDB(body);
        }
        if (isEditChecklist) {
          updateItemRemoteDB(body);
          updateItemsOfflineDB(body);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (checklistType) {
      setErrorChecklistType(false);
    }
  }, [checklistType]);
  useEffect(() => {
    if (hadSupervision) {
      setErrorHadSuperVision(false);
    }
  }, [hadSupervision]);

  return (
    <Container safeAreaTop>
      <Scroll contentContainerStyle={{alignItems: 'center'}}>
        <Title>Criar Checklist</Title>
        <InputContainer>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <InputFiled
                placeholder="Fazendeiro"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="FarmerName"
          />
          {errors.FarmerName && <Error>Esse campo é necessário</Error>}
        </InputContainer>
        <InputContainer>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <InputFiled
                placeholder="Nome da Fazenda"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="FarmName"
          />
          {errors.FarmName && <Error>Esse campo é necessário</Error>}
        </InputContainer>
        <InputContainer>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <InputFiled
                placeholder="Local da Fazenda"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="FarmCity"
          />
          {errors.FarmCity && <Error>Esse campo é necessário</Error>}
        </InputContainer>
        <InputContainer>
          <SelectField
            bg="white"
            selectedValue={hadSupervision}
            minWidth="300"
            accessibilityLabel="Teve supervisão?"
            placeholder="Teve supervisão?"
            _selectedItem={{
              bg: 'gray.400',
              endIcon: <CheckIcon size="5" />,
            }}
            onValueChange={itemValue => setHadSupervision(itemValue)}>
            <SelectField.Item label="SIM" value="true" />
            <SelectField.Item label="NÃO" value="false" />
          </SelectField>
          {errorHadSupervision && <Error>Esse campo é necessário</Error>}
        </InputContainer>
        <InputContainer>
          <Controller
            control={control}
            rules={{
              required: hadSupervision == 'true' ? true : false,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <InputFiled
                editable={hadSupervision == 'true' ? true : false}
                placeholder="Nome do Supervisor"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="SupervisorName"
          />
          {errors.SupervisorName && <Error>Esse campo é necessário</Error>}
        </InputContainer>
        <InputContainer>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <InputFiled
                placeholder="Número de cabeças de gado"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="NumbersOfCowsHead"
          />
          {errors.NumbersOfCowsHead && <Error>Esse campo é necessário</Error>}
        </InputContainer>
        <InputContainer>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <InputFiled
                placeholder="Quantidade de leite produzido"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="AmountOfMilkProduced"
          />
          {errors.AmountOfMilkProduced && (
            <Error>Esse campo é necessário</Error>
          )}
        </InputContainer>
        <InputContainer>
          <SelectField
            bg="white"
            selectedValue={checklistType}
            minWidth="300"
            accessibilityLabel="Tipo de checklist"
            placeholder="Tipo de checklist"
            _selectedItem={{
              bg: 'gray.400',
              endIcon: <CheckIcon size="5" />,
            }}
            onValueChange={itemValue => setChecklistType(itemValue)}>
            <SelectField.Item label="BPA" value="BPA" />
            <SelectField.Item label="ANTIBIÓTICO" value="ANTIBIÓTICO" />
            <SelectField.Item label="BPF" value="BPF" />
          </SelectField>
          {errorChecklistType && <Error>Esse campo é necessário</Error>}
        </InputContainer>

        <ButonSubmit onPress={handleSubmit(onSubmit)}>Enviar</ButonSubmit>
      </Scroll>
    </Container>
  );
}