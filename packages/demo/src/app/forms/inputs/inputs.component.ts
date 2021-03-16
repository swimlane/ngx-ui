import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'demo-inputs',
  templateUrl: './inputs.component.html',
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputsComponent {
  searchInputValue = '';
  inputValue = 'A Value';
  longInputValue = 'A very long input value that should be autosized';
  inputValue1: string;
  inputValue2: string;
  inputValue3: string;
  input5: string;
  inputDefaultVal = 'Defaulted!';
  numericValue: number;
  usernameValue: string;
  passwordValue: string;
  output: string;
  patternValue = 'Try removing all the spaces';

  importMd = `
  \`\`\`ts
  import { InputModule } from '@swimlane/ngx-ui/input';
  \`\`\`
  `;

  simpleTextMd = `
    \`\`\`html
    <ngx-input
      type="text"
      name="input1"
      [label]="'Name'"
      [(ngModel)]="inputValue"
      [autofocus]="true"
      [hint]="'Enter your first and last name'"
    ></ngx-input>
    \`\`\`
  `;

  simpleNoLabelMd = `
    \`\`\`html
    <ngx-input
      type="text"
      name="input2"
      [(ngModel)]="inputValue1"
      [placeholder]="'Enter your first and last name'"
    ></ngx-input>
    \`\`\`
  `;

  simplePrefixSuffixMd = `
    \`\`\`html
    <ngx-input
      type="text"
      name="input22"
      label="Prefix Suffix Input"
      [ngModel]="inputValue1"
    >
      <ngx-input-prefix>
        <i class="ngx-icon ngx-add-new"></i>
      </ngx-input-prefix>
      <ngx-input-suffix>
        <button class="btn btn-primary">Clear</button>
      </ngx-input-suffix>
    </ngx-input>
    \`\`\`
  `;

  simpleDisabledMd = `
  \`\`\`html
  <ngx-input
    type="text"
    name="input3"
    [label]="'Disabled Example'"
    disabled
    [ngModel]="'Disabled value'"
  ></ngx-input>
  \`\`\`
  `;

  simpleUnlockableMd = `
  \`\`\`html
  <ngx-input
    type="text"
    label="Disabled With Unlock Button"
    unlockable
    [ngModel]="'Click the button to unlock'"
  ></ngx-input>
  \`\`\`
  `;

  simpleRequiredMd = `
  \`\`\`html
  <ngx-input
    [label]="'Required Input Example Of The Day'"
    type="text"
    name="input4"
    required
  ></ngx-input>
  \`\`\`
  `;

  simpleDefaultMd = `
  \`\`\`html
  <ngx-input
    [label]="'Default value'"
    type="text"
    name="input44"
    autoSelect
    [ngModel]="inputDefaultVal"
  ></ngx-input>
  \`\`\`
  `;

  searchDemoHtmlMd = `
    \`\`\`html
    <div class="demo-search-box">
    <ngx-input
      #searchInput
      [hidden]="!(searchInput?.focused || searchInputValue?.length > 0)"
      placeholder="Search"
      type="text"
      name="searchInputValue"
      [(ngModel)]="searchInputValue"
      (focus)="searchInput.focused = true"
      (blur)="searchInput.focused = false"
    >
      <ngx-input-prefix>
        <i class="ngx-icon ngx-search"></i>
      </ngx-input-prefix>
      <ngx-input-suffix>
        <button
          class="btn btn-link"
          *ngIf="searchInputValue?.length > 0"
          (click)="searchInputValue = ''"
        >
          <i class="ngx-icon ngx-x"></i>
        </button>
      </ngx-input-suffix>
    </ngx-input>
  </div>
    \`\`\`
  `;

  searchDemoScssMd = `
    \`\`\`scss
    .demo-search-box {
      width: 300px;
      height: 50px;

      ngx-icon.search-icon {
        margin-top: 5px;
      }

      ngx-input[hidden] {
        display: block !important;
        width: 0;
        transition: width 0.5s;
      }

      ngx-input,
      &:hover ngx-input {
        margin: 0 40px 0 20px;
        width: 240px;
        transition: width 0.5s;
      }
    }
    \`\`\`
  `;
  searchDemoMd = {
    Markup: this.searchDemoHtmlMd,
    SCSS: this.searchDemoScssMd,
  };

  passwordMd = `
    \`\`\`html
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
    \`\`\`
  `;

  ageNumericMd = `
    \`\`\`html
    <ngx-input
      type="number"
      label="Age"
      [(ngModel)]="numericValue"
      name="numeric-input"
      min="0"
      max="122"
    ></ngx-input>
    \`\`\`
  `;

  disabledNumericMd = `
    \`\`\`html
    <ngx-input
      type="number"
      label="Pi"
      disabled
      [ngModel]="3.14159"
    ></ngx-input>
    \`\`\`
  `;

  validatorsMd = `
    \`\`\`html
    <ngx-input
      type="text"
      label="Pattern validation"
      [(ngModel)]="patternValue"
      name="patern-input"
      [pattern]="'^\\\\w+$'"
      hint="Pattern: ^\\\\w+$"
    ></ngx-input>
    \`\`\`
  `;

  typesMd = `
    \`\`\`html
    <ngx-input
      type="email"
      name="input1111"
      [label]="'Email'"
      [ngModel]="inputValue"
    >
      <ngx-input-hint>Enter a valid email</ngx-input-hint>
    </ngx-input>

    <ngx-input
      type="url"
      name="input1112"
      [label]="'Url'"
      [ngModel]="inputValue"
    ></ngx-input>

    <ngx-input
      type="tel"
      name="input1113"
      [label]="'Tel'"
      [ngModel]="inputValue"
    ></ngx-input>
    \`\`\`
  `;

  textareaMd = `
    \`\`\`html
    <ngx-input
      type="textarea"
      name="input111"
      [label]="'Name'"
      [ngModel]="inputValue"
    ></ngx-input>
    \`\`\`
  `;

  nativeTextMd = `
    \`\`\`html
    <input type="text" class="form-input" />
    <input type="text" class="form-input" value="pre populated" />
    <input type="text" class="form-input" placeholder="A placeholder" />
    <input type="text" class="form-input" value="disabled" disabled />
    <input type="tel" class="form-input" value="555-555-5555" />
    \`\`\`
  `;

  nativeTextareaMd = `
    \`\`\`html
    <textarea class="form-input"></textarea>
    \`\`\`
  `;

  nativeNumberMd = `
    \`\`\`html
    <input type="number" class="form-input" min="0" />
    \`\`\`
  `;

  sizesMd = `
    \`\`\`html
    <ngx-input
      size="medium"
      label="Medium"
      ngModel="Medium Input"
      hint="example of a medium input"
    ></ngx-input>

    <ngx-input
      size="large"
      label="Large"
      ngModel="Large Input"
      hint="example of a large input"
    ></ngx-input>
    \`\`\`
  `;

  appearancesMd = `
    \`\`\`html
    <ngx-input
      label="Legacy"
      ngModel="Legacy Input"
      placeholder="enter your text here..."
      hint="example of a legacy input"
    ></ngx-input>

    <ngx-input
      label="Fill"
      appearance="fill"
      ngModel="Fill Input"
      placeholder="enter your text here..."
      hint="example of a fill input"
    ></ngx-input>

    <ngx-input
      label="Fill Numeric"
      type="number"
      appearance="fill"
      ngModel="0"
      placeholder="enter your number here..."
      hint="example of a fill number input"
    ></ngx-input>

    <ngx-input
      type="textarea"
      appearance="fill"
      label="Fill Textarea"
      placeholder="enter your text here..."
      hint="example of a fill textarea"
    ></ngx-input>
    \`\`\`
  `;

  textAutosizeMd = `
    \`\`\`html
    <ngx-input
      [(ngModel)]="longInputValue"
      autosize
      label="Resize Input"
    ></ngx-input>
    \`\`\`
  `;

  numberAutosizeMd = `
    \`\`\`html
    <ngx-input
      autosize
      appearance="fill"
      type="number"
      label="Fill Resize Input"
    ></ngx-input>
    \`\`\`
  `;
}
