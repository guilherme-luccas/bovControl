import {FlatList, Modal} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';

import {
  Container,
  ContainerLogo,
  Loading,
  Title,
  Picture,
  ContainerWhite,
  ContainerGreen,
  LogoTitle,
  ContainerTitles,
  DateText,
  ButtonPrimary,
  TextButton,
  ContainerChecklistInfos,
  SwitchTheme,
  Toast,
  ModalContainer,
  ModalContainerBody,
  TextModal,
  ButtonCloseModal,
} from './styles';
//@ts-ignore
import logo from '../../assets/bovIcon.png';
import {ThemeContext} from '../../context/useThemeMode';
import theme from '../../globalStyles/theme';
import {CloseIcon, useToast} from 'native-base';

import {Checklist} from '../../infra/interfaces/interfaces';

import {format} from 'date-fns';

import {getItemsOfflineDB} from '../../infra/offlineDatabase/repository/Repository';
import {syncAllDataBases} from '../../infra/remoteDatabase/useCases/useCases';

import {useNetInfo} from '@react-native-community/netinfo';
import {useIsFocused, useNavigation} from '@react-navigation/native';

import RenderItem from './components/renderItem';

export default function Home() {
  const isOnline = useNetInfo().isConnected;
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const toast = useToast();

  const {themeLight, ChangeTheme} = useContext(ThemeContext);

  const [missingItemsToShow, setMissingItemsToShow] = useState([]);
  const [list, setList] = useState<Checklist[]>([]);

  const [loading, setLoading] = useState(false);

  const [isOpenModal, setIsOpenModal] = useState(false);

  const today = format(new Date(), 'dd/MM/yyyy');

  async function initOffline() {
    setLoading(true);
    setTimeout(async () => {
      try {
        const checklists = await getItemsOfflineDB();
        setList(checklists.toJSON());

        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    }, 1000);
  }

  async function initOnline() {
    setLoading(true);
    setTimeout(async () => {
      try {
        const checklists = await getItemsOfflineDB();
        const checklistUpdated = await syncAllDataBases(checklists.toJSON());

        setList(checklistUpdated?.checklist.toJSON());
        setMissingItemsToShow(
          checklistUpdated?.missingItemsOfflineDB.concat(
            checklistUpdated.itemsToUpdate,
          ),
        );
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    }, 1000);
  }

  useEffect(() => {
    if (missingItemsToShow?.length > 0) {
      setIsOpenModal(true);
    }
  }, [missingItemsToShow]);

  useEffect(() => {
    if (isOnline == false) {
      toast.show({
        placement: 'top',
        render: () => {
          return (
            <Toast
              bg={theme.colors.dangerPrimary}
              px="2"
              py="2"
              rounded="sm"
              mb={5}>
              Você está Online
            </Toast>
          );
        },
      });
      initOffline();
    }
    if (isOnline) {
      initOnline();
    }
  }, [isFocused, isOnline]);

  return (
    <>
      <Container themeLight={themeLight} safeAreaTop>
        <ContainerGreen>
          <SwitchTheme isChecked={themeLight} onToggle={() => ChangeTheme()} />

          <ContainerLogo>
            <ContainerTitles>
              <Title>Olá, </Title>
              <LogoTitle>Fazendeiros</LogoTitle>
              <Picture source={logo} />
            </ContainerTitles>
            <DateText>{today}</DateText>
          </ContainerLogo>
          <ContainerChecklistInfos>
            <DateText>Seus Checklists:</DateText>
            <DateText>Total: {list?.length > 0 ? list.length : 0}</DateText>
          </ContainerChecklistInfos>
        </ContainerGreen>

        <ContainerWhite>
          {loading ? (
            <Loading
              size="lg"
              color={
                themeLight ? theme.colors.greenPrimary : theme.colors.textWhite
              }
            />
          ) : list?.length > 0 ? (
            <>
              <FlatList
                data={list}
                renderItem={({item}) => (
                  <RenderItem item={item} setList={setList} list={list} />
                )}
                keyExtractor={item => String(item._id)}
              />
            </>
          ) : (
            'Nenhum item na lista'
          )}
        </ContainerWhite>
        <ButtonPrimary
          themeLight={themeLight}
          onPress={() => navigation.navigate('CreateChecklist' as never)}>
          <TextButton>Novo Checklist</TextButton>
        </ButtonPrimary>
      </Container>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isOpenModal}
        onRequestClose={() => {
          setIsOpenModal(!isOpenModal);
        }}>
        <ModalContainer>
          <ModalContainerBody>
            <ButtonCloseModal
              onPress={() => {
                setIsOpenModal(!isOpenModal);
              }}>
              <CloseIcon size="lg" color={theme.colors.backgroundWhite} />
            </ButtonCloseModal>
            <TextModal>Items Atualizados:</TextModal>

            <FlatList
              data={missingItemsToShow}
              renderItem={({item}: {item: Checklist}) => (
                <RenderItem item={item} disableIcons={true} />
              )}
              keyExtractor={item => String(item._id)}
            />
          </ModalContainerBody>
        </ModalContainer>
      </Modal>
    </>
  );
}
