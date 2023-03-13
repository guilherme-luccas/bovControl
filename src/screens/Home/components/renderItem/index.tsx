import {Alert} from 'react-native';
import {useContext, useState} from 'react';

import {Checklist} from '../../../../infra/models/Checklist';

import {useNavigation} from '@react-navigation/native';

import {
  Button,
  Container,
  ContainerEditDelete,
  ContainerField,
  ContainerInfo,
  Div,
  Loading,
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

import {PropsRenderItem} from '../../interfaces';

export default function RenderItem(props: PropsRenderItem) {
  const navigation: any = useNavigation();
  const {item, disableIcons, setList, list} = props;

  const [loading, setLoading] = useState(false);

  const {themeLight} = useContext(ThemeContext);

  const isOnline = useNetInfo().isConnected;

  function handleDeleteItem(checklistItem: Checklist) {
    const listWithDeletedItem = list?.filter(
      (checklist: Checklist) => checklist._id !== checklistItem._id,
    );

    if (setList) {
      setList(listWithDeletedItem as Checklist[]);
    }
  }

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
                    onPress: async () => {
                      setLoading(true);
                      if (isOnline) {
                        await deleteItemOfflineDB(item);
                        await deleteItemRemoteDB(item);
                        handleDeleteItem(item);
                      }
                      await deleteItemOfflineDB(item);
                      handleDeleteItem(item);
                      setLoading(false);
                    },
                  },
                ]);
              }}>
              {loading ? (
                <Loading color={theme.colors.dangerSecondary} size="sm" />
              ) : (
                <DeleteIcon
                  size="xl"
                  color={
                    themeLight
                      ? theme.colors.textBlack
                      : theme.colors.dangerPrimary
                  }
                />
              )}
            </Button>
          </ContainerEditDelete>
        </>
      )}
    </Container>
  );
}
