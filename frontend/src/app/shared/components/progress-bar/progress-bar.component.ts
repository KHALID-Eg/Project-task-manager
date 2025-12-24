import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectProgress } from '../../../shared/models';

@Component({
    selector: 'app-progress-bar',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="progress-container">
      <div class="progress-header">
        <span class="progress-label">Progress</span>
        <span class="progress-percentage">{{ progress?.progressPercentage?.toFixed(0) || 0 }}%</span>
      </div>
      <div class="progress-bar">
        <div
          class="progress-fill"
          [style.width.%]="progress?.progressPercentage || 0"
        ></div>
      </div>
      <div class="progress-stats">
        <span>{{ progress?.completedTasks || 0 }} of {{ progress?.totalTasks || 0 }} tasks completed</span>
      </div>
    </div>
  `,
    styles: [`
    .progress-container {
      background: white;
      padding: 20px;
      border-radius: 12px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
    }

    .progress-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
    }

    .progress-label {
      font-weight: 600;
      color: #374151;
    }

    .progress-percentage {
      font-weight: 700;
      color: #667eea;
      font-size: 18px;
    }

    .progress-bar {
      height: 12px;
      background: #e5e7eb;
      border-radius: 6px;
      overflow: hidden;
    }

    .progress-fill {
      height: 100%;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 6px;
      transition: width 0.5s ease;
    }

    .progress-stats {
      margin-top: 12px;
      color: #6b7280;
      font-size: 14px;
    }
  `]
})
export class ProgressBarComponent implements OnChanges {
    @Input() progress: ProjectProgress | null = null;

    ngOnChanges(): void {
        // Component updates automatically when progress input changes
    }
}
