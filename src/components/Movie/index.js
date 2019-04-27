import React, { useState, useEffect, useReducer, useContext } from 'react';
import * as URLS from '../../constants/urls';
import ReactPaginate from 'react-paginate';
import './movie.css';
import './movie.scss';
import { Modal } from 'react-overlays';
import * as ColorThief from 'color-thief';


const url_poster = 'https://image.tmdb.org/t/p/original';

function getColorFromUrl(imageUrl) {
  const sourceImage = new Image();
  const thief = new ColorThief();
  sourceImage.crossOrigin = "anonymous";
  sourceImage.src = imageUrl;

  return new Promise(function (resolve) {
    sourceImage.onload = function () {
      resolve(thief.getColor(sourceImage))
    }
  })
};

function backdropStyle(bgcolor) {
  return {
    position: 'fixed',
    zIndex: 1040,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: bgcolor,
    opacity: 0.8,
    transition: 'background-color 0.7s ease'
  }
};

function modalStyle() {
  // we use some psuedo random coords so nested modals
  // don't sit right on top of each other.
  let top = 50;
  let left = 50;

  return {
    position: 'fixed',
    width: 60 + '%',
    maxHeight: 98 + '%',
    overflow: 'auto',
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

const ModalContext = React.createContext();

function Display() {
  const values = useContext(ModalContext);
  const value = values.dataModal;
  const [color, setColor] = useState([255, 255, 255]);

  useEffect(() => {
    /* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/resolve */
    getColorFromUrl(value.backdrop).then(res => {
      setColor(res);
    })
  }, [values.show]);

  function renderBackdrop() {
    /* https://awik.io/grab-dominant-color-image-jquery/ */
    return <div className="label-modal-id" style={backdropStyle('rgb(' + color + ')')} />;
  };
  return (
    <div className="modal-example">
      <Modal
        style={modalStyle()}
        aria-labelledby="modal-label"
        show={values.show}
        renderBackdrop={renderBackdrop}
      >
        <div className="modal-content" id="modal-label">
          <div className="modal-header">
            <h5 className="modal-title">{value.title}</h5>
          </div>
          <div className="modal-body">
            <p>{value.overview}</p>
            <img className="img-fluid rounded" src={value.backdrop} alt="" />
          </div>
        </div>
        {/* <div>
          <h4 id="modal-label">{value.title}</h4>
          <p>
            {value.overview}
          </p>
          <img className="img-fluid rounded" src={value.backdrop} alt="" />
        </div> */}
      </Modal>
    </div>
  );
};

const initialState = { mode: URLS.POPULAR };

const delay = (time = 1500) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export default function MovieComponent() {
  const [show, setShow] = useState(false);

  /* https://stackoverflow.com/questions/3369593/how-to-detect-escape-key-press-with-pure-js-or-jquery */
  document.onkeydown = function (evt) {
    evt = evt || window.event;
    var isEscape = false;
    if ("key" in evt) {
      isEscape = (evt.key === "Escape" || evt.key === "Esc");
    } else {
      isEscape = (evt.keyCode === 27);
    }
    if (isEscape) {
      setShow(false);
    }
  };

  /* https://gomakethings.com/checking-event-target-selectors-with-event-bubbling-in-vanilla-javascript/ */
  document.onclick = function (evt) {
    if (evt.target.classList.contains('label-modal-id')) {
      console.log('setShow to false');
      setShow(false);
    };
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
  const [loading, setLoading] = useState(false)
  const [dataModal, setDataModal] = useState({})

  useEffect(() => {
    fetch(`${state.mode}&page=${movieList.currentPage}`)
      .then((response) => {
        return response.json();
      })
      .then(response => {
        const results = response.results
          .filter(res => res.poster_path != null && res.backdrop_path != null)
          .map(function (res) {
            return {
              title: res.title,
              id: res.id,
              src: `${url_poster}${res.poster_path}`,
              overview: res.overview,
              vote: res.vote_average,
              backdrop: `${url_poster}${res.backdrop_path}`
            }
          })
        const pages = response.total_pages

        return { results, pages }
      })
      .then(data => {
        setMovList({
          ...movieList,
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
  function openModal(data) {
    if (window.innerWidth >= 720 && window.innerHeight >= 480) {
      setDataModal(data);
      setShow(true);
    };
  };
  return (
    <ModalContext.Provider value={{ dataModal, show }}>
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
            <div className="card my-2 bg-dark text-white portfolio-img_wrap"
              onClick={() => openModal(data_movie)} >
              <img src={data_movie.src} className="card-img" alt={data_movie.title} />
              <div className="card-img-overlay portfolio-img_description_layer">
                <h5 className="card-title portfolio-img_description">{data_movie.title}</h5>
                <p className="card-text portfolio-img_description line-clamp">{data_movie.overview}</p>
                <h3>
                  <span className="badge badge-info">{data_movie.vote}
                    <i className="fas fa-star-half-alt"></i>
                  </span>
                </h3>
              </div>
            </div>
          ))}
        </div>
      }
      <Display />
    </ModalContext.Provider>
  )
};
