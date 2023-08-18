import styled from 'styled-components';

const getBorderColor = props => {
  switch (props.level) {
    case 'beginner':
      return 'green';
    case 'intermediate':
      return 'orange';
    case 'advanced':
      return 'red';

    default:
      return null;
  }
};
export const Wrapper = styled.div`
  padding: 4px;
  border: 4px solid ${getBorderColor};
  border-radius: 8px;
`;

export const Topic = styled.h2`
  margin-bottom: 12px;
  margin-top: 0px;
`;

export const MetaWrapper = styled.div`
  display: flex;
  gap: 8px;
`;
export const Text = styled.p`
  margin: 0;
  color: ${props => {
    return props.color;
  }};
`;
