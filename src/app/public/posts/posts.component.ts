import { Component } from '@angular/core';
import { map, Observable, take } from 'rxjs';
import { PostsService } from '../../persistent/functionalities/posts.service';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
})
export class PostsComponent {
  posts$!: Observable<any[]>;

  constructor(public postsService: PostsService) {
    this.posts$ = postsService.list().pipe(map((res: any) => res.posts));
  }
}
