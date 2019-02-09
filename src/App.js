import React from 'react';
import './App.css';
import { HomePage } from './components/HomePage';
import { ContentPage } from './components/ContentPage';
import { NavMenu } from './components/NavMenu';
import { CurrentCategory } from './components/CurrentCategory';
import { PhotoViewer } from './components/PhotoViewer';
import { Article } from './components/Article';
import { MyNotes } from './components/MyNotes';
import { config, getCategoryNumber, getSubCatNumber } from './components/utilites';

const { siteName, name, caption, description, isPhotoAlbum, isTileGrid, isArticle } = config;

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.catName = 0;
    this.catNum = 0;
    this.subCatNum = 0;
  }
  state = {
    isLoading: false,
    categoriesList: [],
    subCategoriesList: []
  };

  setHeadTags(description) {
    const namePage = this.state.categoriesList[this.catNum][caption];
    document.title = namePage + ' - ' + siteName;
    document.getElementsByTagName('META')[2].content = description;
  }

  setContent() {
    const components = [];
    this.catName = this.state.categoriesList[this.catNum][name];
    // Если передан номер подкатегории, то показываем подкатегорию
    if (Number(this.subCatNum) > 0) {
      this.setHeadTags(this.state.subCategoriesList[this.subCatNum][description]);
      //Подкатегория или ее часть является статьей
      if (this.state.subCategoriesList[this.subCatNum][isArticle] === '1') {
        components.push(<Article catName={this.catName} />);
      }
      //Подкатегория является фотоальбомом
      if (this.state.subCategoriesList[this.subCatNum][isPhotoAlbum] === '1') {
        components.push(<PhotoViewer catName={this.catName} />);
      }
    }
    // Номер категории больше 0 и нет подкатегории, показываем список подкатегорий этой категории
    if (Number(this.catNum) > 0 && Number(this.subCatNum) === 0) {
      if (this.state.categoriesList[this.catNum][isTileGrid] === '1') {
        components.push(<CurrentCategory subCategories={this.state.subCategoriesList} />);
      }
      //Категория "Заметки"
      if (Number(this.catNum) === 7) {
        components.push(<MyNotes key={7} />);
      }
    }
    return components;
  }

  setCaption() {
    if (Number(this.subCatNum) > 0) return this.state.subCategoriesList[this.subCatNum][caption];
    if (Number(this.catNum) > 0) return this.state.categoriesList[this.catNum][caption];
  }

  renderContentPage() {
    return (
      <React.Fragment>
        <NavMenu />
        <div className="ContentBlock">
          <div className="ContentCaption">{this.setCaption()}</div>
          {this.setContent()}
        </div>
      </React.Fragment>
    );
  }

  renderMain() {
    return (
      <React.Fragment>
        {/* Номер категории 0, показываем главную страницу */}
        {Number(this.catNum) === 0 ? <HomePage /> : <ContentPage />}
      </React.Fragment>
    );
  }

  loadData = responseList => {
    this.setState({
      isLoading: true,
      categoriesList: [...responseList[0]],
      subCategoriesList: [...responseList[1]]
    });
  };

  render() {
    this.catNum = getCategoryNumber();
    this.subCatNum = getSubCatNumber();
    return <React.Fragment>{this.renderMain()}</React.Fragment>;
  }
}
