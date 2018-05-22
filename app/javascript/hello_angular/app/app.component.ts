import { Component } from '@angular/core';
import AppHTML from './templates/app.html';
import './styles/app.component.scss';

@Component({
  selector: 'hello-angular',
  template: AppHTML
})
export class AppComponent {
  name = 'Peter';
}
