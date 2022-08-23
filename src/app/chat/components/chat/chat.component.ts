import {Component, OnDestroy, OnInit} from '@angular/core'
import {
  combineLatest,
  delay,
  map,
  Observable,
  Subscription,
  switchMap,
} from 'rxjs'
import {ChatService} from '../../services/chat.service'
import {IChat, IMessage} from '../../types/chat.interface'

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit, OnDestroy {
  protected chats$: Observable<IChat[]>
  protected chat$!: Observable<IChat>
  protected searchedContact: string = ''
  protected updatedChat!: IChat
  private chuckNorrisJoke$: Observable<IMessage>
  private sendMessageSub!: Subscription
  private chuckNorrisSub!: Subscription

  constructor(private readonly chatService: ChatService) {
    this.chats$ = this.chatService.getChats()
    this.chuckNorrisJoke$ = this.chatService.getChuckNorrisJoke()
  }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {}

  ngOnDestroy(): void {
    ;[this.sendMessageSub, this.chuckNorrisSub].forEach((sub: Subscription) => {
      if (sub) {
        sub.unsubscribe()
      }
    })
  }

  protected getChatById(id: string): void {
    this.chat$ = this.chatService.getChatById(id)
  }

  protected sendMessage(message: IMessage): void {
    this.sendMessageSub = this.chat$
      .pipe(
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
        )
      )
      .subscribe(
        (updatedChat: IChat) => {
          this.updatedChat = updatedChat
        },
        (err) => console.log(err),
        () => {
          this.generateChuckNorrisMessage()
        }
      )
  }

  protected searchContact(searchValue: string): void {
    this.searchedContact = searchValue
  }

  private generateChuckNorrisMessage(): void {
    this.chuckNorrisSub = combineLatest([this.chat$, this.chuckNorrisJoke$])
      .pipe(
        map(([chat, joke]) => {
          const updatedChat: IChat = {
            id: chat.id,
            name: chat.name,
            photo: chat.photo,
            history: [...chat.history, joke],
          }
          return updatedChat
        }),
        delay(10000),
        switchMap((updatedChat: IChat) =>
          this.chatService.sendMessage(updatedChat)
        )
      )
      .subscribe((updatedChat: IChat) => (this.updatedChat = updatedChat))
  }
}
