import React, { FC } from "react";
import icon from "../assets/img/404.webp";
import s from "./Location.module.css";
import Image from "next/image";
import { getLocations } from "../utils/characterFunctions";
import LocationInfo from "../components/Locations/LocationInfo";
const Locations: FC = async () => {
  const data = await getLocations();
  return (
    <>
      <div className={s.locations__wrapper}>
        <div className={"container"}>
          <main className={s.locations}>
            <div className={s.locations__img}>
              <Image className={s.image} alt="Rick&Morty Icon" src={icon} />
            </div> 
            <LocationInfo locations={data}/>
          </main>
        </div>
      </div>
    </>
  );
};

export default Locations;
