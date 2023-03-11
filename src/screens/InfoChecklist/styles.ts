import {Box, Button, Text} from 'native-base';
import styled from 'styled-components';

export const Container = styled(Box)`
  align-items: center;
  flex: 1;
  padding: 10px 20px;
  background-color: burlywood;
`;
export const Card = styled(Box)`
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0px 20px;
  background-color: weath;
  width: 100%;
  margin-top: 30px;
`;
export const Title = styled(Text)`
  font-size: 20px;
  line-height: 30px;
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
export const ButtonPrimary = styled(Button)`
  height: 50px;
  width: 160px;
  background-color: wheat;
`;
