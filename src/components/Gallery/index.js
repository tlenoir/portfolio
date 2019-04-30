import React, { useEffect, useState } from 'react';
import Gallery from 'react-photo-gallery';
import Lightbox from 'react-images';
import ReactPaginate from 'react-paginate';
import SelectedImage from './selectedImage';
import './gallery.css'

function Unsplash() {
    const [picture, setPicture] = useState({
        pages: 0,
        results: [],
    })
    const [input, setInput] = useState({
        value: 'polynesia'
    })
    const [search, setSearch] = useState({
        page: 1,
        value: '',
    })
    const [currentImage, setCurrentImage] = useState({
        index: 0,
        lightboxIsOpen: false,
    })


    useEffect(() => {
        async function fetchdata() {
            fetch(`https://api.unsplash.com/search/photos?query=${input.value}&page=${search.page}&per_page=9`, {
                headers: {
                    "Authorization": `Client-ID ${process.env.REACT_APP_UNSPLASH_API_KEYS}`
                }
            }).then((response) => {
                return response.json();
            }).then(response => {
                const results = response.results.map(res => ({
                    src: res.urls.regular,
                    width: res.width,
                    height: res.height,
                    thumbnail: res.urls.thumb,
                    caption: res.description,
                    color: res.color

                }))
                const pages = response.total_pages
                return { results, pages }

            }).then(data => {
                setPicture({
                    ...picture,
                    pages: data.pages,
                    results: data.results
                })
            });
        }
        fetchdata()
    }, [search]);
    const printValue = e => {
        e.preventDefault()
        setSearch({
            ...search,
            value: input.value,
            page: 1
        })
    };
    const updateField = e => {
        setInput({
            ...input,
            value: e.target.value
        })
    };
    const handlePageClick = data => {
        setSearch({
            ...search,
            page: data.selected + 1
        })
    };
    const openLightbox = (event, obj) => {
        setCurrentImage({
            ...currentImage,
            index: obj.index,
            lightboxIsOpen: true
        });
    };
    const closeLightbox = () => {
        setCurrentImage({
            ...currentImage,
            index: 0,
            lightboxIsOpen: false,
        });
    };
    const gotoPrevious = () => {
        setCurrentImage({
            ...currentImage,
            index: currentImage.index - 1,
        });
    }
    const gotoNext = () => {
        setCurrentImage({
            ...currentImage,
            index: currentImage.index + 1,
        });
    }
    return (
        <>
            <form className="form-inline justify-content-center" onSubmit={printValue}>
                <div className="form-group mb-2">
                    <input
                        className="form-control"
                        placeholder="Type to search"
                        name="value"
                        value={input.value}
                        onChange={updateField} />
                </div>
                <button className="btn btn-primary mb-2">
                    <i className="fas fa-search"></i>
                </button>
            </form>
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
            <Gallery photos={picture.results} onClick={openLightbox} ImageComponent={SelectedImage} />
            <Lightbox images={picture.results}
                onClose={closeLightbox}
                onClickPrev={gotoPrevious}
                onClickNext={gotoNext}
                currentImage={currentImage.index}
                isOpen={currentImage.lightboxIsOpen}
                backdropClosesModal
            />
        </>
    )
}
export default Unsplash;
