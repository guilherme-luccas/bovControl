import {Box, Text} from 'native-base';
import styled from 'styled-components';
import {TouchableOpacity} from 'react-native';

export const Container = styled(Box)`
  width: 100%;
  padding: 10px;
  margin-bottom: 8px;
  border-radius: 8px;
  background-color: wheat;
  flex-direction: row;
`;

export const ContainerInfo = styled(Box)`
  width: 250px;
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
`;
export const Subtitle = styled(Text)`
  flex-wrap: wrap;
  margin-right: 4px;
  flex: 1;
`;

export const Div = styled(Box)`
  border: 1px solid orange;
  height: 100%;
`;

export const Button = styled(TouchableOpacity)``;
