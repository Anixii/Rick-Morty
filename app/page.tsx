import Image from "next/image";
import icon from "./assets/img/rick.png";
import s from "./Charackters.module.css";
import CharactersInfo from "./components/Characters/CharactersInfo"; 
import Paginations from "./components/Characters/Pagination";
import { getCharacters } from "./utils/characterFunctions";

interface CharactersPageProps {
  searchParams?: {
    page: string;
    name: Charackter['name'];
    status: Charackter['status'];
    gender: Charackter['gender'];
    species: Charackter['species'];
    type: Charackter['type'];
  };
}

export const revalidate = 0;
export const dynamic = 'force-dynamic';

export default async function Home({searchParams}:CharactersPageProps) { 

  
  const page = (searchParams?.page ?? "1")
  const characters: TResponse<Charackter> = await getCharacters({params: {
    page
    },}) 
  return (
    <>
      <div className={s.characters__wrapper}>
        <div className={"container"}>
          <main className={s.characters}>
            <div className={s.characters__img}>
              <Image className={s.image} alt="Rick&Morty Icon" src={icon} />
            </div>
            <CharactersInfo characters={characters}/> 
            <Paginations page={+page} allPage={characters.info.pages}/>
          </main>
        </div>
      </div>
    </>
  );
}

// const getData = async () => {
//   const res = await fetch(`https://rickandmortyapi.com/api/character`, {
//     next: {
//       revalidate: 60,
//     },
//   });
//   if (!res.ok) {
//     // This will activate the closest `error.js` Error Boundary
//     throw new Error("Failed to fetch data");
//   }
//   return await res.json();
// }; 