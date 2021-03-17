```ts
@Component({})
export class AppComponent {
  asyncOptions$ = timer(5000).pipe(mapTo(this.selects));

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
