import { Component } from '@angular/core';
import { UserService } from '../../core/services/user.service';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent {
  users$!: Observable<any[]>;

  constructor(public usersService: UserService) {
    this.users$ = usersService
      .list()
      .pipe(map((res: any) => res.users));
  }
}
