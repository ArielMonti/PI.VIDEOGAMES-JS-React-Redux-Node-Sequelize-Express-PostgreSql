/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react'
import NavBar from '../NavBar/NavBar'
import SearchBar from '../SearchBar/SearchBar'
import { connect } from 'react-redux'
import Videogame from '../VideoGame/Videogame'
import Pagination from '../Pagination/Pagination'
import FilteredBy from '../FilterBy/FilterBy'
import './videogames.css'
import { getAllGames, getGenres } from '../../actions/actions'
import notFound from '../../img/llorando.gif'
import loading from '../../img/conecting.gif'

function Videogames({allGames, getAllGames, getGenres }) {

    const [currentPage, setCurrentPage] = useState(1)

    const [cardPerPage] = useState(15)

    //* indices de la paginación:
    const indexOfLastCard = currentPage * cardPerPage
    const indexOfFirstCard = indexOfLastCard - cardPerPage;
    //console.log(indexOfLastCard, indexOfFirstCard)

    var currentCards; //"cards" que se deben mostrar en la pantalla
    

    // en caso de que al buscar un juego en particular no encuentra ninguno
    if(typeof allGames === 'string'){
        currentCards = allGames
      
    }else {
        currentCards = allGames.slice(indexOfFirstCard, indexOfLastCard) //uso los indices para "fraccionar que juegos muestro"
      //  console.log(currentCards)
    }
    
    const paginate = (pageNumber) => {
         setCurrentPage(pageNumber)
    }
    //debería utilizar el useCallBack. Un hook que me permite gusrdar en memoria el resultado de una funcion
    //leer documentacio si hay tiempo para que funcione 100% perfecto
    useEffect (() => {
        getAllGames()
        getGenres()
    }, [getAllGames,getGenres])

    return (
      <div className="container">
        <NavBar />
        <SearchBar />
        <FilteredBy />
        <Pagination
          cardPerPage={cardPerPage}
          totalCards={allGames.length}
          paginate={paginate}
          currentPage={currentPage}
        />
        <div className="games-div">
          {currentCards.length >= 1 ? (
            currentCards.map((g) => (
              <Videogame
                key={g.id}
                name={g.name}
                rating={g.rating}
                genres={g.genres}
                image={g.background_image}
                id={g.id}
              />
            ))
          ) : typeof currentCards === "string" ? (
            <div>
              <img className="nonono" src={notFound} alt=""></img>
            </div>
          ) : (
            <div>
              <img className="loading" src={loading} alt=""></img>
            </div>
          )}
        </div>
        <Pagination
          cardPerPage={cardPerPage}
          totalCards={allGames.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
    );
}

const mapStateToProps = (state) => {
    return {
        allGames: state.filtered
    }
}

export default connect(mapStateToProps,{ getAllGames, getGenres }) (Videogames)
