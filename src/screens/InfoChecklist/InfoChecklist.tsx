import React, {useContext} from 'react';
import {
  ButtonPrimary,
  ButtonsContainer,
  Card,
  Container,
  FieldContainer,
  FieldName,
  FieldOption,
  Title,
} from './styles';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Checklist} from '../../infra/interfaces/interfaces';
import {supervisionType} from '../../utils/const';
import {format} from 'date-fns';
import {ThemeContext} from '../../context/useThemeMode';

export default function InfoChecklist() {
  const navigation: any = useNavigation();
  const route = useRoute();

  const {themeLight} = useContext(ThemeContext);

  const item: Checklist = route.params;

  const hadSupervision = item.had_supervision
    ? supervisionType.positive
    : supervisionType.positive;

  const createdDateFormatted = format(new Date(item.created_at), 'dd/MM/yyyy');
  const updatedDateFormatted = format(new Date(item?.updated_at), 'dd/MM/yyyy');

  return (
    <Container safeAreaTop>
      <Title>Informações do Checklist</Title>
      <Card themeLight={themeLight}>
        <FieldContainer>
          <FieldName>Fazendeiro:</FieldName>
          <FieldOption>{item.from.name}</FieldOption>
        </FieldContainer>
        <FieldContainer>
          <FieldName>Fazenda:</FieldName>
          <FieldOption>{item.farmer.name}</FieldOption>
        </FieldContainer>
        <FieldContainer>
          <FieldName>Local:</FieldName>
          <FieldOption>{item.farmer.city}</FieldOption>
        </FieldContainer>
        <FieldContainer>
          <FieldName>Supervisor:</FieldName>
          <FieldOption>{item?.to?.name}</FieldOption>
        </FieldContainer>
        <FieldContainer>
          <FieldName>Cabeças de gado:</FieldName>
          <FieldOption>{item.number_of_cows_head}</FieldOption>
        </FieldContainer>
        <FieldContainer>
          <FieldName>Quantidade de leite produzido:</FieldName>
          <FieldOption>{item.amount_of_milk_produced}</FieldOption>
        </FieldContainer>
        <FieldContainer>
          <FieldName>Teve supervisão?</FieldName>
          <FieldOption>{hadSupervision}</FieldOption>
        </FieldContainer>
        <FieldContainer>
          <FieldName>Tipo do Checklist:</FieldName>
          <FieldOption>{item.type}</FieldOption>
        </FieldContainer>
        <FieldContainer>
          <FieldName>Data da Criação:</FieldName>
          <FieldOption>{createdDateFormatted}</FieldOption>
        </FieldContainer>
        <FieldContainer>
          <FieldName>Data da Atualização:</FieldName>
          <FieldOption>{updatedDateFormatted}</FieldOption>
        </FieldContainer>
      </Card>
      <ButtonsContainer>
        <ButtonPrimary
          themeLight={themeLight}
          onPress={() => navigation.navigate('CreateChecklist', item)}>
          <Title>Editar</Title>
        </ButtonPrimary>
        <ButtonPrimary
          themeLight={themeLight}
          onPress={() => navigation.navigate('CreateChecklist')}>
          <Title>Novo Checklist</Title>
        </ButtonPrimary>
      </ButtonsContainer>
    </Container>
  );
}
