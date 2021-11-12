<style lang="less" scoped>
.msg-item{
    display: flex;
    flex-direction: row;
}

.msg-item-contain{
    display: flex;
    flex-direction: column;
    max-width: 85%;
    position: relative;
}

.msg-avatar {
    width: 35px;
    height: 35px;
    border-radius: 35px;
    margin-top: 1.5em;
    cursor: pointer;
}

.msg-user{
    margin-left: 1em;
    font-size: .8em;
}

.msg-contain{
    display: flex;
    flex-direction: row;
    .msg-img {
        padding: 10px;
    }
}

.arrow{
    border: 5px solid transparent;
    border-right: 5px solid #F6F8FA;
    width: 0;
    margin-top: 15px;
    height: 0;
}

.msg-content{
    background-color: #F6F8FA;
    border-radius: 5px;
    padding: 8px 15px;
    color:#232425;
    word-break: break-word;
}
.msg-current {
    flex-direction: row-reverse;
    .msg-contain {
        flex-direction: row-reverse;
    }
    .arrow {
        border-right-color: transparent;
        border-left-color: #515a6e;
    }
    .msg-content {
        background-color: #515a6e;
        color: #F6F8FA;
    }
    .msg-user {
        text-align: right;
        margin-right: 1em;
    }
}
.chat-content {
    height: calc(100vh - 100px);
    overflow: auto;
    margin-top: 5px;
}
.chat-form {
    display: flex;
    position: relative;
}
.at-list, .emoji-list {
    position: absolute;
    background: #3b3e43;
    top: 2.1em;
    z-index: 90;
    left: 32px;
    color: #dcdee2;
    box-shadow: 0px 1px 2px 0px #515a6e;
    border-radius: 0 0 10px 10px;
    overflow: hidden;
    .at-item, .emoji-item {
        padding: 6px 5px;
        user-select: none;
        cursor: pointer;
    }
    .current-at {
        background: #515a6e;
    }
}
.emoji-list {
    display: flex;
    flex-direction: row;
    left: 40px;
    .emoji-item {
        img {
            width: 30px;
        }
    }
}
.logout {
    cursor: pointer;
    margin-right: 5px;
}
.msg-menu {
    position: absolute;
    background: #FFF;
    box-shadow: 1px 1px 3px #515a6e;
    border-radius: 5px;
    color: #17233d;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    .msg-menu-item {
        padding: 5px 10px;
        &:hover {
            background: #dcdee2;
        }
    }
}
.msg-more {
    text-align: center;
    margin: 5px 0 0;
    cursor: pointer;
    &:hover {
        color: #57a3f3;
    }
}
.hidden {
    visibility: hidden;
    position: absolute;
}
</style>
<style lang="less">
.msg-contain img.emoji {
    cursor: auto;
    max-width: 40px;
    vertical-align: middle;
    background: transparent;
}
.msg-contain img {
    max-height: 60vh;
    max-width: 40vw;
    cursor: pointer;
    background: #FFF;
}
.msg-content {
    ul, ol {
        list-style-position: inside;
    }
    img.emoji {
        max-width: 20px;
    }
}
</style>

