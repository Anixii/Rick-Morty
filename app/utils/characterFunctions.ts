export const getCharacters = async (param:CharackterParamsFilter) =>{ 
    // const term = filter.term
    //     const friend = filter.friend
    //     console.log(filter);
    
    //     let urlQuery =
    //        (term === '' ? '' : `&term=${term}`)
    //        + (friend === null ? '' : `&friend=${friend}`)
    //        + (currentPage === 1 ? '' : `&page=${currentPage}`)
    // const filteringTerms = 
    //   (param.params.page === 0 ? '' : 'page=' + param.params.page  ) 
    console.log(param.params.page);
    
    const res = await fetch(`https://rickandmortyapi.com/api/character/?page=${param.params.page}`, {
      next: {
        revalidate: 0,
      }, 
       
    });
    
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error("Failed to fetch data");
    } 
    const data = await res.json() 
    
    return data
  } 