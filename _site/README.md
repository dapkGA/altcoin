# All News

> Reworking this Vue App to mirror news published at ATNET having the attribute for Google News.

* needs permanent URLs by post
* needs rel canonical
* it may not be able to crawl JS


===========================

* Only first 300-sth words, full article on ATNET
* No shill links
* Add section for press releases
* Add contact form
* Will need to have the same Disqus convo as the real deal
* Can probably add IQop for selected countries if it's a banner ad.

> news.at.net

* timely reporting only, or analysis of timely events
* no product guides etc
* add author biographies to THIS SECTION ONLY
* ads can be there but need to be limited
* check mobile friendliness

> from google, to avoid

* Participating in affiliate programs without adding sufficient value

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
