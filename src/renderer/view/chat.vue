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
.msg-menu, .face-menu {
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
    .msg-menu-item, .face-menu-item {
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
.content {
    display: flex;
    flex-direction: column;
    height: calc(100vh - 55px);
}
.msg-control {
    float: right;
    padding: 0 8px;
    font-size: 1.2em;
}
.emoji-tab {
    position: absolute;
    z-index: 60;
    width: 322px;
    top: 40px;
    right: 40px;
    margin: auto;
    .emoji-close {
        position: absolute;
        top: 2px;
        left: 10px;
        color:#131415;
        text-shadow: 0 0 1px #c6cbd1;
        cursor: pointer;
        z-index: 70;
    }
    .face-list {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        overflow: auto;
        max-height: 350px;
        &.face-diy {
            .face-item {
                margin: 2px;
                width: 59px;
                height: 59px;
                overflow: hidden;
                background-size: cover;
                .face-space {
                    display: inline-block;
                    width: 59px;
                    height: 59px;
                }
                img {
                    max-width: 100%;
                    max-height: 100%;
                    width: auto;
                }
            }
            .msg-quote-tip {
                img {
                    width: auto;
                    max-width: 150px;
                    max-height: 150px;
                }
            }
        }
        .face-item {
            width: 10%;
            padding: 5px;
            cursor: pointer;
            img {
                width: 100%;
            }
        }
        .face-add {
            width: 59px;
            height: 59px;
            cursor: pointer;
            line-height: 59px;
            text-align: center;
            margin: 2px;
            border: 1px dashed #6a737d
        }
    }
}
.msg-control-list {
    position: relative;
    padding-left:36px;
}    
.msg-current {
    .redpacket-item {
        flex-direction: row-reverse;
        .arrow {
            border-right-color: transparent;
            border-left-color: #f90;
        }
    }
}

.redpacket-item {
    display: flex;
    flex-direction: row;
    cursor: pointer;
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
.msg-redpacket {
    padding: 8px 0;
    svg {
        width: 25px;
        height: 25px;
    }
}
.redpacket {
    position: absolute;
    top: 50px;
    right: 0;
    left: 0;
    bottom: 0;
    height: 400px;
    width:  250px;
    margin: auto;
    border-radius: 10px;
    color: #fee3aa;
    padding: 10px;
    overflow: hidden;
    background: #f25745;
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
    }
    .redpacket-money {
        color: #fee3aa;
    }
    .redpacket-content {
        position: relative;
        padding-top: 10px;
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
        height: 200px;
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
.msg-contain, .msg-quote-tip {
    img {
        max-height: 60vh;
        max-width: 40vw;
        cursor: pointer;
        background: #FFF;
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
    
    table td,.msg-contain table th {
        border: 1px solid #dfe2e5
    }
    
    table tbody tr:nth-child(2n) {
        background-color: #fff
    }
    
    code:not(.hljs):not(.highlight-chroma) {
        background-color: rgba(27,31,35,.05)
    }
    
    kbd {
        color: #24292e;
        background-color: #fafbfc;
        border: 1px solid #d1d5da;
        box-shadow: inset 0 -1px 0 #d1d5da
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
.msg-quote-tip, .msg-current
{
    blockquote {
        color: #c6cbd1;
    }
}
</style>

<template>
<article class="layout no-drag">
    <section @click="clear" class="content">
        <symbol id="redPacketIcon" viewBox="0 0 1024 1024">
            <path d="M705.2 445.28C689.12 536.48 608.608 606.256 512 606.256c-91.232 0-171.728-64.4-187.84-150.272l-134.16-80.496V783.36c0 59.04 48.304 101.968 101.968 101.968h440.064c59.04 0 101.968-48.288 101.968-101.968V370.128l-128.8 75.136zM512 219.856c91.232 0 166.368 64.4 187.84 150.256l134.16-85.856v-48.304c0-59.04-48.304-101.968-101.968-101.968H291.968c-53.664 0-101.968 42.928-101.968 101.968v59.04l134.16 80.48c16.112-91.216 96.608-155.616 187.84-155.616z" fill="#e6464b" p-id="4469"></path>
            <path d="M565.664 434.528h-26.832v-21.456h26.832c16.112 0 26.832-10.736 26.832-26.832 0-16.112-10.72-26.848-26.832-26.848h-16.096l32.208-32.192c10.72-10.72 10.72-26.832 0-37.568-10.736-10.72-26.848-10.72-37.568 0L512 327.2l-32.192-37.568c-10.736-10.72-26.848-10.72-37.568 0-10.736 10.72-10.736 26.832 0 37.568l32.192 32.192h-16.096c-16.096 0-26.832 10.736-26.832 26.848 0 16.096 10.72 26.832 26.832 26.832h32.192v21.456h-32.192c-16.096 0-26.832 10.736-26.832 26.832 0 16.112 10.72 26.848 26.832 26.848h32.192v37.568c0 16.096 10.736 26.816 26.848 26.816 16.096 0 26.832-10.72 26.832-26.816v-37.568h21.456c16.112 0 26.832-10.736 26.832-26.848 0-16.096-10.72-26.832-26.832-26.832z" fill="#fecd41" opacity="1" p-id="4470"></path>
        </symbol>
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
        <section class="msg-control-list">
            <input type="file" name="images" accept="image/*" ref="file" v-show="false" @change="uploadImg">

            <Button type="text" class="msg-image msg-control" @click="$refs['file'].click()" title="上传图片"><Icon custom="fa fa-picture-o"/></Button>
            <Button type="text" class="msg-face msg-control" @click="emojiForm = !emojiForm" title="发表情"><Icon custom="fa fa-smile-o"/></Button>
            <Poptip title="发红包" placement="bottom" class="msg-control" >
                <Button type="text" class="msg-redpacket" title="发红包">
                    <svg class="redpacket-icon">
                        <use xlink:href="#redPacketIcon"></use>
                    </svg>
                </Button>
                <div class="redpacket-form" slot="content">
                    <Form ref="redpacketForm" :model="redpacket" :label-width="40">
                        <FormItem label="积分"><InputNumber  v-model="redpacket.money" :min="redpacket.count" placeholder="积分" /></FormItem>
                        <FormItem label="个数"><InputNumber  v-model="redpacket.count" :min="1" placeholder="个数" /></FormItem>
                        <FormItem label="留言"><Input v-model="redpacket.msg" placeholder="留言" /></FormItem>
                        <FormItem>
                            <Button type="error" @click="sendRedpacket">发送</Button>
                        </FormItem>
                    </Form>
                </div>
            </Poptip>
            <Tooltip placement="bottom-start" v-if="quote" :max-width="innerWidth * .8">
                <Tag closable @on-close="quote=null" color="success" v-if="quote">引用：@{{quote.userName}}</Tag>
                <div slot="content">
                    <div class="msg-quote-tip" v-html="quote.content"></div>
                </div>
            </Tooltip>
            <section class="emoji-tab" v-if="emojiForm">
                <div class="emoji-close" @click="emojiForm = false"><Icon custom="fa fa-times" /></div>
                <Tabs value="emoji" type="card">
                    <TabPane label="内置表情" name="emoji">
                        <article class="face-list">
                            <section class="face-item" v-for="e in emoji.list('vditor')" :title="e.name" @click="sendFace(emoji.get(e.name))">
                                <img :src="e.url" :alt="e.name">
                            </section>
                            <section class="face-item" v-for="e in emoji.list('emoji')" :title="e.name" @click="sendFace(emoji.get(e.name))">
                                <img :src="e.url" :alt="e.name">
                            </section>
                        </article>
                    </TabPane>
                    <TabPane label="自定义表情" name="faces">
                        <article class="face-list face-diy">
                            <section :ref="`face-${i}`" @contextmenu="faceMenuShow(i, $event)" 
                                class="face-item" v-for="(u, i) in faces" 
                                :style="{ backgroundImage: `url(${u})`}" 
                                @click="sendFace(emoji.get(u))">
                                <div class="face-menu" v-if="faceMenu[i]" :style="{ top: faceMenu[i].y + 'px', left: faceMenu[i].x + 'px' }">
                                    <div class="face-menu-item" @click="removeFace(i)">删除</div>
                                </div>
                                <Tooltip :placement="i % 4 < 3 ? 'bottom-start' : 'bottom-end'" :transfer="true">
                                    <span class="face-space"></span>
                                    <div class="msg-quote-tip" slot="content">
                                        <img :src="u">
                                    </div>
                                </Tooltip>
                            </section>
                            <section class="face-add" @click="$refs['facefile'].click()">
                                <Icon custom="fa fa-plus" />
                                <input type="file" name="images" accept="image/*" ref="facefile" v-show="false" @change="uploadFace">
                            </section>
                        </article>
                    </TabPane>
                </Tabs>
            </section>
        </section>
        <section class="chat-content" ref="chat-content">
            <div v-for="item in content">
                <div class="msg-item" :class="{'msg-current': item.userName == current.userName}">
                    <a target="_blank" :href="`https://pwl.icu/member/${item.userName}`"><Avatar class="msg-avatar" :src="item.userAvatarURL" /></a>
                    <div :ref="`msg-${item.oId}`" :data-id="item.oId" class="msg-item-contain" @contextmenu="menuShow(item, $event)">
                        <div class="msg-user" :title="item.userNickname">{{item.userName}}</div>
                        <div class="msg-menu" :ref="`msg-menu-${item.oId}`" v-if="menu[item.oId]" :style="{ top: menu[item.oId].y + 'px', left: menu[item.oId].x + 'px' }">
                            <div class="msg-menu-item" v-if="item.userName == current.userName" @click="revokeMsg(item.oId)">撤回</div>
                            <div class="msg-menu-item" v-if="item.userName != current.userName" @click="atMsg(item)">@{{item.userName}}</div>
                            <div class="msg-menu-item" v-if="hasFace(item.content)" @click="addFace">添加到表情包</div>
                            <div class="msg-menu-item" v-if="isEmoji()" title="消息中插入该表情" @click="appendMsg(null, emojiCode(item.content))">{{emojiCode(item.content)}}</div>
                            <div class="msg-menu-item" @click="quote = item">引用</div>
                        </div>
                        <div class="redpacket-item" v-if="!!getRedPacket(item)" @click="openRedpacket(item)">
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
        <section class="redpacket" v-if="redpacketData != null">
            <section class="redpacket-bg"></section>
            <header>
                <p class="redpacket-title"><Avatar :src="redpacketData.info.userAvatarURL" size="small"/> {{redpacketData.info.userName}} 的红包 </p>
                <p class="redpacket-msg">{{redpacketData.info.msg}}</p>
                <p class="redpacket-count">总计{{redpacketData.info.got}}/{{redpacketData.info.count}}</p>
            </header>
            <main class="redpacket-content">
                <section>
                    <p class="redpacket-current redpacket-money" v-if="redpacketData.who.find(w => w.userName == current.userName)">
                        {{redpacketData.who.find(w => w.userName == current.userName).userMoney}} 积分
                    </p>
                    <p class="redpacket-current" v-if="!redpacketData.who.find(w => w.userName == current.userName)">
                        错过了一个亿！
                    </p>
                </section>
                <section class="redpacket-list">
                    <ul>
                        <li v-for="w in redpacketData.who" :style="{ fontWeight: maxRedpacket == w.userMoney ? 'bolder' : 'normal' }">
                            <span class="redpacket-user"><Avatar :src="w.avatar" /> {{w.userName}}</span>
                            <span class="redpacket-max redpacket-tip" v-if="maxRedpacket == w.userMoney">来自老王的认可</span>
                            <span class="redpacket-zero redpacket-tip" v-if="0 == w.userMoney">0 溢事件</span>
                            <span class="redpacket-money">{{w.userMoney}} 积分</span>
                        </li>
                    </ul>
                </section>
            </main>
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
                faceMenu: {},
                loading: false,
                lastCursor: 0,
                quote: null,
                emojiForm: false,
                menuTarget: null,
                faces: emoji.urls,
                redpacket: {
                    money: 32,
                    count: 2,
                    msg: '摸鱼者，事竟成！'
                },
                redpacketData: null
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
            },
            quote (val) {
                if (val == null) this.message =  this.message.replace(/^并说：/, '');
                else if(!this.message.startsWith('并说：')) this.message = '并说：' + this.message;
            }
        },
        filters: {
        },
        computed: {
            innerWidth() {
                return window.innerWidth
            },
            emoji() {
                return emoji;
            },
            maxRedpacket() {
                return this.redpacketData && Math.max(...this.redpacketData.who.map(a => a.userMoney))
            }
        },
        methods: {
            clear () {
                this.menu = {};
                this.emojiForm = false;
                this.redpacketData = null;
            },
            async sendRedpacket() {
                if (this.redpacket.count <= 0) return;
                this.redpacket.msg = this.redpacket.msg || '摸鱼者，事竟成！';
                let message = `[redpacket]${JSON.stringify(this.redpacket)}[/redpacket]`
                await this.wsSend(message);
            },
            async openRedpacket(item) {
                let rsp = await fetch('https://pwl.icu/chat-room/red-packet/open',
                {
                    body: JSON.stringify({
                        oId: item.oId,
                        apiKey: this.$root.token
                    }),
                    method: "post"
                });
                if (!rsp) return;
                this.redpacketData = await rsp.json();
                console.dir(this.redpacketData);
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
            sendFace(face) {
                this.appendMsg(null, face);
                this.emojiForm = false;
            },
            async uploadFace(ev) {
                let files = Array.from(ev.target.files)
                let data = new FormData();
                files.forEach(f => data.append('file[]', f));

                let rsp = await fetch('https://pwl.icu/upload',
                {
                    body: data,
                    method: "post"
                });
                if (!rsp) return;
                rsp = await rsp.json();
                if (rsp.code != 0) {
                    this.$Message.error(rsp.msg);
                    return;
                }
                let fileData = rsp.data.succMap;
                for(let d in fileData) {
                    this.faces.push(fileData[d]);
                    emoji.push(null, fileData[d])
                }
                emoji.save();
            },
            async uploadImg(ev) {
                let files = Array.from(ev.target.files)
                let data = new FormData();
                files.forEach(f => data.append('file[]', f));

                let rsp = await fetch('https://pwl.icu/upload',
                {
                    body: data,
                    method: "post"
                });
                if (!rsp) return;
                rsp = await rsp.json();
                if (rsp.code != 0) {
                    this.$Message.error(rsp.msg);
                    return;
                }
                let fileData = rsp.data.succMap;
                let filename = Object.keys(fileData)[0]
                this.appendMsg(null, `![${filename}](${fileData[filename]})`); 
            },
            getRedPacket(item) {
                try {
                    let data = JSON.parse(item.content);
                    if (data.msgType != 'redPacket') return false;
                    return data;
                } catch (e) {
                    return false;
                }
            },
            msgCursor() {
                return this.$refs['message'].$el.querySelector('input').selectionStart
            },
            appendMsg(regexp, data){
                let preMsg = this.message.slice(0, this.lastCursor)
                if(regexp) preMsg = preMsg.replace(regexp, data);
                else preMsg += data;
                this.message = preMsg + this.message.slice(this.lastCursor);
                this.$nextTick(() => {
                    this.$refs['message'].focus();
                    this.$refs['message'].$el.querySelector('input').setSelectionRange(preMsg.length, preMsg.length)
                    this.emojiList = this.atList = []
                });
            },
            atMsg(item) {
                this.lastCursor = this.msgCursor();
                this.appendMsg(null, `@${item.userName} `)
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
                this.menuTarget = ev.target;
                console.dir(this.menuTarget)
                let ele = this.$refs[`msg-${item.oId}`][0];
                let pos = {
                    x: ev.clientX - ele.offsetLeft,
                    y: ev.clientY - ele.offsetTop + this.$refs['chat-content'].scrollTop
                }
                this.menu = { [item.oId]: pos };
                this.lastCursor = this.msgCursor();
            },
            faceMenuShow(item, ev) {
                let ele = this.$refs[`face-${item}`][0];
                let pos = {
                    x: ev.clientX - ele.offsetLeft,
                    y: ev.clientY - ele.offsetTop
                }
                // this.faceMenu = { [item]: pos };
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
                if (this.quote) {
                    let rsp = await ipc.sendipcSync('pwl-raw', this.quote.oId);
                    let raw = rsp.data;
                    raw = raw.split('\n').map(r => `>${r}`).join('\n').trim();
                    let at = this.quote.userName != this.current.userName ? `@${this.quote.userName} ` : ''
                    this.message = `${at}引用：\n\n${raw}\n\n${this.message}`;
                    this.quote = null;
                }
                await this.wsSend(this.message);
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
            },
            async wsSend(message) {
                let rsp = await ipc.sendipcSync('pwl-push', message);
                if (!rsp) return;
                rsp = rsp.data;
                if (rsp.code == 401 && !retry && await this.$root.relogin()) {
                    await this.init();
                    if(await this.wsPush(ev, true))
                        this.$Message.warning('服务器失联，已重新登录.');
                    return true;
                }
                if (rsp.code != 0) {
                    this.$Message.error(rsp.msg);
                    return false;
                }
            }
        }
    }
</script>
