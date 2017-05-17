<template>
<section id="altindex">
  <div class="clearfix clearfix adfix">
    <amp-ad layout="responsive" width="728px" height="90px" type="adsense" data-ad-client="ca-pub-6979812205705127" data-ad-slot="4445157690"></amp-ad>
  </div>
  <div class="clearfix"></div>
  <div v-for="article in $data.posts.slice(0, 20)">
    <h4 class="post">{{article["title"]}}</h4>
    <em>Published {{article.datetime | moment }}</em>
    <article>
    <vue-markdown :source="article.content"></vue-markdown>
    </article>
    <p>
      <img v-bind:src="article['image']">
      <span v-if="article == $data.posts[0]">
        <amp-ad layout="responsive" width="728px" height="90px" type="adsense" data-ad-client="ca-pub-6979812205705127" data-ad-slot="4445157690"></amp-ad>
      </span>
    </p>
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
      title: 'Altcoin trading news feed',
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
        return moment(d).format('MMMM Do \'YY, h:mm a')
      } else {
        return '...'
      }
    }
  },
  created () {
    axios.get(`https://news.altcointrading.net/feed/newsblade/index.json`, cache('5 seconds'))
    .then(response => {
      this.posts = response.data.sort(function (x, y) {
        var date1 = new Date(x.datetime)
        var date2 = new Date(y.datetime)
        return date2 - date1
      })
    })
    .catch(e => {
      this.errors.push(e)
    })
    setInterval(function () {
      axios.get(`https://news.altcointrading.net/feed/newsblade/index.json`, cache('9 seconds'))
      .then(response => {
        this.posts = response.data.sort(function (x, y) {
          var date1 = new Date(x.datetime)
          var date2 = new Date(y.datetime)
          return date2 - date1
        })
      })
    }, 10000)
  }
}
</script>

<style scoped>

</style>
