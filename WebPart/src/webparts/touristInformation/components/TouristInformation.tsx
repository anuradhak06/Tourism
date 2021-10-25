import * as React from "react";
import styles from "./TouristInformation.module.scss";
import { ITouristInformationProps } from "./ITouristInformationProps";
import { ITouristInformationStates } from "./ITouristInformationStates";
import { escape } from "@microsoft/sp-lodash-subset";
import { SPService } from "../../../Services/SPService";
import { Accordion } from "@pnp/spfx-controls-react/lib/Accordion";
import TabsComponent from "./Tabs";

export default class TouristInformation extends React.Component<
  ITouristInformationProps,
  ITouristInformationStates,
  {}
> {
  private _services: SPService = null;
  constructor(props: ITouristInformationProps) {
    super(props);
    this.state = {
      listItems: [],
      errorMessage: "",
      newState: "",
    };
    /** Bind service using current context */
    this._services = new SPService(this.props.context);
  }
  public componentDidMount() {
    this.getListItems();
  }
  private async getListItems() {
    if (this.props.listName) {
      let items = await this._services.getListItems(this.props.listName);
      let newArray = this.setState({ listItems: items });
    }
  }

  AddState = () => {
    let item = this._services.AddState(this.state.newState);
    var items = this.state.listItems;

    items.push({
      Title: this.state.newState,
    });

    this.setState({
      listItems: items,
    });
    this.setState({
      newState: "",
    });
  };

  UpdateNewState = (event) => {
    this.setState({
      newState: event.target.value,
    });
  };
  public render(): React.ReactElement<ITouristInformationProps> {
    return (
      <div className={styles.touristInformation}>
        {
          //Map list items and render in accordion
          this.state.listItems && this.state.listItems.length ? (
            this.state.listItems.map((item, index) => (
              <Accordion
                title={item.Title}
                defaultCollapsed={true}
                className={"itemCell"}
                key={index}
              >
                <div className={"itemContent"}>
                  <TabsComponent
                    state={item.Title}
                    context={this.props.context}
                    stateId={item.Id}
                  />
                </div>
              </Accordion>
            ))
          ) : (
            <p>{this.state.errorMessage}</p>
          )
        }
        <input
          type="text"
          value={this.state.newState}
          onChange={this.UpdateNewState}
        />
        <button onClick={this.AddState}>Add State</button>
      </div>
    );
  }
}
