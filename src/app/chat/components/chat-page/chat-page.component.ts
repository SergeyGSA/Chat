import {
  AfterViewChecked,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core'
import {
  BehaviorSubject,
  delay,
  Subject,
  switchMap,
  tap,
  takeUntil,
  Observable,
} from 'rxjs'
import {ChatService} from '../../services/chat.service'
import {IChat, IMessage} from '../../types/chat.interface'

@Component({
  selector: 'app-chat',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatPageComponent implements OnInit, AfterViewChecked, OnDestroy {
  protected chats$ = new BehaviorSubject<IChat[] | null>(null)
  protected chatInstance$ = new BehaviorSubject<IChat | null>(null)
  protected searchedContact: string = ''
  protected isNotificationActive$ = new BehaviorSubject<boolean>(false)
  protected isContactsOpen$ = new BehaviorSubject<boolean>(false)
  private sub$ = new Subject<void>()

  @ViewChild('chatHistory')
  private chatHistory!: ElementRef

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.refreshChats()
  }

  ngAfterViewChecked(): void {
    // Moved scroll to bottom when get a new message
    const history = this.chatHistory.nativeElement as HTMLElement
    history.scrollTo(0, history.scrollHeight)
  }

  ngOnDestroy(): void {
    this.sub$.next()
    this.sub$.complete()
  }

  protected getChatById(id: string): void {
    this.chatService
      .getChatById(id)
      .pipe(takeUntil(this.sub$))
      .subscribe((chat: IChat) => {
        this.chatInstance$.next(chat)
      })
  }

  protected sendMessage(message: IMessage): void {
    const instance = this.chatInstance$.getValue()
    if (instance) {
      this.chatService
        .sendMessage(this.updateToLastHistoryChat(message, instance))
        .pipe(
          tap((chatResponse: IChat) => {
            this.handleSendMessageResponse(chatResponse)
          }),
          delay(10000),
          switchMap((chatResponse) => this.chuckNorrisResponse(chatResponse)),
          takeUntil(this.sub$)
        )
        .subscribe({
          next: (chat: IChat) => {
            this.handleSendMessageResponse(chat)
          },
          error: (err) => console.error(err),
          complete: () => {
            this.isNotificationActive$.next(true)
            setTimeout(() => this.isNotificationActive$.next(false), 3000)
          },
        })
    }
  }

  protected searchContact(searchValue: string): void {
    this.searchedContact = searchValue
  }

  protected toggleContacts(): void {
    const isOpen = this.isContactsOpen$.getValue()
    this.isContactsOpen$.next(!isOpen)
  }

  private refreshChats(): void {
    this.chatService
      .getChats()
      .pipe(takeUntil(this.sub$))
      .subscribe((chats: IChat[]) => {
        this.chats$.next(chats)
      })
  }

  private updateToLastHistoryChat(message: IMessage, chat: IChat): IChat {
    return {
      ...chat,
      history: [...chat.history, message],
    }
  }

  private shouldUpdateChat(chatResponse: IChat): boolean {
    const instance = this.chatInstance$.getValue()
    return chatResponse.id === instance?.id
  }

  private handleSendMessageResponse(chat: IChat): void {
    if (this.shouldUpdateChat(chat)) {
      this.chatInstance$.next(chat)
    }
    this.refreshChats()
  }

  private chuckNorrisResponse(latestChat: IChat): Observable<IChat> {
    return this.chatService.getChuckNorrisJoke().pipe(
      switchMap((joke) => {
        return this.chatService.sendMessage(
          this.updateToLastHistoryChat(joke, latestChat)
        )
      })
    )
  }
}
