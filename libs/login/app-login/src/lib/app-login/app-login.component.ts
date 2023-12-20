import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { UiPageComponent } from '@budgt/shared/components';
import { AuthService } from '@budgt/shared/services';

@Component({
  selector: 'budgt-app-login',
  standalone: true,
  imports: [MatButtonModule, AsyncPipe, UiPageComponent],
  templateUrl: './app-login.component.html',
  styleUrl: './app-login.component.css',
})
export class AppLoginComponent {
  authService = inject(AuthService);

  async onLogin() {
    await this.authService.signIn();
  }
}
