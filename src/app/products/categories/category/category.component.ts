import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Category} from "../../../services/categories/category";
import {NavigationComponent} from "../../../navigation/navigation.component";
import {Router} from "@angular/router";
import {CategoriesService} from "../../../services/categories/categories.service";
import {UtilsService} from "../../../services/utils/utils.service";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  form: FormGroup;
  category: Category | undefined;

  constructor(private formBuilder: FormBuilder, private navigation: NavigationComponent, private router: Router, private utilsService: UtilsService, private categoriesService: CategoriesService) {
    this.form = this.formBuilder.group({
      categoryName: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.categoriesService.sharingCategory.subscribe(category => this.category = category);
  }

  onSubmit(): void {
    const category: Category = {
      id: this.category ? this.category.id : BigInt(0),
      name: this.form.value.categoryName,
    };
    this.categoriesService.saveCategory(category).subscribe(categories => this.categoriesService.shareCategories(categories));
    this.utilsService.openSnackBar(category.name + ' category is saved');
    this.navigateToCategories();
  }

  onCancel(): void {
    this.navigateToCategories();
  }

  private navigateToCategories(): void {
    this.category = undefined;
    this.navigation.toggleEditor();
    this.router.navigate(['', {outlets: {editor: null}}]).then(() => {
    });
  }
}
