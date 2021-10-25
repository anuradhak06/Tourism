import * as React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { Categories } from "./Categories";
import { ITabsProps } from "./ITabsProps";
import { ITabsState } from "./ITabsStates";
import { SPService } from "../../../Services/SPService";
export default class TabsComponent extends React.Component<
  ITabsProps,
  ITabsState
> {
  private _services: SPService = null;
  constructor(props) {
    super(props);
    this.state = {
      newCity: "",
      cities: [],
    };
    this._services = new SPService(this.props.context);
  }
  handleChange = (event) => {
    this.setState({
      newCity: event.target.value,
    });
  };
  AddCity = (event) => {
    let item = this._services.AddCity(this.props.stateId, this.state.newCity);
    var items = this.state.cities;
    items.push({ Title: this.state.newCity, Id: item[0].Id });
    this.setState({
      cities: items,
    });
    this.setState({
      newCity: "",
    });
  };
  public componentDidMount() {
    this.getListItems();
  }

  private async getListItems() {
    if (this.props.state) {
      let items = await this._services.getCities(this.props.state);
      // let newItems = [];
      // items.map((value, index) => {
      //   newItems.push(value.Title);
      // });
      this.setState({
        cities: items,
      });
    }
  }
  render() {
    return (
      <Tabs>
        <TabList>
          {this.state.cities && this.state.cities.length > 0 ? (
            this.state.cities.map((value, index) => {
              return <Tab>{value.Title}</Tab>;
            })
          ) : (
            <p>No data found</p>
          )}
          <Tab>Add City</Tab>
        </TabList>
        {this.state.cities && this.state.cities.length > 0 ? (
          this.state.cities.map((value, index) => {
            return (
              <TabPanel>
                <h2>
                  <Categories
                    context={this.props.context}
                    cityId={value.Id}
                    stateId={this.props.stateId}
                    cityName={value.Title}
                  />
                </h2>
              </TabPanel>
            );
          })
        ) : (
          <TabPanel>No data found</TabPanel>
        )}
        <TabPanel>
          Enter City
          <input type="text" onChange={this.handleChange.bind(this)}></input>
          <button onClick={this.AddCity}>Add</button>
        </TabPanel>
      </Tabs>
    );
  }
}

{
  /* <TabPanel>
          Enter City{" "}
          <input type="text" onChange={this.handleChange}>
            <button onClick={this.AddCity}>Add</button>
          </input>
        </TabPanel> */
}
