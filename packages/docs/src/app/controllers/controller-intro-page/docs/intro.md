## Purpose
The controller pattern allows to for component logic to be abstracted away into _slices_ of functionality. The functionality is _opt-in_. This means in order for a component to have a specific _slice_ of functionality it must _opt-in_ to that functionality. To _opt-in_, an Angular directive is used on a component.

## Mixin vs Controllers

inheritance/mixin approach is commonly seen as a way to share functionality between components, but there are certain drawback when using this approach. Take this example of using a `Size` base class to add _sizing_ inputs to a component

```ts
class Size {
  @Input()
  size: string = 'small';
}

class TextInput extends Size {
  @Input()
  text: string;
}
```
usage looks as you'd expect
```html
<text-input [text]="'abc123'" [size]="'medium'"></text-input>
```

Seems straight forward but what if you have more than one class you want to extend? You have to use a Mixin approach which can get messy because you have to reimplement any HostBindings for each base class that was a part of the mixin. Testing with Mixins can also be tricky. You can also end up with long inheritance chain that are difficult to follow.

Controllers take a different approach instead of inheritance/mixin, controllers provide functionality by composition.

```ts
class SizeController { // this is a directive now
  @Input() 
  size: string = 'small'
}

class TextInputComponent {
  @Input()
  text: string;
}
```
the usage of controllers is similar, except you compose the desired functionality on the template. Notice the directive `ngx-size` .
```html
<text-input ngx-size [text]="'abs123'" [size]="'medium'" ></text-input>
```
The `ngz-size` directive provides `text-input` with the size input and related functionality. When you need more isolated functionality you just create more controller and add to the component markup. This is major advantages as compositions allows addition of functionality without requiring inheritance chains or hard to test mixins. Since each controller is its own class you can test it as such, and the Component can easily mock the controller if needed for its own tests.

A drawback of controllers is now the `text-input` cannot have a default `size` value without requiring the usage of the controller. Without it no logic runs from the `Size` controller. 

There is more to controllers than what is shown, but those are the basic high level ideas. Check out the [Angular InDepth article going into more details](https://indepth.dev/posts/1443/how-we-make-our-base-components-more-flexible-controllers-concept-in-angular) to learn more.
