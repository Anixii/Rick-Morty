import React, { FC } from "react";
import s from "./defineCharacter.module.css";
import Image from "next/image";
import Link from "next/link";
import { getLastEnpoint } from "@/app/utils/characterFunctions";
interface defineCharacterType {
  params: {
    id: string | number;
  };
}
async function getData(id: string | number) {
  const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`, {
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
async function getCharacterEpisode(params: Array<string>) {
  const res = await fetch(`https://rickandmortyapi.com/api/episode/${params}`, {
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
    `https://rickandmortyapi.com/api/character/`
  ).then((res) => res.json());

  return character.results.map((post) => ({
    id: post.id.toString(),
  }));
}
const DefineCharacter: FC<defineCharacterType> = async ({ params }) => {
  const data: Charackter = await getData(params.id);
  const filteredEpisode = data.episode.slice(0, 4);
  const episodeIds = [];  
  for (const link of filteredEpisode) {
    const parts = link.split("/");
    const lastPart = parts[parts.length - 1];
    episodeIds.push(lastPart);
  }
  const episode = await getCharacterEpisode(episodeIds)  
  let episodeArray = [];
  if (Array.isArray(episode)) {
    episodeArray = episode
  } else if (typeof episode === 'object' && episode !== null) {
    episodeArray.push(episode)
  } 
  
  return (
    <>
      <div className={s.define}>
        <div className={s.define__container}>
          <div className={s.define__image}>
            <Image width={300} height={300} src={data.image} alt={data.name} />
          </div>
          <div className={s.define__name}>{data.name}</div>
          <div className={s.define__info}>
            <div className={s.info}>
              <div className={s.info__title}>Informations</div>
              <div className={s.info__item}>
                <div className={s.info__row}>
                  <div className={s.row__title}>Gender</div>
                  <div className={s.row__subtitle}>{data.gender}</div>
                </div>
                <div className={s.info__row}>
                  <div className={s.row__title}>Specie</div>
                  <div className={s.row__subtitle}>{data.species}</div>
                </div>
                <div className={s.info__row}>
                  <div className={s.row__title}>Type</div>
                  <div className={s.row__subtitle}>{data.type === '' ? 'Unknown' : data.type.toLocaleLowerCase()}</div>
                </div>
                <div className={s.info__row}>
                  <div className={s.row__title}>Origin</div>
                  <div className={s.row__subtitle}>{data.origin.name}</div>
                </div>

                <Link href={`/locations/${getLastEnpoint(data.location.url)}`} className={s.info__row_arrow}>
                  <div className={s.arrow__text}>
                    <div className={s.row__title}>Location</div>
                    <div className={s.row__subtitle}>{data.location.name}</div>
                  </div>
                  <div className={s.arrow}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M9.99997 6L8.58997 7.41L13.17 12L8.58997 16.59L9.99997 18L16 12L9.99997 6Z"
                        fill="#8E8E93"
                      />
                    </svg>
                  </div>
                </Link>
              </div>
            </div>
            <div className={s.info}>
              <div className={s.info__title}>Episodes</div>
              <div className={s.info__item}>
                {episodeArray.map((item: Episode, index: number) => (
                  <Link key={index} href={`/episodes/${item.id}`}> 
                  <div  className={s.info__row_arrow}> 
                    <div className={s.arrow__text}>
                      <div className={s.row__title}>{item.episode}</div>
                      <div className={s.row__subtitle}>{item.air_date}</div>
                      <div className={s.row__date}>{item.air_date}</div>
                    </div>
                    <div className={s.arrow}><svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M9.99997 6L8.58997 7.41L13.17 12L8.58997 16.59L9.99997 18L16 12L9.99997 6Z"
                        fill="#8E8E93"
                        />
                    </svg></div>
                  </div>
                </Link>
                ))}
              </div>
            </div>
            </div>
            </div>
            </div>
            </>
            );
          };
          
export default DefineCharacter;
