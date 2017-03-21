import { Component, OnInit, OnChanges } from '@angular/core';
import { Input, SimpleChanges } from '@angular/core';

import { DropdownModule } from 'primeng/primeng';

import { SearchService } from '../../../service/search.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
  providers: [DropdownModule]
})
export class AddComponent {
  private name: string;
  private range = 'all';
  private userList = [];

  constructor(
    private searchService: SearchService
  ) {

  }

  public search() {
    const info = {
      name: this.name,
      range: this.range
    };

    this.searchService.getUserList(info)
      .subscribe(
      succ => this.userList = succ,
      err => console.log(err),
    );
  }

  public addFriend(id) {
    this.searchService.addFriend(id)
      .subscribe(
      succ => console.log(succ),
      err => console.log(err),
    );
  }

}
