import React from 'react';
import {
  createItem,
  getItems,
} from '../../infra/offlineDatabase/repository/Repository';
import {ButtonPrimary, Container, Title} from './styles';

export default function Home() {
  return (
    <Container safeAreaTop>
      <Title>Teste2</Title>
      <ButtonPrimary onPress={async () => getItems()}>
        buscar items
      </ButtonPrimary>

      <ButtonPrimary
        onPress={async () =>
          createItem({
            _id: 1,
            name: 'go grocery shopping',
            status: 'Open',
          })
        }>
        Criar item
      </ButtonPrimary>
    </Container>
  );
}
