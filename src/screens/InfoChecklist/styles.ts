import {ThemeMode} from './../../globalStyles/stylesInterfaces';
import {Box, Button, Text} from 'native-base';
import styled from 'styled-components';

export const Container = styled(Box)`
  align-items: center;
  flex: 1;
  padding: 40px 20px;
  background-color: ${({theme}) => theme.colors.greenPrimary};
`;
export const Card = styled(Box)<ThemeMode>`
  align-items: flex-start;
  justify-content: flex-start;
  padding: 10px 20px;
  background-color: ${({theme, themeLight}) =>
    themeLight ? theme.colors.backgroundWhite : theme.colors.dangerPrimary};

  width: 100%;
  margin-top: 20px;
  border-radius: 20px;
`;
export const Title = styled(Text)`
  font-size: 20px;
  line-height: 22px;
  color: ${({theme}) => theme.colors.textWhite};
`;
export const FieldName = styled(Text)`
  font-size: 20px;
  line-height: 30px;
`;
export const FieldOption = styled(Text)`
  font-size: 16px;
  line-height: 30px;
  flex: 1;
  text-align: right;
`;

export const FieldContainer = styled(Box)`
  flex-direction: row;
  justify-content: space-between;
`;

export const ButtonsContainer = styled(Box)`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-top: 40px;
`;
export const ButtonPrimary = styled(Button)<ThemeMode>`
  width: 160px;
  height: 40px;
  margin-top: 20px;
  border-radius: 20px;
  background-color: ${({theme}) => theme.colors.dangerPrimary};
`;
