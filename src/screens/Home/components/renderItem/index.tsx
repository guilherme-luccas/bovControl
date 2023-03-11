import {Alert} from 'react-native';
import {useContext} from 'react';

import {Checklist} from '../../../../infra/interfaces/interfaces';

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
import {DeleteIcon, InfoIcon} from 'native-base';
import theme from '../../../../globalStyles/theme';

import {ThemeContext} from '../../../../context/useThemeMode';

import {useNetInfo} from '@react-native-community/netinfo';

import {deleteItemOfflineDB} from '../../../../infra/offlineDatabase/repository/Repository';
import {deleteItemRemoteDB} from '../../../../infra/remoteDatabase/repository/Repository';
import {formatDate} from '../../../../utils';

interface Props {
  item: Checklist;
  initOnline: () => void;
  initOffline: () => void;
  disableIcons: boolean;
}

export default function RenderItem(props: Props) {
  const navigation: any = useNavigation();
  const {item, initOnline, initOffline, disableIcons} = props;

  const {themeLight, ChangeTheme} = useContext(ThemeContext);

  const isOnline = useNetInfo().isConnected;

  return (
    <Container themeLight={themeLight} shadow={1}>
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
      {!disableIcons && (
        <>
          <Div />
          <ContainerEditDelete>
            <Button onPress={() => navigation.navigate('InfoChecklist', item)}>
              <InfoIcon size="xl" color={theme.colors.textWhite} />
            </Button>
            <Button
              onPress={() => {
                Alert.alert('Deseja excluir esse item?', '', [
                  {
                    text: 'Não',
                    onPress: () => {},
                    style: 'cancel',
                  },
                  {
                    text: 'Sim',
                    onPress: () => {
                      if (isOnline) {
                        deleteItemOfflineDB(item);
                        deleteItemRemoteDB(item);
                        initOnline();
                      }
                      deleteItemOfflineDB(item);
                      initOffline();
                    },
                  },
                ]);
              }}>
              <DeleteIcon
                size="xl"
                color={
                  themeLight
                    ? theme.colors.textBlack
                    : theme.colors.dangerPrimary
                }
              />
            </Button>
          </ContainerEditDelete>
        </>
      )}
    </Container>
  );
}
