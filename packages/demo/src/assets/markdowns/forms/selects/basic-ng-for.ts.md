```ts
@Component({})
export class AppComponent {
  get selects() {
    let i = 50;
    const results: unknown[] = [];

    while (i--) {
      results.push({
        name: `option ${i}`,
        attr: `${i}_intrusion_breach`,
        address: `${i} rd`,
        disabled: i === 48
      });
    }

    return results;
  }
}
```
