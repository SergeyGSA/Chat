import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core'
import {FormControl, FormGroup} from '@angular/forms'
import {IMessage} from '../../types/chat.interface'

interface IMessageForm {
  message: FormControl<string>
}
@Component({
  selector: 'app-message-input',
  templateUrl: './message-input.component.html',
  styleUrls: ['./message-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageInputComponent implements OnInit {
  protected messageForm: FormGroup<IMessageForm>

  @Output()
  public newMessageEvent = new EventEmitter<IMessage>()

  constructor() {
    this.messageForm = new FormGroup<IMessageForm>({
      message: new FormControl('', {nonNullable: true}),
    })
  }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {}

  protected sendMessage() {
    const message: IMessage = {
      text: this.messageForm.value.message,
      date: Date.now(),
      direction: 'from',
    }

    this.newMessageEvent.emit(message)

    this.messageForm.reset()
  }
}
