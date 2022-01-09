import {Component, OnInit, ViewChild} from '@angular/core';

import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {NavigationComponent} from "../../navigation/navigation.component";
import {Router} from "@angular/router";
import {UtilsService} from "../../services/utils/utils.service";
import {ItemPropertiesService} from "../../services/item-properties/item-properties.service";
import {ItemProperty} from "../../services/item-properties/item-property";
import {ItemLevel} from "../../services/item-properties/item-level";
import {InitDataStorageService} from "../../services/init/init-data-storage.service";
import {ItemPropertyValueType} from "../../services/item-properties/item-property-value-type";
import {ItemPropertyValueDataType} from "../../services/item-properties/item-property-value-data-type";

@Component({
  selector: 'app-item-properties',
  templateUrl: './item-properties.component.html',
  styleUrls: ['./item-properties.component.css']
})
export class ItemPropertiesComponent implements OnInit {

  properties: ItemProperty[] = new Array<ItemProperty>();

  itemLevelMapper: Map<string, string>;
  itemLevels: Array<ItemLevel>;
  itemLevel: ItemLevel;

  propertyValueTypeMapper: Map<string, string>;
  propertyValueType: ItemPropertyValueType;

  propertyValueDataTypeMapper: Map<string, string>;
  propertyValueDataType: ItemPropertyValueDataType;

  displayedColumns: string[] = ['name', 'valueType', 'valueDataType', 'itemLevel', 'actions'];
  dataSource = new MatTableDataSource<ItemProperty>();

  constructor(private utilsService: UtilsService, private propertiesService: ItemPropertiesService, private navigation: NavigationComponent, private router: Router, private initDataStorage: InitDataStorageService) {
    this.itemLevels = this.initDataStorage.getItemLevels();
    this.itemLevelMapper = this.initDataStorage.getItemLevelMapper();
    this.itemLevel = this.itemLevels[0];

    this.propertyValueTypeMapper = this.initDataStorage.getItemPropertyValueTypeMapper();
    this.propertyValueType = this.initDataStorage.getItemPropertyValueTypes()[0];

    this.propertyValueDataTypeMapper = this.initDataStorage.getItemPropertyValueDataTypeMapper();
    this.propertyValueDataType = this.initDataStorage.getItemPropertyValueDataTypes()[0];
  }

  @ViewChild(MatPaginator) set matPaginator(paginator: MatPaginator) {
    this.dataSource.paginator = paginator;
  }

  @ViewChild(MatSort) set matSort(sort: MatSort) {
    this.dataSource.sort = sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteProperty(property: ItemProperty): void {
    this.propertiesService.deleteProperty(property).subscribe(properties => {
      this.properties = properties;
      this.dataSource.data = this.properties;
    });
    this.utilsService.openSnackBar(property.name + ' property is deleted');
  }

  createProperty() {
    let property = ItemProperty.empty();
    property.itemLevel = this.itemLevel.token;
    this.propertiesService.shareProperty(property);
    this.router.navigate(['', {outlets: {editor: ['products', 'properties', 'new']}}]).then(() => {
    });
    this.navigation.toggleEditor();
  }

  ngOnInit(): void {

    this.loadData(this.itemLevel);

    this.propertiesService.sharingProperties.subscribe(properties => {
      this.properties = properties;
      this.dataSource.data = properties;
    });
  }

  loadData(itemLevel: ItemLevel): void {
    this.itemLevel = itemLevel;
    this.propertiesService.getProperties(this.itemLevel.token).subscribe(
      properties => {
        this.properties = properties;
        this.dataSource.data = this.properties;
      },
      error => {
        this.utilsService.openSnackBar(error.message);
      }
    );
  }
}
