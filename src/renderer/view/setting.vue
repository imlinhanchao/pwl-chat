<style lang="less" scoped>
.layout {
    background: #232425;
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
.opacity-form {
    display: flex;
    flex-direction: row;
    align-items: center;
    flex: 1 auto;
    .ivu-slider {
        width: 80%;
        margin-left: 10px;
    }
}
.setting-form {
    margin: 2em 15px;
    .ivu-form-item {
        margin-bottom: 5px;
    }
}
.shield-list {
    border-radius: 5px;
    border: 1px solid #565758;
    padding:5px;
    .shield-item {
        display: flex;
        padding: 5px;
        border-bottom: 1px solid #565758;
        .shield-type {
            width: 100%;
            margin-right: 5px;
        }
        .shield-value {
            margin-right: 5px;
        }
    }
    .shield-add {
        text-align: center;
        cursor: pointer;
    }
}
</style>

<template>
<div class="layout">
    <header class="drag">
        <h1 class="drag"> <img src='../assets/icon.png' />
        <span id="win-title" class="drag">摸鱼派 - 设置</span></h1>
        <span class="control no-drag">
            <Button type="text" @click="handleClose"><Icon custom="fa fa-times"></Icon></Button>
        </span>
    </header>
    <Content class="img-content no-drag" ref="content">
        <Form class="setting-form" :label-width="70" v-model="setting" :show-message="false">
            <FormItem label="透明">
                <section  class="opacity-form">
                    <i-switch v-model="setting.opacity.enable" @on-change="changeSetting"/>
                    <Slider @on-change="changeSetting" :disabled="!setting.opacity.enable" show-tip="always" v-model="setting.opacity.value" :min="10" :max="100"></Slider>
                </section>
            </FormItem>
            <FormItem label="窗口置顶">
                <i-switch v-model="setting.topWindow" @on-change="changeSetting"/>            
            </FormItem>
            <FormItem label="消息屏蔽">
                <article class="shield-list">
                    <section v-for="(m, i) in setting.messageShield" class="shield-item">
                        <section class="shield-type">
                            <Select v-model="m.type" @on-change="changeSetting">
                                <Option v-for="s in shieldType" :value="s.value" :key="s.value">{{ s.text }}</Option>
                            </Select>
                        </section>
                        <section class="shield-value" v-if="!m.type.startsWith('redpacket')">
                            <Input v-model="m.value" @on-change="changeSetting"/>
                        </section>
                        <Button type="text" @click="setting.messageShield.splice(i, 1) && changeSetting()"><Icon custom="fa fa-trash-o"/></Button>
                    </section>
                    <section class="shield-add" @click="setting.messageShield.push({
                        type: 'username',
                        value: ''
                    })"><Icon custom="fa fa-plus"/></section>
                </article>
            </FormItem>
            <FormItem label="特别关心">
                <Tag style="height:30px;line-height:30px;" color="success" v-for="(u, i) in setting.careUsers" :key="u" :name="u" closable @on-close="setting.careUsers.splice(i, 1) && changeSetting()">{{ u }}</Tag>
                <Button style="width:10em;background: #141516" 
                    icon="ios-add" type="dashed" size="small" 
                    @click="pushCase">
                    <Input @click.stop="false" @on-keyup.enter="pushCase" v-model="careUser" class="no-border" placeholder="用户名" />
                </Button>
            </FormItem>
        </Form>
    </Content>
</div>
</template>

<script>
  export default {
    name: 'setting-view',
    component: {
    },
    mounted () {
        this.$root.ipc.listen('setting-change', (event, setting) => {
            this.setting = setting;
            this.$root.setting.setting = setting;
        })
        this.setting = this.$root.setting.setting;
    },
    data () {
        return {
            careUser: '',
            setting: {
                opacity: {
                    enable: false,
                    value: 60,
                },
                topWindow: false,
                messageShield: [],
                careUsers: []
            },
            shieldType: [
                { value: 'username', text: '用户' },
                { value: 'content', text: '内容(支持正则)' },
                { value: 'redpacket', text: '红包' },
                { value: 'redpacketStatus', text: '红包领取' },
            ],
        }
    },
    watch: {
    },
    filters: {
    },
    computed: {
    },
    methods: {
        handleClose() {
            window.close()
        },
        changeSetting() {
            this.$nextTick(() => {
                this.$root.setting.setting = this.setting;
                this.$root.setting.save();
                this.$root.ipc.send('win-setting-change', this.setting)
            })
        },
        async pushCase() {
            if (this.careUser == '' || this.setting.careUsers.indexOf(this.careUser) >= 0) return
            let rsp = await this.$root.pwl.user(this.careUser);
            if (rsp.userName != this.careUser) {
                this.$Message.error('用户名不存在');
                return;
            }
            this.setting.careUsers.push(this.careUser);
            this.careUser = ''
            this.changeSetting();
        }
    }
  }
</script>
