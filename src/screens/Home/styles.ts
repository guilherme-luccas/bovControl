import styled from 'styled-components';
import {Box, Button, Spinner, Switch, Text} from 'native-base';
import {Image, TouchableOpacity} from 'react-native';
import {ThemeMode} from '../../globalStyles/stylesInterfaces';

export const Container = styled(Box)<ThemeMode>`
  align-items: center;
  flex: 1;
  background-color: ${({themeLight, theme}) =>
    themeLight ? theme.colors.textWhite : theme.colors.dangerPrimary};
`;
export const ContainerGreen = styled(Box)`
  align-items: center;
  height: 300px;
  padding: 0px 20px;
  width: 100%;
  background-color: ${({theme}) => theme.colors.greenPrimary};
  border-bottom-left-radius: 40px;
  border-bottom-right-radius: 40px;
`;
export const ContainerWhite = styled(Box)`
  align-items: center;
  justify-content: center;
  flex: 1;
  padding: 0px 20px;
  width: 100%;
  margin-top: -120px;
`;
export const ContainerChecklistInfos = styled(Box)`
  align-items: center;
  justify-content: space-between;
  flex-direction: row;

  margin-top: 20px;
  width: 100%;
`;

export const ContainerLogo = styled(Box)`
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
  justify-content: space-between;
`;

export const ContainerTitles = styled(Box)`
  width: 100%;
  flex-direction: row;
  align-items: center;
`;
export const Title = styled(Text)`
  font-size: 40px;
  margin-bottom: 2px;
  line-height: 40px;
  color: ${({theme}) => theme.colors.textWhite};
`;
export const LogoTitle = styled(Text)`
  font-size: 35px;
  margin-bottom: 2px;
  line-height: 40px;
  color: ${({theme}) => theme.colors.textGreen};
`;
export const DateText = styled(Text)`
  font-size: 16px;
  line-height: 20px;
  color: ${({theme}) => theme.colors.textWhite};
`;
export const ButtonPrimary = styled(Button)<ThemeMode>`
  margin-top: 30px;
  margin-bottom: 20px;
  border-radius: 20px;
  background-color: ${({theme, themeLight}) =>
    themeLight ? theme.colors.buttonPrimary : theme.colors.greenPrimary};
  elevation: 2;
`;
export const TextButton = styled(Text)`
  font-size: 22px;
  line-height: 30px;
  color: ${({theme}) => theme.colors.textWhite};
`;
export const Loading = styled(Spinner)``;

export const Picture = styled(Image)`
  width: 50px;
  height: 50px;
  margin-left: 30px;
`;

export const SwitchTheme = styled(Switch)`
  margin-top: 10px;
`;
export const Toast = styled(Box)``;

export const ModalContainer = styled(Box)`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.6);
`;
export const ModalContainerBody = styled(Box)`
  width: 90%;
  max-height: 450px;
  elevation: 3;
  background-color: ${({theme}) => theme.colors.textGray};
  align-items: center;
  justify-content: center;
`;

export const TextModal = styled(Text)`
  font-size: 18px;
  line-height: 20px;
  margin-bottom: 10px;
  color: ${({theme}) => theme.colors.textWhite};
`;

export const ButtonCloseModal = styled(TouchableOpacity)`
  margin-top: 20px;
  margin-bottom: 10px;
`;
