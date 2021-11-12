<style lang="less" scoped>
.layout {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    height: 400px;
    margin: auto;
    top: 0;
    bottom: 0;
    position: absolute;
    left: 0;
    right: 0;
}
.layout-form {
    padding: 0 .5em;
    i {
        width: 15px;
    }
}
.layout-logo {
    text-align: center;
    font-size: 2.5em;
    font-weight: lighter;
    color: #f0f0f0;
    a { 
        color: inherit;
        vertical-align: middle;
    }
    img {
        width: 2em;
        vertical-align: middle;
    }
    span {
        vertical-align: middle;
    }
}
.login-footer {
    display: flex;
    flex-direction: row;
    .register-btn { 
        margin-left: 5px;
    }
}
</style>

<template>
<article class="layout">
    <section>
        <section class="layout-logo">
            <img src="../assets/icon.png" alt="" /><span>摸鱼派·登录</span>
        </section> 
        <Form ref="loginForm" :model="login" :rules="ruleValidate" class="layout-form">
            <FormItem prop="username">
                <Input
                    type="text"
                    v-model="login.username"
                    placeholder="用户名"
                    @on-keyup.enter="$refs['password'].focus()"
                >
                    <Icon custom="fa fa-user" slot="prepend"></Icon>
                </Input>
            </FormItem>
            <FormItem prop="passwd">
                <Input ref="password"
                    id="password"
                    :type="passwdType"
                    v-model="login.passwd"
                    placeholder="密码"
                    @on-keyup.enter="submit('loginForm')"
                >
                    <Icon custom="fa fa-lock" slot="prepend"></Icon>
                    <Button
                        slot="append"
                        :icon="showIcon"
                        @click="isPasswdShow=!isPasswdShow"
                        style="box-shadow:none;"
                    ></Button>
                </Input>
            </FormItem>
            <div class="login-footer">
                <Button type="success" long @click="submit('loginForm')" :loading="login_loading">登录</Button>
                <Button type="default" class="register-btn" long @click="register">注册</Button>
            </div>
        </Form>
    </section>
</article>
</template>

<script>
    import ipc from '../ipc'
    import { ipcRenderer } from 'electron'

    export default {
        name: 'login',
        component: {
        },
        mounted () {
            this.$root.token = localStorage.getItem('token')
            if (!this.$root.token) return;
            ipcRenderer.send('pwl-token', { data: this.$root.token });
            this.$router.push('/chat');
        },
        data () {
            const validatePasswd = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入您的密码'));
                } else {
                    callback();
                }
            };
            const validateUser = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入您的用户名'));
                } else {
                    callback();
                }
            };
            return {
                login: {
                    username: '',
                    passwd: '',
                },
                isPasswdShow: false,
                ruleValidate: {
                    username: [{ validator: validateUser, trigger: 'blur' }],
                    passwd: [{ validator: validatePasswd, trigger: 'blur' }],
                },
                login_loading: false,

            }
        },
        watch: {
        },
        filters: {
        },
        computed: {
            showIcon() {
                return this.isPasswdShow ? 'md-eye-off' : 'md-eye';
            },
            passwdType() {
                return this.isPasswdShow ? 'text' : 'password';
            },
        },
        methods: {
            submit(form, first=false) {
                this.$refs[form].validate(async valid => {
                    if (!valid) return;
                    try {
                        this.login_loading = true;
                        let rsp = await ipc.sendipcSync('pwl-login', this.login);
                        this.login_loading = false;
                        if (!rsp) return;
                        rsp = rsp.data;
                        if (rsp.code != 0) {
                            this.$Message.error(rsp.msg);
                            return;
                        }
                        localStorage.setItem('token', rsp.Key);
                        localStorage.setItem('username', this.login.username);
                        localStorage.setItem('passwd', this.login.passwd);
                        this.$router.push('/chat');
                    } catch (err) {
                        this.$Message.error(err.message);
                    }
                });
            },
            register() {
                window.open('https://pwl.icu/register');
            }
        }
    }
</script>
