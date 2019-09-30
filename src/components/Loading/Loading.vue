<template>
    <vue-element-loading :active="showloading" is-full-screen>
        <b-spinner variant="danger" type="grow" label="Spinning"></b-spinner>
        <br/>
        <span>Please wait...</span>
    </vue-element-loading>
</template>
<script>
import VueElementLoading from 'vue-element-loading';
export default {
    props : ['showloading'],
    components : {VueElementLoading}
}
</script>