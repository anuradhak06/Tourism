import { RichText } from "@pnp/spfx-controls-react/lib/RichText";
import * as React from "react";
import { SPService } from "../../../Services/SPService";
import { IRichTextComponentStates } from "./IRichTextComponentStates";
import { IRichTextComponentProps } from "./IRichTextComponentProps";
export default class RichTextComponent extends React.Component<
  IRichTextComponentProps,
  IRichTextComponentStates
> {
  private _services: SPService = null;
  constructor(props) {
    super(props);
    this.state = {
      description: "",
      itemID: 0,
    };
    this._services = new SPService(this.props.context);
  }
  componentDidMount() {
    this.getListItems();
  }

  private async getListItems() {
    let items = await this._services.getCityDetailedData(
      this.props.cityName,
      this.props.category
    );

    if (items.length > 0) {
      this.setState({ description: items[0].Description, itemID: items[0].Id });
    }
  }

  private onTextChange = (newText: string) => {
    this.setState({
      description: newText,
      itemID: this.state.itemID,
    });
    return newText;
  };
  private handleUpdate = () => {
    this.handleClick();
  };
  private async handleClick() {
    if (this.state.itemID == 0) {
      let items = await this._services.AddNatureAndParks(
        this.props.cityId,
        this.state.description,
        this.props.categoryId
      );
    } else {
      let items = await this._services.updateNatureAndParks(
        this.state.itemID,
        this.state.description
      );
    }
  }
  render() {
    return (
      <>
        <RichText
          value={this.state.description}
          onChange={(text) => this.onTextChange(text)}
        />
        <button onClick={this.handleUpdate}>Update</button>
      </>
    );
  }
}
