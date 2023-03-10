import styled from 'styled-components';
import {Box, Button, Select, ScrollView, Text, Checkbox} from 'native-base';
import {TextInput} from 'react-native';

export const Container = styled(Box)`
  align-items: center;
  flex: 1;
  padding: 0px 20px;
  background-color: burlywood;
`;

export const Scroll = styled(ScrollView)`
  flex: 1;
`;

export const Title = styled(Text)`
  font-size: 30px;
  line-height: 30px;
  margin-top: 20px;
`;

export const Error = styled(Text)`
  font-size: 14px;
  color: red;
`;

export const InputFiled = styled(TextInput)`
  height: 50px;
  width: 300px;
  background-color: white;
  border-radius: 10px;
  padding-left: 8px;
  font-size: 18px;
`;
export const ButonSubmit = styled(Button)`
  width: 200px;
  height: 40px;
  margin-top: 20px;
`;

export const InputContainer = styled(Box)`
  align-items: center;
  height: 70px;
  margin-top: 4px;
`;
export const SelectField = styled(Select)`
  height: 50px;
  background-color: white;
  color: black;
  font-size: 18px;
`;
