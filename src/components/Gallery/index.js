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
    const [picture, setPicture] = useState([])

    useEffect(() => {
        fetch("https://api.unsplash.com/search/photos?query=tahiti", {
            headers: {
                "Authorization": `Client-ID ${process.env.REACT_APP_UNSPLASH_API_KEYS}`
            }
        }).then((response) => {
            return response.json();
        }).then(response =>
            response.results.map(url => ({
                src: `${url.urls.small}`
            }))
        ).then(data => {
            setPicture(data);
        });
    }, []);
    return (
        <Gallery photos={picture}/>
    )
}
export default GalleryComponent;
