import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {UtilsService} from "../../services/utils/utils.service";
import {NavigationComponent} from "../../navigation/navigation.component";
import {Router} from "@angular/router";
import {ManufacturersService} from "../../services/manufacturers/manufacturers.service";
import {Manufacturer} from "../../services/manufacturers/Manufacturer";

@Component({
  selector: 'app-manufacturers',
  templateUrl: './manufacturers.component.html',
  styleUrls: ['./manufacturers.component.css']
})
export class ManufacturersComponent implements OnInit {

  constructor(private utilsService: UtilsService, private manufacturersService: ManufacturersService, private navigation: NavigationComponent, private router: Router) {
  }

  form: any = {};
  manufacturers: Manufacturer[] = new Array<Manufacturer>();

  displayedColumns: string[] = ['name', 'actions'];
  dataSource = new MatTableDataSource(this.manufacturers);

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

  editManufacturer(manufacturer: Manufacturer): void {
    this.manufacturersService.shareManufacturer(manufacturer);
    this.router.navigate(['', {outlets: {editor: ['products', 'manufacturer', manufacturer.id]}}], {skipLocationChange: true}).then(() => {
    });
    this.navigation.toggleEditor();
  }

  deleteManufacturer(manufacturer: Manufacturer): void {
    this.manufacturersService.deleteManufacturer(manufacturer).subscribe(manufacturers => {
      this.manufacturers = manufacturers;
      this.dataSource.data = this.manufacturers;
    });
    this.utilsService.openSnackBar(manufacturer.name + ' manufacturer is deleted');
  }

  createManufacturer() {
    this.manufacturersService.shareManufacturer(Manufacturer.empty());
    this.router.navigate(['', {outlets: {editor: ['products', 'manufacturer', 'new']},}], {skipLocationChange: true}).then(() => {
    });
    this.navigation.toggleEditor();
  }

  ngOnInit(): void {

    this.manufacturersService.getAllNotDecorated().subscribe(
      manufacturers => {
        this.manufacturers = manufacturers;
        this.dataSource.data = this.manufacturers;
      },
      error => {
        this.utilsService.openSnackBar(error.message);
      }
    );

    this.manufacturersService.sharingManufacturers.subscribe(manufacturers => {
      this.manufacturers = manufacturers;
      this.dataSource.data = manufacturers;
    });
  }
}
