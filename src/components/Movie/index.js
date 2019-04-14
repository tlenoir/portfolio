import React, { Component, useState, useEffect, useReducer } from 'react';
import * as URLS from '../../constants/urls';
import ReactPaginate from 'react-paginate';
import './movie.css';
import './movie.scss';
import { Modal } from 'react-overlays';

export default class MovieComponent extends Component {
  render() {
    return (
      <div>
        {/* <Switch>
        <Route exact={ROUTES.MOVIE} path={ROUTES.MOVIE} component={MovieRequest} />
        <Route path={ROUTES.MOVIEDETAILS} component={MovieDetails} />
      </Switch> */}
        <MovieRequest />
      </div>
    )
  }
}

const backdropStyle = (bgcolor) => {
  return {
    position: 'fixed',
    zIndex: 1040,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: bgcolor,
    opacity: 0.5
  }
};

const modalStyle = function () {
  // we use some psuedo random coords so nested modals
  // don't sit right on top of each other.
  let top = 50;
  let left = 50;

  return {
    position: 'fixed',
    width: 400,
    zIndex: 1040,
    top: top + '%',
    left: left + '%',
    transform: `translate(-${left}%, -${top}%)`,
    border: '1px solid #e5e5e5',
    backgroundColor: 'white',
    boxShadow: '0 5px 15px rgba(0,0,0,.5)',
    padding: 20
  };
};

const delay = (time = 1500) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

const initialState = { mode: URLS.POPULAR };

function MovieRequest() {
  function ModalExample(data) {
    console.log("modalexample");
    const renderBackdrop = () => {
      return <div style={backdropStyle('#A52A2A')} />;
    };
    const closeModal = () => {
      setModal(false)
    }
    return (
      <div className="modal-example">
        <Modal
          onHide={closeModal}
          style={modalStyle()}
          aria-labelledby="modal-label"
          show={showModalComponent}
          renderBackdrop={renderBackdrop}
        >
          <div>
            <h4 id="modal-label">{data.title}</h4>
            <p>
              {data.overview}
            </p>
          </div>
        </Modal>
      </div>
    );
  }
  function reducer(state, action) {
    console.log("reducer")
    switch (action.type) {
      case 'Popularity':
        return { mode: URLS.POPULAR };
      case 'Top Rated':
        return { mode: URLS.TOPRATED };
      case 'Upcoming':
        return { mode: URLS.UPCOMING };
      default:
        throw state;
    }
  }
  const [state, dispatch] = useReducer(reducer, initialState)
  const OrderbyItem = {
    popular: 'Popularity',
    topRated: 'Top Rated',
    upcoming: 'Upcoming'
  }
  const [movieList, setMovList] = useState({
    currentPage: 1,
    pages: 0,
    results: [],
    backdrop_paths: [],
    item: 'Popularity'
  })
  const url_poster = 'https://image.tmdb.org/t/p/original'
  const [loading, setLoading] = useState(false)
  const [showModalComponent, setModal] = useState(false)

  useEffect(() => {
    fetch(`${state.mode}&page=${movieList.currentPage}`)
      .then((response) => {
        return response.json();
      })
      .then(response => {
        const results = response.results
          .filter(res => res.poster_path != null && res.backdrop_path != null)
          .map(res => {
            return {
              title: res.title,
              id: res.id,
              src: `${url_poster}${res.poster_path}`,
              overview: res.overview,
              vote: res.vote_average,
              backdrop: `${url_poster}${res.backdrop_path}`
            }
          })
        const cover = response.results
          .filter(res => res.poster_path != null && res.backdrop_path != null)
          .map(res => {
            return {
              title: res.title,
              src: `${url_poster}${res.backdrop_path}`,
              caption: res.vote_average
            }
          })
        const pages = response.total_pages

        return { results, pages, cover }
      })
      .then(data => {
        setMovList({
          ...movieList,
          backdrop_paths: data.cover,
          results: data.results,
          pages: data.pages
        })
      });
  }, [movieList.item, movieList.currentPage]);
  const switchOrder = async e => {
    dispatch({ type: e });
    setMovList({
      ...movieList,
      currentPage: 1,
      pages: 0,
      results: [],
      item: e
    });
    setLoading(true);
    await delay();
    setLoading(false);
  };
  const handlePageClick = async data => {
    setMovList({
      ...movieList,
      currentPage: data.selected + 1,
    });
    setLoading(true);
    await delay();
    setLoading(false);
  };
  const openModal = (data) => {
    ModalExample(data)
  };
  return (
    <>
      <nav className="d-flex justify-content-center" aria-label="Page navigation example">
        <div className="dropdown p-2">
          {/* eslint-disable-next-line */}
          <a className="btn btn-secondary dropdown-toggle" href="#" role="button"
            id="dropdownMenuLink" data-toggle="dropdown"
            aria-haspopup="true" aria-expanded="false">
            Order by {movieList.item}
          </a>

          <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
            {Object.values(OrderbyItem).map(item => (
              // eslint-disable-next-line
              <a className="dropdown-item" href="#" onClick={() => switchOrder(item)}>
                {item}
              </a>
            ))}
          </div>
        </div>
        <ReactPaginate
          previousLabel={'previous'}
          nextLabel={'next'}
          breakLabel={'...'}
          pageClassName={'page-item'}
          pageLinkClassName={'page-link'}
          previousClassName={'page-item'}
          previousLinkClassName={'page-link'}
          nextClassName={'page-item'}
          nextLinkClassName={'page-link'}
          pageCount={movieList.pages}
          marginPagesDisplayed={2}
          pageRangeDisplayed={2}
          onPageChange={handlePageClick}
          containerClassName={'pagination p-2'}
          activeClassName={'active'}
        />
      </nav>
      {loading ? <div className="alert alert-primary" role="alert">Loading....</div> :
        <div className="card-deck">
          {movieList.results.map((data_movie) => (
            <div className="card my-2 bg-dark text-white portfolio-img_wrap" >
              <img src={data_movie.src} className="card-img" alt={data_movie.title} />
              <div className="card-img-overlay portfolio-img_description_layer">
                <h5 className="card-title portfolio-img_description">{data_movie.title}</h5>
                <p className="card-text portfolio-img_description line-clamp">{data_movie.overview}</p>
                <h3>
                  <span className="badge badge-info">{data_movie.vote}
                    <i className="fas fa-star-half-alt"></i>
                  </span>
                  <button className="btn btn-primary"
                    onClick={() => openModal(data_movie)}>
                    Details
                  </button>
                </h3>
              </div>
            </div>
          ))}
        </div>
      }
      <ModalExample />
    </>
  )
}
