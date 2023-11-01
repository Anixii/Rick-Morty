import Image from "next/image";
import { getEpisodes} from "../utils/characterFunctions";
import episodeIcon from '../assets/img/episode.png'
import s from './Episode.module.css'
import EpisodeInfo from "../components/Episode/EpisodeInfo";
export const revalidate = 0;
export const dynamic = 'force-dynamic';
export default async function Home() {  
  let data:TResponse<Episode> = await getEpisodes() 

  return (
    <>
      <div className={s.episode__wrapper}>
        <div className={"container"}>
          <main className={s.episodes}>
            <div className={s.episode__img}>
              <Image className={s.image} alt="Rick&Morty Icon" src={episodeIcon} />
            </div>
          <EpisodeInfo episodes={data}/>
          </main>
        </div>
      </div>
    </>
  );
}