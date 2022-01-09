import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NavigationComponent} from "../../../navigation/navigation.component";
import {Router} from "@angular/router";
import {UtilsService} from "../../../services/utils/utils.service";
import {Manufacturer} from "../../../services/manufacturers/Manufacturer";
import {ManufacturersService} from "../../../services/manufacturers/manufacturers.service";
import {ItemPropertiesService} from "../../../services/item-properties/item-properties.service";
import {ItemProperty} from "../../../services/item-properties/item-property";
import {ItemPropertyValue} from "../../../services/item-properties/item-property-value";
import {ItemPropertiesHolder} from "../../../services/item-properties/ItemPropertiesHolder";

@Component({
  selector: 'app-manufacturer',
  templateUrl: './manufacturer.component.html',
  styleUrls: ['./manufacturer.component.css']
})
export class ManufacturerComponent implements OnInit {

  form: FormGroup;
  manufacturer?: Manufacturer;
  itemLevel: string = 'Manufacturer';
  properties: Array<ItemProperty>;

  constructor(private formBuilder: FormBuilder, private navigation: NavigationComponent, private router: Router,
              private utilsService: UtilsService, private manufacturersService: ManufacturersService, private propertiesService: ItemPropertiesService) {
    this.form = this.formBuilder.group({
      manufacturerName: ['', Validators.required],
    });
    // this.manufacturer = Manufacturer.empty();
    this.properties = new Array<ItemProperty>();
  }

  ngOnInit(): void {
    this.fetchPropertiesData();
    this.fetchManufacturerData();
  }

  onSubmit(): void {
    if (this.manufacturer) {
      let properties: { [k: string]: ItemPropertyValue } = {};
      this.properties.forEach(property => {
        if (property.value && property.value !== '') {
          properties[property.token] = new ItemPropertyValue(property.value);
        }
      });

      const manufacturer: Manufacturer = {
        id: this.manufacturer.id,
        name: this.form.value.manufacturerName,
        productGroups: this.manufacturer.productGroups,
        properties: new ItemPropertiesHolder(properties)
      };
      console.log(manufacturer);
      // this.manufacturersService.saveManufacturer(manufacturer).subscribe(manufacturers => this.manufacturersService.shareManufacturers(manufacturers));
      // this.utilsService.openSnackBar(manufacturer.name + ' manufacturer is saved');
      // this.navigateToManufacturers();
    } else {
      this.utilsService.openSnackBar('Manufacturer is empty')
    }
  }

  onCancel(): void {
    this.navigateToManufacturers();
  }

  addProductGroup(productGroup: any) {
    console.log(productGroup);
    // this.manufacturer?.productGroups.push(productGroup);
  }

  private navigateToManufacturers(): void {
    this.manufacturer = Manufacturer.empty();
    this.navigation.toggleEditor();
    this.router.navigate(['', {outlets: {editor: null}}]).then(() => {
    });
  }

  private fetchManufacturerData(): void {
    this.manufacturersService.sharingManufacturer.subscribe(manufacturer => {
      if (manufacturer.id > 0) {
        this.manufacturersService.getDecoratedManufacturer(manufacturer.id).subscribe(decoratedManufacturer => {
          this.properties.forEach(property => {
            property.value = decoratedManufacturer.properties.properties[property.token]?.value;
          });
          this.manufacturer = decoratedManufacturer;
        });
      } else {
        this.manufacturer = manufacturer;
      }
    });
  }

  private fetchPropertiesData(): void {
    this.propertiesService.getProperties(this.itemLevel).subscribe(
      properties => {
        this.reInitForm(properties);
        this.properties = properties;
      },
      error => {
        this.utilsService.openSnackBar(error.message);
      }
    );
  }

  private reInitForm(properties: ItemProperty[]) {
    let controlsConfig: { [k: string]: any } = {
      manufacturerName: ['', Validators.required],
      productGroups: ['']
    };
    properties.forEach(property => {
      controlsConfig['manufacturer.properties.property.' + property.token] = [''];
    });
    this.form = this.formBuilder.group(controlsConfig);
  }
}
