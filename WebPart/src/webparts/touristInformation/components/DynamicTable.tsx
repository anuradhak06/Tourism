import * as React from "react";
import { IDynamicTableStates } from "./IDynamicTableStates";
import { IDynamicTableProps } from "./IDynamicTableProps";
import { SPService } from "../../../Services/SPService";
import styles from "./TouristInformation.module.scss";

export default class DynamicTable extends React.Component<
  IDynamicTableProps,
  IDynamicTableStates
> {
  private _services: SPService = null;
  constructor(props) {
    super(props);

    this.state = {
      place: "",
      description: "",
      items: [],
      city: this.props.cityName,
      isEditable: false,
      isValidated: false,
    };
    this.handleClick = this.handleClick.bind(this);
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
    let newArray = [];
    items.map((value, index) => {
      newArray.push({
        place: value.Place,
        description: value.Description,
        Id: value.Id,
      });
    });
    this.setState({ items: newArray });
  }

  updatePlace(event) {
    this.setState({
      place: event.target.value,
    });
  }
  updateDescription(event) {
    this.setState({
      description: event.target.value,
    });
  }

  handleClick() {
    this.ValidateInputData();

    if (this.state.isValidated) {
      var items = this.state.items;

      items.push({
        place: this.state.place,
        description: this.state.description,
      });
      this.AddData();
      this.setState({
        items: items,
        place: "",
        description: "",
      });
    }
  }
  private async AddData() {
    let itemAdded = this._services.AddTableData(
      this.state.place,
      this.state.description,
      this.props.cityId,
      this.props.categoryId
    );
  }
  ValidateInputData() {
    if (this.state.place.trim() !== "" && this.state.description != "") {
      this.setState({
        isValidated: true,
      });
    } else {
      this.setState({
        isValidated: false,
      });
    }
  }

  handleItemChanged(i, event) {
    var items = this.state.items;
    items[i] = event.target.value;

    this.setState({
      items: items,
    });
  }

  handleItemDeleted = (i, itemId) => {
    this.DeleteData(itemId);
    var items = this.state.items;

    items.splice(i, 1);
    this.setState({
      items: items,
    });
  };

  private async DeleteData(itemId) {
    let deleteAdded = this._services.DeleteTableData(itemId);
  }
  renderEditableRows() {
    var context = this;

    return this.state.items.map(function (o, i) {
      return (
        <tr key={"item-" + i}>
          <td>
            <p> {i + 1}</p>
          </td>
          <td>
            <input
              type="text"
              value={o.place}
              onChange={context.handleItemChanged.bind(context, i)}
            />
          </td>
          <td>
            <textarea
              value={o.description}
              onChange={context.handleItemChanged.bind(context, i)}
            />
          </td>
          <td>
            <button onClick={this.handleItemDeleted(i, o.Id)}>Delete</button>
          </td>
        </tr>
      );
    });
  }
  renderRows() {
    var context = this;

    return this.state.items.map(function (o, i) {
      return (
        <tr key={"item-" + i}>
          <td>{i + 1}</td>
          <td>{o.place}</td>
          <td>{o.description}</td>
          <td>
            <button onClick={context.handleItemDeleted.bind(context, i, o.Id)}>
              Delete
            </button>
          </td>
        </tr>
      );
    });
  }
  render() {
    return this.state.isEditable == false ? (
      <div>
        <table className={styles.dynamicDataTable}>
          <thead>
            <tr>
              <th>S N0.</th>
              <th>Place</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{this.renderRows()}</tbody>
        </table>
        <hr />
        <input
          type="text"
          value={this.state.place}
          onChange={this.updatePlace.bind(this)}
        />
        <textarea
          value={this.state.description}
          onChange={this.updateDescription.bind(this)}
        />

        <button onClick={this.handleClick}>Add Place</button>
      </div>
    ) : (
      <div>
        <table className="dynamicDataTable">
          <thead>
            <tr>
              <th>S N0.</th>
              <th>Place</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{this.renderEditableRows()}</tbody>
        </table>
        <hr />
        <input
          type="text"
          value={this.state.place}
          onChange={this.updatePlace.bind(this)}
        />
        <input
          type="text"
          value={this.state.description}
          onChange={this.updateDescription.bind(this)}
        />

        <button onClick={this.handleClick}>Add Place</button>
        <hr />
        {this.state.isValidated ? (
          <p></p>
        ) : (
          <span>Please enter Place and Description</span>
        )}
      </div>
    );
  }
}
