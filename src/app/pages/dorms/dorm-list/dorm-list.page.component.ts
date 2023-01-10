import {Component, OnInit} from "@angular/core";
import {EventDto} from "../../../api/events";
import {ComponentState} from "../../../types/component-state.type";
import {EventsApiService} from "../../../api/events/services/events-api.service";
import {DormDto} from "../../../api/participants";
import {DormsApiService} from "../../../api/participants/services/dorms-api.service";

@Component({
  selector: 'app-dorm-list',
  templateUrl: 'dorm-list.page.component.html'
})
export class DormListPageComponent implements OnInit {

  public dorms: DormDto[] = [];
  public componentState: ComponentState = "default";

  constructor(private dormApi: DormsApiService) {
  }

  ngOnInit() {
    this.getDorms();
  }

  public getDorms(): void {
    this.componentState = "loading";
    this.dormApi.getDorms().subscribe({
      next: dorms => {
        this.dorms = dorms;
        this.componentState = "loaded";
      },
      error: () => this.componentState = "error"
    });
  }
}
