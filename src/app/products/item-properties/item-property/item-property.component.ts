import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NavigationComponent} from "../../../navigation/navigation.component";
import {Router} from "@angular/router";
import {UtilsService} from "../../../services/utils/utils.service";
import {ItemProperty} from "../../../services/item-properties/item-property";
import {ItemPropertiesService} from "../../../services/item-properties/item-properties.service";
import {ItemLevel} from "../../../services/item-properties/item-level";
import {ItemPropertyValueType} from "../../../services/item-properties/item-property-value-type";
import {ItemPropertyValueDataType} from "../../../services/item-properties/item-property-value-data-type";
import {InitDataStorageService} from "../../../services/init/init-data-storage.service";

@Component({
  selector: 'app-item-property',
  templateUrl: './item-property.component.html',
  styleUrls: ['./item-property.component.css']
})
export class ItemPropertyComponent implements OnInit {

  form: FormGroup;
  property: ItemProperty | undefined;

  itemLevels: Array<ItemLevel>;
  itemLevel: ItemLevel;

  propertyValueTypes: Array<ItemPropertyValueType>;
  propertyValueType: ItemPropertyValueType;

  propertyValueDataTypes: Array<ItemPropertyValueDataType>;
  propertyValueDataType: ItemPropertyValueDataType;

  constructor(private formBuilder: FormBuilder, private navigation: NavigationComponent, private router: Router,
              private utilsService: UtilsService, private propertiesService: ItemPropertiesService, private initDataStorage: InitDataStorageService) {

    this.form = this.formBuilder.group({
      propertyName: ['', Validators.required],
      propertyValueType: ['', Validators.required],
      propertyValueDataType: ['', Validators.required],
    });

    this.itemLevels = this.initDataStorage.getItemLevels();
    this.itemLevel = this.itemLevels[0];

    this.propertyValueTypes = this.initDataStorage.getItemPropertyValueTypes();
    this.propertyValueType = this.propertyValueTypes[0];

    this.propertyValueDataTypes = this.initDataStorage.getItemPropertyValueDataTypes();
    this.propertyValueDataType = this.propertyValueDataTypes[0];
  }

  ngOnInit(): void {
    this.propertiesService.sharingProperty.subscribe(property => this.property = property);
  }

  onSubmit(): void {
    if (this.property) {
      const property: ItemProperty = {
        id: this.property.id,
        token: this.property.token,
        name: this.form.value.propertyName,
        type: this.form.value.propertyValueType,
        dataType: this.form.value.propertyValueDataType,
        itemLevel: this.property.itemLevel
      };
      this.propertiesService.saveProperty(property).subscribe(properties => {
          this.propertiesService.shareProperties(properties);
          this.utilsService.openSnackBar(property.name + ' property is saved');
          this.navigateToProperties();
        }, error => this.utilsService.openSnackBar(error.error.message)
      );
    } else {
      this.utilsService.openSnackBar('Property is empty');
    }
  }

  onCancel(): void {
    this.navigateToProperties();
  }

  private navigateToProperties(): void {
    this.property = undefined;
    this.navigation.toggleEditor();
    this.router.navigate(['', {outlets: {editor: null}}]).then(() => {
    });
  }
}
