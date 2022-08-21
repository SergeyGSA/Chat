import {Component, OnInit} from '@angular/core'
import {FormControl, FormGroup} from '@angular/forms'

interface IMessageForm {
  message: FormControl<string>
}
@Component({
  selector: 'app-message-input',
  templateUrl: './message-input.component.html',
  styleUrls: ['./message-input.component.scss'],
})
export class MessageInputComponent implements OnInit {
  protected messageForm: FormGroup<IMessageForm>

  constructor() {
    this.messageForm = new FormGroup<IMessageForm>({
      message: new FormControl('', {nonNullable: true}),
    })
  }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {}

  protected sendMessage() {}
}
