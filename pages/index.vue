<template>
  <div class="accordion block_menu" role="tablist">

    <!-- 1 -->
    <b-card no-body class="mb-1">
      <!-- name menu -->
      <b-card-header @click="closeLevel2" header-tag="header" class="p-1" role="tab">
        <b-button block v-b-toggle.accordion-1 variant="link">Accordion 1</b-button>
      </b-card-header>
      <!-- содержимое menu -->
      <b-collapse id="accordion-1" accordion="level_1" role="tabpanel">
        <b-card-body class="body_children">
          
          <!-- level_2 -->
          <b-card no-body class="cart_children">
            <!-- name menu -->
            <b-card-header header-tag="header" class="p-1" role="tab">
              <b-button block v-b-toggle.accordion-1_1 variant="link">Accordion 1.1</b-button>
            </b-card-header>
            <!-- содержимое menu -->
            <b-collapse id="accordion-1_1" accordion="level_2" role="tabpanel">
              <b-card-body>
                <b-card-text>{{ text }}</b-card-text>
              </b-card-body>
            </b-collapse>
          </b-card>

          <!-- level_2 -->
          <b-card no-body class="cart_children">
            <!-- name menu -->
            <b-card-header header-tag="header" class="p-1" role="tab">
              <b-button block v-b-toggle.accordion-1_2 variant="link">Accordion 1.1</b-button>
            </b-card-header>
            <!-- содержимое menu -->
            <b-collapse id="accordion-1_2" accordion="level_2" role="tabpanel">
              <b-card-body>
                <b-card-text>{{ text }}</b-card-text>
              </b-card-body>
            </b-collapse>
          </b-card>

        </b-card-body>
      </b-collapse>
    </b-card>

    <!-- 2 -->
    <b-card no-body class="mb-1">
      <b-card-header @click="closeLevel2" header-tag="header" class="p-1" role="tab">
        <b-button block v-b-toggle.accordion-2 variant="link">Accordion 2</b-button>
      </b-card-header>
      <b-collapse id="accordion-2" accordion="level_1" role="tabpanel">
        <b-card-body>
          <b-card-text>{{ text }}</b-card-text>
        </b-card-body>
      </b-collapse>
    </b-card>

    <b-card no-body class="mb-1">
      <b-card-header header-tag="header" class="p-1" role="tab">
        <b-button block v-b-toggle.accordion-3 variant="link">Accordion 3</b-button>
      </b-card-header>
      <b-collapse id="accordion-3" accordion="level_1" role="tabpanel">
        <b-card-body>
          <b-card-text>{{ text }}</b-card-text>
        </b-card-body>
      </b-collapse>
    </b-card>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        text : "Anim pariatur cliche",
      }
    },
    methods: {
      closeLevel2(){
        console.log('tyt')
      },
    },
  }
</script>

<style scoped>
  .block_menu{
    width: 200px;
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
  .cart_children {
    margin-left: 25px;
  }
</style>