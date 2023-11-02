"use client";
import React, { useState } from "react";
import FilterByName from "../Characters/FilterByName";
import s from "../../episodes/Episode.module.css";
import Link from "next/link";
import Paginations from "../Pagination";
import NoData from "../Characters/NoData";
import { getFilteredLocations } from "@/app/utils/characterFunctions";
interface LocationInfoType {
  locations: TResponse<TLocation>;
}
const LocationInfo: React.FC<LocationInfoType> = ({ locations }) => { 
    const [location, setLocation] = useState(locations)
  const [filteredLocations, setFilteredLocations] =
    useState<Array<TLocation>>(locations.results);
  const [currentPage, setCurrentPage] = useState(1); 
  const onHandleChange = async (e: any) => {  
    const newEpisode = location.results.filter((c) =>
      c.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredLocations(newEpisode) 
  }
  const onHandlePageChange = async (e:number) =>{ 
    setCurrentPage(e) 
    let filteredData = await getFilteredLocations(e); 
    setFilteredLocations(filteredData.results) 
    setLocation(filteredData)
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
      {filteredLocations.length === 0 ? (
        <NoData />
      ) : (
        <div className={s.episode__list}>
          {filteredLocations.map((item, index) => (
            <Link
              className={s.episode__card}
              key={index}
              href={`/locations/${item.id}`}
            >
              <div className={s.card__title}>{item.name}</div>
              <div className={s.card__subtitle}>{item.type}</div>
              <div className={s.card__date}>{item.dimension}</div>
            </Link>
          ))}
        </div>
      )}
      <Paginations
        allPage={locations.info.pages}
        onHandleChange={onHandlePageChange}
        page={currentPage}
      />
    </>
  );
};

export default LocationInfo;
