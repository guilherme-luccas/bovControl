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

interface Props {
  item: Checklist;
}

export default function RenderItem(props: Props) {
  const navigation = useNavigation();
  const item = props.item;

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
        <Button>
          <DeleteIcon size="xl" color="red.500" />
        </Button>
      </ContainerEditDelete>
    </Container>
  );
}
