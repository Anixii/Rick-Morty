"use client";
import s from "../../episodes/Episode.module.css";
import React, { FC, useState } from "react";
import FilterByName from "../Characters/FilterByName";
import { getFilteredEpisode } from "@/app/utils/characterFunctions";
import NoData from "../Characters/NoData";
import Link from "next/link";
import Paginations from "../Pagination";
interface EpisodeInfoType {
  episodes: TResponse<Episode>;
}
const EpisodeInfo: FC<EpisodeInfoType> = ({ episodes }) => {
  const [episode, setEpisode] = useState(episodes)
  const [filteredEpisode, setFilteredEpisode] = useState<Array<Episode>>(episodes.results);
  const [currentPage, setCurrentPage] = useState(1) 
  const onHandleChange = async (e: any) => {  
    const newEpisode = episode.results.filter((c) =>
      c.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredEpisode(newEpisode) 
  }
  const onHandlePageChange = async (e:number) =>{ 
    setCurrentPage(e) 
    let filteredData = await getFilteredEpisode(e); 
    setFilteredEpisode(filteredData.results) 
    setEpisode(filteredData)
    window.scrollTo(0, 0)
  } 
  
  return (
    <>
        <div className={s.episode__search}>
          <div className={s.episode__filter}>
            <FilterByName
              placeholder="Filter by name"
              onHandleChange={onHandleChange}
            />
          </div>
      </div>
      {filteredEpisode.length === 0 ? (
        <NoData />
      ) : (
        <div className={s.episode__list}>
          {filteredEpisode?.map((item, index) => (
            <Link
              className={s.episode__card}
              key={index}
              href={`/episodes/${item.id}`}
            >
                <div className={s.card__title}>{item.name}</div>
                <div className={s.card__subtitle}>{item.episode}</div>
              <div className={s.card__date}>{item.air_date}</div>
            </Link>
          ))}
        </div>
      )} 
      <Paginations allPage={episode.info.pages} onHandleChange={onHandlePageChange}page={currentPage }/>
    </>
  );
};

export default EpisodeInfo;
