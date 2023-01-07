import {Injectable} from "@angular/core";
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PageDto} from "../../events/model/page.model";
import {ParticipantDto} from "../model/participantDto";

@Injectable({
  providedIn: "root"
})
export class ParticipantsApiService {
  private baseUrl = `${environment.participantsBaseUrl}/participants`;

  constructor(private http: HttpClient) {
  }

  public getParticipants(page: number, perPage: number): Observable<PageDto<ParticipantDto>> {
    return this.http.get<PageDto<ParticipantDto>>(`${this.baseUrl}?page=${page}&perPage=${perPage}`);
  }

  public getParticipantsById(ids: string[]): Observable<ParticipantDto[]> {
    return this.http.put<ParticipantDto[]>(`${this.baseUrl}/find-by-ids`, ids);
  }

  public getParticipant(id: string): Observable<ParticipantDto> {
    return this.http.get<ParticipantDto>(`${this.baseUrl}/${id}`);
  }

  public upsertParticipant(participant: ParticipantDto): Observable<ParticipantDto> {
    return participant.id
      ? this.http.put<ParticipantDto>(this.baseUrl, participant)
      : this.http.post<ParticipantDto>(this.baseUrl, participant);
  }
}
