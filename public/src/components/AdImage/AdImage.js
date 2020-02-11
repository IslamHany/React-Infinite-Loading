import React, {Component} from 'react';
class AdImage extends Component{
  state = {
    randomNum: Math.random() * 1000
  };
  componentWillMount(){
    let randArr = [1000, 900, 800, 700, 500, 300, 200, 100, 10];
    let multiplier = randArr[Math.floor(Math.random() )* (randArr.length - 1)];
    let randNum = Math.floor(Math.random() * multiplier);
    this.setState({
      randomNum: randNum
    });
  };
  render(){
    return(
      <div className="container2">
        <img src={'http://localhost:3000/ads?r=' + this.state.randomNum} />
      </div>
    );
  };
};
export default AdImage;