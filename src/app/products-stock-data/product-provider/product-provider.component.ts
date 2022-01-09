import {Component, OnInit} from '@angular/core';
import {ProductsProvidersService} from "../../services/products-providers/products-providers.service";
import {ProductProviders} from "../../services/products-providers/product-providers";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {NavigationComponent} from "../../navigation/navigation.component";
import {Router} from "@angular/router";
import {UtilsService} from "../../services/utils/utils.service";
import {User} from "../../services/users/user";

@Component({
  selector: 'app-product-provider',
  templateUrl: './product-provider.component.html',
  styleUrls: ['./product-provider.component.css']
})
export class ProductProviderComponent implements OnInit {

  productProviders?: ProductProviders;
  form: FormGroup;
  providers?: Array<string>;
  chosenProviders?: Array<string>;
  mappedProviders?: Map<string, User>;

  constructor(private formBuilder: FormBuilder, private navigation: NavigationComponent, private router: Router,
              private utilsService: UtilsService, private productsProvidersService: ProductsProvidersService) {
    this.form = this.initForm();
  }

  ngOnInit(): void {
    this.productsProvidersService.sharingProductProviders.subscribe(productProviders => {
      this.productProviders = {...productProviders};
      this.chosenProviders = this.productProviders?.providers.map(provider => provider.provider.username);
    });
    this.productsProvidersService.getProviders().subscribe(providers => {
      this.mappedProviders = new Map<string, User>();
      this.providers = new Array<string>();
      providers.forEach(provider => {
        this.providers?.push(provider.username);
        this.mappedProviders?.set(provider.username, provider);
      });
    });
  }

  onSubmit(): void {
    if (this.productProviders) {

      const providersIdsToAdd = new Array<bigint>();
      const providersIdsToDelete = new Array<bigint>();

      this.chosenProviders?.forEach(chosenProvider => {
        const provider = this.mappedProviders?.get(chosenProvider) as User;
        providersIdsToAdd.push(provider.id);
      });

      this.productProviders.providers.forEach(provider => {
        let isChosen = false;
        providersIdsToAdd.forEach(providerIdToAdd => {
          if (provider.provider.id === providerIdToAdd) {
            isChosen = true;
            return;
          }
        });
        if (!isChosen) {
          providersIdsToDelete.push(provider.providerId);
        }
      });

      this.productsProvidersService.save(this.productProviders.productId, providersIdsToAdd, providersIdsToDelete).subscribe(data => {
          this.utilsService.openSnackBar(this.productProviders?.product.name + 'Product to Providers binding has been successfully saved');
          this.productsProvidersService.shareProductProvidersSaved(true);
          this.navigateToProductsStockData();
        },
        error => this.utilsService.openSnackBar(error.message));
    } else {
      this.utilsService.openSnackBar('Product to Providers binding is empty');
    }
  }

  onCancel(): void {
    this.navigateToProductsStockData();
  }

  private navigateToProductsStockData(): void {
    this.productProviders = undefined;
    this.navigation.toggleEditor();
    this.router.navigate(['', {outlets: {editor: null}}]).then(() => {
    });
  }

  private initForm(): FormGroup {
    return this.formBuilder.group({
      providers: new FormControl('', [Validators.required, Validators.minLength(1)]),
    });
  }

}
