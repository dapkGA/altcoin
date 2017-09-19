<template>
<section id="altindex">


  &nbsp;

  <!-- the TV widget needs to come from here -->
  <h4 class="post">{{title}}</h4>

  <div class="clearfix"></div>

  <div class="row columns twelve">

    <div class="columns three">
      <div v-for="article in $data.r_ethereum.slice(0, 10)">
        <article>
        <a v-bind:href="article['data']['permalink']">
          <strong>
            <span class="tag ethereum">r/ethereum</span>&nbsp;
            {{article['data']["title"]}}
          </strong>
        </a>
        <em>{{article['data']['created_utc'] * 1000 | moment }} UTC</em>
        <p>
          <img v-bind:src="article['data']['thumbnail']">
        </p>
        </article>
      </div>
    </div>

    <div class="columns three">
      <div v-for="article in $data.ethnews.slice(0, 10)">
        <article>
        <a v-bind:href="article['data']['url']">
          <strong>
            <span class="tag ethnews">{{article['data']["domain"]}}</span><br>{{article['data']["title"]}}
          </strong>
        </a>
        <em>{{article['data']['created_utc'] * 1000 | moment }} UTC</em>
        <p>
          <img v-bind:src="article['data']['thumbnail']">
        </p>
        </article>
      </div>
    </div>

    <div class="columns three">
      <div v-for="article in $data.posts.slice(0, 15)">
        <!-- domain missing https://news.altcointrading.net/feed/ -->
        <a v-bind:href="article['url']">
          <strong>{{article["title"]}}</strong>
        </a>
        <em>{{article.datetime | moment }}</em>
        <p>
          <img v-bind:src="article['image']">
        </p>
      </div>
    </div>

    <div class="columns three">
      <div v-for="article in $data.telegraph.slice(0, 10)">
        <article>
        <a v-bind:href="article['data']['url']">
          <strong>
            <span class="tag ethereum">{{article['data']["domain"]}}</span><br>{{article['data']["title"]}}
          </strong>
        </a>
        <em>{{article['data']['created_utc'] * 1000 | moment }} UTC</em>
        <p>
          <img v-bind:src="article['data']['thumbnail']">
        </p>
        </article>
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
    axios.get(`https://news.altcointrading.net/feed/newsblade/index.json`, cache('60 seconds'))
    .then(response => {
      this.posts = response.data.sort(function (x, y) {
        var date1 = new Date(x.datetime)
        var date2 = new Date(y.datetime)
        return date2 - date1
      })
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
.tag{color: white;padding: 5px 9px;}
.tag.ethnews{background: #7622c5;}
.tag.ethereum{background: #ffdc00;}

#altindex em {
    font-family: inherit;
    font-style: normal;
    font-size: small;
    color: #7a838d;
    display: block;
}

article a {color: #4a5561!important;background: rgba(186, 188, 189, 0.13);font-weight: 800;}
article a:hover {background: rgba(186, 188, 189, 0.23)}
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
