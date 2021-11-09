<style lang="less" scoped>
.msg-item{
    display: flex;
    flex-direction: row;
}

.msg-item-contain{
    display: flex;
    flex-direction: column;
    max-width: 85%;
}

.msg-avatar {
    width: 35px;
    height: 35px;
    border-radius: 35px;
    margin-top: 1.5em;
}

.msg-user{
    margin-left: 1em;
    font-size: .8em;
}

.msg-contain{
    display: flex;
    flex-direction: row;
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
}
.chat-content {
    height: calc(100vh - 100px);
    overflow: auto;
    margin-top: 5px;
}
.chat-form {
    display: flex;
}
</style>

<template>
<article class="layout no-drag">
    <section>
        <section class="chat-form">
        <span @click="logout"><Avatar :src="current.userAvatarURL" title="点击注销"/></span>
        <Input ref="password"
            type="text"
            v-model="message"
            placeholder="简单聊聊"
            @on-keyup.enter="pushMsg"
        >
            <Button
                slot="append"
                icon="md-send"
                @click="pushMsg"
                style="box-shadow:none;"
            ></Button>
        </Input></section>
        <section class="chat-content">
            <div v-for="item in content">
                <div class="msg-item" :class="{'msg-current': item.userName == current.userName}">
                    <Avatar class="msg-avatar" :src="item.userAvatarURL" />
                    <div class="msg-item-contain">
                        <div class="msg-user">{{item.userName}}</div>
                        <div class="msg-contain">
                             <div class="arrow" />
                            <div class="msg-content" v-html="item.content" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </section>
</article>
</template>

<script>
    import ipc from '../ipc'
    import ReconnectingWebSocket from "reconnecting-websocket";

    export default {
        name: 'chat',
        component: {
        },
        mounted () {
            let token = localStorage.getItem('token')
            if (!token) {
                this.$router.push('/');
                return;
            }
            this.info();
            this.load();
            this.wsInit();
        },
        data () {
            return {
                page: 1,
                content: [],
                message: '',
                rws: null,
                current: {}
            }
        },
        watch: {
        },
        filters: {
        },
        computed: {
        },
        methods: {
            async info() {
                let rsp = await ipc.sendipcSync('pwl-info');
                if (!rsp) return;
                console.log(rsp)
                this.current = rsp.data;
            },
            async load() {
                let rsp = await ipc.sendipcSync('pwl-history', this.page);
                if (!rsp) return;
                rsp = rsp.data;
                if (rsp.code != 0) {
                    this.$Message.error(rsp.msg);
                    return;
                }
                this.content = rsp.data;
                this.page++;
            },
            logout() {
                localStorage.removeItem('token');
                this.$router.push('/');
            },
            wsInit() {
                let that = this;
                this.rws = new ReconnectingWebSocket("wss://pwl.icu/chat-room-channel?type=index");
                this.rws.reconnectInterval = 10000

                this.rws.onopen = (e) => {
                    console.log("onopen");
                    setInterval(() => {
                        that.rws.send('-hb-')
                    }, 1000 * 60 * 3)
                }
                this.rws.onmessage = (e) => {
                    that.messageWs(e)
                }
                this.rws.onerror = (e) => {
                    console.log("onerror");

                }
                this.rws.onclose = (e) => {
                    console.log("onclose");
                }
                
            },
            async pushMsg(e) {
                if (!this.message) return;
                let rsp = await ipc.sendipcSync('pwl-push', this.message);
                if (!rsp) return;
                rsp = rsp.data;
                if (rsp.code != 0) {
                    this.$Message.error(rsp.msg);
                    return;
                }
                console.log(rsp);
            },
            messageWs(e) {
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
                        this.content.splice(0,0,msg)
                        if (this.content.length > 10000) this.load();
                        break;
                }
            }
        }
    }
</script>
