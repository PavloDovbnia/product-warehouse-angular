import {Component, OnInit, ViewChild} from '@angular/core';
import {UtilsService} from "../services/utils/utils.service";
import {Router} from "@angular/router";
import {NavigationComponent} from "../navigation/navigation.component";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {ProductStockData} from "../services/products-stock-data/product-stock-data";
import {ProductsStockDataService} from "../services/products-stock-data/products-stock-data.service";
import {ProductsProvidersService} from "../services/products-providers/products-providers.service";
import {ProductProvider} from "../services/products-providers/product-provider";
import {ProductProviders} from "../services/products-providers/product-providers";

@Component({
  selector: 'app-products-stock-data',
  templateUrl: './products-stock-data.component.html',
  styleUrls: ['./products-stock-data.component.css']
})
export class ProductsStockDataComponent implements OnInit {

  productsStockData = new Array<ProductStockData>();
  productsProviders = new Map<bigint, Array<ProductProvider>>();

  constructor(private productsStockDataService: ProductsStockDataService, private utilsService: UtilsService,
              private router: Router, private navigation: NavigationComponent, private productsProvidersService: ProductsProvidersService) {
  }

  displayedColumns: string[] = ['productName', 'stockValue', 'providers', 'actions'];
  dataSource = new MatTableDataSource(this.productsStockData);

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

  ngOnInit(): void {
    this.initData();

    this.productsProvidersService.sharingProductProvidersSaved.subscribe(isSaved => {
      if (isSaved) {
        this.initData();
      }
    });
  }

  initData() {
    this.productsStockDataService.getValues().subscribe(data => {
      this.productsStockData = data;
      this.productsProvidersService.getDecoratedProductsProviders(this.productsStockData.map(productStockData => productStockData.productId)).subscribe(providers => {
        this.productsProviders = providers;
      });

      this.dataSource.data = this.productsStockData;
    }, error => {
      this.utilsService.openSnackBar(error.message);
    });
  }

  getProductProviders(productId: bigint): Array<ProductProvider> {
    return this.productsProviders.get(BigInt(productId)) as Array<ProductProvider>;
  }

  editProductProviders(productStockData: ProductStockData): void {
    const providers = this.productsProviders.get(BigInt(productStockData.productId)) as Array<ProductProvider>;
    this.productsProvidersService.shareProductProviders(new ProductProviders(productStockData.product, providers));
    this.router.navigate(['', {outlets: {editor: ['product-provider', productStockData.productId]}}], {skipLocationChange: true}).then(() => {
    });
    this.navigation.toggleEditor();
  }

  // editUser(user: User): void {
  //   this.usersService.shareUser(user);
  //   this.router.navigate(['', {outlets: {editor: ['users', 'user', user.id]}}]).then(() => {
  //   });
  //   this.navigation.toggleEditor();
  // }
}
