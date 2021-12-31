<style lang="less" scoped>
.msg-new {
    position: absolute;
    right: 20px;
    background: #d23f31;
    padding: 5px;
    border-radius: 5px;
    cursor: pointer;
    z-index: 200;
}
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
    position: relative;
    width: 80vw;
    .msg-img {
        padding: 5px 10px;
        display: inline-block;
        font-size: 0;
        max-width: 70vw;
    }
    .plus-one {
        font-size: .8em;
        margin: auto 5px;
        font-weight: bolder;
        color: #FFF;
        height: 25px;
        width: 25px;
        background: #d23f31;
        border-radius: 15px;
        text-align: center;
        cursor: pointer;
        font-family: mononoki,Consolas,"Liberation Mono",Menlo,Courier,monospace;
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
    max-width: calc(100% - 45px);
    overflow: auto;
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
    .plus-one {
        left: -1.5em;
        right: auto;
    }
}
.chat-content {
    overflow: hidden auto;
    margin-top: 5px;
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
    z-index:50;
    .msg-menu-item {
        padding: 5px 10px;
        word-break: keep-all;
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

.msg-current {
    .redpacket-item {
        flex-direction: row-reverse;
        .arrow {
            border-right-color: transparent;
            border-left-color: #f90;
        }
        &.redpacket-empty {
            .arrow {
                border-right-color: transparent;
                border-left-color: #fecd41;
            }
        }
    }
}

.redpacket-item {
    display: flex;
    flex-direction: row;
    cursor: pointer;
    user-select: none;
    &.redpacket-empty {
        .redpacket-content {
            background: #fecd41;
        }
        .arrow {
            border-right-color: #fecd41;
        }
    }
    .arrow {
        border-right-color: #f90;
    }
    .redpacket-content{
        display: inline-flex;
        align-items: center;
        background: #f90;
        border-radius: 5px;
        padding-right: 10px;
        .redpacket-icon {
            width: 64px;
            height: 64px;
        }
        .redpacket-msg {
            color: #FFF;
        }
    }
}
.redpacket {
    position: absolute;
    top: 50px;
    right: 0;
    left: 0;
    bottom: 0;
    height: 400px;
    max-height: 80vh;
    width:  250px;
    margin: auto;
    border-radius: 10px;
    color: #fee3aa;
    padding: 10px;
    overflow: hidden;
    background: #f25745;
    z-index: 100;
    header {
        position: relative;
        z-index: 2;
        text-align: center;
    }
    .redpacket-bg {
        border-radius: 300px;
        width: 600px;
        height: 600px;
        border: 2px solid #f1ca74;
        background: #f45e4d;
        position: absolute;
        top: -420px;
        left: -175px;
        z-index: 1;
    }
    .redpacket-msg {
        color: #24292e;
        font-size: .8em;
        min-height: 2em;
    }
    .redpacket-user {
        width: calc(100% - 70px);
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
    }
    .redpacket-money {
        color: #fee3aa;
    }
    .redpacket-content {
        position: relative;
        padding-top: 0;
        z-index: 2;
        color: #000;
        ul {
            list-style: none;
            padding: 0;
            li {
                margin: 10px 0;
                display: flex;
                justify-content: space-between;
                position: relative;
            }
        }
    }
    .redpacket-current {
        color: #fee3aa;
        text-align: center;
        font-size: 1.5em;
        margin: 10px 0 30px;
        &.redpacket-money {
            font-size: 2em;
            margin-top: 5px;
        }
    }
    .redpacket-list {
        height: 190px;
        overflow: auto;
        padding: 5px;
    }
    .redpacket-tip {
        cursor: default;
        position: absolute;
        font-size: .6em;
        padding: 0 5px;
        left: 35px;
        top: 2.5em;
        border-radius: 5px;
        background-color: #FFF;
        border: 1px solid #D5D5D5;
        font-weight: normal;
        &.redpacket-max {
            color: #fff;
            background-color: #60b044;
            border-color: #5ca941;
        }
        &.redpacket-zero {
            color: #d23f31
        }
    }
}
.redpacket-status {
    font-size: .8em;
    text-align: center;
    padding: 5px 0;
    svg {
        width: 15px;
        height: 15px;
        vertical-align: middle;
    }
    a {
        color: #d23f31;
        border-bottom: 1px dashed #d23f31;
    }
}
.msg-current {
    .db-users {
        justify-content: flex-end;
    }
}
.db-users {
    padding: 5px 0 5px 10px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    .db-user {
        padding: 2px;
    }
    .db-avatar {
        width: 25px;
        height: 25px;
    }
    .db-word {
        display: inline-block;
        padding-left: 5px;
    }
}
.msg-avatar-box {
    position: relative;
}
.christmas {
    position: absolute;
    background: url(../assets/christmas.png) top left no-repeat;
    width: 100%;
    height: 100%;
    background-size: 100% auto;
    right: -14px;
    transform: scaleX(-1);
    top: 20px;
    z-index: 9;
}
.msg-current {
    .christmas {
        transform: none;
        right: auto;
        left: -14px;
    }
}
</style>
<style lang="less">
.ivu-tabs.ivu-tabs-card>.ivu-tabs-bar .ivu-tabs-tab {
    background: #515a6e;
    color: #232425
}
.ivu-tabs.ivu-tabs-card>.ivu-tabs-bar .ivu-tabs-tab-active {
    background: #131415;
    color: #6a737d
}
.ivu-tabs-nav {
    float: right;
    margin-right: 5px;
}
.ivu-tabs-bar {
    margin-bottom: 0;
    border: 0;
}
.ivu-tabs-tabpane {
    overflow: hidden;
    border-radius: 10px;
    background: #131415;
    border: 1px solid #d1d5da;
    border-top: 0;
}
.msg-current {
    .msg-content {
        a {
            border-bottom: 1px dashed #F6F8FA;
        }
    }
}
.ivu-tooltip-popper {
    line-height: 1.2;
    blockquote {
        line-height: 1;
    }
}
.ivu-tag {
    height: 32px;
    line-height: 32px;
    padding: 0 12px;
}
.msg-current
{
    blockquote {
        color: #c6cbd1;
    }
}
</style>

<template>
    <section class="chat-content" ref="chat-content" @scroll="scrollChat">
        <div v-if="hasNewMsg" class="msg-new" 
            @click="$refs['chat-content'].scrollTo(0, 0)">
            <i class="fa fa-angle-double-up"></i> 新消息
        </div>
        <div v-for="(item, i) in content" v-bind:key="(item.type || 'msg') + '_' + item.oId + (item.whoGot || '')" :data-key="(item.type || 'msg') + '_' + item.oId + (item.whoGot || '')">
            <div class="redpacket-status" v-if="item.type == 'redPacketStatus'">
                <svg><use xlink:href="#redPacketIcon"></use></svg> {{item.whoGot}} 抢到了 {{item.whoGive}} 的 <a href="#" @click="openRedpacket(item)">红包</a> ({{item.got}}/{{item.count}})
            </div>
            <div class="msg-item" v-if="item.content" :class="{'msg-current': item.userName == current.userName}" @contextmenu="menuShow(item, $event)">
                <div class="msg-avatar-box"><a target="_blank" :href="`https://${$root.config.domain}/member/${item.userName}`">
                    <div class="christmas" v-if="new Date().getMonth() == 11 && new Date().getDate() < 26 && new Date().getDate() > 23"></div>
                    <Avatar class="msg-avatar" :src="item.userAvatarURL" />
                </a></div>
                <div :ref="`msg-${item.oId}`" :data-id="item.oId" class="msg-item-contain">
                    <div class="msg-user" :title="item.userNickname">{{item.userName}}</div>
                    <div class="msg-menu" :ref="`msg-menu-${item.oId}`" v-if="menu[item.oId]" :style="{ top: menu[item.oId].y + 'px', left: menu[item.oId].x + 'px' }">
                        <div class="msg-menu-item" v-if="item.userName == current.userName || ['纪律委员', 'OP'].indexOf(current.userRole) >= 0" @click="revokeMsg(item.oId)">撤回</div>
                        <div class="msg-menu-item" v-if="item.dbUser && item.dbUser.length && ['纪律委员', 'OP'].indexOf(current.userRole) >= 0" @click="revokeAllMsg(item)">撤回复读</div>
                        <div class="msg-menu-item" v-if="item.userName != current.userName" @click="atMsg(item)">@{{item.userName}}</div>
                        <div class="msg-menu-item" v-if="hasFace(item.content)" @click="addFace">添加到表情包</div>
                        <div class="msg-menu-item" v-if="!getRedPacket(item)" @click="followMsg(item)">复读一下</div>
                        <div class="msg-menu-item" v-if="isEmoji()" title="消息中插入该表情" @click="appendMsg(null, emojiCode(item.content))">{{emojiCode(item.content)}}</div>
                        <div class="msg-menu-item" v-if="!getRedPacket(item)" @click="quoteMsg(item)">回复</div>
                    </div>
                    <div class="redpacket-item" :title="getRedPacket(item).empty ? '红包已领完' : getRedPacket(item).readed ? '红包已领取' : ''"
                    :class="{'redpacket-empty': getRedPacket(item).empty || getRedPacket(item).readed}" 
                    v-if="!!getRedPacket(item)" @click="openRedpacket(item)">
                        <div class="arrow"/>
                        <div class="redpacket-content">
                            <svg class="redpacket-icon">
                                <use xlink:href="#redPacketIcon"></use>
                            </svg>
                            <div class="redpacket-msg">{{getRedPacket(item).msg}}</div>
                        </div>
                    </div>
                    <div class="msg-contain" v-if="!getRedPacket(item)">
                        <div class="arrow" v-if="item.content.replace(/\n/g, '').match(/>[^<]+?</g)"/>
                        <div class="msg-content md-style" v-html="formatContent(item.content)" v-if="item.content.replace(/\n/g, '').match(/>[^<]+?</g)"/>
                        <span class="msg-img" v-if="!item.content.replace(/\n/g, '').match(/>[^<]+?</g)" v-html="formatContent(item.content)"></span>
                        <span class="plus-one" @click="followMsg(item)" v-if="item.dbUser.length && item.oId == firstMsg.oId">+1</span>
                    </div>
                    <div class="db-users" v-if="item.dbUser.length">
                        <span class="db-user" :key="db.oId" v-for="db in item.dbUser" :title="db.userNickame || db.userName">
                            <Avatar class="db-avatar" :src="db.userAvatarURL" />
                        </span>
                        <span class="db-word">也这么说</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="msg-more" @click="load(page + 1)" v-if="content.length < 1999">
            <Icon custom="fa fa-caret-down" v-if="!loading"/>
            <Icon custom="fa fa-circle-o-notch fa-spin" v-if="loading"/>
        </div>
        <section class="redpacket" v-if="redpacketData != null">
            <section class="redpacket-bg"></section>
            <header>
                <p class="redpacket-title"><Avatar :src="redpacketData.info.userAvatarURL" size="small"/> {{redpacketData.info.userName}} 的红包 </p>
                <p class="redpacket-msg">{{redpacketData.info.msg}}</p>
                <p class="redpacket-count">总计{{redpacketData.info.got}}/{{redpacketData.info.count}}</p>
            </header>
            <main class="redpacket-content">
                <section>
                    <p class="redpacket-current redpacket-money">
                        {{redpacketTitle}}
                    </p>
                </section>
                <section class="redpacket-list">
                    <ul>
                        <li v-for="w in redpacketData.who" :style="{ fontWeight: maxRedpacket == w.userMoney ? 'bolder' : 'normal' }">
                            <span class="redpacket-user"><Avatar :src="w.avatar" /> {{w.userName}}</span>
                            <span class="redpacket-max redpacket-tip" 
                                v-if="redpacketData.who.find(w => w.userMoney == maxRedpacket).userName == w.userName 
                                && redpacketData.info.got == redpacketData.info.count
                                ">来自老王的认可</span>
                            <span class="redpacket-zero redpacket-tip" v-if="0 == w.userMoney">0 溢事件</span>
                            <span class="redpacket-money">{{w.userMoney}} 积分</span>
                        </li>
                    </ul>
                </section>
            </main>
        </section>
    </section>
</template>

<script>
    import { ipcRenderer } from 'electron'
    import ReconnectingWebSocket from "reconnecting-websocket";
    import emoji from '../emoji';

    export default {
        name: 'chat',
        component: {
        },
        props: {
            current: {
                required: true
            }
        },
        mounted () {
            this.init();
            
        },
        data () {
            return {
                page: 1,
                content: [],
                rws: null,
                menu: {},
                faceMenu: {},
                loading: false,
                menuTarget: null,
                redpacketData: null,
                hasNewMsg: false
            }
        },
        watch: {

        },
        filters: {
        },
        computed: {
            emoji() {
                return emoji;
            },
            maxRedpacket() {
                return this.redpacketData && Math.max(...this.redpacketData.who.map(a => a.userMoney))
            },
            redpacketTitle() {
                let money = this.redpacketData.who.find(
                    (w) => w.userName == this.current.userName
                );
                this.redpacketData.recivers = this.redpacketData.recivers || [];
                this.redpacketData.recivers = this.redpacketData.recivers.filter(r => r && typeof(r) == 'string');
                let specify = (this.redpacketData.recivers.length && this.redpacketData.recivers.indexOf(this.current.userName) >= 0)
                let msg;
                if (this.redpacketData.recivers.length && !specify) {
                    msg = "会错意了"
                } else if (!money) {
                    msg = "错过一个亿";
                } else {
                    msg =
                        money.userMoney == 0
                        ? "抢了个寂寞"
                        : `${money.userMoney} 积分`;
                }

                return msg
            },
            firstMsg() {
                return this.content.find(item => !this.getRedPacket(item) && !item.whoGot)
            },
            secondMsg() {
                return this.content.find(item => !this.getRedPacket(item) && !item.whoGot && item.oId != this.firstMsg.oId)
            }
        },
        methods: {
            clear (ev) {
                this.menu = {};
                this.redpacketData = null;
            },
            scrollChat() {
                if (this.$refs['chat-content'].scrollTop == 0) this.hasNewMsg = false;
            },
            async openRedpacket(item) {
                let rsp = await this.$root.pwl.openRedpacket(item.oId);
                if (!rsp) return;
                this.redpacketData = rsp;
                item.readed = true;
            },
            isEmoji() {
                return (this.menuTarget || { nodeName: '' }).nodeName.toLowerCase() == 'img'
                && this.menuTarget.className == 'emoji';
            },
            emojiCode(content) {
                return `:${content.match(/\/([^\/.]*?)(.gif|.png)/)[1]}:`
            },
            hasFace(content) {
                return content.match(/<img/) != null 
                && (this.menuTarget || { nodeName: '' }).nodeName.toLowerCase() == 'img'
                && this.menuTarget.className != 'emoji'
            },
            addFace() {
                if(emoji.push(null, this.menuTarget.src)) this.$Message.success('添加成功！');
                else this.$Message.warning('表情已存在');
                emoji.save();
            },
            getRedPacket(item) {
                try {
                    let data = JSON.parse(item.content);
                    if (data.msgType != 'redPacket') return false;
                    data.empty = item.empty || data.got == data.count
                    data.readed = item.readed || data.who.find(w => w.userName == this.current.userName)
                    return data;
                } catch (e) {
                    return false;
                }
            },
            msgCursor() {
                this.$emit('cursor');
            },
            appendMsg(regexp, data){
                this.$emit('message', { regexp, data });
            },
            quoteMsg(item) {
                this.$emit('quote', item);
            },
            atMsg(item) {
                this.msgCursor();
                this.appendMsg(null, `@${item.userName} `)
            },
            menuShow(item, ev) {
                this.menuTarget = ev.target;
                let ele = this.$refs[`msg-${item.oId}`][0];
                let pos = {
                    x: ev.clientX - ele.offsetLeft,
                    y: ev.clientY - ele.offsetTop + this.$refs['chat-content'].scrollTop
                }
                this.menu = { [item.oId]: pos };
                this.msgCursor();
            },
            async revokeAllMsg(item) {
                if (!confirm('是否确定批量撤回所有复读消息？')) return;
                item.dbUser.forEach(i => this.revokeMsg(i.oId));
                this.revokeMsg(item.oId);
            },
            async revokeMsg(id) {
                let rsp = await this.$root.pwl.revoke(id);
                if (!rsp) return;
                if (rsp.code != 0) {
                    this.$Message.error(rsp.msg);
                    return;
                }
            },
            formatContent(content) {
                return content.replace(/(<a )/g, '$1target="_blank" ')
                    .replace(/(<img )/g, '$1data-action="preview" ');
            },
            async init() {
                await this.load(1);
                await this.load(2);
                await this.wsInit();
            },
            async load(page) {
                if (this.loading) return;
                this.loading = true;
                let rsp = await this.$root.pwl.history(page);
                this.loading = false;
                if (!rsp) return;
                if (rsp.code != 0) {
                    this.$Message.error(rsp.msg);
                    return;
                }
                let oIds = this.content.map(c => c.oId);
                let data = rsp.data.filter(d => oIds.indexOf(d.oId) < 0)
                data = this.mergeDoubleMsg(data);
                if(page > 1) {
                    if (this.content[0].dbUser 
                    && data[data.length - 1].content == this.content[0].content) {
                        let last = data.pop();
                        last.dbUser = last.dbUser || []
                        last.dbUser.splice(0, 0, {
                            userName: last.userName,
                            userAvatarURL: last.userAvatarURL
                        })
                        this.content[0].dbUser.splice(0, 0, ...last.dbUser)
                    }
                    this.content = this.content.concat(data);
                }
                else this.content = data;
                this.page = page;
            },
            mergeDoubleMsg(contents) {
                contents.forEach((c, i) => {
                    contents[i].dbUser = []
                    if (!contents[i - 1]) return;
                    if (this.getRedPacket(contents[i])) return;
                    if (c.content != contents[i - 1].content) return;
                    contents[i - 1].hide = true;
                    contents[i].dbUser = contents[i - 1].dbUser || [];
                    contents[i - 1].dbUser = undefined;
                    contents[i].dbUser.splice(0, 0, contents[i - 1])
                });
                return contents.filter(c => !c.hide);
            },
            wsInit() {
                let that = this;
                if (this.rws != null) this.rws.close();
                this.rws = new ReconnectingWebSocket(`wss://${this.$root.config.domain}/chat-room-channel?apiKey=${this.$root.token}`);
                this.rws.reconnectInterval = 10000

                this.rws.onopen = (e) => {
                    setInterval(() => {
                        that.rws.send('-hb-')
                    }, 1000 * 60 * 3)
                }
                this.rws.onmessage = (e) => {
                    that.wsMessage(e)
                }
                this.rws.onerror = (e) => {
                    console.log('rws error', e.message);
                }
                this.rws.onclose = (e) => {
                }
                
            },
            async followMsg(item) {
                let raw = await this.$root.pwl.raw(item.oId);
                this.$emit('send', raw);
            },
            wsMessage(e) {
                let msg = JSON.parse(e.data)
                this.$emit('wsMessage', e);
                switch (msg.type) {
                    case "online":  //在线人数
                        document.getElementById('win-title').innerHTML = `摸鱼派 - 聊天室(${msg.onlineChatCnt})`
                        break;
                    case "revoke":  //撤回
                        for (let i = 0; i < this.content.length; i++) {
                            let c = this.content[i];
                            if (this.content[i].dbUser) this.content[i].dbUser = this.content[i].dbUser.filter(d => d.oId != msg.oId)
                            if (c.oId != msg.oId) continue;
                            if (this.content[i].dbUser && this.content[i].dbUser.length) {
                                let nextUser = this.content[i].dbUser.shift();
                                if(this.content[i].dbUser.length) nextUser.dbUser = this.content[i].dbUser;
                                this.content[i] = nextUser;
                            }
                            else this.content.splice(i, 1);
                            break;
                        }
                        break;
                    case "msg":  //消息
                    case "redPacketStatus":
                        msg.dbUser = []
                        if (msg.type == 'msg' && !this.getRedPacket(msg)
                        && msg.content == this.content[0].content) {
                            this.content[0].dbUser = this.content[0].dbUser || []
                            this.content[0].dbUser.push(msg)
                        }
                        else this.content.splice(0, 0, msg)
                        if (this.content.length > 2000) this.load(1);
                        if(msg.type == 'msg') {
                            ipcRenderer.send('sys-msg', msg);
                            this.hasNewMsg = this.$refs['chat-content'].scrollTop > 60
                                
                        }
                        else if (msg.count == msg.got) {
                            for (let i = 0; i < this.content.length; i++) {
                                let c= this.content[i];
                                if (c.oId != msg.oId || c.type == 'redPacketStatus') continue;
                                this.content[i].empty = true;
                                if(msg.whoGot == this.current.userName) this.content[i].readed = true;
                                break;
                            }
                        }
                        break;
                }
            }
        }
    }
</script>
