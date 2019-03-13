import React, { Component, useEffect, useState } from 'react'
import Gallery from 'react-photo-gallery'
import ReactPaginate from 'react-paginate';
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
    const img = new Image()
    const [picture, setPicture] = useState({
        pages: 0,
        results: []
    })
    const [page, setPage] = useState(1)
    const [input, setInput] = useState({
        value: 'polynesia'
    })
    const [search, setSearch] = useState('')

    useEffect(() => {
        fetch(`https://api.unsplash.com/search/photos?query=${input.value}&page=${page}`, {
            headers: {
                "Authorization": `Client-ID ${process.env.REACT_APP_UNSPLASH_API_KEYS}`
            }
        }).then((response) => {
            return response.json();
        }).then(response => {
            const results = response.results.map(function (r) {
                img.src = r.urls.small
                return {
                    src: img.src,
                    width: img.width,
                    height: img.height
                }
            })
            const pages = response.total_pages
            return { results, pages }

        }).then(data => {
            setPicture({
                ...picture,
                pages: data.pages,
                results: data.results
            })
        });
    }, [search]);
    useEffect(() => {
        setSearch(page)
    }, [page]);
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
    /* function navigationPage(i) {
        setPage(i)
        console.log(i)
    } */
    const handlePageClick = data => {
        setPage(Math.ceil(data.selected + 1))
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
            </center>
            <nav aria-label="Page navigation example">
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
                pageCount={picture.pages}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName={'pagination justify-content-center'}
                activeClassName={'active'}
            />
            </nav>
            <Gallery photos={picture.results} />
        </>
    )
}
export default GalleryComponent;
