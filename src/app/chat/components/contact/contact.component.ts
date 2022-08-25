import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core'
import {IChat} from '../../types/chat.interface'

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactComponent {
  @Input()
  public contact!: IChat

  @Output()
  public chatIdEvent = new EventEmitter<string>()

  constructor() {}

  protected openHistory(id: string): void {
    this.chatIdEvent.emit(id)
  }
}
