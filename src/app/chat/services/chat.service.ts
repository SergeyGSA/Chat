import {Injectable} from '@angular/core'
import {HttpClient, HttpHeaders} from '@angular/common/http'
import {Observable} from 'rxjs'
import {environment} from 'src/environments/environment'
import {IChat} from '../types/chat.interface'

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private readonly httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'}),
  }

  constructor(private readonly http: HttpClient) {}

  public getChats(): Observable<IChat[]> {
    return this.http.get<IChat[]>(`${environment.API_URL}chats`)
  }

  public getChatById(id: string): Observable<IChat> {
    return this.http.get<IChat>(`${environment.API_URL}chats/${id}`)
  }

  public sendMessage(chat: IChat) {
    return this.http.patch<IChat>(
      `${environment.API_URL}chats/${chat.id}`,
      chat,
      this.httpOptions
    )
  }

  public createChat(chat: IChat) {
    return this.http.post<IChat>(
      `${environment.API_URL}chats`,
      chat,
      this.httpOptions
    )
  }
}
