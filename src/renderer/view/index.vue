<style lang="less" scoped>
.layout {
    padding: 5px;
}
header.header {
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
.content, footer {
    -webkit-app-region: no-drag;
}
.liveness {
    background: #57a3f3;
    position: absolute;
    z-index: 1000;
    cursor: pointer;
    -webkit-app-region: no-drag;
}
.liveness-top-left {
    left: 1px;
    top: 1px;    
    height: 2px;
}
.liveness-top-right {
    right: 1px;
    top: 1px;    
    height: 2px;
}
.liveness-left {
    left: 1px;
    bottom: 1px;
    width: 2px;
}
.liveness-right {
    right: 1px;
    bottom: 1px;
    width: 2px;
}
.liveness-bottom {
    left: 1px;
    right: 1px;
    bottom: 1px;
    margin: auto;
    height: 2px;
}
.update-card {
    overflow: hidden;
    position: absolute;
    width: 70vw;
    top: 0; bottom: 0;
    left: 0; right: 0;
    margin: auto;
    background: #131415;
    box-shadow: 1px 1px 1px #aca49a;
    border-radius: 10px;
    height:50vh;
    padding: 10px 10px 0;
    display: flex;
    flex-direction: column;
    flex: 1 0 1;
    z-index: 5000;
    header {
        text-align: center;
        font-size: 2em;
    }
    .update-time {
        font-size: .8em;
        color: #454647;
        text-align: center;
    }
    .update-note {
        max-height: 40vh;
        overflow: auto;
    }
    footer {
        margin: 0 -10px 0px;
    }
}
</style>
<style lang="less">
.control {
    .ivu-btn {
        padding: 5px 10px;
    }
}
.md-style {
    a {
        border-bottom: 1px dashed #17233d;
    }
    img {
        max-height: 60vh;
        max-width: 40vw;
        cursor: pointer;
        background: #FFF;
        &[alt='图片表情'] {
            background: transparent;
        }
    }
    ul, ol {
        list-style-position: inside;
    }
    .msg-img {
        img.emoji {
            max-width: 40px;
        }
    }
    img.emoji {
        max-width: 20px;
        cursor: auto;
        vertical-align: middle;
        background: transparent;
    }
    h1,h2 {
        padding-bottom: .3em;
        border-bottom: 1px solid #eaecef
    }
    
    hr {
        background-color: #eaecef
    }
    
    blockquote {
        color: #6a737d;
        border-left: .25em solid #eaecef;
        padding-left: 5px;
    }
    
    iframe {
        border: 1px solid #d1d5da
    }
    
    table tr {
        border-top: 1px solid #c6cbd1;
        background-color: #fafbfc
    }
    
    table td, table th {
        border: 1px solid #dfe2e5
    }
    
    table tbody tr:nth-child(2n) {
        background-color: #fff
    }
    
    code:not(.hljs):not(.highlight-chroma) {
        background-color: rgba(27,31,35,.05)
    }

    pre,code {
        width: 100%;
        max-height: 300px;
        overflow: auto;
    }

    pre>code {
        margin: 0;
        font-size: 85%;
        padding: 0.5em;
        border-radius: 5px;
        display: block;
        overflow: auto;
        white-space: pre;
        font-family: mononoki,Consolas,"Liberation Mono",Menlo,Courier,monospace;
        word-break: initial;
        word-wrap: normal
    }
    
    kbd {
        color: #24292e;
        background-color: #fafbfc;
        border: 1px solid #d1d5da;
        box-shadow: inset 0 -1px 0 #d1d5da
    }
}
</style>

<template>
<div class="layout">
    <header class="drag header" :title="'已摸鱼' + liveness + '%'">
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
    <section class="update-card" v-if="update">
        <header class="update-header">{{update.name}}</header>
        <section class="update-time">{{new Date(update.created_at).toLocaleString()}}</section>
        <section class="update-note msg-contain" v-html="tohtml(update.body)">
        </section>
        <footer><Button type="success" long @click="openUpdate">更新</Button></footer>
    </section>
    <footer>
        <div class="liveness liveness-top-left" :title="livenessTitle" :style="{ width: top + 'px', background: background }"></div>
        <div class="liveness liveness-top-right" :title="livenessTitle" :style="{ width: top + 'px', background: background }"></div>
        <div class="liveness liveness-left" :title="livenessTitle" :style="{ height: side + 'px', background: background }"></div>
        <div class="liveness liveness-right" :title="livenessTitle" :style="{ height: side + 'px', background: background }"></div>
        <div class="liveness liveness-bottom" :title="livenessTitle" :style="{ width: (bottom * 2) + 'px', background: background }"></div>
    </footer>
</div>
</template>

<script>
  import { ipcRenderer } from 'electron'
  import { marked } from 'marked';

  export default {
    name: 'home',
    component: {
    },
    mounted () {
        window.onresize = () => {
            return (() => {
                this.screen = {
                    height: window.innerHeight - 2,
                    width: window.innerWidth - 2
                }
            })()
        }
        this.wintop = localStorage.getItem('window-top') == '1';
        ipcRenderer.send('win-top', this.wintop)
        this.opacity = localStorage.getItem('window-opacity') == '1';
        ipcRenderer.send('win-opacity', this.opacity)
        this.timer = setInterval(async () => {
            this.liveness = await this.$root.pwl.liveness();
            if (this.liveness >= 100) clearInterval(this.timer);
        }, 2000)
        this.check_update();
    },
    data () {
        return {
            wintop: false,
            opacity: false,
            liveness: 0,
            timer: 0,
            screen: {
                height: window.innerHeight - 2,
                width: window.innerWidth - 2
            },
            update: null
        }
    },
    watch: {
    },
    filters: {
    },
    computed: {
        background() {
            return this.liveness >= 10 ? '#d23f31' : '#57a3f3'
        },
        livenessTitle() {
            return this.liveness + '%'
        },
        title() {
            return document.title;
        },
        len () {
            return this.liveness / 100 * this.size;
        },
        bottom() {
            return Math.min(this.len, this.screen.width / 2)
        },
        side () {
            return Math.min(this.len - this.bottom, this.screen.height)
        },
        top () {
            return this.len - this.bottom - this.side;
        },
        size () {
            return this.screen.height + this.screen.width
        }
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
        },

        async check_update() {
            let rsp = await this.$root.sendipcSync('win-update');
            if (!rsp) return;
            this.update = rsp.data;
        },

        tohtml (markdown) {
            return marked(markdown, { sanitize: true })
        },

        openUpdate() {
            window.open(`https://gitee.com/imlinhanchao/pwl-chat/releases/${this.update.tag_name}`)
        }
    }
  }
</script>
