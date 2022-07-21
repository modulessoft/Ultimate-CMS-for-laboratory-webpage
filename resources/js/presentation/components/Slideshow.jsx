import { getImageUri, getThumbUri } from "../../application/common";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

const Slideshow = ({ slides }) => {
    const { i18n } = useTranslation();
    const [currentSlide, setCurrentSlide] = useState(slides[0].id);
    const [play, setPlay] = useState(true);
    useEffect(() => {
        let counter = 0;
        const max = slides.length;
        if (play) {
            var timer = setInterval(() => {
                if (counter < max) {
                    setCurrentSlide(slides[counter].id);
                    counter++;
                } else counter = 0;
            }, 3000);
        }
        return () => {
            clearInterval(timer);
        };
    }, [play]);

    let currentImage = slides.filter((slide) => slide.id === currentSlide)[0];
    let landscape_image = getImageUri(currentImage.landscape_image);
    let portrait_image = getImageUri(currentImage.portrait_image);
    let thumbnail_image = getThumbUri("150x150", currentImage.landscape_image);
    let alt = currentImage.title[i18n.language];
    let link = currentImage.link;
    return (
        <section id="slideshow">
            <div className="slideshow w3-container w3-center">
                <a href={link} target="_blank">
                    <picture>
                        <source
                            media="(min-width: 728px)"
                            srcSet={landscape_image}
                        />
                        <source
                            media="(min-width: 0px)"
                            srcSet={portrait_image}
                        />
                        <img
                            className="slideshow__image  w3-round w3-animate-left"
                            style={{ width: "80%" }}
                            src={thumbnail_image}
                            alt={alt}
                            loading="lazy"
                        />
                    </picture>
                </a>
                <div className="w3-row-padding w3-section">
                    {slides.map((slide) => (
                        <div
                            key={slide.id}
                            className="w3-col"
                            style={{
                                width: (1 / slides.length) * 100 + "%",
                                cursor: "pointer",
                            }}
                        >
                            <img
                                className="slideshow__thumbnail demo w3-opacity w3-round-large w3-border"
                                src={getThumbUri(
                                    "150x150",
                                    slide.landscape_image
                                )}
                                style={{ width: "100%" }}
                                onClick={(e) => {
                                    setPlay(false);
                                    setCurrentSlide(slide.id);
                                }}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
export default Slideshow;
