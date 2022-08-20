import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core'
import {IChat} from '../../types/chat.interface'

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  @Input()
  public chat!: IChat

  @Output()
  public chatId = new EventEmitter<number>()

  constructor() {}

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {}

  protected openHistory(id: number): void {
    this.chatId.emit(id)
  }
}
