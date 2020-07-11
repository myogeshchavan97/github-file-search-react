import React from 'react';
import Header from './components/Header';
import FilesList from './components/FilesList';
import files from './utils/api';

export default class App extends React.Component {
  state = {
    filesList: files
  };

  render() {
    const { counter, filesList } = this.state;

    return (
      <div className="container">
        <Header />
        <FilesList files={filesList} />
      </div>
    );
  }
}
