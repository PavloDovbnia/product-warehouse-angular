import {Component, OnInit} from '@angular/core';
import {InitService} from "../services/init/init.service";
import {InitDataStorageService} from "../services/init/init-data-storage.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private initService: InitService, private initDataStorage: InitDataStorageService) {
  }

  ngOnInit(): void {
    this.initDataStorage.prepareData();
  }

}
