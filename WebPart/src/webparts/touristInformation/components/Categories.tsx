import * as React from "react";
import { Accordion } from "@pnp/spfx-controls-react/lib/Accordion";
import { SPService } from "../../../Services/SPService";
import { IAccordionCompProps } from "./ICategoriesProps";
import { IAccodrionCompStates } from "./ICategoriesStates";
import DynamicTable from "./DynamicTable";
import RichTextComponent from "./RichTextComponent";
import CarouselComponent from "./Carousel";

export class Categories extends React.Component<
  IAccordionCompProps,
  IAccodrionCompStates,
  {}
> {
  private _services: SPService = null;
  constructor(props) {
    super(props);
    this.state = {
      listItems: [],
      errorMessage: "",
    };
    /** Bind service using current context */
    this._services = new SPService(this.props.context);
  }
  public componentDidMount() {
    this.getListItems();
  }
  private async getListItems() {
    let items = await this._services.getListCategories();
    let newArray = [];
    items.map((value, index) => {
      newArray.push({
        Title: value.Title,
        DataType: value.Data_x0020_Type.Title,
        Id: value.Id,
      });
    });
    this.setState({ listItems: newArray });
  }

  render() {
    return this.state.listItems && this.state.listItems.length ? (
      this.state.listItems.map((item, index) => (
        <Accordion
          title={item.Title}
          defaultCollapsed={true}
          className={"itemCell"}
          key={index}
        >
          <div className={"itemContent"}>
            {(() => {
              if (item.DataType == "Table") {
                return (
                  <DynamicTable
                    cityId={this.props.cityId}
                    context={this.props.context}
                    category={item.Title}
                    stateId={this.props.stateId}
                    cityName={this.props.cityName}
                    categoryId={item.Id}
                  />
                );
              } else if (item.DataType == "RichText") {
                return (
                  <RichTextComponent
                    cityId={this.props.cityId}
                    context={this.props.context}
                    category={item.Title}
                    stateId={this.props.stateId}
                    cityName={this.props.cityName}
                    categoryId={item.Id}
                  />
                );
              } else if (item.DataType == "Links") {
              } else {
                return <CarouselComponent />;
              }
            })()}
          </div>
        </Accordion>
      ))
    ) : (
      <p>Loading</p>
    );
  }
}
