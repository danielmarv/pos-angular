import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { User } from '@core/models/user.model';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersTableComponent {
  @Input() data: User[] = [];

  displayedColumns: string[] = ['id', 'name', 'email', 'shift', 'role'];
}
