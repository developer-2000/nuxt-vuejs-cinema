<template>
  <div class="accordion block_menu" role="tablist">

    <!-- list films -->
    <div class="section_accordion">
      <b-card v-for="(film, key) in this.$store.getters['films/getFilms']" :key="key" no-body class="mb-1">
        <!-- name menu -->
        <b-card-header @click="openAccordion(film.id)" header-tag="header" class="p-1" role="tab">
          <b-button block :v-b-toggle="`accordion_${film.id}`" variant="link">
            {{film.name}}
          </b-button>
        </b-card-header>
        <!-- содержимое menu -->
        <b-collapse :id="`accordion_${film.id}`" accordion="level_1" role="tabpanel" class="block_accordion">
          <b-card-body class="body_children">
            <img :src="film.image">
            <div @click="loadSession(film.id)" class="link_session_film">Сеансы фильма</div>
            <div v-html="film.description"></div>
          </b-card-body>
        </b-collapse>
      </b-card>
    </div>

    <!-- sessions film -->
    <div class="block_session">
      <div v-for="(day, key) in session" :key="key" class="block_day">
        <!-- дата -->
        <div class="date_title">{{day.showdate}}</div>
        <!-- время сеансов -->
        <div class="time_block" :id="`time_block_${day.showdate}`">
          <div
            v-for="(time, key) in day.daytime.split(';')"
            :key="key"
            @click="loadFreePlaces(time, day.showdate)"
            class="time_session"
            :id="`time_${day.showdate}_${time}`"
          >
            {{time}}
          </div>
        </div>
        <!-- блок свободных мест -->
        <div :id="`free_places_${day.showdate}`"></div>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        id_film : 0,
        films : [],
        session : [],
        free_places: [],
        date: '',
        time: '',
      }
    },
    methods: {
      initializeData(){
        this.loadFilms();
      },
      initializeRowPlace(){
        document.querySelectorAll(".place_in_row").forEach((tag) => {
          tag.addEventListener("click", () => {
            let data = tag.getAttribute("data-date").split('_');
            this.bookPlace(data[0], data[1]);
          });
        })
      },
      async loadFilms(){
        await this.$store.dispatch('films/loadF')
        // console.log(this.$store.getters['films/getFilms'])
      },
      async loadSession(id){
        this.id_film = id;
        this.session = await this.$axios.$get('https://cinema-api-test.y-media.io/v1/movieShows?movie_id={'+id+'}');
        if(this.session.error_code == 0){
          this.session = this.session.data[id];
        }
      },
      async loadFreePlaces(time, date){
        this.free_places = await this.$axios.$get('https://cinema-api-test.y-media.io/v1/showPlaces?movie_id={'+this.id_film+'}&daytime={'+time+'}&showdate={'+date+'}');
        if(this.free_places.error_code == 0){
          this.free_places = this.free_places.data;
          this.date = date;
          this.time = time;
          // 1 вывести свободные ряды и места
          this.showFreePlaces(date);
          // 2 изменить стиль таймингов даты
          this.changeStyleTimings(date, time);
        }
      },
      async bookPlace(row, seat){
        let data = {
          movie_id: this.id_film,
          row: row,
          seat: seat,
          showdate: this.date,
          daytime: this.time
        };
        let book = await this.$axios.$post('https://cinema-api-test.y-media.io/v1/bookPlace', data, {});
        if(book.error_code == 0){
          alert(JSON.stringify(book.data));
        }
      },
      openAccordion(id){
        let elements = document.querySelectorAll('.block_accordion');
        for(let i=0; i<elements.length; i++){
          elements[i].style.display = "none";
        }
        document.getElementById('accordion_'+id).style.display = 'block';
        this.session = [];
      },
      showFreePlaces(date){
        let line = '';
        try {
          this.free_places.forEach(function(item, index1, vvv) {
            // только 3 раза
            if (index1 == 3) { vvv(); }
            line += '<div style="background: #e0fbe1; padding: 0px 0px 1px 7px; margin: 7px 0px 5px 0px; font-weight: bold;">'+item[0].row+' row</div>';
            line += '<div style="display: flex; flex-wrap: wrap;">';
            item[1].forEach(function(obj, index2) {
              line += '<div data-date="'+item[0].row+'_'+obj.seat+'" class="place_in_row" style="color: #0a58ca; margin: 0px 10px 7px 0px; cursor: pointer; background: #ececec; padding: 0px 10px 3px;">'+obj.seat+'</div>';
            });
            line += '</div>';
            // onClick="bookPlace('+item[0].row+', '+obj.seat+');"
          });
        } catch (e) {}
        // вставить свободные места в этот блок
        document.getElementById('free_places_'+date).innerHTML = line;
        this.initializeRowPlace();
      },
      changeStyleTimings(date, time){
        let elem = document.getElementById('time_block_'+date);
        let elements = elem.querySelectorAll('div');
        for(let i=0; i<elements.length; i++){
          elements[i].style.cssText = "display: flex; margin-top: 10px;";
        }
        document.getElementById('time_'+date+'_'+time).style.cssText = "display: flex; margin-top: 10px; outline: 1px solid #0a58ca;";
      },
    },
    mounted() {
      this.initializeData();
    },
  }
</script>

<style scoped>
  .block_menu{
    width: 100%;
    display: flex;
  }
  .block_menu button{
    width: 105%;
    margin: -5px -5px;
    text-decoration: none;
    text-align: left;
    padding-left: 10px !important;
  }
  .card-header{
    overflow-anchor: none;
    line-height: 0px;
    margin: 0px;
    padding: 0;
    border: none;
  }
  .btn-check:focus + .btn, .btn:focus {
    box-shadow: none;
  }
  .btn-block {
    height: 29px;
    margin: 0px;
    padding: 0 !important;
    line-height: 0px
  }
  .body_children {
    padding: 0 !important;
  }
  .card{
    border: none;
  }
  .block_accordion img{
      height: 230px;
      float: left;
      margin: 10px 10px 0px 0px;
  }
  .block_accordion .link_session_film{
    float: left;
    color: #0a58ca;
    margin-top: 5px;
    cursor: pointer;
    width: 150px;
  }
  .section_accordion > div{
    width: 310px;
  }
  .block_session{
    width: 100%;
    padding: 0px 20px;
  }
  .date_title{
    font-weight: bold;
  }
  .time_block{
    display: flex;
    margin-top: 10px;
  }
  .time_session{
    color: #0a58ca;
    margin-right: 10px;
    cursor: pointer;
    background: #ececec;
    padding: 0px 10px 3px;
  }
  .block_day{
    border: 1px solid #aeaeae;
    padding: 0px 0px 7px 10px;
    margin-bottom: 10px;
  }

</style>
