// import * as React from "react";
// import { ICitiesProps } from "./ICitiesProps";
// import { ICities } from "./ICitiesStates";
// import { SPService } from "../../../Services/SPService";
// import TabsComponent from "./Tabs";

// export class City extends React.Component<ICitiesProps, ICities, {}> {
//   private _services: SPService = null;
//   constructor(props: ICitiesProps) {
//     super(props);
//     this.state = {
//       cities: [],
//     };
//     /** Bind service using current context */
//     this._services = new SPService(this.props.context);
//   }

//   public componentDidMount() {
//     this.getListItems();
//   }

//   private async getListItems() {
//     if (this.props.stateName) {
//       let items = await this._services.getCities(this.props.stateName);
//       let newItems = [];
//       items.map((value, index) => {
//         newItems.push(value.Title);
//       });
//       this.setState({
//         cities: newItems,
//       });
//     }
//   }
//   public render(): React.ReactElement<ICitiesProps> {
//     return (
//       <div>
//         {
//           //Map list items and render in tab
//           <TabsComponent
//             tabsData={this.state.cities}
//             context={this.props.context}
//             state={this.props.stateName}
//           />
//         }
//       </div>
//     );
//   }
// }
