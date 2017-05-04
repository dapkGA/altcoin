<template>
 <div class="datablock">
  <div id="altindex">
  <small>Altindex
  &nbsp;<a target="_blank" href="https://data.altcointrading.net/how/">[wut?]</a>
  &nbsp;<a target="_blank" href="https://www.altcointrading.net/altindex/">[chart]</a></small>
  <p>{{ $data.gridData[0] | bitcoins }} BTC</p>
  <small>{{ $data.gridData[1] | moment }}</small>
 </div>
</div>
</template>

<script>
import moment from 'moment'
import axios from 'axios'

export default {
  name: 'com-altindex',
  data () {
    return {
      gridData: []
    }
  },
  filters: {
    moment: function(str) {
      var d = new Date(str)
      if (moment(d).isValid() ) {
      return moment(d).format('MMMM Do \'YY, h:mm a')
      } else {
      return '...'
      }
    },
    dollars: function(str) {
      var dp = str/100
      if (isNaN(dp)) {
        return '...'
      } else {
        return dp
      }
    },
    bitcoins: function(str) {
      var dp = Math.round(str * 1000000) / 1000000
      if (isNaN(dp)) {
        return '...'
      } else {
        return dp
      }
    }
  },
  created () {
    axios.get(`https://data.altcointrading.net/api/index.json`)
    .then(response => {
      this.gridData = response.data
    })
    .catch(e => {
      this.errors.push(e)
    })
    setInterval(function () {
      axios.get(`https://data.altcointrading.net/api/index.json`)
      .then(response => {
        this.gridData = response.data
      })
    }, 100)
  }
}
</script>

<style scoped>
   a, a:hover {color: #001f3f;}
   #altindex{display:block;color:#000b17;font-family:"Droid Sans",sans-serif;font-weight:800;letter-spacing:.05em;line-height:1;margin:0;text-transform:uppercase;font-size:42px;transition:all .4s}
   #altindex p{margin:5px 0}
   #altindex small{font-weight:200;font-size:13px;color:#7A838D}
</style>
