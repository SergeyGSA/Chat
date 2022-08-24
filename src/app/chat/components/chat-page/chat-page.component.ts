import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core'
import {combineLatest, delay, map, Observable, switchMap, tap} from 'rxjs'
import {ChatService} from '../../services/chat.service'
import {IChat, IMessage} from '../../types/chat.interface'

@Component({
  selector: 'app-chat',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatPageComponent implements OnInit {
  protected chats$: Observable<IChat[]>
  protected chat$!: Observable<IChat>
  protected searchedContact: string = ''
  protected isContactOpened = false
  private chuckNorrisJoke$: Observable<IMessage>

  constructor(private chatService: ChatService) {
    this.chats$ = this.chatService.getChats()
    this.chuckNorrisJoke$ = this.chatService.getChuckNorrisJoke()
  }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {}

  protected getChatById(id: string): void {
    this.chat$ = this.chatService.getChatById(id)
  }

  protected sendMessage(message: IMessage): void {
    this.chat$ = this.chat$.pipe(
      map((chat: IChat) => {
        const updatedChat: IChat = {
          id: chat.id,
          name: chat.name,
          photo: chat.photo,
          history: [...chat.history, message],
        }
        return updatedChat
      }),
      switchMap((updatedChat: IChat) =>
        this.chatService.sendMessage(updatedChat)
      ),
      // tap(() => this.generateChuckNorrisMessage())
      tap(() => console.log('work'))
    )
  }

  protected searchContact(searchValue: string): void {
    this.searchedContact = searchValue
  }

  // For small screens
  protected openContacts(): void {}

  private generateChuckNorrisMessage(): void {
    this.chat$ = combineLatest([this.chat$, this.chuckNorrisJoke$]).pipe(
      map(([chat, joke]) => {
        const updatedChat: IChat = {
          id: chat.id,
          name: chat.name,
          photo: chat.photo,
          history: [...chat.history, joke],
        }
        return updatedChat
      }),
      delay(1000),
      switchMap((updatedChat: IChat) =>
        this.chatService.sendMessage(updatedChat)
      )
    )
  }
}
