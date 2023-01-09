import {Component, Input} from "@angular/core";
import {ParticipantDto} from "../../../api/participants";


@Component({
  selector: 'app-events-participants',
  templateUrl: 'participants-event.component.html'
})
export class ParticipantsEventComponent {
  @Input() public participants: Set<ParticipantDto> | undefined;
}
