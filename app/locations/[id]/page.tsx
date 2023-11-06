import React, { FC } from "react";
import s from '../../Charackters.module.css'
import Image from "next/image";
import Link from "next/link";
interface defineCharacterType {
  params: {
    id: string | number;
  };
}
async function getData(id: string | number) {
  const res = await fetch(`https://rickandmortyapi.com/api/location/${id}`, {
    next: {
      revalidate: 60,
    },
  });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  return await res.json();
}
export const generateMetadata = async({params}:any) =>{ 
  const post:TLocation = await getData(params.id)   
  return{ 
        title:post.name
    }
}
async function getAllCharacters(params: Array<string>) {
  const res = await fetch(`https://rickandmortyapi.com/api/character/${params}`, {
    next: {
      revalidate: 60,
    },
  }); 
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  return await res.json();
} 
export async function generateStaticParams() {
  const character: TResponse<Charackter> = await fetch(
    `https://rickandmortyapi.com/api/location/`
  ).then((res) => res.json());

  return character.results.map((post) => ({
    id: post.id.toString(),
  }));
}
const DefineCharacter: FC<defineCharacterType> = async ({ params }) => {
  const data: TLocation = await getData(params.id); 
  
  const filteredEpisode = data.residents
  const episodeIds = [];  
  for (const link of filteredEpisode) {
    const parts = link.split("/");
    const lastPart = parts[parts.length - 1];
    episodeIds.push(lastPart);
  }
  const episode = await getAllCharacters(episodeIds)  
  let episodeArray = [];
  if (Array.isArray(episode)) {
    episodeArray = episode
  } else if (typeof episode === 'object' && episode !== null) {
    episodeArray.push(episode)
  }   
  return (
      <>
        <div className={s.define__container}>
      <div className={'container'}>
          <div className={s.define__title}>{data.name}</div>
            <div className={s.define__info}>
                 <div className={s.define__text}>
                    <div className={s.define__parag}>Type</div>
                    <div className={s.define__subtitle}>{data.type}</div>
                 </div>
                 <div className={s.define__text}>
                    <div className={s.define__parag}>Dimension</div>
                    <div className={s.define__subtitle}>{data.dimension}</div>
                 </div>
            </div>
            <div className={s.define__subitem}>Residents</div>
          <div className={s.characters__list}>
          {episodeArray.map((item, index) => (
            <div key={index.toString() + item.id} className={s.character}>
              <Link href={`/character/${item.id}`}>
                <div className={s.character__img}>
                  <Image
                    width={200}
                    height={200}
                    alt={item.name}
                    src={item.image}
                  />
                </div>
                <div className={s.character__text}>
                  <div className={s.character__name}>{item.name}</div>
                  <div className={s.character__status}>
                    <div
                      className={s.character__indicator}
                      style={
                        item.status === "Alive"
                          ? { backgroundColor: "green" }
                          : item.status === "Dead"
                          ? { backgroundColor: "red" }
                          : { backgroundColor: "gray" }
                      }
                    ></div>
                    {item.status} - {item.species}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        </div>
      </div>
    </>
  );
};

export default DefineCharacter;