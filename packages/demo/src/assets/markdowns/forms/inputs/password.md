```html
<form>
  <ngx-input
    type="text"
    label="Username"
    [(ngModel)]="usernameValue"
    name="input5"
    required
    [requiredIndicator]="false"
    hint="Enter a Username between four and 12 characters"
    [minlength]="4"
    [maxlength]="12"
  ></ngx-input>
  <ngx-input
    type="password"
    [label]="'Password'"
    [(ngModel)]="passwordValue"
    name="input6"
    required
    hint="Enter a password"
    passwordToggleEnabled
  ></ngx-input>
  <button class="btn" type="submit">Login</button>
</form>
```
