import {Component, OnInit, ViewChild} from '@angular/core';

import {CategoriesService} from '../../services/categories/categories.service';
import {Category} from "../../services/categories/category";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {NavigationComponent} from "../../navigation/navigation.component";
import {Router} from "@angular/router";
import {UtilsService} from "../../services/utils/utils.service";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  constructor(private utilsService: UtilsService, private categoriesService: CategoriesService, private navigation: NavigationComponent, private router: Router) {
  }

  form: any = {};
  categories: Category[] = new Array<Category>();

  displayedColumns: string[] = ['name', 'actions'];
  dataSource = new MatTableDataSource(this.categories);

  @ViewChild(MatPaginator) set matPaginator(paginator: MatPaginator) {
    this.dataSource.paginator = paginator;
  }

  @ViewChild(MatSort) set MatSort(sort: MatSort) {
    this.dataSource.sort = sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editCategory(category: Category): void {
    this.categoriesService.shareCategory(category);
    this.router.navigate(['', {outlets: {editor: ['products', 'categories', category.id]}}]).then(() => {
    });
    this.navigation.toggleEditor();
  }

  deleteCategory(category: Category): void {
    this.categoriesService.deleteCategory(category).subscribe(categories => {
      this.categories = categories;
      this.dataSource.data = this.categories;
    });
    this.utilsService.openSnackBar(category.name + ' category is deleted');
  }

  createCategory() {
    this.categoriesService.shareCategory(Category.empty());
    this.router.navigate(['', {outlets: {editor: ['products', 'categories', 'new']},}], {skipLocationChange: true}).then(() => {
    });
    this.navigation.toggleEditor();
  }

  ngOnInit(): void {

    this.categoriesService.getCategories().subscribe(
      categories => {
        this.categories = categories;
        this.dataSource.data = this.categories;
      },
      error => {
        this.utilsService.openSnackBar(error.message);
      }
    );

    this.categoriesService.sharingCategories.subscribe(categories => {
      this.categories = categories;
      this.dataSource.data = categories;
    });
  }
}
