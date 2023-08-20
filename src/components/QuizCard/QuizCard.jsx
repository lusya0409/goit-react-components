import { MetaWrapper, Topic, Wrapper, Text, Button } from './QuizCard.styled';
import { BsFillFileXFill } from 'react-icons/bs';

export const QuizCard = ({ quiz: { topic, level, time, questions } }) => {
  return (
    <Wrapper level={level}>
      <Topic>{topic}</Topic>

      <MetaWrapper>
        <Text color="red" a={10}>
          <b>Level:</b> {level}
        </Text>
        <Text color="green">
          <b>Time:</b> {time}
        </Text>
        <Text>
          <b>Questions:</b> {questions}
        </Text>
      </MetaWrapper>
      <Button>
        <BsFillFileXFill size={40} />
      </Button>
    </Wrapper>
  );
};
