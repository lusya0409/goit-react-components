// import { StrictMode } from 'react';

import { QuizForm } from './QuizForm/QuizForm';
import { QuizList } from './QuizList/QuizList';
import { SearchBar } from './SearchBar/SearchBar';
import initialQuizItems from '../quiz-items.json';
import { GlobalStyle } from './GlobalStyle';
import { Layout } from './Layout';
import { Counter } from './Counter/Counter';
import { Dropdown } from './Dropdown/Dropdown';
import { ColorPicker } from './ColorPicker/ColorPicker';
import { Component } from 'react';
import { nanoid } from 'nanoid';

const colorPickerOptions = [
  { label: 'red', color: '#F44336' },
  { label: 'green', color: '#4CAF50' },
  { label: 'blue', color: '#2196F3' },
  { label: 'grey', color: '#607D8B' },
  { label: 'pink', color: '#E91E63' },
  { label: 'indigo', color: '#3F51B5' },
];
export class App extends Component {
  // state = {
  //   quizItems: initialQuizItems,
  //   topicFilter: '',
  //   levelFilter: 'beginner',
  // };

  // вложенное состояние
  state = {
    quizItems: initialQuizItems,
    filters: {
      topic: '',
      level: 'all',
    },
  };
  addQuiz = newQuiz => {
    this.setState(prevState => ({
      quizItems: [
        ...prevState.quizItems,
        {
          id: nanoid(),
          ...newQuiz,
        },
      ],
    }));
    console.log(newQuiz);
  };
  deleteQuiz = quizId => {
    this.setState(prevState => ({
      quizItems: prevState.quizItems.filter(quiz => quiz.id !== quizId),
    }));
  };
  // changeLevelFilter = newLevel => {
  //   this.setState({
  //     levelFilter: newLevel,
  //   });
  // };

  // вложенное состояние
  changeLevelFilter = newLevel => {
    this.setState(prevState => ({
      filters: {
        ...prevState.filters,
        level: newLevel,
      },
    }));
  };

  // changeTopicFilter = newTopic => {
  //   this.setState({
  //     topicFilter: newTopic,
  //   });
  // };

  // вложенное состояние
  changeTopicFilter = newTopic => {
    this.setState(prevState => ({
      filters: {
        ...prevState.filters,
        topic: newTopic,
      },
    }));
  };

  getVisibleQuizItems = () => {
    const { quizItems, filters } = this.state;

    return quizItems.filter(quiz => {
      const hasTopic = quiz.topic
        .toLowerCase()
        .includes(filters.topic.toLowerCase());
      if (filters.level === 'all') {
        return hasTopic;
      }

      return hasTopic && quiz.level === filters.level;
    });
  };

  render() {
    const { filters } = this.state;
    //вычисляемое свойство
    const visibleItems = this.getVisibleQuizItems();

    return (
      <Layout>
        <ColorPicker options={colorPickerOptions} />
        <Dropdown />
        <QuizForm onAdd={this.addQuiz} />
        <SearchBar
          level={filters.level}
          topic={filters.topic}
          onChangeLevel={this.changeLevelFilter}
          onChangeTopic={this.changeTopicFilter}
        />
        <QuizList items={visibleItems} onDelete={this.deleteQuiz} />
        <Counter />

        <GlobalStyle />
      </Layout>
    );
  }
}
//QuizList({items: quizItems})
