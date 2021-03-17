```scss
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
```