<template>
<article class="layout no-drag">
    <section class="hidden">
        <span style="font-size:12px">{{message}}</span>
    </section>    
    <section @click="menu = {}">
        <section class="chat-form">
        <span class="logout" @click="logout"><Avatar :src="current.userAvatarURL" title="点击注销"/></span>
        <Input ref="message"
            type="text"
            v-model="message"
            placeholder="简单聊聊"
            @on-keyup.enter="wsPush"
            @on-keyup.up="selList(-1)"
            @on-keyup.down="selList(1)"
            @on-keyup.left="selList(-1)"
            @on-keyup.right="selList(1)"
        >
            <Button
                slot="append"
                icon="md-send"
                @click="wsPush"
                style="box-shadow:none;"
            ></Button>
        </Input>
        <section class="at-list" v-if="atList.length">
            <div class="at-item" @click="atUser(i)" :class="{ 'current-at':  currentSel == i}" v-for="(u, i) in atList"><Avatar :src="u.userAvatarURL"/> {{u.userName}}</div>
        </section>
        <section class="emoji-list" v-if="emojiList.length">
            <div class="emoji-item" @click="emojiSel(i)" :class="{ 'current-at':  currentSel == i}" v-for="(u, i) in emojiList"><img :src="u.url"/></div>
        </section>
        </section>
        <section class="chat-content" ref="chat-content">
            <div v-for="item in content">
                <div class="msg-item" :class="{'msg-current': item.userName == current.userName}">
                    <a target="_blank" :href="`https://pwl.icu/member/${item.userName}`"><Avatar class="msg-avatar" :src="item.userAvatarURL" /></a>
                    <div :ref="`msg-${item.oId}`" class="msg-item-contain" @contextmenu="menuShow(item, $event)">
                        <div class="msg-user" :title="item.userNickname">{{item.userName}}</div>
                        <div class="msg-menu" v-if="menu[item.oId]" :style="{ top: menu[item.oId].y + 'px', left: menu[item.oId].x + 'px' }">
                            <div class="msg-menu-item" v-if="item.userName == current.userName" @click="revokeMsg(item.oId)">撤回</div>
                            <div class="msg-menu-item" v-if="item.userName != current.userName" @click="atMsg(item)">@{{item.userName}}</div>
                        </div>
                        <div class="msg-contain">
                            <div class="arrow" v-if="item.content.replace(/\n/g, '').match(/>[^<]+?</g)"/>
                            <div class="msg-content" v-html="formatContent(item.content)" v-if="item.content.replace(/\n/g, '').match(/>[^<]+?</g)"/>
                            <span class="msg-img" v-if="!item.content.replace(/\n/g, '').match(/>[^<]+?</g)" v-html="formatContent(item.content)"></span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="msg-more" @click="load(page + 1)" v-if="content.length < 9900">
                <Icon custom="fa fa-caret-down" v-if="!loading"/>
                <Icon custom="fa fa-circle-o-notch fa-spin" v-if="loading"/>
            </div>
        </section>
    </section>
</article>
</template>

