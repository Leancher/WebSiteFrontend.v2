import React from 'react' // подключение библиотеки React
import ReactDOM from 'react-dom'
//import { Add } from './components/Add' // ./ = текущая директория,
//import { News } from './components/News'
import './App.css' // подключение файла стилей
import { PageMain } from './components/PageMain'
import { PageContent } from './components/PageContent'

class App extends React.Component {
  state = {
    location: window.location,

    //news: null,
    //isLoading: false
  }
  handleAddNews = data => {
    //const nextNews = [data, ...this.state.news];
    //this.setState({ news: nextNews });
  }
  componentDidMount() {
    /*     this.setState({isLoading: true})
    fetch('http://localhost:3000/data/newsData.json')
    .then(response => {
      return response.json()
    })
    .then(data => {
      setTimeout(() => { // добавили задержку
        this.setState({ isLoading: false, news: data })
        }, 1000)
    }) */
  }
  render() {
    //const { news, isLoading } = this.state
    const category = [
      'MyProjects',
      'RepairCar',
      'MyPhoto',
      'ThingUSSR',
      'Thing90',
      'HistCher',
      'MyNotes',
    ]
    return (
      <React.Fragment>
        <div className="header">
          <div className="HeaderTitle">
            <a href="index.html">
              <img src="./Pictures/Logo/Main.png" alt="alt" />
              {/* <asp:Image ID="LogoPic" runat="server" /> */}
              LEANCHER
            </a>
          </div>
          <div className="HeaderLink">
            <a href="#linkStat" className="HeaderMenu">
              Статистика
            </a>
            <br />
            <a href="#linkAbout" className="HeaderMenu">
              О сайте
            </a>
          </div>
        </div>
        <div className="Body">
          <PageContent category={category} />
        </div>

        {/*         <Add onAddNews={this.handleAddNews} />
        <h3>Новости</h3>
        {isLoading && <p>Загружаю...</p>}
        {Array.isArray(news) ? <News data = {news} /> : <p>Нет новостей</p>} */}
      </React.Fragment>
    )
  }
}

export default App
