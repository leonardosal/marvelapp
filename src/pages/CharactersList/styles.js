import styled from 'styled-components';

export const Container = styled.View`
`;

export const TitleContainer = styled.View`
  padding-bottom: 10px;
`;

export const ItemRow = styled.TouchableOpacity`
  border-bottom-width: 1px;
  border-color: #ccc;
  flex-direction: row;
  align-items: flex-start;
`;

export const Content = styled.View`
  flex-direction: column;
  width: 75%;
`;

export const Avatar = styled.Image`
  width: 80px;
  height: 80px;
  margin-right: 10px;
`

export const TitleRow = styled.Text`
  margin-top: 5px;
  font-size: 18px;
  font-weight: bold;
  color: #000;
`;

export const Description = styled.Text`
  font-size: 12px;
  text-align: left
`;

export const List = styled.FlatList`
  margin-bottom: 58;
`

export const LoadingContainer = styled.View`
  margin-vertical: 20;
`

export const Loading= styled.ActivityIndicator`
  align-self: center;
`