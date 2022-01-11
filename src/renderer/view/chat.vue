<style lang="less" scoped>
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
.content {
    display: flex;
    flex-direction: column;
    height: calc(100vh - 55px);
}
.msg-control {
    float: right;
    padding: 1px 5px;
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
                position: relative;
                .face-space {
                    display: inline-block;
                    width: 59px;
                    height: 59px;
                }
                .face-remove {
                    position: absolute;
                    top: -5px;
                    right: 5px;
                    font-size: .5em;
                    .ivu-btn {
                        padding: 0;
                    }
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
                    max-width: 100px;
                    max-height: 100px;
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
.redpacket-form {
    .ivu-form-item {
        margin-bottom: 5px;
    }
    .user-list {
        max-width: 80vw;
        max-height: 6em;
        overflow: auto;
        .user-item {
            display: inline-block;
            margin: 2px;
        }
        .user-check {
            .ivu-avatar-image {
                border: 2px inset #fd2121;
                box-shadow: 0 0 5px #fd2121;
            }
        }
    }
}
.msg-redpacket {
    padding: 0 8px;
    svg {
        width: 25px;
        height: 25px;
        display: inline;
        vertical-align: middle;
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

.ivu-tooltip-popper {
    line-height: 1.2;
    blockquote {
        line-height: 1;
    }
    img {
        max-width: 150px;
        max-height: 150px;
    }
}
.ivu-tag {
    height: 32px;
    line-height: 32px;
    padding: 0 12px;
}
.msg-quote-tip
{
    blockquote {
        color: #c6cbd1;
    }
    img {
        width: auto;
        max-width: 200px;
        max-height: 200px;
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
        <symbol id="delIcon" viewBox="0 0 1029 1024">
            <path d="M5.680999 1.42025h1022.57975v1022.57975C463.001387 1024 5.680999 565.969487 5.680999 1.42025z m592.244105 494.246879L724.327323 622.069348c17.042996 17.042996 44.737864 17.042996 61.78086 0l7.101248-7.101248c17.042996-17.042996 17.042996-44.737864 0-61.78086L666.807212 426.785021l126.402219-126.402219c17.042996-17.042996 17.042996-44.737864 0-61.78086l-7.101248-7.101249c-17.042996-17.042996-44.737864-17.042996-61.78086 0L597.925104 357.902913 471.522885 231.500693c-17.042996-17.042996-44.737864-17.042996-61.78086 0l-7.101248 7.101249c-17.042996 17.042996-17.042996 44.737864 0 61.78086l126.402219 126.402219-126.402219 125.692094c-17.042996 17.042996-17.042996 44.737864 0 61.78086l7.101248 7.101248c17.042996 17.042996 44.737864 17.042996 61.78086 0l126.402219-125.692094z" fill="#bfbfbf" p-id="5348"></path>
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
                    :loading="sending"
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
            <Button type="text" class="msg-reload msg-control" @click="$refs['content'].reset()" title="消息清屏"><Icon custom="fa fa-refresh"/></Button>
            <Button type="text" class="msg-image msg-control" @click="$refs['file'].click()" title="上传图片"><Icon custom="fa fa-picture-o"/></Button>
            <Button type="text" class="msg-face msg-control" @click="emojiForm = !emojiForm" title="发表情"><Icon custom="fa fa-smile-o"/></Button>
            <Button type="text" class="msg-redpacket msg-control" title="发红包" @click="redpacketForm=!redpacketForm">
                <svg class="redpacket-icon">
                    <use xlink:href="#redPacketIcon"></use>
                </svg>
            </Button>
            <Modal 
                v-model="redpacketForm" 
                title="发红包"
                class="redpacket-form">
                <Form ref="redpacketForm" :model="redpacket" :label-width="50" :show-message="false">
                    <FormItem label="类型">
                        <Select v-model="redpacket.type">
                            <Option v-for="item in redpacketType" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="发给谁" v-if="redpacket.type == 'specify'">
                        <section class="user-list">
                            <span v-for="u in onlineList" @click="reciverCheck(u)"
                                class="user-item" 
                                :title="u.userName" 
                                :class="{ 'user-check': redpacket.recivers.indexOf(u.userName) >= 0 }">
                                <Avatar :src="u.userAvatarURL"></Avatar>
                            </span>
                        </section>
                    </FormItem>
                    <FormItem label="积分"><InputNumber v-model="redpacket.money" :min="32" :max="20000" placeholder="积分" /></FormItem>
                    <FormItem label="个数"><InputNumber v-model="redpacket.count" :min="1" :max="1000" placeholder="个数" /></FormItem>
                    <FormItem label="留言"><Input v-model="redpacket.msg" :placeholder="defaultRedpackWord[redpacket.type]" /></FormItem>
                    <FormItem label="连发"><InputNumber v-model="redpacket.times" :min="1" placeholder="连发" /></FormItem>
                    <FormItem label="间隔(s)"><InputNumber v-model="redpacket.interval" :min="1" placeholder="秒" /></FormItem>
                </Form>
                <div slot="footer">
                    <Button type="error" @click="sendRedpacket">发送</Button>
                </div>
            </Modal>
            </Poptip>
            <Tooltip placement="bottom-start" v-if="quote" :max-width="innerWidth * .8">
                <Tag closable @on-close="quote=null" color="success" v-if="quote">回复：@{{quote.userName}}</Tag>
                <div slot="content">
                    <div class="msg-quote-tip md-style" v-html="quote.content"></div>
                </div>
            </Tooltip>
            <section class="emoji-tab" v-show="emojiForm">
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
                    <TabPane label="收藏表情" name="faces">
                        <article class="face-list face-diy">
                            <section :ref="`face-${i}`"
                                class="face-item" v-for="(u, i) in faces" 
                                :style="{ backgroundImage: `url(${u})`}" 
                                @click="sendFace(emoji.get(u))">
                                <Tooltip class="face-tip" :placement="i % 4 < 3 ? 'bottom-start' : 'bottom-end'" :transfer="true">
                                    <span class="face-space"></span>
                                    <span @click.stop="">
                                        <Poptip  class="face-remove"
                                        confirm transfer
                                        title="你确定要删除这个表情吗？"
                                        @on-ok="removeFace(u)">
                                        <Button type="text"
                                            ><svg style="width: 15px; height: 15px;"><use xlink:href="#delIcon"></use></svg>
                                        </Button>
                                        </Poptip>
                                    </span>
                                    <div class="msg-quote-tip" slot="content">
                                        <img :src="u">
                                    </div>
                                </Tooltip>
                            </section>
                            <section class="face-add" @click="$refs['facefile'].click()">
                                <Icon custom="fa fa-plus" />
                                <input type="file" name="images" accept="image/*" ref="facefile" v-show="false" @change="uploadFace">
                            </section>
                            <section class="face-add" @click="downloadFace" title="导出">
                                <Icon custom="fa fa-download" />
                            </section>
                            <section class="face-add" @click="uploadFaces" title="导入">
                                <Icon custom="fa fa-upload" />
                            </section>
                        </article>
                    </TabPane>
                </Tabs>
            </section>
        </section>
        <chat-content @wsMessage="wsMessage" v-if="current.userName" ref="content" :current="current" @send="wsSend" @message="appendMsg" @quote="quoteMsg" @cursor="msgCursor"></chat-content>
    </section>
</article>
</template>

<script>
    import { ipcRenderer } from 'electron'
    import ipc from '../ipc'
    import emoji from '../emoji';
    import {constructFileFromLocalFileData, LocalFileData} from 'get-file-object-from-local-path'
    import chatContent from '../components/chat-content.vue'

    export default {
  components: { chatContent },
        name: 'chat',
        component: {
            chatContent
        },
        mounted () {
            this.$root.token = localStorage.getItem('token')
            if (!this.$root.token) {
                this.$router.push('/');
                return;
            }
            this.init();
            document.removeEventListener('paste', this.onPaste);
            document.addEventListener('paste', this.onPaste);
        },
        data () {
            return {
                message: '',
                current: {},
                onlineList: [],
                atList: [],
                emojiList: [],
                currentSel: -1,
                faceMenu: {},
                lastCursor: 0,
                quote: null,
                emojiForm: false,
                faces: emoji.urls,
                redpacket: {
                    type: 'random',
                    money: 32,
                    count: 2,
                    times: 1,
                    interval: 1,
                    msg: '',
                    recivers: []
                },
                sending: false,
                redpacketForm: false
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
            emoji() {
                return emoji;
            },
            redpacketType() {
                return [
                    { label: '拼手气红包', value: 'random' },
                    { label: '普通红包', value: 'average' },
                    { label: '专属红包', value: 'specify' },
                    { label: '心跳红包', value: 'heartbeat' },
                ]
            },
            defaultRedpackWord() {
                return {
                    random: '摸鱼者，事竟成！',
                    average: '平分红包，人人有份！',
                    specify: '试试看，这是给你的红包吗？',
                    heartbeat: '玩的就是心跳！'
                }
            },
            innerWidth() {
                return window.innerWidth
            }
        },
        methods: {
            async init() {
                if(await this.info())
                {
                    await emoji.load(this.$root.token);
                    this.faces = emoji.urls;
                }
            },
            async info() {
                let rsp = await this.$root.pwl.info(this.$root.token);
                if (!rsp) return false;
                if (rsp.code != 0) {
                    localStorage.removeItem('token')
                    this.$router.push('/');
                    return false;
                }
                this.current = rsp.data;
                return true;
            },
            async onPaste(ev) {
                let items = ev.clipboardData && ev.clipboardData.items;
                let file = [];
                if (items && items.length) {
                    for (var i = 0; i < items.length; i++) {
                        if (items[i].type.indexOf('image') !== -1) {
                            file.push(items[i].getAsFile());
                            break;
                        }
                        if (items[i].type.indexOf('html') !== -1) {
                            let files = await this.htmlGetImg(items[i])
                            files = files || []
                            files = files.map(f => constructFileFromLocalFileData(new LocalFileData(f.replace(/file:\/\/\//g, ''))))
                            file = file.concat(files);
                        }
                    }
                }
                if (file.length == 0) return;
                this.lastCursor = this.msgCursor();
                await this.uploadImg({ target: { files: file}});
            },
            htmlGetImg(item) {
                return new Promise((resolve) => {
                    item.getAsString((html) => {
                        resolve(html.match(/(?<=src=")([^"]+)/g))
                    })
                });
            },
            clear (ev) {
                this.$refs['content'].clear();
            },
            downloadFace() {
                let data = emoji.urls.join('\n');
                ipcRenderer.send('face-save', data);
            },
            async uploadFaces() {
                let rsp = await ipc.sendipcSync('face-upload');
                if (!rsp) return;
                rsp = rsp.data;
                rsp.forEach(u => emoji.push(null, u));
            },
            async sendRedpacket() {
                if (this.redpacket.count <= 0) return;
                if (this.redpacket.type == 'specify' && this.redpacket.recivers.length == 0) {
                    this.$Message.error('请至少选择一个人收红包');
                    return;
                }
                let redpacket = Object.assign({}, this.redpacket);
                redpacket.msg = redpacket.msg || this.defaultRedpackWord[redpacket.type];
                let data = { 
                    msg: redpacket.msg, 
                    money: redpacket.money, 
                    count: redpacket.count,
                    recivers: redpacket.recivers,
                    type: redpacket.type
                } 
                let timer = setInterval(async () => {
                    let message = `[redpacket]${JSON.stringify(data)}[/redpacket]`
                    await this.wsSend(message);
                    if (--redpacket.times == 0) clearInterval(timer);
                }, this.redpacket.interval * 1000)
                this.redpacketForm = false;
            },
            sendFace(face) {
                this.lastCursor = this.msgCursor();
                this.appendMsg({ regexp: null, data: face });
                this.emojiForm = false;
            },
            async removeFace(u) {
                this.faces = await emoji.remove(u, this.$root.token);
            },
            async uploadFace(ev) {
                let files = Array.from(ev.target.files)
                let rsp = await this.$root.pwl.upload(files);
                if (!rsp) return;
                if (rsp.code != 0) {
                    this.$Message.error(rsp.msg);
                    return;
                }
                let fileData = rsp.data.succMap;
                for(let d in fileData) {
                    this.faces.push(fileData[d]);
                    emoji.push(null, fileData[d])
                }
                emoji.save(this.$root.token);
            },
            async uploadImg(ev) {
                let files = Array.from(ev.target.files)
                let rsp = await this.$root.pwl.upload(files);
                if (!rsp) return;
                if (rsp.code != 0) {
                    this.$Message.error(rsp.msg);
                    return;
                }
                let fileData = rsp.data.succMap;
                let filenames = Object.keys(fileData)
                
                this.lastCursor = this.msgCursor();
                this.appendMsg({ regexp: null, data: filenames.map(f => `![${f}](${fileData[f]})`).join('') }); 
            },
            msgCursor() {
                return this.$refs['message'].$el.querySelector('input').selectionStart
            },
            quoteMsg(item) {
                this.quote = item;
            },
            appendMsg({ regexp, data }){
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
            atUser(i) {
                let data = '@' + this.atList[i].userName + ' ';
                this.atList = [];
                this.currentSel = -1;
                this.appendMsg({ regexp: /@([^\s]*?)$/, data })
            },
            selList(i) {
                let len = this.atList.length || this.emojiList.length;
                if (len == 0) return;
                this.currentSel = (this.currentSel + i) % len;
                this.$refs['message'].$el.querySelector('input').setSelectionRange(this.lastCursor, this.lastCursor)
            },
            async getAt(name) {
                if (!name) return;
                let rsp = await this.$root.pwl.atlist(name);
                if (!rsp) return;
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
                this.appendMsg({ regexp: /:([^:]+?)$/, data })
            },
            getEmoji(name) {
                if (!name || name.length < 1) return;
                this.emojiList = emoji.search(name);
                this.currentSel = -1;
                this.lastCursor = this.msgCursor();
            },
            logout() {
                localStorage.removeItem('token');
                this.$router.push('/');
            },
            toMusicBox(msg) {
                let songRegexp = /http(?:s):\/\/music.163.com\/(?:#\/|)song\?id=(\d+)(&[\w=]+)*/g;
                let listRegexp = /http(?:s):\/\/music.163.com\/(?:#\/|)album\?id=(\d+)(&[\w=]+)*/g;
                if (msg.match(songRegexp)) msg = msg.replace(songRegexp, `<iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width=100% height=52 src="//music.163.com/outchain/player?type=2&id=$1&auto=0&height=32"></iframe>`);
                else if (msg.match(listRegexp)) msg = msg.replace(listRegexp, `<iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width=100% height=210 src="//music.163.com/outchain/player?type=1&id=$1&auto=0&height=430"></iframe>`)
                return msg;
            },
            async wsPush(ev) {
                if (this.currentSel >= 0) {
                    if (this.atList.length > 0) this.atUser(this.currentSel);
                    if (this.emojiList.length > 0) this.emojiSel(this.currentSel);
                    return;
                }
                if (!this.message) return;
                this.sending = true;
                this.message = this.toMusicBox(this.message);
                if (this.quote) {
                    let raw = await this.$root.pwl.raw(this.quote.oId);
                    raw = raw.split('\n').map(r => `>${r}`).join('\n').trim();
                    let at = this.quote.userName != this.current.userName ? `@${this.quote.userName} ` : ''
                    this.message = `回复${at}：\n\n${raw}\n\n${this.message}`;
                    this.quote = null;
                }
                await this.wsSend(this.message, false);
                this.message = '';
                this.$refs.content.$el.scrollTo(0, 0);
                this.sending = false;
                return true;
            },
            wsMessage(e) {
                let msg = JSON.parse(e.data)
                
                switch (msg.type) {
                    case "online":  //在线人数
                        document.getElementById('win-title').innerHTML = `摸鱼派 - 聊天室(${msg.onlineChatCnt})`
                        this.onlineList = msg.users;
                        break;
                }
            },
            async wsSend(message, retry) {
                let rsp = await this.$root.pwl.push(message);
                if (!rsp) return;
                if (rsp.code == 401 && !retry && await this.$root.relogin()) {
                    await this.init();
                    if(await this.wsSend(message, true))
                        this.$Message.warning('服务器失联，已重新登录.');
                    return true;
                }
                if (rsp.code != 0) {
                    this.$Message.error(rsp.msg);
                    return false;
                }
            },
            reciverCheck(user) {
                let index = this.redpacket.recivers.indexOf(user.userName);
                if(index < 0) this.redpacket.recivers.push(user.userName);
                else this.redpacket.recivers.splice(index, 1);
            }
        }
    }
</script>