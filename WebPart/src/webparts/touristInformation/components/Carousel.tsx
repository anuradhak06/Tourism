import {
  Carousel,
  CarouselButtonsLocation,
  CarouselButtonsDisplay,
  CarouselIndicatorShape,
} from "@pnp/spfx-controls-react/lib/Carousel";
import styles from "./TouristInformation.module.scss";
import * as React from "react";
export default class CarouselComponent extends React.Component {
  render() {
    return (
      <Carousel
        buttonsLocation={CarouselButtonsLocation.center}
        buttonsDisplay={CarouselButtonsDisplay.buttonsOnly}
        isInfinite={true}
        indicatorShape={CarouselIndicatorShape.circle}
        pauseOnHover={true}
        element={[
          {
            imageSrc:
              "https://images.unsplash.com/photo-1588614959060-4d144f28b207?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3078&q=80",
            title: "Colosseum",
            description: "This is Colosseum",
            url: "https://en.wikipedia.org/wiki/Colosseum",
            showDetailsOnHover: true,
            // imageFit: ImageFit.cover,
          },
          {
            imageSrc:
              "https://images.unsplash.com/photo-1588614959060-4d144f28b207?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3078&q=80",
            title: "Colosseum",
            description: "This is Colosseum",
            url: "https://en.wikipedia.org/wiki/Colosseum",
            showDetailsOnHover: true,
            // imageFit: ImageFit.cover,
          },
          {
            imageSrc:
              "https://images.unsplash.com/photo-1588614959060-4d144f28b207?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3078&q=80",
            title: "Colosseum",
            description: "This is Colosseum",
            url: "https://en.wikipedia.org/wiki/Colosseum",
            showDetailsOnHover: true,
            // imageFit:,
          },
        ]}
        onMoveNextClicked={(index: number) => {
          console.log(`Next button clicked: ${index}`);
        }}
        onMovePrevClicked={(index: number) => {
          console.log(`Prev button clicked: ${index}`);
        }}
      />
    );
  }
}
