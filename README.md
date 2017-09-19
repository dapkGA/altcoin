# ETH.


```
let iframe = document.createElement('iframe');
    iframe.setAttribute('src', this.src);
    iframe.setAttribute('frameborder', 0);
    iframe.setAttribute('allowfullscreen', true);
    iframe.setAttribute('width', this.opts.width);
    iframe.setAttribute('height', this.opts.height);

```



# news.at.net

> One-page VUE JS web app for receiving a JSON feed with posts (published via forestry)

## To Do

* Add notifications on new post

## Added dependencis

```
"dependencies": {
  "axios": "^0.16.1",
  "lodash": "^3.10.1",
  "moment": "^2.18.1",
  "vue": "^2.2.6",
  "vue-markdown": "^2.1.3",
  "vue-notifications": "^0.8.0",
  "vue-router": "^2.3.1"
},

```

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
