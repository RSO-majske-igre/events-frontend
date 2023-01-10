import {Injectable} from "@angular/core";
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PageDto} from "../../events/model/page.model";
import {ParticipantDto} from "../model/participantDto";
import {DormDto} from "../model/dormDto";

@Injectable({
  providedIn: 'root'
})
export class DormsApiService {
  private baseUrl = `${environment.participantsBaseUrl}/dorms`;

  constructor(private http: HttpClient) {
  }

  public getDorms(): Observable<DormDto[]> {
    return this.http.get<DormDto[]>(this.baseUrl);
  }

  public getDormById(id: string): Observable<DormDto> {
    return this.http.get<DormDto>(`${this.baseUrl}/${id}`);
  }

  public upsertParticipant(dorm: DormDto): Observable<DormDto> {
    return dorm.id
      ? this.http.put<DormDto>(this.baseUrl, dorm)
      : this.http.post<DormDto>(this.baseUrl, dorm);
  }
}
