"use client";
import Image from "next/image";
import React, { FC, useState } from "react";
import Filter from "./FilterBySpacies";
import FilterByName from "./FilterByName";
import s from "../../Charackters.module.css";
import {
  genderOptions,
  spaciesOption,
  statusOptions,
} from "../../utils/options";
import Paginations from "../Pagination";
import { getFilteredCharaters } from "@/app/utils/characterFunctions";
import NoData from "./NoData";
import Link from "next/link";
type CharactersInfoType = {
  characters: TResponse<Charackter>;
};
const CharactersInfo: FC<CharactersInfoType> = ({ characters }) => {
  const [character, setCharacter] = useState<Array<Charackter>>(
    characters.results
  );
  const [filteredCharacter, setFilteredCharacter] = useState<Array<Charackter>>(
    characters.results
  );
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [nameValue, setNameValue] = useState<string>("");
  const [gender, setGender] = useState<string>("Gender");
  const [spacies, setSpacies] = useState<string>("Species");
  const [status, setStatus] = useState<string>("Status");
  const [allPage, setAllPage] = useState(characters.info.pages);
  const onHandleChange = async (e: number) => {
    setCurrentPage(e);
    const data = await getFilteredCharaters(
      e.toString(),
      status,
      spacies,
      gender,
      nameValue
    );
    setFilteredCharacter(data.results);
    setCharacter(data.results);
    setAllPage(data.info.pages);
    window.scrollTo(0, 0);
  };
  const onHandleFilterByName = (e: any) => {
    const newCharakters = character.filter((c) =>
      c.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setNameValue(e.target.value);
    setFilteredCharacter(newCharakters);
  };

  const onHandleSelectChangeSpecias = async (label: string) => {
    setSpacies(label);
    const data = await getFilteredCharaters(
      "1",
      status,
      label,
      gender,
      nameValue
    );
    setFilteredCharacter(data.results);
    setCharacter(data.results);
    setAllPage(data.info.pages);
    setCurrentPage(1);
  };
  const onHandleSelectChangeGender = async (label: string) => {
    setGender(label);
    const data = await getFilteredCharaters(
      "1",
      status,
      spacies,
      label,
      nameValue
    );
    setFilteredCharacter(data.results);
    setCharacter(data.results);
    setCurrentPage(1);

    setAllPage(data.info.pages);
  };
  const onHandleSelectChangeStatus = async (label: string) => {
    setStatus(label);
    const data = await getFilteredCharaters(
      "1",
      label,
      spacies,
      gender,
      nameValue
    );
    setFilteredCharacter(data.results);
    setCharacter(data.results);
    setCurrentPage(1);
    setAllPage(data.info.pages);
  };
  return (
    <>
      <div className={s.characters__search}>
        <div className={s.characters__filter}>
          <FilterByName
            placeholder="Filter by name..."
            onHandleChange={onHandleFilterByName}
          />
        </div>
        <div className={s.characters__filter}>
          <Filter
            key={spacies}
            onSelectChange={onHandleSelectChangeSpecias}
            value={spacies}
            defaultValue="Spacies"
            options={spaciesOption}
          />
        </div>
        <div className={s.characters__filter}>
          <Filter
            key={gender}
            onSelectChange={onHandleSelectChangeGender}
            value={gender}
            defaultValue="Gender"
            options={genderOptions}
          />
        </div>
        <div className={s.characters__filter}>
          <Filter
            key={status}
            onSelectChange={onHandleSelectChangeStatus}
            value={status}
            defaultValue="Status"
            options={statusOptions}
          />
        </div>
      </div>

      {filteredCharacter === undefined || filteredCharacter.length === 0 ? (
        <NoData />
      ) : (
        <div className={s.characters__list}>
          {filteredCharacter?.map((item, index) => (
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
      )}

      <Paginations
        onHandleChange={onHandleChange}
        page={currentPage}
        allPage={allPage}
      />
    </>
  );
};

export default CharactersInfo;
