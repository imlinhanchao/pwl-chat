<style lang="less" scoped>
.layout {
    padding: 5px;
    display: flex;
    flex-direction: column;
    height: 100vh;
}
header {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    height: 40px;
    h1 {
        font-size: 1em;
        padding: 0 5px;
        font-weight: normal;
        img {
            height: 1.5em;
            vertical-align: middle;
        }
        span {
            vertical-align: middle;
            overflow:hidden;
            text-overflow:ellipsis;
            white-space:nowrap;
            max-width: calc(100vw - 160px);
            display: inline-block;
        }
    }
    .control {
        i {
            font-size: 1.5em;
        }
    }
}
</style>

<template>
<div class="layout">
    <header class="drag">
        <h1 class="drag"> <img src='../assets/icon.png' />
        <span id="win-title" class="drag">摸鱼派客户端 - 设置</span></h1>
        <span class="control no-drag">
            <Button type="text" @click="handleClose"><Icon custom="fa fa-times"></Icon></Button>
        </span>
    </header>
    <Content class="img-content no-drag" ref="content">
    </Content>
</div>
</template>

<script>
  import path from 'path'

  export default {
    name: 'setting-view',
    component: {
    },
    mounted () {
    },
    data () {
        return {
        }
    },
    watch: {
    },
    filters: {
    },
    computed: {
    },
    methods: {

    }
  }
</script>
