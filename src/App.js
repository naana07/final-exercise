import React, { Component } from 'react';
import umekisanphoto from './umeki-san.png';
import genshunsanphoto from './genshun-san.png'
import melosanphoto from './melo-san.png'
import './index.css';
import clappinghands from './clapping-hands.png'

const users = ["梅木さん","げんしゅんさん","メロさん"]

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    nowuser: "梅木さん",
    梅木さん: {
      photo: umekisanphoto,
      claps: 100,
      clapsreceived: 0,
      shokai: {from: "梅木さん", to: "げんしゅんさん", comment: "", claps: 0},
      },

    げんしゅんさん: {
      photo: genshunsanphoto,
      claps: 100,
      clapsreceived: 0,
      shokai: {from: "げんしゅんさん", to: "メロさん", comment: "", claps: 0},
        },

    メロさん: {
      photo: melosanphoto,
      claps: 100,
      clapsreceived: 0,
      shokai: {from: "メロさん", to: "げんしゅんさん", comment: "", claps: 0},
          },

    finaldata: []
        }

      this.handleChangetext = this.handleChangetext.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)
      this.handleChangeto = this.handleChangeto.bind(this)
      this.handleChangeclap = this.handleChangeclap.bind(this)
      this.handleChangeuser = this.handleChangeuser.bind(this)
      this.giveOtherusers = this.giveOtherusers.bind(this)
      this.givePhoto = this.givePhoto.bind(this)
    }

    handleChangetext(event){
      let nowstate = this.state
      let thisuser = this.state.nowuser
      nowstate[thisuser].shokai.comment = event.target.value
      this.setState(nowstate)
      localStorage.setItem("data", JSON.stringify(this.state))
    }

    handleChangeto(event){
      let nowstate = this.state
      let thisuser = this.state.nowuser
      nowstate[thisuser].shokai.to = event.target.value
      this.setState(nowstate)   
      localStorage.setItem("data", JSON.stringify(this.state));
    }

    handleChangeclap(index){
      let nowstate = this.state;
      let thisuser = this.state.nowuser
      if (this.state.finaldata[index].claps <15 && this.state.finaldata[index].to != thisuser && this.state.finaldata[index].from != thisuser && this.state[thisuser].claps > 0)  {
      (nowstate.finaldata[index]).claps = Number(this.state.finaldata[index].claps) + 1;
      nowstate[thisuser].claps = this.state[thisuser].claps - 2;
      nowstate[thisuser].clapsreceived = this.state[thisuser].clapsreceived    
      nowstate[this.state.finaldata[index].to].clapsreceived = Number(this.state[this.state.finaldata[index].to].clapsreceived) + 1
      nowstate[this.state.finaldata[index].from].clapsreceived = Number(this.state[this.state.finaldata[index].from].clapsreceived) + 1
      }
      else {}
      
      this.setState(nowstate)
      localStorage.setItem("data", JSON.stringify(this.state))
    }

    givePhoto(name){
      if ( name == "梅木さん"){
        return umekisanphoto
      }
      else if (name == "げんしゅんさん"){
        return genshunsanphoto
      }
      else {
        return melosanphoto
      }
    }

  //   var f = ((this.state.submit[index].claps < 15) && (this.state.name == "梅木さん")) ? (() => {
  //     nowstate.submit[index].claps = Number(this.state.submit[index].claps + 1);
  //     nowstate.claps = this.state.claps -2;
  //     nowstate.clapsrecieved = this.state.clapsreceived + 1;
  //     this.setState(nowstate);
  //  })
  //  :
  //  (this.state.name = "梅木さん" ?  () => {} : () => 
  //  {nowstate.clapsreceived = this.state.clapsreceived
  //  this.setState(nowstate)
  //  })
  //   f()

  handleChangeuser(event){
    let nowstate = this.state
    nowstate.nowuser = event.target.value
    this.setState(nowstate)
    localStorage.setItem("data", JSON.stringify(nowstate))
  }

    giveOtherusers(nowuser){
      return users.filter(user => (user != nowuser))
    }

    handleSubmit(e){
     e.preventDefault();
     let newstate = this.state;
     let thisuser = this.state.nowuser
     let newshokai = this.state[thisuser].shokai;
    //  let nowsubmit = this.state[thisuser].submit
    //  let newlist = (newshokai).concat(nowsubmit)
     let alldata = this.state.finaldata
    //  newstate[thisuser].submit = newlist
     newstate[thisuser].shokai = {from: JSON.parse(localStorage.getItem("data"))[thisuser].shokai.from, to: JSON.parse(localStorage.getItem("data"))[thisuser].shokai.to, comment: "", claps: 0}
     newstate.finaldata = [newshokai].concat(alldata)
     this.setState(newstate)
     localStorage.setItem("data", JSON.stringify(newstate))
    }

    componentWillMount() {
      const localStorageData = JSON.parse(localStorage.getItem("data"))
      this.setState(localStorageData);
    }

  render() {
    console.log("state", this.state)
    // localStorage.setItem("data", JSON.stringify(this.state))

    return (
      //
      <div>
      <div className="nav-bar">
      <a className="active" href="#"><i className="home"></i></a> 
      <a href="icon"><img src={
       JSON.parse(localStorage.getItem("data"))[JSON.parse(localStorage.getItem("data")).nowuser].photo
      } className="icon"></img></a> 
      <select className="user" onChange={this.handleChangeuser} value={JSON.parse(localStorage.getItem("data")).nowuser}>
      <option value = "梅木さん">梅木さん</option>
      <option value="げんしゅんさん">げんしゅんさん</option>
      <option value="メロさん">メロさん</option>
      </select>
      <br></br>
      <p className="name">{JSON.parse(localStorage.getItem("data")).nowuser}</p>
      <a href="claps" className="claps">拍手できる：{
        JSON.parse(localStorage.getItem("data"))[JSON.parse(localStorage.getItem("data")).nowuser].claps
      }</a> 
      <a href="clapsreceived" className="clapsreceived">拍手された：{JSON.parse(localStorage.getItem("data"))[JSON.parse(localStorage.getItem("data")).nowuser].clapsreceived
      }</a>
    </div>

      <form className="form" onSubmit={this.handleSubmit}>
      <h2>あなたの仲間の行動を紹介しよう</h2>
      <p>
      紹介する人<select name="to" onChange={this.handleChangeto} value={JSON.parse(localStorage.getItem("data"))[JSON.parse(localStorage.getItem("data")).nowuser].shokai.to}>
      <option value={this.giveOtherusers(JSON.parse(localStorage.getItem("data")).nowuser)[0]}>{this.giveOtherusers(JSON.parse(localStorage.getItem("data")).nowuser)[0]}</option>
      <option value={this.giveOtherusers(JSON.parse(localStorage.getItem("data")).nowuser)[1]}>{this.giveOtherusers(JSON.parse(localStorage.getItem("data")).nowuser)[1]}</option>
      </select>
      </p>

      <textarea onChange={this.handleChangetext} className="shokai" rows="4" cols="40" value={JSON.parse(localStorage.getItem("data"))[JSON.parse(localStorage.getItem("data")).nowuser].shokai.comment}>Hello</textarea>
      <br></br>
      <button className="button" value="submit" type="submit" name="登録" disabled={JSON.parse(localStorage.getItem("data"))[JSON.parse(localStorage.getItem("data")).nowuser].shokai.comment.length < 5}>紹介する</button>
      </form>

        {(JSON.parse(localStorage.getItem("data")).finaldata).map( (data, index)=> {
          return(
          <div className="comment">
          <img src={this.givePhoto(data.from)} className="icon"/>
          <p>
          To:
          {data.to}
          </p>
          <p>
          コメント:
          {data.comment}
          </p>
            <img src={clappinghands} id={"data" + index} className="clappinghands" onClick={ () => this.handleChangeclap(index)}></img>
            <p>{JSON.parse(localStorage.getItem("data")).finaldata[index].claps}</p>
        </div>
          ) 
        }
        )
        }
      </div>
    );
      }
  }

export default App;

