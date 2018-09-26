import styled from 'styled-components';

export const Container = styled.ScrollView`
`;

export const TitleContainer = styled.View`
  padding-bottom: 10px;
`;

export const ItemRow = styled.View`
  borderBottomWidth: 1px;
  borderColor: #ccc;
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
  fontSize: 18px;
  fontWeight: bold;
  color: #000;
`;

export const Description = styled.Text`
  fontSize: 12px;
  textAlign: left
`;