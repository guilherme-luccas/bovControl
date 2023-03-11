import {DeleteIcon, InfoIcon} from 'native-base';
import {Checklist} from '../../../../infra/interfaces/interfaces';
import {formatDate} from '../../../../utils';
import {useNavigation} from '@react-navigation/native';
import {
  Button,
  Container,
  ContainerEditDelete,
  ContainerField,
  ContainerInfo,
  Div,
  Subtitle,
  Title,
} from './styles';
import {useNetInfo} from '@react-native-community/netinfo';
import {deleteItemOfflineDB} from '../../../../infra/offlineDatabase/repository/Repository';
import {deleteItemRemoteDB} from '../../../../infra/remoteDatabase/repository/Repository';

interface Props {
  item: Checklist;
}

export default function RenderItem(props: Props) {
  const navigation: any = useNavigation();
  const item = props.item;

  const isOnline = useNetInfo().isConnected;

  return (
    <Container>
      <ContainerInfo>
        <ContainerField>
          <Title>Fazendeiro:</Title>
          <Subtitle>{item.from.name}</Subtitle>
        </ContainerField>
        <ContainerField>
          <Title>Fazenda:</Title>
          <Subtitle>{item.farmer.name}</Subtitle>
        </ContainerField>
        <ContainerField>
          <Title>Local:</Title>
          <Subtitle>{item.farmer.city}</Subtitle>
        </ContainerField>
        <ContainerField>
          <Title>Criado em:</Title>
          <Subtitle>{formatDate(item.created_at)}</Subtitle>
        </ContainerField>
      </ContainerInfo>
      <Div />
      <ContainerEditDelete>
        <Button onPress={() => navigation.navigate('CreateChecklist', item)}>
          <InfoIcon size="xl" color="gray.500" />
        </Button>
        <Button
          onPress={() => {
            if (isOnline) {
              deleteItemOfflineDB(item);
              deleteItemRemoteDB(item);
            }
          }}>
          <DeleteIcon size="xl" color="red.500" />
        </Button>
      </ContainerEditDelete>
    </Container>
  );
}
