<template>
<section id="altindex">

  <p>
    <router-link to="/">Altcoin Trading News</router-link> > <router-link to="eth">ETH News Aggregator</router-link>
  </p>

  <div class="clearfix"><amp-iframe width="728px" height="90px"
    layout="responsive" data-aa="147076" sandbox="allow-scripts allow-same-origin allow-modals allow-popups allow-forms"
    src="https://ad.a-ads.com/147076?size=728x90"><amp-img layout="fill" src="/img/ads/ad-placeholder.jpg"
     placeholder></amp-img></amp-iframe></div><div class="clearfix"></div>


  <iframe src="https://data.altcointrading.net/tv/eth.html" width="740" height="310" style="border:none;padding:0;margin-left: -8px;"></iframe>

    &nbsp;

  <h4 class="post">{{title}}</h4>

  <div class="clearfix"></div>

  <div class="row columns twelve">
    <!-- reddit ethereum -->
    <div class="columns three">
      <div v-for="article in $data.r_ethereum.slice(0, 15)">
        <article>
        <a rel="nofollow" target="_blank" v-bind:href="article['data']['permalink']">
          <strong>
            <span class="tag ethereum">r/ethereum</span>&nbsp;
            <span v-html="article['data']['title']"></span>
          </strong>
        </a>
        <em>{{article['data']['created_utc'] * 1000 | moment }} UTC</em>
        <p>
          <img v-bind:src="article['data']['thumbnail']">
        </p>
        </article>
      </div>
    </div>
   <!-- ethnews -->
    <div class="columns three">
      <div v-for="article in $data.ethnews.slice(0, 15)">
        <article>
        <a rel="nofollow" target="_blank" v-bind:href="article['data']['url']">
          <strong>
            <span class="tag ethnews">{{article['data']["domain"]}}</span>
            <br>
            <span v-html="article['data']['title']"></span>
          </strong>
        </a>
        <p>
          <em>{{article['data']['created_utc'] * 1000 | moment }} UTC</em>
          <img v-bind:src="article['data']['thumbnail']">
        </p>
        </article>
      </div>
    </div>
   <!-- telegraph -->
    <div class="columns three">
      <div v-for="article in $data.telegraph.slice(0, 15)">
        <article>
        <a rel="nofollow" target="_blank" v-bind:href="article['data']['url']">
          <strong>
            <span class="tag ethereum">{{article['data']["domain"]}}</span>
            <br>
            <span v-html="article['data']['title']"></span>
          </strong>
        </a>
        <p>
          <em>{{article['data']['created_utc'] * 1000 | moment }} UTC</em>
          <img v-bind:src="article['data']['thumbnail']">
        </p>
        </article>
      </div>
    </div>
    <!-- altcointrading.net -->
    <div class="columns three">
      <div v-for="article in $data.posts.slice(0, 10)">
        <!-- domain missing https://news.altcointrading.net/feed/ -->
        <a rel="nofollow" target="_blank" v-bind:href="article['url']">
          <strong>
            <span class="tag ethereum">altcointrading.net</span>
            <br>
            <span v-html="article['title']"></span>
          </strong>
        </a>

        <p>
          <em>{{article["date"] | moment }}</em>
          <img v-bind:src="article['img']">
          <br>
          <span v-html="article['content']"></span>
        </p>
      </div>
    </div>

  </div>



 </section>
</template>

<script>
import moment from 'moment'
import axios from 'axios'
import VueMarkdown from 'vue-markdown'

import apicache from 'apicache'
let cache = apicache.middleware

export default {
  name: 'newsfeed',
  data () {
    return {
      title: 'ETH News Feed',
      r_ethereum: [],
      ethnews: [],
      telegraph: [],
      posts: []
    }
  },
  components: {
    'vue-markdown': VueMarkdown
  },
  filters: {
    moment: function (str) {
      var d = new Date(str)
      if (moment(d).isValid()) {
        return moment(d).format('MMM Do \'YY, h:mm a')
      } else {
        return '...'
      }
    }
  },
  created () {
    axios.get(`https://www.altcointrading.net/eth.json`, cache('60 seconds'))
    .then(response => {
      this.posts = response.data
    })
    .catch(error => {
      this.errors.push(error)
    })
    // reddit r/ethereum
    axios.get(`https://www.reddit.com/r/ethereum/new.json`, cache('60 seconds'))
    .then(response => {
      this.r_ethereum = response.data['data']['children'].sort(function (x, y) {
        var date1 = new Date(x.created_utc)
        var date2 = new Date(y.created_utc)
        return date2 - date1
      })
    })
    .catch(error => {
      this.errors.push(error)
    })
    // bloody headers: https://obscure-anchorage-43896.herokuapp.com/?q=https://www.ethnews.com/rss.xml
    // https://www.reddit.com/domain/ethnews.com/new.json
    // https://www.reddit.com/user/ethnewsbot.json
    axios.get(`https://www.reddit.com/user/ethnewsbot.json`, cache('60 seconds'))
    .then(response => {
      // console.log(response.data)
      this.ethnews = response.data['data']['children']
    })
    .catch(error => {
      this.errors.push(error)
    })
    // cointelegraph
    // https://www.altcointrading.net/posts.json
    axios.get(`https://www.reddit.com/domain/cointelegraph.com/new.json`, cache('60 seconds'))
    .then(response => {
      // console.log(response.data)
      this.telegraph = response.data['data']['children']
    })
    .catch(error => {
      this.errors.push(error)
    })
  }
}
</script>


<style scoped>
.tag{color: white;padding: 2px 6px;background: #e3e5e7;}

#altindex em {
    font-family: inherit;
    font-style: normal;
    font-size: small;
    color: #7a838d;
    display: block;
}

article a {color:#4a5561!important;background:transparent;font-weight: 800;}
article a:hover {color:#001f3f!important;background:transparent}
.feedcol {width: 100%}
@media (min-width: 771px) {
 .feedcol {
    display: block;
    width: 32%;
    float: left;
    margin-right: 10px;
 }
}
</style>
