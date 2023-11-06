import Image from "next/image";
import icon from "./assets/img/rick.png";
import s from "./Charackters.module.css";
import CharactersInfo from "./components/Characters/CharactersInfo"; 
import { getCharacters } from "./utils/characterFunctions";

// interface CharactersPageProps {
//   searchParams?: {
//     page: string;
//     name: Charackter['name'];
//     status: Charackter['status'];
//     gender: Charackter['gender'];
//     species: Charackter['species'];
//     type: Charackter['type'];
//   };
// }

export const revalidate = 0;
export const dynamic = 'force-dynamic';
export const generateMetadata = async() =>{ 
  return{ 
        title: 'Rick&Morty Characters'
    }
}
export default async function Home() {  
  const data = await getCharacters()
  return (
    <>
      <div className={s.characters__wrapper}>
        <div className={"container"}>
          <main className={s.characters}>
            <div className={s.characters__img}>
              <Image className={s.image} alt="Rick&Morty Icon" src={icon} />
            </div>
            <CharactersInfo characters={data}/> 
          </main>
        </div>
      </div>
    </>
  );
}
