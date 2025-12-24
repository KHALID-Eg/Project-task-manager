import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
    selector: 'app-layout',
    standalone: true,
    imports: [CommonModule, RouterModule],
    template: `
    <div class="layout">
      <nav class="navbar">
        <div class="navbar-brand">
          <span class="logo">📋</span>
          <span class="brand-name">Task Manager</span>
        </div>
        
        <div class="navbar-menu">
          <a routerLink="/dashboard" routerLinkActive="active" class="nav-link">
            <span class="nav-icon">📁</span>
            Projects
          </a>
        </div>

        <div class="navbar-end">
          <span class="user-email">{{ userEmail }}</span>
          <button class="btn-logout" (click)="logout()">
            Logout
          </button>
        </div>
      </nav>

      <main class="main-content">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
    styles: [`
    .layout {
      min-height: 100vh;
      background: #f3f4f6;
    }

    .navbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 24px;
      height: 64px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }

    .navbar-brand {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .logo {
      font-size: 24px;
    }

    .brand-name {
      color: white;
      font-size: 20px;
      font-weight: 700;
    }

    .navbar-menu {
      display: flex;
      gap: 8px;
    }

    .nav-link {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 16px;
      color: rgba(255, 255, 255, 0.9);
      text-decoration: none;
      border-radius: 8px;
      transition: background 0.2s;
      font-weight: 500;
    }

    .nav-link:hover,
    .nav-link.active {
      background: rgba(255, 255, 255, 0.2);
      color: white;
    }

    .nav-icon {
      font-size: 16px;
    }

    .navbar-end {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .user-email {
      color: rgba(255, 255, 255, 0.9);
      font-size: 14px;
    }

    .btn-logout {
      padding: 8px 16px;
      background: rgba(255, 255, 255, 0.2);
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-weight: 500;
      transition: background 0.2s;
    }

    .btn-logout:hover {
      background: rgba(255, 255, 255, 0.3);
    }

    .main-content {
      padding: 24px;
      max-width: 1200px;
      margin: 0 auto;
    }
  `]
})
export class LayoutComponent {
    userEmail: string = '';

    constructor(
        private authService: AuthService,
        private router: Router
    ) {
        this.userEmail = this.authService.getEmail() || '';
    }

    logout(): void {
        this.authService.logout();
        this.router.navigate(['/login']);
    }
}
