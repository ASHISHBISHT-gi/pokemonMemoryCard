import { useState , useEffect} from 'react';
// import './App.css';
function Header({score,bestscore}){
  return(
    <header>
    <h2>Memory Cards</h2>
    <div className="scoreboard"> 
     <h3>Score: {score}</h3>
     <h3>Bestscore: {bestscore}</h3>
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

function Image({name}){
  const [url,setUrl] = useState(" ");  
  useEffect(()=>{
    async function loadimage(){
      setUrl(await imageurl(name));
    }
    loadimage();
  },[]);
    return(
    <div className="pokecards">
      {console.log("first")}
      <img src={url} alt={name} />
      {console.log("sec")}
    </div>
  )
}


function Mid({pokemons}){
  return(
    <div className="mid">
      {pokemons.map((pokemon,index)=>(
        <Image name={pokemon} key={pokemon} />
      ))}
    </div>
  )
}

export default function App(){
  // current score and best score
  const [score , changeScore] = useState(0);
  const [bestscore , changebestScore] = useState(0);
  const [pokemons , setPokemons]=useState(['charizard','mewtwo','ditto','mew','charmander','bulbasaur','arceus','palkia','dialga','salamence','riolu','lucario','pikachu','raichu','zekrom','darkrai','kyurem','alakazam']);
  
  return(
      <main>
      <Header score={score} bestscore={bestscore} />
      <Mid pokemons={pokemons} />
      </main>
)
}
