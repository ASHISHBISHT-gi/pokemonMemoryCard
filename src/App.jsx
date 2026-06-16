import { useState , useEffect} from 'react';

function Header({score,bestscore}){
  return(
    <div>
      header 
      {score}
      {bestscore}
      iron man is tony stark
    </div>
  )
}
async function imageurl(name){
   let data = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`); 
   let result = await data.json();
   let  imgg= await result.sprites['front_default'];
   return imgg;
   
}

function Image({name}){
  const [url,setUrl] = useState(name);  
  useEffect(()=>{
    async function loadimage(){
      setUrl(await imageurl(name));
    }
    loadimage();
  },[]);
    return(
    <div>
      {console.log("first")}
      <p>i am iron man</p>
      <img src={url} alt="mewtwo" />
      {console.log("sec")}
    </div>
  )
}

const pokemons=['charizard','mewtwo','ditto','mew','charmelon','bulbasaur','arceus','palkia','dialga','giratina','riolu','lucario','pickachu','raichu','zekrom','regiice','kyurem'];

function Mid(){
  return(
    <div>
       <Image name="mewtwo"></Image>
    </div>
  )
}

export default function App(){
  // current score and best score
  const [score , changeScore] = useState(0);
  const [bestscore , changebestScore] = useState(0);
  return(
      <main>
      <Header score={score} bestscore={bestscore} />
      <Mid />
      </main>
)
}
