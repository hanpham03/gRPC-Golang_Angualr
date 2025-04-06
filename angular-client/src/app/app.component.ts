import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // <-- Thêm dòng này
import { HelloService } from './service/hello.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div style="padding: 20px; font-family: Arial;">
      <h1>gRPC Demo</h1>
      <input
        [(ngModel)]="name"
        placeholder="Enter your name"
        style="padding: 8px;"
      />
      <button (click)="sendRequest()" style="margin-left: 10px; padding: 8px;">
        Say Hello
      </button>
      <p *ngIf="response" style="margin-top: 20px; color: green;">
        {{ response }}
      </p>
    </div>
  `,
})
export class AppComponent {
  name = '';
  response = '';

  constructor(private helloService: HelloService) {}

  async sendRequest() {
    try {
      this.response = await this.helloService.sayHello(this.name);
    } catch (err) {
      console.error('Error:', err);
      this.response = 'Error calling gRPC service';
    }
  }
}
