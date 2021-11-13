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
        user-select: none;
        -webkit-app-region: drag;
        img {
            height: 1.5em;
            vertical-align: middle;
            -webkit-app-region: drag;
        }
        span {
            vertical-align: middle;
            overflow:hidden;
            text-overflow:ellipsis;
            white-space:nowrap;
            max-width: calc(100vw - 210px);
            display: inline-block;
            -webkit-app-region: drag;
        }
    }
    .control {
        -webkit-app-region: no-drag;
        i {
            font-size: 1.5em;
        }
    }
}
.win-top-btn, .win-opacity-btn {
    &.win-checked {
        color: #57a3f3;
        transform: rotate(45deg);
        .cirle-empty {
            border-color: #57a3f3
        }
    }
}
.cirle-empty {
    display: inline-block;
    width: 20px;
    height: 20px;
    border-radius: 10px;
    border: 2px dashed #aca49a;
    vertical-align: middle;
}
.content {
    -webkit-app-region: no-drag;
}
</style>
<style lang="less">
.control {
    .ivu-btn {
        padding: 5px 10px;
    }
}
</style>

<template>
<div class="layout">
    <header class="drag">
        <h1 class="drag"> <img src='../assets/icon.png' />
        <span id="win-title" class="drag">{{ $root.title || '摸鱼派'}}</span></h1>
        <span class="control no-drag">
            <Button type="text" @click="handleMin"><Icon custom="fa fa-minus"></Icon></Button>
            <Button type="text" @click="handleOpacity" class="win-opacity-btn" :class="{ 'win-checked': opacity }"><span class="cirle-empty"></span></Button>
            <Button type="text" @click="handleTop" class="win-top-btn" :class="{ 'win-checked': wintop }"><Icon custom="fa fa-thumb-tack"></Icon></Button>
            <Button type="text" @click="handleClose"><Icon custom="fa fa-times"></Icon></Button>
        </span>
    </header>
    <Content class="content">
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
        this.wintop = localStorage.getItem('window-top') == '1';
        ipcRenderer.send('win-top', this.wintop)
        this.opacity = localStorage.getItem('window-opacity') == '1';
        ipcRenderer.send('win-opacity', this.opacity)
    },
    data () {
        return {
            wintop: false,
            opacity: false
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
        
        handleTop() {
            this.wintop = !this.wintop;
            ipcRenderer.send('win-top', this.wintop)
            localStorage.setItem('window-top', this.wintop ? '1' : '0')
        },
        
        handleOpacity() {
            this.opacity = !this.opacity;
            ipcRenderer.send('win-opacity', this.opacity)
            localStorage.setItem('window-opacity', this.opacity ? '1' : '0')
        }
    }
  }
</script>
