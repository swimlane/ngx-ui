You can apply **Shadow** classes to achieve the shadow effect: `.shadow-{depth}` with `depth` is in range of `[1, 24]`

`.shadow-fx` is a class that will apply `:hover` transition from a `.shadow-{depth}` to `.shadow-20`

```html
<!-- div will transition from shadow-10 to shadow-20 on hover -->
<div class="shadow-10 shadow-fx"></div>
```
