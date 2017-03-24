import { Component } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { Input, SimpleChanges } from '@angular/core';

import { DropdownModule } from 'primeng/primeng';

import { SearchService } from '../../../service/search.service';
import { ListService } from '../../../service/list.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
  providers: [DropdownModule]
})
export class AddComponent implements OnDestroy {
  private name: string;
  private range = 'all';
  private userList = [];
  private groupList = [];
  private create = true;
  private getUserListSub;
  private addFriendSub;
  private creatGroupSub;

  constructor(
    private searchService: SearchService,
    private ListService: ListService,
  ) {

  }

  // 查找分组或好友
  public search() {
    const info = {
      name: this.name,
      range: this.range
    };

    this.getUserListSub = this.searchService.getUserList(info)
      .subscribe(
      data => {
        if (data.success === true) {
          this.userList = data.content.user;
          this.groupList = data.content.group;
          this.create = false;
        } else {
          this.create = true;
        };
      },
      err => console.log(err),
    );
  }

  // 申请加为好友
  public addFriend(id) {
    this.searchService.addFriend(id)
      .subscribe(
      succ => console.log(succ),
      err => console.log(err),
    );
  }

  public joinGroup(id) {
    this.searchService.joinGroup(id)
      .subscribe(
      data => console.log(data),
      err => console.log(err),
    )
  }


  // 创建分组
  public creatGroup() {
    this.ListService.creatGroup(this.name)
      .subscribe(
      data => {
        if (data.success) {
          this.ListService.groupList.push(data.content);
        }
      },
      err => console.log(err)
      );
  }

  ngOnDestroy() {
    if (this.getUserListSub) {
      this.getUserListSub.unsubscribe();
    }
    if (this.addFriendSub) {
      this.addFriendSub.unsubscribe();
    }
    if (this.creatGroupSub) {
      this.creatGroupSub.unsubscribe();
    }
  }

}
