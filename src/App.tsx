import './App.css';
import { useEffect } from 'react';
import playeremoji from './images/Playeremoji.png'
import botemoji from './images/Botemoji.png'

function App() {
  const c = (cl: any) => document.querySelector(cl)!

              // PLAYER  BOT   EMPATE
  let endGame = [false, false, false]

  let XorOStartgGame = ''
  let optionsXorO = ['X', 'O']
  let saveXorO:string = ''

  let score = [0, 0]

  let bestPlaysBot = ['.pos1', '.pos3', '.pos5', '.pos7', '.pos9']
  let placesToPlay = ['.pos1', '.pos2', '.pos3', '.pos4', '.pos5', '.pos6', '.pos7', '.pos8', '.pos9']
  let waysToWin = [['.pos1', '.pos2', '.pos3'], ['.pos4', '.pos5', '.pos6'], ['.pos7', '.pos8', '.pos9'], ['.pos1', '.pos4', '.pos7'], ['.pos2', '.pos5', '.pos8'], ['.pos3', '.pos6', '.pos9'], ['.pos1', '.pos5', '.pos9'], ['.pos3', '.pos5', '.pos7']]

  saveXorO = optionsXorO[Math.floor(Math.random() * optionsXorO .length)]
  XorOStartgGame = saveXorO
  
  const clicar = (e:any) => {
    if( c(`${e}`).innerHTML === '' ) {
      if( saveXorO === 'X' ) {
        placesToPlay.splice( placesToPlay.indexOf(e), 1 ) 
        bestPlaysBot.splice( bestPlaysBot.indexOf(e), 1 )
        for( let i in waysToWin ) {
          for( let k in waysToWin ) {
            if( e === waysToWin[i][k] ) {
              waysToWin[i][k] = 'player'
            }
          }
        }
  
        c(`${e}`).style.color = 'blue'; c(`${e}`).innerHTML = saveXorO
        saveXorO = 'O'
  
        buttonTurn()
        Vence()
        BotTurn()
      }
    }
  }

  const BotTurn = () => {
    if( placesToPlay.length > 0 && endGame[0] === false && endGame[1] === false && endGame[2] === false ) {
      if( saveXorO === 'O' ) {
        setTimeout(() => {
          botAttack()
          saveXorO = 'X'
          buttonTurn()
          Vence()
        }, 1000)
      }
    }
  }

  let checkBotAtack = false
  let saveAtackorDefense:any = [[], []]
  const botAttack = () => {
    for( let i in waysToWin ) {
      let playerVence = [0,0]
      let botVence = [0,0]
      for( let k in waysToWin[i] ) {
        if( waysToWin[i][k] !== 'bot' ) {
          playerVence[0] ++
          if( playerVence[0] === 3 ) {
            for( let t in waysToWin[i] ) {
              if( waysToWin[i][t] === 'player' ) {
                playerVence[1] ++
              }
            }
          }
        }

        if( waysToWin[i][k] !== 'player' ) {
          botVence[0] ++
          if( botVence[0] === 3 ) {
            for( let t in waysToWin[i] ) {
              if( waysToWin[i][t] === 'bot' ) {
                botVence[1] ++
              }
            }
          }
        }
      }
      
      if( botVence[1] === 2 ) {
        saveAtackorDefense[0] = waysToWin[i]
      } 
      
      if( playerVence[1] === 2 ) {
        saveAtackorDefense[1] = waysToWin[i]
      }
    }

    //PARA BOT VENCER
    if( saveAtackorDefense[0].length > 0 ) {
      for( let k in saveAtackorDefense[0] ) {
        if( saveAtackorDefense[0][k] !== 'bot' ) {
          c(saveAtackorDefense[0][k]).style.color = 'orangered'; c(saveAtackorDefense[0][k]).innerHTML = 'O'
          placesToPlayUpdateBot( saveAtackorDefense[0][k] )
          checkBotAtack = true
        }
      }
      saveAtackorDefense = [[],[]]
    }//PARA BOT VENCER FINAL

    //PARA BOT SE DEFENDER
    if( saveAtackorDefense[0].length === 0 && saveAtackorDefense[1].length > 0 ) {
      for( let k in saveAtackorDefense[1] ) {
        if( saveAtackorDefense[1][k] !== 'player' ) {
          c(saveAtackorDefense[1][k]).style.color = 'orangered'; c(saveAtackorDefense[1][k]).innerHTML = 'O'
          placesToPlayUpdateBot( saveAtackorDefense[1][k] )
          checkBotAtack = true
        } 
      }
      saveAtackorDefense = [[],[]]
    }//PARA BOT SE DEFENDER FINAL

    if( checkBotAtack === false && bestPlaysBot.length > 0 ) {
      let choosePlace = Math.floor(Math.random() * bestPlaysBot.length)
      c(`${bestPlaysBot[choosePlace]}`).style.color = 'orangered'; c(`${bestPlaysBot[choosePlace]}`).innerHTML = saveXorO

      placesToPlayUpdateBot( bestPlaysBot[choosePlace] )
      checkBotAtack = true
      }

      if( checkBotAtack === false && bestPlaysBot.length === 0 ) {
        let selectPlace:any = Math.floor(Math.random() * placesToPlay.length)
        c(`${placesToPlay[selectPlace]}`).style.color = 'orangered'; c(`${placesToPlay[selectPlace]}`).innerHTML = saveXorO

        placesToPlayUpdateBot( placesToPlay[selectPlace] )
      }

    checkBotAtack = false
  }

  const placesToPlayUpdateBot = (e:any) => {
    for( let i in waysToWin ) {
      for( let k in waysToWin ) {
        if( e === waysToWin[i][k] ) {
          waysToWin[i][k] = 'bot'
        }
      }
    }
    placesToPlay.splice( placesToPlay.indexOf( e ), 1 )
    if( bestPlaysBot.length > 0 ) bestPlaysBot.splice( bestPlaysBot.indexOf( e ), 1 )
  }

  const buttonTurn = () => {
    if( saveXorO === 'X' ) {
      c('.xo').style.width = '90px'
      c('.xo').style.height = '90px'
      c('.xo').style.borderBottom = '5px solid white'

      c('.xo1').style.width = '80px'
      c('.xo1').style.height = '80px'
      c('.xo1').style.borderBottom = '0px'
    } else if( saveXorO === 'O' ) {
      c('.xo1').style.width = '90px'
      c('.xo1').style.height = '90px'
      c('.xo1').style.borderBottom = '5px solid white'

      c('.xo').style.width = '80px'
      c('.xo').style.height = '80px'
      c('.xo').style.borderBottom = '0px'
    }
  }

  const Vence = () => {
    for( let i in waysToWin ) {
      let playerVence = 0
      let botVence = 0
      for( let k in waysToWin[i] ) {
        if( waysToWin[i][k] === 'player' ) {
          playerVence ++
        } else if( waysToWin[i][k] === 'bot' ) {
          botVence ++
        }
      }

      if( playerVence === 3 ) {
        endGame[0] = true
      } else if( botVence === 3 ) {
        endGame[1] = true
      }
    }

    if( endGame[0] === true ) {
      setTimeout(() => {
        c('.venceu').innerHTML = 'Player venceu!'
        c('.venceu').style.display = 'flex'
        score[0] ++
        c('.player').innerHTML = score[0]
      }, 50)
    } else if( endGame[1] === true ) {
      setTimeout(() => {
        c('.venceu').innerHTML = 'Bot venceu!'
        c('.venceu').style.display = 'flex'
        score[1] ++
        c('.smartBot').innerHTML = score[1]
      }, 50)
    } else if( endGame[0] === false && endGame[1] === false && placesToPlay.length === 0 ) {
      endGame[2] = true
      setTimeout(() => {
        c('.venceu').innerHTML = 'Deu empate!'
        c('.venceu').style.display = 'flex'
      }, 50)
    }
  }

  const rec = () => {
    bestPlaysBot = ['.pos1', '.pos3', '.pos5', '.pos7', '.pos9']
    placesToPlay = ['.pos1', '.pos2', '.pos3', '.pos4', '.pos5', '.pos6', '.pos7', '.pos8', '.pos9']
    waysToWin = [['.pos1', '.pos2', '.pos3'], ['.pos4', '.pos5', '.pos6'], ['.pos7', '.pos8', '.pos9'], ['.pos1', '.pos4', '.pos7'], ['.pos2', '.pos5', '.pos8'], ['.pos3', '.pos6', '.pos9'], ['.pos1', '.pos5', '.pos9'], ['.pos3', '.pos5', '.pos7']]
    endGame = [false, false, false]

    checkBotAtack = false
    saveAtackorDefense = [[], []]

    for( let i in placesToPlay ) {
      c(placesToPlay[i]).innerHTML = ''
    }

    c('.venceu').innerHTML = ''

    window.innerWidth <= 480 ? c('.venceu').style.display = 'none' : c('.venceu').style.display = 'flex'

    XorOStartgGame === 'X' ? XorOStartgGame = 'O' : XorOStartgGame = 'X'
    saveXorO = XorOStartgGame
    buttonTurn()
    BotTurn()
  }

  useEffect(() => {
    BotTurn()
    buttonTurn()
  }, [])

  return (
    <div className="App">
      <div className="mainScore">
        <img className='emojiPlayer' src={playeremoji}/>
        <div className="player">0</div>
        <div className="score">PLACAR</div>
        <img className='emojiBot' src={botemoji}/>
        <div className="smartBot">0</div>
      </div>
      <div className="title">JOGO DA VELHA</div>
      <button className="rec" onClick={() =>rec()}>JOGAR NOVAMENTE</button>
      <div className="container">
          <div className="pos1" onClick={() => clicar('.pos1')}></div>
          <div className="pos2" onClick={() => clicar('.pos2')}></div>
          <div className="pos3" onClick={() => clicar('.pos3')}></div>
          <div className="pos4" onClick={() =>clicar('.pos4')}></div>
          <div className="pos5" onClick={() =>clicar('.pos5')}></div>
          <div className="pos6" onClick={() =>clicar('.pos6')}></div>
          <div className="pos7" onClick={() =>clicar('.pos7')}></div>
          <div className="pos8" onClick={() =>clicar('.pos8')}></div>
          <div className="pos9" onClick={() =>clicar('.pos9')}></div>
      </div>
      <div className="choose">
          <div className="xo">X</div>
          <div className="xo1">O</div>
      </div>
      <div className="venceu"></div>
    </div>
  );
}

export default App;
