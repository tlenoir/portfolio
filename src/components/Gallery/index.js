import React, { Component, useEffect, useState } from 'react'

console.log('gallery', process.env.REACT_APP_UNSPLASH_API_KEYS)
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
    // eslint-disable-next-line
    const [keys, setKeys] = useState(process.env.REACT_APP_UNSPLASH_API_KEYS)
    const [picture, setPicture] = useState([])

    useEffect(() => {
        fetch("https://api.unsplash.com/search/photos?query=tahiti", {
            headers: {
                "Authorization": `Client-ID ${keys}`
            }
        }).then((response) => {
            return response.json()
        }).then(data => {
            setPicture(data.results.map(url_img => {
                return (
                    <div key={url_img.id}>
                        <img alt="" src={url_img.urls.regular} />
                    </div>
                )
            }))
            
        })        
    }, [])
    return (
        <div>
            {/* <Gallery photos={picture} /> */}
            {picture}
        </div>
    )
}
export default GalleryComponent;
