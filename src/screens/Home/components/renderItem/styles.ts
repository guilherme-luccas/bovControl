import styled from 'styled-components';

import {Box, Spinner, Text} from 'native-base';
import {TouchableOpacity} from 'react-native';

import {ThemeMode} from '../../../../globalStyles/stylesInterfaces';

export const Container = styled(Box)<ThemeMode>`
  justify-content: center;
  width: 100%;
  padding: 10px;
  margin-bottom: 8px;
  border-radius: 8px;
  background-color: ${({theme, themeLight}) =>
    themeLight ? theme.colors.buttonPrimary : theme.colors.backgroundGray};
  flex-direction: row;
`;

export const ContainerInfo = styled(Box)`
  width: 80%;
`;

export const ContainerEditDelete = styled(Box)`
  align-items: center;
  justify-content: center;
  margin-left: 10px;
  justify-content: space-between;
  padding: 4px;
`;

export const ContainerField = styled(Box)`
  width: 100%;
  flex-direction: row;
`;
export const Title = styled(Text)`
  flex-wrap: wrap;
  margin-right: 4px;
  font-weight: bold;
  color: ${({theme}) => theme.colors.textWhite};
`;
export const Subtitle = styled(Text)`
  flex-wrap: wrap;
  margin-right: 4px;
  flex: 1;
  color: ${({theme}) => theme.colors.textWhite};
`;

export const Div = styled(Box)`
  border-width: 1px;
  border-style: solid;
  border-color: ${({theme}) => theme.colors.backgroundWhite};
  height: 100%;
`;

export const Button = styled(TouchableOpacity)``;

export const Loading = styled(Spinner)``;