<script>
    import { ipcRenderer } from 'electron'
    import ipc from '../ipc'
    import ReconnectingWebSocket from "reconnecting-websocket";
    import emoji from '../emoji';

    export default {
        name: 'chat',
        component: {
        },
        mounted () {
            this.$root.token = localStorage.getItem('token')
            if (!this.$root.token) {
                this.$router.push('/');
                return;
            }
            this.init();
        },
        data () {
            return {
                page: 1,
                content: [],
                message: '',
                rws: null,
                current: {},
                atList: [],
                emojiList: [],
                currentSel: -1,
                menu: {},
                loading: false,
                lastCursor: 0
            }
        },
        watch: {
            message(val) {
                let data = val.slice(0, this.msgCursor());
                let matAt = data.match(/@([^\s]+?)$/);
                let matEmoji = data.match(/:([^:]+?)$/);
                if(matAt) this.getAt(matAt[1])
                else if(matEmoji) this.getEmoji(matEmoji[1])
                else this.emojiList = this.atList = []
            }
        },
        filters: {
        },
        computed: {
            
        },
        methods: {
            msgCursor() {
                return this.$refs['message'].$el.querySelector('input').selectionStart
            },
            appendMsg(regexp, data){
                let preMsg = this.message.slice(0, this.lastCursor)
                    .replace(regexp, data);
                this.message = preMsg + this.message.slice(this.lastCursor);
                this.$nextTick(() => {
                    this.$refs['message'].focus();
                    this.$refs['message'].$el.querySelector('input').setSelectionRange(preMsg.length, preMsg.length)
                    this.emojiList = this.atList = []
                });
            },
            atMsg(item) {
                this.message += `@${item.userName} `;
                this.$refs['message'].focus();
            },
            atUser(i) {
                let data = '@' + this.atList[i].userName + ' ';
                this.atList = [];
                this.currentSel = -1;
                this.appendMsg(/@([^\s]*?)$/, data)
            },
            selList(i) {
                let len = this.atList.length || this.emojiList.length;
                if (len == 0) return;
                this.currentSel = (this.currentSel + i) % len;
                this.$refs['message'].$el.querySelector('input').setSelectionRange(this.lastCursor, this.lastCursor)
            },
            async getAt(name) {
                if (!name || name.length < 2) return;
                console.log(name)
                let rsp = await ipc.sendipcSync('pwl-at', name);
                if (!rsp) return;
                rsp = rsp.data;
                if (rsp.code != 0) {
                    this.$Message.error(rsp.msg);
                    return;
                }
                this.atList = rsp.data;
                this.currentSel = -1;
                this.lastCursor = this.msgCursor();
            },
            emojiSel(i) {
                let data = emoji.get(this.emojiList[i].name);
                this.emojiList = [];
                this.currentSel = -1;
                this.appendMsg(/:([^:]+?)$/, data)
            },
            getEmoji(name) {
                if (!name || name.length < 1) return;
                this.emojiList = emoji.search(name);
                this.currentSel = -1;
                this.lastCursor = this.msgCursor();
            },
            menuShow(item, ev) {
                let ele = this.$refs[`msg-${item.oId}`][0];
                let pos = {
                    x: ev.clientX - ele.offsetLeft,
                    y: ev.clientY - ele.offsetTop + this.$refs['chat-content'].scrollTop
                }
                this.menu = { [item.oId]: pos };
            },
            async revokeMsg(id) {
                let rsp = await ipc.sendipcSync('pwl-revoke', id);
                if (!rsp) return;
                rsp = rsp.data;
                if (rsp.code != 0) {
                    this.$Message.error(rsp.msg);
                    return;
                }
                console.log(rsp);
            },

            formatContent(content) {
                return content.replace(/(<a )/g, '$1target="_blank" ').replace(/(<img )/g, '$1data-action="preview" ');
            },
            async init() {
                if(await this.info())
                {
                    await this.load(1);
                    await this.load(2);
                    await this.wsInit();
                }
            },
            async info() {
                let rsp = await ipc.sendipcSync('pwl-info', this.$root.token);
                if (!rsp) return false;
                rsp = rsp.data;
                if (rsp.code != 0) {
                    localStorage.removeItem('token')
                    this.$router.push('/');
                    return false;
                }
                console.log(rsp)
                this.current = rsp.data;
                return true;
            },
            async load(page) {
                if (this.loading) return;
                this.loading = true;
                let rsp = await ipc.sendipcSync('pwl-history', page);
                this.loading = false;
                if (!rsp) return;
                rsp = rsp.data;
                if (rsp.code != 0) {
                    this.$Message.error(rsp.msg);
                    return;
                }
                let oIds = this.content.map(c => c.oId);
                let data = rsp.data.filter(d => oIds.indexOf(d.oId) < 0)
                if(page > 1) this.content = this.content.concat(data);
                else this.content = rsp.data;
                this.page = page;
            },
            logout() {
                localStorage.removeItem('token');
                this.$router.push('/');
            },
            wsInit() {
                let that = this;
                if (this.rws != null) this.rws.close();
                this.rws = new ReconnectingWebSocket(`wss://pwl.icu/chat-room-channel?apiKey=${this.$root.token}`);
                this.rws.reconnectInterval = 10000

                this.rws.onopen = (e) => {
                    console.log("onopen");
                    setInterval(() => {
                        that.rws.send('-hb-')
                    }, 1000 * 60 * 3)
                }
                this.rws.onmessage = (e) => {
                    that.wsMessage(e)
                }
                this.rws.onerror = (e) => {
                    console.log("onerror");

                }
                this.rws.onclose = (e) => {
                    console.log("onclose");
                }
                
            },
            async wsPush(ev, retry) {
                if (this.currentSel >= 0) {
                    if (this.atList.length > 0) this.atUser(this.currentSel);
                    if (this.emojiList.length > 0) this.emojiSel(this.currentSel);
                    return;
                }
                if (!this.message) return;
                let rsp = await ipc.sendipcSync('pwl-push', this.message);
                if (!rsp) return;
                rsp = rsp.data;
                if (rsp.code == 401 && !retry && await this.$root.relogin()) {
                    await this.init();
                    if(await this.wsPush(ev, true))
                        this.$Message.warn('服务器失联，已重新登录.');
                    return true;
                }
                if (rsp.code != 0) {
                    this.$Message.error(rsp.msg);
                    return false;
                }
                console.log(rsp);
                this.message = '';
                return true;
            },
            wsMessage(e) {
                console.log("onmessage");
                console.log(e)
                let msg = JSON.parse(e.data)
                
                switch (msg.type) {
                    case "online":  //在线人数
                        console.log(msg);
                        document.getElementById('win-title').innerHTML = `摸鱼派 - 聊天室(${msg.onlineChatCnt})`
                        break;
                    case "revoke":  //撤回
                        console.log(msg);
                        for (let i = 0; i < this.content.length; i++) {
                            let c= this.content[i];
                            if (c.oId != msg.oId) continue;
                            this.content.splice(i, 1);
                            break;
                        }
                        break;
                    case "msg":  //消息
                        this.content.splice(0, 0, msg)
                        if (this.content.length > 10000) this.load(1);
                        ipcRenderer.send('sys-msg', msg);
                        break;
                }
            }
        }
    }
</script>
