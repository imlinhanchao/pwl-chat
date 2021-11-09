<style lang="less" scoped>
.layout {
    padding: 5px;
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
        <h1> <img src='../assets/icon.png' />
        <span id="win-title">{{ $root.title || '摸鱼派'}}</span></h1>
        <span class="control no-drag">
            <Button type="text" @click="handleMin"><Icon custom="fa fa-minus"></Icon></Button>
            <Button type="text" @click="handleClose"><Icon custom="fa fa-times"></Icon></Button>
        </span>
    </header>
    <Content>
        <router-view />
    </Content>
</div>
</template>

<script>
  import { ipcRenderer } from 'electron'

  export default {
    name: 'home',
    component: {
    },
    mounted () {
        window.onresize = () => {
            return (() => {
                this.screen = {
                    height: window.innerHeight,
                    width: window.innerWidth
                }
            })()
        }

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
        title() {
            return document.title;
        },
    },
    methods: {
        handleClose() {
            ipcRenderer.send('win-close');
        },

        handleMin() {
            ipcRenderer.send('win-min');
        },
    }
  }
</script>
