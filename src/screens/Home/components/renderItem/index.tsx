import {Checklist} from '../../../../infra/interfaces/interfaces';
import {Container, Title} from './styles';

interface Props {
  item: Checklist;
}

export default function RenderItem(props: Props) {
  const item = props.item;
  return (
    <Container flexDirection="row">
      <Title>{item._id} - </Title>
      <Title>{item.amount_of_milk_produced} - </Title>
      <Title>{item.number_of_cows_head} - </Title>
    </Container>
  );
}
