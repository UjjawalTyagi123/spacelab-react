import React, { useState, useEffect } from "react";
import "./imageSlider.scss";
import PropTypes from "prop-types";
import rightArrow from "../../assets/right-arrow.svg";
import leftArrow from "../../assets/left-arrow.svg";

/**
 * Creates image slider based on an array of objects, with each entry of the form:
 * {id: (int), url: (string), alt: (string),}
 * @returns {JSX.Element}
 * @constructor
 * @param sliderContent {array}
 * @param transitionDelay
 * @param showDots
 */
const ImageSlider = ({sliderContent, transitionDelay, showDots, showNavButtons}) => {
    const content = sliderContent;
    const [currentImageID, setCurrentImageID] = useState(1);

    useEffect(() => {
        const interval = setInterval(() => {
            content.length > currentImageID
                ? setCurrentImageID((prev) => prev + 1)
                : setCurrentImageID(1);
        }, transitionDelay);
        return () => clearInterval(interval);
    });

    function sliderHandler(id) {
        setCurrentImageID(id);
    }

    return (
        <div className="images">
            {content.map((image) => (
                <img
                    className={currentImageID === image.id ? "show-image" : ""}
                    src={image.url}
                    alt={image.alt}
                    key={image.id}
                />
            ))}

            <button
                onClick={() => sliderHandler(content.length > currentImageID ? currentImageID + 1 : 1)}
                className={`btn-slide-${showNavButtons} next`}
            >
                <img alt='buttons' src={rightArrow} />
            </button>
            <button
                onClick={() => sliderHandler(currentImageID > 1 ? currentImageID - 1 : content.length)}
                className={`btn-slide-${showNavButtons} prev`}
            >
                <img alt='buttons' src={leftArrow} />
            </button>

            <div className={`slider-dots-${showDots}`}>
                {content.map((button) => (
                    <button
                        style={currentImageID === button.id ? {background: "white"} : {}}
                        key={button.id}
                        onClick={() => sliderHandler(button.id)}
                    />
                ))}
            </div>
        </div>
    );
};

ImageSlider.propTypes = {
    /**
     * Object with each entry of the form: {id: (int), url: (string), alt: (string),},
     * where the url is the link to the image.
     */
    sliderContent: PropTypes.array,
    /**
     * Integer representing the number of milliseconds of delay between image transitions.
     * Default set to 5000, which is 5 seconds.
     */
    transitionDelay: PropTypes.number,
    /**
     * Boolean value defining if the navigation dots should be present at the bottom of the slider. Default is true.
     */
    showDots: PropTypes.bool,
    /**
     * Boolean value defining if the navigation arrows should be present to the left and right of the slider image.
     * Default is true.
     */
    showNavButtons: PropTypes.bool,
}

ImageSlider.defaultProps = {
    sliderContent: [],
    transitionDelay: 5000,
    showDots: true,
    showNavButtons: true,
}

export default ImageSlider;
