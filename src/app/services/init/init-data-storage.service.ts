import {Injectable} from '@angular/core';
import {InitService} from "./init.service";
import {ItemLevel} from "../item-properties/item-level";
import {ItemPropertyValueType} from "../item-properties/item-property-value-type";
import {ItemPropertyValueDataType} from "../item-properties/item-property-value-data-type";

const INIT_DATA_KEY = 'InitData';

@Injectable({
  providedIn: 'root'
})
export class InitDataStorageService {

  constructor(private initService: InitService) {
  }

  addInitData(data: object): void {
    const storageData = JSON.parse(<string>window.localStorage.getItem(INIT_DATA_KEY));
    let dataJson = JSON.stringify(storageData ? {...storageData, ...data} : data);
    window.localStorage.setItem(INIT_DATA_KEY, dataJson);
  }

  getData(key: string): object {
    const storageData = JSON.parse(<string>window.localStorage.getItem(INIT_DATA_KEY));
    return storageData ? storageData[key] : null;
  }

  prepareData(): void {
    if (!window.localStorage.getItem(INIT_DATA_KEY)) {
      this.initService.getInitData().subscribe(data => window.localStorage.setItem(INIT_DATA_KEY, JSON.stringify(data)));
    }
  }

  getItemLevels(): ItemLevel[] {
    const data = window.localStorage.getItem(INIT_DATA_KEY);
    if (data) {
      const list = <ItemLevel[]>JSON.parse(data).itemLevels;
      return list ? list : [];
    } else {
      return [];
    }
  }

  getItemLevelMapper(): Map<string, string> {
    return new Map(
      this.getItemLevels().map<[string, string]>(i => [i.token, i.name])
    );
  }

  getItemPropertyValueTypes(): ItemPropertyValueType[] {
    const data = window.localStorage.getItem(INIT_DATA_KEY);
    if (data) {
      const list = <ItemLevel[]>JSON.parse(data).itemPropertyValueTypes;
      return list ? list : [];
    } else {
      return [];
    }
  }

  getItemPropertyValueTypeMapper(): Map<string, string> {
    return new Map(
      this.getItemPropertyValueTypes().map<[string, string]>(i => [i.token, i.name])
    );
  }

  getItemPropertyValueDataTypes(): ItemPropertyValueDataType[] {
    const data = window.localStorage.getItem(INIT_DATA_KEY);
    if (data) {
      const list = <ItemLevel[]>JSON.parse(data).itemPropertyValueDataTypes;
      return list ? list : [];
    } else {
      return [];
    }
  }

  getItemPropertyValueDataTypeMapper(): Map<string, string> {
    return new Map(
      this.getItemPropertyValueDataTypes().map<[string, string]>(i => [i.token, i.name])
    );
  }
}
