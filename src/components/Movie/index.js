import React, { Component, useState, useEffect } from 'react'
import './movie.css'
export default class MovieComponent extends Component {
  render() {
    return (
      <div>
        <MovieRequest />
      </div>
    )
  }
}

function MovieRequest() {
  const poster = new Image()
  const [movie_list, setMov_List] = useState([])
  const url_poster = 'https://image.tmdb.org/t/p/original'
  const where = '/discover/movie?api_key='
  const reste = '&language=fr&sort_by=release_date.desc&include_adult=true&include_video=false&page=1'
  const url = `${process.env.REACT_APP_THEMOVIEDB_URL}${process.env.REACT_APP_THEMOVIEDB_MY_ID}${where}${process.env.REACT_APP_THEMOVIEDB_API_KEYS}${reste}`

  useEffect(() => {
    fetch(url).then((response) => {
      return response.json();
    }).then(response => {
      console.log(response.results)
      return response.results
        .filter(res => res.poster_path != null)
        .map(function (res) {
          poster.src = `${url_poster}${res.poster_path}`
          return {
            title: res.title,
            src: poster.src,
            width: poster.width,
            height: poster.height,
            overview: res.overview,
            popu: res.popularity
          }

        })
    }).then(data => {
      console.log('data', data)
      setMov_List(data)
    });
  }, [])
  return (
    <>
      <div className="card-columns">
        {movie_list.map(data_movie => (
          <div className="card bg-dark text-white portfolio-img_wrap">
            <img src={data_movie.src} className="card-img" alt={data_movie.title} />
            <div className="card-img-overlay portfolio-img_description_layer">
              <h5 className="card-title portfolio-img_description">{data_movie.title}</h5>
              <p className="card-text portfolio-img_description">{data_movie.overview}</p>
              <p className="card-text portfolio-img_description">{data_movie.popu}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}