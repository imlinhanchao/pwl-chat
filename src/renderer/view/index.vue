<style lang="less" scoped>
.layout {
    background: #232425;
    padding: 5px;
    height: 100vh;
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
    background: #232425;
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
    max-height:50vh;
    padding: 10px 0 0;
    display: flex;
    flex-direction: column;
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
        padding: 0 15px;
    }
    .update-progress {
        background: #ed4014;
        height: 5px;
        margin: 0;
    }
    footer {
        margin: 0;
        position: absolute;
        width: 100%;
        bottom: 0;
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
        border: 0;
        width: 100%;
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

.msg-img {
    img {
        max-width: 100%;
    }
    [alt="图片表情"] {
        max-width: 100px;
    }
    iframe {
        border: 0;
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
            <Button type="text" @click="handleOpacity" class="win-opacity-btn" :class="{ 'win-checked': opacity.enable }"><span class="cirle-empty"></span></Button>
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
        <section class="update-note md-style" v-html="tohtml(update.body)">
        </section>
        <footer>
            <section v-if="progress > 0" :title="progress + '%'" class="update-progress" :style="{ width: progress + '%' }"></section>
            <Button type="success" long @click="startUpdate">{{state}}</Button>
        </footer>
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
        this.check_update();
        setInterval(async () => {
            this.check_update();
        }, 36000000)

        window.onresize = () => {
            return (() => {
                this.screen = {
                    height: window.innerHeight - 2,
                    width: window.innerWidth - 2
                }
            })()
        }
        this.wintop = this.$root.setting.value.topWindow;
        ipcRenderer.send('win-top', this.wintop)
        this.opacity = this.$root.setting.value.opacity;
        ipcRenderer.send('win-opacity', this.opacity)
        this.timer = setInterval(async () => {
            this.liveness = await this.$root.pwl.liveness();
            if (this.liveness.code == 401) this.$root.relogin();
        }, 60000)
        this.noticeTimer = setInterval(async () => {
            this.check_notice();
        }, 10000)
        this.check_notice();
        this.$root.ipc.listen('setting-change', (event, setting) => {
            this.opacity = setting.opacity;
            this.wintop = setting.topWindow;
            this.$root.setting.setting = setting;
            ipcRenderer.send('win-opacity', this.opacity)
            ipcRenderer.send('win-top', this.wintop)
        })

    },
    data () {
        return {
            wintop: false,
            opacity: {
                enable: false,
                value: 60
            },
            liveness: 0,
            timer: 0,
            noticeTimer: 0,
            screen: {
                height: window.innerHeight - 2,
                width: window.innerWidth - 2
            },
            update: null,
            progress: 0,
            state: '更新',
            updating: false,
            notice: {
                at:[],
                reply:[],
                comment:[],
                sys:[]
            }
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
            this.$root.setting.config('topWindow', this.wintop);
            this.$root.ipc.send('win-setting-change', this.$root.setting.value)
        },
        
        handleOpacity() {
            this.opacity.enable = !this.opacity.enable;
            ipcRenderer.send('win-opacity', this.opacity)
            this.$root.setting.config('opacity', this.opacity);
            this.$root.ipc.send('win-setting-change', this.$root.setting.value)
       },

        async check_update() {
            console.log('check update')
            let rsp = await this.$root.sendipcSync('win-update');
            console.log(rsp)
            if (!rsp) return;
            this.update = rsp.data;
        },

        tohtml (markdown) {
            return marked(markdown, { sanitize: true })
        },

        startUpdate() {
            if (this.updating) return;
            this.updating = true;
            let that = this;
            this.$root.sendipc('update-app', {
                argv: this.update, 
                fn: (ev, data) => {
                    console.dir(data);
                    if (data.state == 'data'){
                        that.progress = data.pro;
                        that.state = '下载中' + (that.progress > 0 ? `(${that.progress}%)` : '');
                    }
                    else if(data.state == 'finish') {
                        that.state = '下载完成，等待更新'
                    }
                    else if(data.state == 'done') {
                        that.state = '更新完成，请重启生效'
                    }
                    else if (data.state == 'fail') {
                        that.state = '自动更新失效，请手动下载'
                        window.open(`https://gitee.com/imlinhanchao/pwl-chat/releases/${this.update.tag_name}`)
                    }
                }
            });
        },
        async noticeAt() {
            let rsp = await this.$root.pwl.noticelist('at');
            if (rsp.code != 0) return;
            let data = rsp.data.filter(d => !d.hasRead && this.notice.at.indexOf(d.oId+d.dataType) < 0);
            if (data.length == 0) return;
            data.forEach(d => {
                this.notice.at.push(d.oId+d.dataType);
                if(d.dataType == 38) // 聊天室 @
                    return this.$root.notice(`${d.userName}在聊天室 @ 你`, this.$root.toText(d.content), null, async () => {
                        await this.$root.pwl.makeRead('at');
                    })
            })
        },
        async noticeReply() {
            let rsp = await this.$root.pwl.noticelist('reply');
            if (rsp.code != 0) return;
            console.dir(rsp)
            let data = rsp.data.filter(d => !d.hasRead && this.notice.reply.indexOf(d.oId) < 0);
            if (data.length == 0) return;
            data.forEach(d => {
                this.notice.reply.push(d.oId);
                return this.$root.notice(d.commentArticleTitle, 
                `${d.userName}回复你 ${this.$root.toText(d.content)}`, `https://fishpi.cn${d.commentSharpURL}`)
            })
        },
        async noticeComment() {
            let rsp = await this.$root.pwl.noticelist('commented');
            if (rsp.code != 0) return;
            console.dir(rsp)
            let data = rsp.data.filter(d => !d.hasRead && this.notice.comment.indexOf(d.oId) < 0);
            if (data.length == 0) return;
            data.forEach(d => {
                this.notice.comment.push(d.oId);
                return this.$root.notice(d.commentArticleTitle, 
                `${d.commentAuthorName}评论你 ${this.$root.toText(d.commentContent)}`, `https://fishpi.cn${d.commentSharpURL}`)
            })
        },
        async noticeSys() {
            let rsp = await this.$root.pwl.noticelist('sys-announce');
            if (rsp.code != 0) return;
            console.dir(rsp)
            let data = rsp.data.filter(d => !d.hasRead && this.notice.sys.indexOf(d.oId) < 0);
            if (data.length == 0) return;
            data.forEach(d => {
                this.notice.sys.push(d.oId);
                return this.$root.notice('摸鱼派系统通知', d.commentArticleTitle, `https://fishpi.cn/article/${d.oId}`)
            })
        },
        async check_notice() {
            let notice = await this.$root.pwl.count();
            if (!notice) return;
            let noticeSetting = this.$root.setting.value.notice;
            if (notice.unreadAtNotificationCnt > 0 && noticeSetting.at) {
                this.noticeAt();
            }
            if (notice.unreadCommentedNotificationCnt > 0 && noticeSetting.reply) {
                this.noticeComment()
            }
            if (notice.unreadReplyNotificationCnt > 0 && noticeSetting.reply) {
                this.noticeReply()
            }
            if (notice.unreadSysAnnounceNotificationCnt > 0 && noticeSetting.sys) {
                this.noticeSys()
            }
        }
    }
  }
</script>
