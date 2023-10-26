import Image from "next/image";
import styles from "./page.module.css";
import icon from "./assets/img/rick.png";
import s from "./Charackters.module.css";
import FilterByName from "./components/Characters/FilterByName";
import FilterBySpacies from "./components/Characters/FilterBySpacies";

const getData = async () => {
  const res = await fetch(`https://rickandmortyapi.com/api/character`, {
    next: {
      revalidate: 60,
    },
  });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  return await res.json();
};
export default async function Home() {
  const characters: TResponse<Charackter> = await getData();
  console.log(characters);

  return (
    <>
      <div className={s.characters__wrapper}>
        <div className={"container"}>
          <main className={s.characters}>
            <div className={s.characters__img}>
              <Image className={s.image} alt="Rick&Morty Icon" src={icon} />
            </div>
            <div className={s.characters__search}>
              <div className={s.characters__filter}>
                <FilterByName />
              </div>
              <div className={s.characters__filter}>
                <FilterBySpacies />
              </div>
              <div className={s.characters__filter}>
                <FilterBySpacies />
              </div>
              <div className={s.characters__filter}>
                <FilterBySpacies />
              </div>
            </div>

            <div className={s.characters__list}>
              {characters?.results.map((item: Charackter) => (
                <>
                  <div key={item.id} className={s.character}>
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
                        <div className={s.character__indicator} style={item.status === 'Alive' ? {backgroundColor: 'green'} : item.status === 'Dead' ? {backgroundColor:'red'} : {backgroundColor:'gray'}}></div>
                        {item.status} - {item.species}
                      </div>
                    </div>
                  </div>
                </>
              ))}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
