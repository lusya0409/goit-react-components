// import { StrictMode } from 'react';

import { QuizForm } from './QuizForm/QuizForm';
import { QuizList } from './QuizList/QuizList';
import { SearchBar } from './SearchBar/SearchBar';
// import initialQuizItems from '../quiz-items.json'; заменили на бекенд
import { GlobalStyle } from './GlobalStyle';
import { Layout } from './Layout';
import { Counter } from './Counter/Counter';
import { Dropdown } from './Dropdown/Dropdown';
import { ColorPicker } from './ColorPicker/ColorPicker';
import { useState, useEffect } from 'react';
// import { nanoid } from 'nanoid';
import { fetchQuizzes, deleteQuizById, createQuiz } from './api';
import toast, { Toaster } from 'react-hot-toast';

const colorPickerOptions = [
  { label: 'red', color: '#F44336' },
  { label: 'green', color: '#4CAF50' },
  { label: 'blue', color: '#2196F3' },
  { label: 'grey', color: '#607D8B' },
  { label: 'pink', color: '#E91E63' },
  { label: 'indigo', color: '#3F51B5' },
];

const getInitialFilters = () => {
  const savedFilters = localStorage.getItem('quiz-filters');
  if (savedFilters) {
    return JSON.parse(savedFilters);
  }

  return {
    topic: '',
    level: 'all',
  };
};
export const App = () => {
  const [quizItems, setQuizItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [filters, setFilters] = useState(getInitialFilters);

  //HTTP запрос за всеми квизами
  useEffect(() => {
    async function getQuizzes() {
      try {
        setLoading(true);
        setError(false);

        const quizzes = await fetchQuizzes();
        setQuizItems(quizzes);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    getQuizzes();
  }, []);

  //Пишем фильтрі в LS (локал сторидж)
  useEffect(() => {
    localStorage.setItem('quiz-filters', JSON.stringify(filters));
  }, [filters]);

  const visibleItems = quizItems.filter(quiz => {
    const hasTopic = quiz.topic
      .toLowerCase()
      .includes(filters.topic.toLowerCase());
    if (filters.level === 'all') {
      return hasTopic;
    }

    return hasTopic && quiz.level === filters.level;
  });

  const addQuiz = async newQuiz => {
    try {
      setLoading(true);
      setError(false);
      const addedQuiz = await createQuiz({ ...newQuiz, id: Date.now() });
      setQuizItems(prevItems => [...prevItems, addedQuiz]);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }

    console.log(newQuiz);
  };
  const deleteQuiz = async quizId => {
    try {
      setLoading(true);
      setError(false);

      const deleteQuiz = await deleteQuizById(quizId);
      setQuizItems(prevItems =>
        prevItems.filter(quiz => quiz.id !== deleteQuiz.id)
      );
      toast.success('Все очень хорошо!');
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };
  const changeFilters = (value, key) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [key]: value,
    }));
  };
  const resetFilters = () => {
    setFilters({
      topic: '',
      level: 'all',
    });
  };

  return (
    <Layout>
      <ColorPicker options={colorPickerOptions} />
      <Dropdown />
      <QuizForm onAdd={addQuiz} />
      <SearchBar
        level={filters.level}
        topic={filters.topic}
        onChange={changeFilters}
        onReset={resetFilters}
      />
      {loading && <div>LOADING...</div>}
      {error && !loading && <div>OOPS! THERE WAS AN ERROR!</div>}
      {visibleItems.length > 0 && (
        <QuizList items={visibleItems} onDelete={deleteQuiz} />
      )}
      <Counter />

      <GlobalStyle />
      <Toaster />
    </Layout>
  );
};
