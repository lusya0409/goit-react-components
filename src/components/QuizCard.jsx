// export const QuizCard = ({ quiz }) => {
//   return (
//     <div>
//       <h2>{quiz.topic}</h2>
//       <div>
//         <p>Level: {quiz.level}</p>
//         <p>Time: {quiz.time}</p>
//         <p>Questions: {quiz.questions}</p>
//       </div>
//     </div>
//   );
// };

export const QuizCard = ({ quiz: { topic, level, time, questions } }) => {
  return (
    <div>
      <h2>{topic}</h2>
      <div>
        <p>Level: {level}</p>
        <p>Time: {time}</p>
        <p>Questions: {questions}</p>
      </div>
    </div>
  );
};
