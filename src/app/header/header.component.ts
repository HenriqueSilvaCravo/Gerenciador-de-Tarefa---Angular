import { Component } from '@angular/core';
import { faSun } from '@fortawesome/free-solid-svg-icons';

export enum ETheme {
  ICON_MOON = 'dark',
  ICON_SUN = 'light'
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
faSun = faSun;

public icon: string = ETheme.ICON_MOON;

  public toggle() {
    const theme = document.body.classList.toggle('dark-theme');

    if (theme) {
      return (this.icon = ETheme.ICON_SUN);
    }

    return (this.icon = ETheme.ICON_MOON);
  }
}
