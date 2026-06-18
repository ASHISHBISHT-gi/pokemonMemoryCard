import { useState , useEffect} from 'react';
// import './App.css';
function Header({score,bestscore}){
  return(
    <header>
    <h1>Memory Cards</h1>
    <div className="scoreboard"> 
     <h2>Score: <p className="score">{score}</p></h2>
     <h2>Bestscore: <p className="best">{bestscore}</p></h2>
    </div>
    </header>
  )
}
async function imageurl(name){
   let data = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`); 
   let result = await data.json();
   let  imgg= await result.sprites['front_default'];
   console.log("imgg is ",imgg);
   return imgg;
   
}

const shuffle = (string) => { 
    return string.map((a) => ({ sort: Math.random(), value: a }))
        .sort((a, b) => a.sort - b.sort)
        .map((a) => a.value); 
}; 

function Image({name , gameLogic}){
  const [url , setUrl] = useState(" ");
  // game_logic
  const handleClick = (event) => {
     // game over 
       gameLogic(name)
    
  };
  useEffect(()=>{
    async function loadimage(){
      setUrl(await imageurl(name));
    }
    loadimage();
  },[]);
    return(
    <div className="pokecards" onClick={handleClick}>
      {console.log("first")}
      <img src={url} alt={name} />
      {console.log("sec")}
    </div>
  )
}


function Mid({pokemons , gameLogic}){
  return(
    <div className="mid">
      {pokemons.map((pokemon,index)=>(
        <Image name={pokemon} key={pokemon} gameLogic={gameLogic}/>
      ))}
    </div>
  )
}

export default function App(){
  // current score and best score
  const [score , changeScore] = useState(0);
  const [bestscore , changebestScore] = useState(0);
  const [pokemons , setPokemons] = useState(['charizard','mewtwo','ditto','mew','charmander','bulbasaur','arceus','palkia','dialga','salamence','riolu','lucario','pikachu','raichu','zekrom','darkrai','kyurem','alakazam']);
  const [targets , setTargets] = useState(new Set());
  
  const gameLogic = (name) => {
            // game over
            if(targets.has(name)){
              if(bestscore < score){
                changebestScore(score)
           }
            changeScore(0)
            setPokemons(shuffle(pokemons));
            setTargets(new Set())
          }else{
          changeScore(score+1);
          setPokemons(shuffle(pokemons));
          const new_targets = new Set(targets);
          setTargets(new_targets.add(name))
    }
  }
  return(
      <main>
      <Header score={score} bestscore={bestscore} />
      <Mid pokemons={pokemons} gameLogic={gameLogic} />
      </main>
)
}
