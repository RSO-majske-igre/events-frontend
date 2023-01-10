import {ParticipantDto} from "../api/participants";
export interface SelectableParticipant extends ParticipantDto {
  selected?: boolean;
}
