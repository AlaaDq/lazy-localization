<template>
<div>
  <p>{{ $t('hello') }}</p>
  <p>{{ $t('message') }}</p>
  <button @click="$i18n.locale='ar'">arabic</button>
  <button @click="$i18n.locale='en'">english</button>
</div>

</template>

<script>
export default {
  name: 'HelloI18n',
  mounted(){
    console.log(this.$i18n.locale)
    
  },

}
</script>

<i18n>
{
  "en": {
    "hello": "Hello component1!"
  },
  "ar":{
        "hello": "هيللو عربي"
  }
}
</i18n>
