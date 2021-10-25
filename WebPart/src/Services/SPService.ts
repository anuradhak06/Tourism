import { WebPartContext } from "@microsoft/sp-webpart-base";
import { sp } from "@pnp/sp/presets/all";
import { IListItem } from "../webparts/touristInformation/components/ICitiesStates";
import { ICamlQuery } from "@pnp/sp/lists";
import { myConstants } from "./Constants";

export class SPService {
  constructor(private context: WebPartContext) {
    sp.setup({
      spfxContext: this.context,
    });
  }

  public async getListItems(listName: string) {
    try {
      let listItems: any[] = await sp.web.lists
        .getByTitle(listName)
        .items.select("Id,Title")
        .get();
      return listItems;
    } catch (err) {
      Promise.reject(err);
    }
  }
  public async getListCategories() {
    try {
      let listItems: any[] = await sp.web.lists
        .getByTitle(myConstants.CATEGORY_LIST)
        .items.select("Id,Title,Data_x0020_Type/Title")
        .expand("Data_x0020_Type")
        .get();
      return listItems;
    } catch (err) {
      Promise.reject(err);
    }
  }
  public async getCities(filterValue: string) {
    try {
      const caml: ICamlQuery = {
        ViewXml:
          "<View><ViewFields><FieldRef Name='Title' /><FieldRef Name='RoleAssignments' /></ViewFields><RowLimit>5</RowLimit></View>",
      };
      let query = `<View>
        <Query>
          <Where>
            <Eq>
              <FieldRef Name='State'/>
              <Value Type='Text'>${filterValue}</Value>
            </Eq>
          </Where>
         </Query>
      </View>`;
      let listItems: any[] = await sp.web.lists
        .getByTitle(myConstants.CITIES_LIST)
        .getItemsByCAMLQuery({
          ViewXml: query,
        });
      return listItems;
    } catch (err) {
      Promise.reject(err);
    }
  }

  public async getTableData(cityName: string, category: string) {
    try {
      const caml: ICamlQuery = {
        ViewXml:
          "<View><ViewFields><FieldRef Name='Id' /><FieldRef Name='Place' /><FieldRef Name='Description' /></ViewFields></View>",
      };
      let query = `<View>
        <Query>
          <Where>
          <And>
            <Eq>
              <FieldRef Name='City'/>
              <Value Type='Text'>${cityName}</Value>
            </Eq>
            <Eq>
              <FieldRef Name='Category'/>
              <Value Type='Text'>${category}</Value>
            </Eq>
            </And>
          </Where>
         </Query>
      </View>`;
      let listItems: any[] = await sp.web.lists
        .getByTitle(myConstants.INFORMATION_LIST)
        .getItemsByCAMLQuery({
          ViewXml: query,
        });
      return listItems;
    } catch (err) {
      Promise.reject(err);
    }
  }
  public async getRichTextData(cityName: string, category: string) {
    try {
      const caml: ICamlQuery = {
        ViewXml:
          "<View><ViewFields><FieldRef Name='ID' /><FieldRef Name='Description' /></ViewFields></View>",
      };
      let query = `<View>
        <Query>
          <Where>
          <And>
            <Eq>
              <FieldRef Name='City'/>
              <Value Type='Text'>${cityName}</Value>
            </Eq>
            <Eq>
              <FieldRef Name='Category'/>
              <Value Type='Text'>${category}</Value>
            </Eq>
            </And>
          </Where>
         </Query>
      </View>`;
      let listItem: any = await sp.web.lists
        .getByTitle(myConstants.INFORMATION_LIST)
        .getItemsByCAMLQuery({
          ViewXml: query,
        });
      return listItem;
    } catch (err) {
      Promise.reject(err);
    }
  }

  public async AddState(state: string) {
    try {
      const iar = await sp.web.lists
        .getByTitle(myConstants.STATE_LIST)
        .items.add({
          Title: state,
        });
      return iar;
    } catch (err) {
      Promise.reject(err);
    }
  }
  public async AddCity(stateId: string, city: string) {
    try {
      const iar = await sp.web.lists
        .getByTitle(myConstants.CITIES_LIST)
        .items.add({
          Title: city,
          StateId: stateId,
        });
      return iar;
    } catch (err) {
      Promise.reject(err);
    }
  }

  public async AddTableData(
    place: string,
    description: string,
    cityId: Number,
    categoryId: string
  ) {
    try {
      const iar = await sp.web.lists
        .getByTitle(myConstants.INFORMATION_LIST)
        .items.add({
          Place: place,
          Description: description,
          CityId: cityId,
          CategoryId: categoryId,
        });
      return iar;
    } catch (err) {
      Promise.reject(err);
    }
  }
  public async DeleteTableData(itemId: number) {
    try {
      const iar = await sp.web.lists
        .getByTitle(myConstants.INFORMATION_LIST)
        .items.getById(itemId)
        .delete();
      return iar;
    } catch (err) {
      Promise.reject(err);
    }
  }
  public async updateNatureAndParks(itemId: number, description: string) {
    try {
      const iar = await sp.web.lists
        .getByTitle(myConstants.INFORMATION_LIST)
        .items.getById(itemId)
        .update({ Description: description });
      return iar;
    } catch (err) {
      Promise.reject(err);
    }
  }
  public async AddNatureAndParks(
    cityId: number,
    description: string,
    categoryId: string
  ) {
    try {
      const iar = await sp.web.lists
        .getByTitle(myConstants.INFORMATION_LIST)
        .items.add({
          Description: description,
          CityId: cityId,
          CategoryId: categoryId,
        });
      return iar;
    } catch (err) {
      Promise.reject(err);
    }
  }
}
