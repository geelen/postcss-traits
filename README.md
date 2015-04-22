# postcss-traits

When you want code like this:

```css
[ui-SomeObject] {
  @trait(b: one 2 three-and-a-half, c: 4 4½);
}
```

to generate the following for [postcss-mixins](https://github.com/postcss/postcss-mixins):

```css
[ui-SomeObject] {
  @mixin b;
  @mixin b:one;
  @mixin b:2;
  @mixin b:three-and-a-half;
  @mixin c;
  @mixin c:4;
  @mixin c:4½;
}
```
