import React, {useContext, useEffect, useState} from 'react';

import {useNavigation, useRoute} from '@react-navigation/native';
import {useNetInfo} from '@react-native-community/netinfo';

import {
  ButtonHome,
  ButtonSubmit,
  Container,
  Error,
  InputContainer,
  InputFiled,
  Loading,
  Scroll,
  SelectField,
  TextButton,
  Title,
} from './styles';
import {ThemeContext} from '../../context/useThemeMode';
import theme from '../../globalStyles/theme';

import {CheckIcon} from 'native-base';

import {Controller, useForm} from 'react-hook-form';

import {
  createItemRemoteDB,
  updateItemRemoteDB,
} from '../../infra/remoteDatabase/repository/Repository';

import {
  createItemOfflineDB,
  updateItemsOfflineDB,
} from '../../infra/offlineDatabase/repository/Repository';
import {CHECKLIST_TYPES, PLACEHOLDERS} from '../../utils/const';
import {Checklist} from '../../infra/interfaces/interfaces';

export default function CreateChecklist() {
  const route = useRoute();
  const isOnline = useNetInfo().isConnected;
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);

  const {themeLight} = useContext(ThemeContext);

  const item: Checklist | any = route.params;

  const isEditChecklist = !!item;

  const {
    control,
    handleSubmit,
    formState: {errors},
    reset,
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
    isEditChecklist ? String(item.had_supervision) : '',
  );
  const [errorChecklistType, setErrorChecklistType] = useState(false);
  const [errorHadSupervision, setErrorHadSuperVision] = useState(false);

  const booleandSupervision = hadSupervision == 'true' ? true : false;

  const onSubmit = async (data: any) => {
    if (!checklistType) {
      setErrorChecklistType(true);
      return;
    }
    if (!hadSupervision) {
      setErrorHadSuperVision(true);
      return;
    }

    setLoading(true);
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
    try {
      if (isOnline) {
        if (!isEditChecklist) {
          await createItemRemoteDB(body);
          await createItemOfflineDB(body);
        }
        if (isEditChecklist) {
          await updateItemRemoteDB(body);
          await updateItemsOfflineDB(body);
        }
      }
      if (!isOnline) {
        if (!isEditChecklist) {
          await createItemOfflineDB(body);
        }
        if (isEditChecklist) {
          await updateItemsOfflineDB(body);
        }
      }
      reset();
      setHadSupervision('');
      setChecklistType('');
      setLoading(false);

      navigation.navigate('Home');
    } catch (error) {
      setLoading(false);

      console.log('error trying to create item', error);
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
                themeLight={themeLight}
                placeholder={PLACEHOLDERS.farmer}
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
                themeLight={themeLight}
                placeholder={PLACEHOLDERS.farmName}
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
                themeLight={themeLight}
                placeholder={PLACEHOLDERS.farmLocation}
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
            themeLight={themeLight}
            bg={themeLight ? theme.colors.textWhite : theme.colors.textGray}
            placeholderTextColor={
              themeLight ? theme.colors.textGray : theme.colors.textGray2
            }
            selectedValue={hadSupervision}
            minWidth="300"
            accessibilityLabel={PLACEHOLDERS.hadSupervision}
            placeholder={PLACEHOLDERS.hadSupervision}
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
                themeLight={themeLight}
                editable={hadSupervision == 'true' ? true : false}
                placeholder={PLACEHOLDERS.supervisiorName}
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
              pattern: /^(0|[1-9]\d*)(\.\d+)?$/,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <InputFiled
                themeLight={themeLight}
                placeholder={PLACEHOLDERS.numberOfCowsHeads}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="NumbersOfCowsHead"
          />
          {errors.NumbersOfCowsHead && (
            <Error>
              {errors.NumbersOfCowsHead.type === 'pattern'
                ? 'Esse campo aceita apenas números'
                : 'Esse campo é necessário'}
            </Error>
          )}
        </InputContainer>
        <InputContainer>
          <Controller
            control={control}
            rules={{
              required: true,
              pattern: /^(0|[1-9]\d*)(\.\d+)?$/,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <InputFiled
                themeLight={themeLight}
                placeholder={PLACEHOLDERS.amounOfMilkProduced}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="AmountOfMilkProduced"
          />
          {errors.AmountOfMilkProduced && (
            <Error>
              {errors.AmountOfMilkProduced.type === 'pattern'
                ? 'Esse campo aceita apenas números'
                : 'Esse campo é necessário'}
            </Error>
          )}
        </InputContainer>
        <InputContainer>
          <SelectField
            themeLight={themeLight}
            bg={themeLight ? theme.colors.textWhite : theme.colors.textGray}
            placeholderTextColor={
              themeLight ? theme.colors.textGray : theme.colors.textGray2
            }
            selectedValue={checklistType}
            minWidth="300"
            accessibilityLabel={PLACEHOLDERS.checklistType}
            placeholder={PLACEHOLDERS.checklistType}
            _selectedItem={{
              bg: 'gray.400',
              endIcon: <CheckIcon size="5" />,
            }}
            onValueChange={itemValue => setChecklistType(itemValue)}>
            <SelectField.Item
              label={CHECKLIST_TYPES.BPA}
              value={CHECKLIST_TYPES.BPA}
            />
            <SelectField.Item
              label={CHECKLIST_TYPES.ANTIBIOTIC}
              value={CHECKLIST_TYPES.ANTIBIOTIC}
            />
            <SelectField.Item
              label={CHECKLIST_TYPES.BPF}
              value={CHECKLIST_TYPES.BPF}
            />
          </SelectField>
          {errorChecklistType && <Error>Esse campo é necessário</Error>}
        </InputContainer>

        <ButtonSubmit onPress={handleSubmit(onSubmit)}>
          {loading ? (
            <Loading color={theme.colors.textWhite} />
          ) : (
            <TextButton>Enviar</TextButton>
          )}
        </ButtonSubmit>
        <ButtonHome onPress={() => navigation.navigate('Home')}>
          <TextButton>Voltar para home</TextButton>
        </ButtonHome>
      </Scroll>
    </Container>
  );
}
