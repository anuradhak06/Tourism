import {
  Carousel,
  CarouselButtonsLocation,
  CarouselButtonsDisplay,
  CarouselIndicatorShape,
} from "@pnp/spfx-controls-react/lib/Carousel";
import * as React from "react";
import { ICarouselStates } from "./ICarouselStates";
import { ICaraouselProps } from "./ICaraouselProps";
import { SPService } from "../../../Services/SPService";
import { ImageFit } from "office-ui-fabric-react";
import styles from "./TouristInformation.module.scss";
export default class CarouselComponent extends React.Component<
  ICaraouselProps,
  ICarouselStates
> {
  private _services: SPService = null;
  constructor(props) {
    super(props);
    this.state = {
      caraouselItems: [],
    };
    /** Bind service using current context */
    this._services = new SPService(this.props.context);
  }
  public componentDidMount() {
    this.getListItems();
  }
  private async getListItems() {
    let items = await this._services.getCityDetailedData(
      this.props.cityName,
      "Religious Places"
    );
    let carouselItemsMapping = items.map((value) => ({
      imageSrc: JSON.parse(value["DestinationPicture"]).serverRelativeUrl,
      title: value.Place,
      url: JSON.parse(value["DestinationPicture"]).serverRelativeUrl,
      imageFit: ImageFit.cover,
    }));
    this.setState({ caraouselItems: carouselItemsMapping });
  }

  render() {
    return (
      <Carousel
        buttonsLocation={CarouselButtonsLocation.center}
        buttonsDisplay={CarouselButtonsDisplay.buttonsOnly}
        contentContainerStyles={styles.carouselContent}
        isInfinite={false}
        indicatorShape={CarouselIndicatorShape.rectangle}
        pauseOnHover={true}
        element={this.state.caraouselItems}
        containerButtonsStyles={styles.carouselButtonsContainer}
      />
    );
  }
}
