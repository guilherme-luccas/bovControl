import styled from 'styled-components';
import {Box, Button, Spinner, Text} from 'native-base';
import {Image} from 'react-native';

export const Container = styled(Box)`
  align-items: center;
  flex: 1;
  padding: 0px 20px;
  background-color: burlywood;
`;
export const ContainerLogo = styled(Box)`
  justify-content: center;
  align-items: flex-end;
  width: 100%;
  flex-direction: row;
  margin-top: 8px;
  margin-bottom: 20px;
`;
export const ContainerFlatList = styled(Box)`
  height: 700px;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export const Title = styled(Text)`
  font-size: 20px;
  margin-bottom: 2px;
`;

export const ButtonPrimary = styled(Button)``;

export const Loading = styled(Spinner)``;

export const Picture = styled(Image)`
  width: 60px;
  height: 50px;
`;
