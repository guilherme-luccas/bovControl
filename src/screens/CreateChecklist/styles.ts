import styled from 'styled-components';
import {Box, Button, Select, ScrollView, Text} from 'native-base';
import {TextInput} from 'react-native';
import {ThemeMode} from '../../globalStyles/stylesInterfaces';

export const Container = styled(Box)`
  align-items: center;
  flex: 1;
  padding: 20px 20px;
  background-color: ${({theme}) => theme.colors.greenPrimary};
`;

export const Scroll = styled(ScrollView)`
  flex: 1;
  width: 100%;
`;

export const Title = styled(Text)`
  font-size: 30px;
  line-height: 30px;
  margin-top: 20px;
  color: ${({theme}) => theme.colors.textWhite};
`;

export const Error = styled(Text)`
  font-size: 14px;
  color: red;
`;

export const InputFiled = styled(TextInput)<ThemeMode>`
  height: 50px;
  width: 300px;
  background-color: ${({theme, themeLight}) =>
    themeLight ? theme.colors.textWhite : theme.colors.textGray};

  border-radius: 10px;
  padding-left: 8px;
  font-size: 18px;
`;
export const ButtonSubmit = styled(Button)`
  width: 200px;
  height: 40px;
  margin-top: 20px;
  border-radius: 20px;
  background-color: ${({theme}) => theme.colors.buttonPrimary};
`;
export const ButtonHome = styled(Button)`
  width: 200px;
  height: 40px;
  margin-top: 20px;
  border-radius: 20px;
  background-color: ${({theme}) => theme.colors.dangerPrimary};
`;
export const TextButton = styled(Text)`
  font-size: 20px;
  line-height: 22px;
  color: ${({theme}) => theme.colors.textWhite};
`;

export const InputContainer = styled(Box)`
  align-items: center;
  height: 70px;
  margin-top: 10px;
`;
export const SelectField = styled(Select)<ThemeMode>`
  height: 50px;
  background-color: ${({theme, themeLight}) =>
    themeLight ? theme.colors.textWhite : theme.colors.textGray};
  color: black;
  font-size: 18px;
`;
