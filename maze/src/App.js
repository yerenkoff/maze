import './App.css';
import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuClass: "menu",
      boyStyle: {
        left: 192,
        top: 100,
      },
      keyPressed: false,
      key: null,
      canvas: "",
      ctx: '',
    }
    this.animation = this.animation.bind(this);
  }

  animation() {
    // console.log(12);
    // setTimeout(this.animation(), 1000)
    if (this.state.keyPressed) {
      let boy = document.getElementById("boy")
      let ctx = this.state.ctx;
      // console.log(ctx.getImageData(boy.getBoundingClientRect().right,0,1,1));

      this.setState((state) => {
        // console.log(state.key);
        
        let xMovement = 0
        let yMovement = 0
        console.log(state.key);
        switch (state.key) {
          case 37:
            xMovement = -2
            // console.log(xMovement);
            break;
          case 38:
            yMovement = -1
            // console.log(state.key, xMovement);
            break;
          case 39:
            // x = boy.getBoundingClientRect().right
            xMovement = 2
            break;
          case 40:
            // y = boy.getBoundingClientRect().bottom
            yMovement = 1
            break;
        }
        let boyStyle = state.boyStyle;
        boyStyle.left = boyStyle.left + xMovement
        let x = boyStyle.left + boy.offsetWidth / 2
        let y = boyStyle.top + boy.offsetHeight / 2
        console.log(x);
        console.log(ctx.getImageData(x, y, 1, 1).data);
        if (ctx.getImageData(x, y, 1, 1).data[3] > 0) {
          boyStyle.left = boyStyle.left - xMovement * 3
          console.log("BLACK");
        }
        
        return {
          boyStyle: boyStyle,
        }
      }, function () {
        // console.log(this.state.boyStyle);
      })
    }
  }

  componentDidMount() {
    // let timeoutId;

    // ctx.fillStyle = "#FF0000";
    // ctx.fillRect(0, 0, 150, 75);
    document.onkeydown = (event) => {

      this.setState({
        keyPressed: true,
        key: event.keyCode,
      })
    }
    document.onkeyup = (event) => {
      this.setState({
        keyPressed: false,
      })
    }
    setInterval(this.animation, 100);
    // this.animation();
    // window.requestAnimationFrame(this.animation());
  }

  startGame() {
    this.setState({
      menuClass: "menuHidden",

    })
  }

  imageLoaded() {
    var canvas = document.getElementsByTagName("canvas")[0];
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    var ctx = canvas.getContext("2d");
    this.setState({
      canvas: canvas,
      ctx: ctx,
    })
    var img = document.getElementById("scream");
    ctx.drawImage(img, (window.innerWidth - window.innerHeight) / 2, 0);
  }

  render() {
    const boyStyle = {
      left: this.state.boyStyle.left + "px",
      top: this.state.boyStyle.top + "px",
    }
    return (
      <div>
        <form action="" className={this.state.menuClass}>
          <div>
            <h1>Old House</h1>
          </div>
          <img src="boy.png" alt="" />
          <div className="wheel">
            <img src="arrow.png" alt="" />
          </div>
          <img src="ghost.png" alt="" />
          <button type='button' onClick={() => this.startGame()}>Start!</button>
        </form>
        <form action="" className='game'>
          <img style={boyStyle} src="boy.png" alt="" id="boy" />
          <div className="maze">
            <canvas>
              Your browser does not support the HTML5 canvas tag.
            </canvas>
            <img onLoad={() => this.imageLoaded()} src="kidmaze-01.svg" alt="" id="scream" />
          </div>
        </form>
      </div>
    )
  }
}

export default App;

