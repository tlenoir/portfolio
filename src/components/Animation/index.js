import React, { Component } from 'react'
import './animation.css'
import './animate.css'

export default class Animation extends Component {
  constructor() {
    super();

    this.state = {
      animation: [
        "bounce", "flash", "pulse", "rubberBand", "shake", "headShake", "swing", "tada",
        "wobble", "jello", "bounceIn", "bounceInDown",
        "bounceInLeft", "bounceInRight", "bounceInUp", "bounceOut",
        "bounceOutDown", "bounceOutLeft", "bounceOutRight", "bounceOutUp",
        "fadeIn", "fadeInDown", "fadeInDownBig", "fadeInLeft",
        "fadeInLeftBig", "fadeInRight", "fadeInRightBig", "fadeInUp",
        "fadeInUpBig", "fadeOut", "fadeOutDown", "fadeOutDownBig",
        "fadeOutLeft", "fadeOutLeftBig", "fadeOutRight", "fadeOutRightBig",
        "fadeOutUp", "fadeOutUpBig", "flipInX", "flipInY",
        "flipOutX", "flipOutY", "lightSpeedIn", "lightSpeedOut",
        "rotateIn", "rotateInDownLeft", "rotateInDownRight", "rotateInUpLeft",
        "rotateInUpRight", "rotateOut", "rotateOutDownLeft", "rotateOutDownRight",
        "rotateOutUpLeft", "rotateOutUpRight", "hinge", "jackInTheBox",
        "rollIn", "rollOut", "zoomIn", "zoomInDown",
        "zoomInLeft", "zoomInRight", "zoomInUp", "zoomOut",
        "zoomOutDown", "zoomOutLeft", "zoomOutRight", "zoomOutUp",
        "slideInDown", "slideInLeft", "slideInRight", "slideInUp",
        "slideOutDown", "slideOutLeft", "slideOutRight", "slideOutUp",
        "heartBeat",
      ]
    }
  }
  capitalize(string) {
    return string.toLowerCase()
      .replace(/\b./g,
        function (firstletter) {
          return firstletter.toUpperCase();
        });
  };
  render() {
    const { animation } = this.state
    return (
      <div className="card-columns portfolio-card">
        {/* animate text into card*/}
        {animation.map(anim => (
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{this.capitalize(anim)}</h5>
              <h6 className="card-subtitle mb-2 text-muted">Animation</h6>
              <p className={`cart-text animated infinite slow ${anim}`}>
                Animate text
              </p>
            </div>
          </div>
        ))}
      </div>
    )
  }
}
