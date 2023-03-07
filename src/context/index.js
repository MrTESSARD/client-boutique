import React, { createContext, useMemo, useState } from "react"
export const Context = createContext()

const FiltersProvider=({children})=>{
    const categories =['Women', "Men", "Kids", "Accessories"]
    const filters = ["Top", "Bottom", "Jacket"];
    const [category, setCategory] = useState(categories[0].toLowerCase());
    const [filtersChecked, setFiltersChecked] = useState({
        Top:false, 
        Bottom:false, 
        Jacket: false
    });
    const updateCategory = value => setCategory(value.toLowerCase())

    const updateFilters = (e) =>
    setFiltersChecked((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.checked,
    }));

  const filtersKeys = () => {//retourner tableau avec des valeurs qui sont uniquement en true
    return Object.entries(filtersChecked)
      .map(([key, value]) => value && key)
      .filter((obj) => !!obj);
  };
    // console.log(filtersChecked)
    const value = useMemo(()=>{
        return{
            categories,
            category,
            filters,
            updateCategory,
            updateFilters,
            filtersChecked: filtersKeys(),
        }
    },[category, filtersChecked]);
        return <Context.Provider value={value}>{children}</Context.Provider>
}

export const withContext=Component=>()=>{
    return (
    <Context.Consumer>{

        (value)=><Component value={value}/>

        }</Context.Consumer>)
}     //HEC composent d'ordre supperieur


export default FiltersProvider
