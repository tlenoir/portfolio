import React, { Component, useEffect, useState } from 'react'
import Gallery from 'react-photo-gallery'
class GalleryComponent extends Component {
    render() {
        return (
            <div>
                Gallery
                <Unsplash />
            </div>
        )
    }
}
function Unsplash() {
    const total_pages = 0
    const img = new Image()
    const [picture, setPicture] = useState([])
    const [input, setInput] = useState({
        value: 'tahiti'
    })
    const [search, setSearch] = useState('')

    useEffect(() => {
        fetch(`https://api.unsplash.com/search/photos?query=${input.value}`, {
            headers: {
                "Authorization": `Client-ID ${process.env.REACT_APP_UNSPLASH_API_KEYS}`
            }
        }).then((response) => {
            return response.json();
        }).then(response => {
            return response.results.map(function (r) {
                img.src = r.urls.small
                return {
                    src: img.src,
                    width: img.width,
                    height: img.height
                }
            })

        }).then(data => {
            setPicture(data)
        });
    }, [search]);
    const printValue = e => {
        e.preventDefault()
        setSearch(input.value)
        console.log(input.value)
    };
    const updateField = e => {
        setInput({
            ...input,
            value: e.target.value
        })
    };
    return (
        <>
            <center>
                <form onSubmit={printValue}>
                    <input
                        name="value"
                        value={input.value}
                        onChange={updateField} />
                    <button className="btn btn-primary">Click</button>
                </form>
                {/* <nav aria-label="Page navigation example">
                    <ul className="pagination">
                        {
                            Array(picture.total_pages).map((num) =>
                                <li className="page-item">
                                    <span className="page-link">
                                        {num}
                                    </span>
                                </li>
                            )
                        }
                    </ul>
                </nav> */}
            </center>

            <Gallery photos={picture} />
        </>
    )
}
export default GalleryComponent;
