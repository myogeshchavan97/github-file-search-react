import React from 'react';
import Header from './components/Header';
import FilesList from './components/FilesList';
import SearchView from './components/SearchView';
import { ESCAPE_CODE, HOTKEY_CODE } from './utils/keyCodes';
import files from './utils/api';

export default class App extends React.Component {
  state = {
    isSearchView: false,
    filesList: files
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleEvent);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleEvent);
  }

  handleEvent = (event) => {
    const keyCode = event.keyCode || event.which;

    switch (keyCode) {
      case HOTKEY_CODE:
        this.setState((prevState) => ({
          isSearchView: true,
          filesList: prevState.filesList.filter((file) => file.type === 'file')
        }));
        break;
      case ESCAPE_CODE:
        this.setState({ isSearchView: false, filesList: files });
        break;
      default:
        break;
    }
  };

  handleSearch = (searchTerm) => {
    let list;
    if (searchTerm) {
      list = files.filter(
        (file) =>
          file.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 &&
          file.type === 'file'
      );
    } else {
      list = files.filter((file) => file.type === 'file');
    }

    this.setState({
      filesList: list
    });
  };

  render() {
    const { isSearchView, filesList } = this.state;

    return (
      <div className="container">
        <Header />
        {isSearchView ? (
          <div className="search-view">
            <SearchView onSearch={this.handleSearch} />
            <FilesList files={filesList} isSearchView={isSearchView} />
          </div>
        ) : (
          <FilesList files={filesList} />
        )}
      </div>
    );
  }
}
