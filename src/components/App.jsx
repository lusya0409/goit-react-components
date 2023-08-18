import { QuizForm } from './QuizForm/QuizForm';
import { QuizList } from './QuizList/QuizList';
import { SearchBar } from './SearchBar/SearchBar';
import quizItems from '../quiz-items.json';

export const App = () => {
  return (
    <div>
      <QuizForm />
      <SearchBar />
      <QuizList items={quizItems} />
    </div>
  );
};
//QuizList({items: quizItems})
