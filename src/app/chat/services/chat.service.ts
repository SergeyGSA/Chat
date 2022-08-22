import {Injectable} from '@angular/core'
import {HttpClient, HttpHeaders} from '@angular/common/http'
import {map, Observable} from 'rxjs'
import {environment} from 'src/environments/environment'
import {IChat} from '../types/chat.interface'

interface IJoke {
  categories: unknown[]
  created_at: string
  icon_url: string
  id: string
  updated_at: string
  url: string
  value: string
}
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

  // Generates a random joke from https://api.chucknorris.io
  public getChuckNorrisJoke(): Observable<string> {
    return this.http
      .get<IJoke>(`https://api.chucknorris.io/jokes/random`)
      .pipe(map((joke: IJoke) => joke.value))
  }
}
