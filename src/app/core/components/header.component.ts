import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

type ActivePage = 'Photos' | 'Favorites';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  activeLink: ActivePage = 'Photos';
  currentUrl$: Observable<string>;

  constructor(private readonly router: Router) {}

  ngOnInit(): void {
    this.initCurrentUrl();
  }

  navigateToPhotos(): void {
    this.router.navigateByUrl('/');
    this.activeLink = 'Photos';
  }

  navigateToFavorites(): void {
    this.router.navigateByUrl('/favorites');
    this.activeLink = 'Favorites';
  }

  private initCurrentUrl(): void {
    this.currentUrl$ = this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map((event) => (event as NavigationEnd).url)
    );
  }
}
