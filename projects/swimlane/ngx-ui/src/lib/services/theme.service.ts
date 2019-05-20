import { Injectable } from "@angular/core";
import { ThemeEnum } from "../utils";

@Injectable()
export class ThemeService {
  currentTheme = 'night';
  themes = Object.values(ThemeEnum);

  setTheme(theme: string) {
    this.currentTheme = theme;
    const elm = document.querySelector('body');

    // remove old
    elm.classList.remove('day-theme');
    elm.classList.remove('night-theme');
    elm.classList.remove('moonlight-theme');

    // add new
    elm.classList.add(`${theme}-theme`);
  }
}
