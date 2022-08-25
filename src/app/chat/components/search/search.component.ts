import {
  Component,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent {
  @Output()
  public searchValueEvent = new EventEmitter<string>()

  constructor() {}

  protected searchContact(event: Event): void {
    const target = event.target as HTMLInputElement
    this.searchValueEvent.emit(target.value)
  }
}
