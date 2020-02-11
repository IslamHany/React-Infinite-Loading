import React, {Component, Fragment} from 'react';
import './App.css';
import axios from 'axios';
import ProductItem from './components/ProductItem/ProductItem';

class App extends Component{
  state = {
    faces: [],
    loading: true,
    sortType: '',
    pgNum: 1,
    cameFromScroll: false
  };
  componentWillMount(){
    this.loadProduct();
    window.addEventListener('scroll', (e) => this.handleScroll(e));
  }
  loadProduct = () => {
    let baseUrl = `http://localhost:3000/api/products?_page=${this.state.pgNum}&_limit=20&_sort=${this.state.sortType}`;
    this.setState({
      ...this.state,
      faces: !this.state.cameFromScroll ? [] : this.state.faces,
      loading: true
    });
    axios.get(baseUrl)
    .then(res => {
      if(this.state.cameFromScroll){
        this.setState(prevState => {
          return{
            ...prevState,
            faces: [...prevState.faces, ...res.data],
            loading: false,
            cameFromScroll: false
          };
        });
      } else{
        this.setState({
          ...this.state,
          faces: res.data,
          loading: false,
        });
      }
    })
    .catch(err => console.log(err));
  };
  changeSort = (e) => {
    this.setState({
      ...this.state,
      sortType: e.target.value,
      pgNum: 1
    }, this.loadProduct);
  };
  handleScroll = (e) => {
    let totalPageNumber = 25;
    if(this.state.pgNum >= totalPageNumber) return;
    if(this.state.loading) return;
    let lastProduct = document.querySelector('.container > div:last-of-type');
    let lastProductOffset = lastProduct.offsetTop + lastProduct.clientHeight;
    let pageOffset = window.pageYOffset + window.innerHeight;
    if(pageOffset > lastProductOffset - 20) this.loadMore();
  };
  loadMore = () => {
    this.setState(prevState => {
      return{
        ...prevState,
        pgNum: prevState.pgNum + 1,
        cameFromScroll: true
      };
    }, this.loadProduct);
  };
  render(){
    return (
      <Fragment>
        <div className="sort">
          <input type="radio" value="none" defaultChecked name="sort" onChange={(e) => this.changeSort(e)}/>none{" "}
          <input type="radio" value="price" name="sort" onChange={(e) => this.changeSort(e)}/>Price{" "}
          <input type="radio" value="id" name="sort" onChange={(e) => this.changeSort(e)}/>id{" "}
          <input type="radio" value="size" name="sort" onChange={(e) => this.changeSort(e)}/>size
        </div>
        <div className="container">
          {this.state.faces ? <ProductItem faces={this.state.faces}/> : null}
        </div>
        {this.state.loading ? <div className="container2">Loading...</div> : null}
        {this.state.pgNum === 25 && !this.state.loading ? <div className="container2">~ end of catalogue ~</div> : null}
      </Fragment>
    );    
  };
}

export default App;
