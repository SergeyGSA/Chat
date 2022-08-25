import {
  AfterViewChecked,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core'
import {BehaviorSubject, delay, Subject, switchMap, tap, takeUntil} from 'rxjs'
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
  protected isActive$ = new BehaviorSubject<boolean>(false)
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
      const updatedChat: IChat = {
        ...instance,
        history: [...instance.history, message],
      }
      this.chatService
        .sendMessage(updatedChat)
        .pipe(
          tap((chatResponse: IChat) => {
            this.chatInstance$.next(chatResponse)
            this.refreshChats() // Refresh contacts
          }),
          switchMap((chatResponse) => {
            return this.chatService.getChuckNorrisJoke().pipe(
              delay(5000),
              switchMap((joke) => {
                const updatedChatNew: IChat = {
                  ...chatResponse,
                  history: [...chatResponse.history, joke],
                }
                return this.chatService.sendMessage(updatedChatNew)
              })
            )
          })
        )
        .pipe(
          takeUntil(this.sub$),
          tap(() => this.refreshChats()) // Refresh contacts
        )
        .subscribe({
          next: (chat: IChat) => this.chatInstance$.next(chat),
          error: (err) => console.error(err),
          complete: () => {
            this.isActive$.next(true)
            setTimeout(() => this.isActive$.next(false), 3000)
          },
        })
    }
  }

  protected searchContact(searchValue: string): void {
    this.searchedContact = searchValue
  }

  private refreshChats(): void {
    this.chatService
      .getChats()
      .pipe(takeUntil(this.sub$))
      .subscribe((chats: IChat[]) => {
        this.chats$.next(chats)
      })
  }
}
