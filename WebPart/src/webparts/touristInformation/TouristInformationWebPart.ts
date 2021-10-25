import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
} from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";

import * as strings from "TouristInformationWebPartStrings";
import TouristInformation from "./components/TouristInformation";
import { ITouristInformationProps } from "./components/ITouristInformationProps";

export interface ITouristInformationWebPartProps {
  description: string;
}

export default class TouristInformationWebPart extends BaseClientSideWebPart<ITouristInformationWebPartProps> {
  public render(): void {
    const element: React.ReactElement<ITouristInformationProps> =
      React.createElement(TouristInformation, {
        description: this.properties.description,
        listName: "States",
        context: this.context,
      });

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse("1.0");
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription,
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField("description", {
                  label: strings.DescriptionFieldLabel,
                }),
              ],
            },
          ],
        },
      ],
    };
  }
}
