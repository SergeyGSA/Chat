import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {ChatComponent} from 'src/app/chat/components/chat/chat.component'
import {SearchComponent} from 'src/app/chat/components/search/search.component';
import { ContactComponent } from './components/contact/contact.component'

@NgModule({
  declarations: [ChatComponent, SearchComponent, ContactComponent],
  imports: [CommonModule],
})
export class ChatModule {}
