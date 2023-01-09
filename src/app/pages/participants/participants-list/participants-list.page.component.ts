import {Component, OnInit} from "@angular/core";
import {ParticipantsApiService} from "../../../api/participants/services/participants-api.service";
import {ComponentState} from "../../../types/component-state.type";
import {ParticipantDto} from "../../../api/participants";

@Component({
  selector: 'app-participants-list',
  templateUrl: 'participants-list.page.component.html'
})
export class ParticipantsListPageComponent implements OnInit {
  public participants: ParticipantDto[] = [];
  public currentPage = 1;
  public allPages = 1;
  public componentState: ComponentState = "default";

  constructor(private participantsApiService: ParticipantsApiService) {
  }

  ngOnInit() {
    this.getParticipants();
  }

  public getParticipants(page = 0, perPage = 25): void {
    this.componentState = "loading";
    this.participantsApiService.getParticipants(page, perPage).subscribe({
      next: page => {
        this.participants = page.content;
        this.currentPage = page.number;
        this.allPages = page.totalPages;
        this.componentState = "loaded";
      },
      error: () => this.componentState = "error"
    });
  }

  public getPagesForPagination(): number[] {
    const array: number[] = [];
    for (let i = 0; i < this.allPages; i++) {
      array.push(i);
    }
    return array;
  }
}
