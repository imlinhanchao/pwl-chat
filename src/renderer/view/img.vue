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
        img {
            height: 1.5em;
            vertical-align: middle;
        }
        span {
            vertical-align: middle;
            overflow:hidden;
            text-overflow:ellipsis;
            white-space:nowrap;
            max-width: calc(100vw - 120px);
            display: inline-block;
        }
    }
    .control {
        i {
            font-size: 1.5em;
        }
    }
}
.img {
    position: absolute;
    left: 0; right: 0; top: 10px; bottom: 0; margin: auto;
    max-width: calc(100vw - 50px); max-height: calc(100vh - 80px);
}
</style>

<template>
<div class="layout">
    <header class="drag">
        <h1 class="drag"> <img src='../assets/icon.png' />
        <span id="win-title" class="drag" :title="imgName">{{ imageName }}</span></h1>
        <span class="control no-drag">
            <!-- <Button type="text" @click="handleOpen"><Icon custom="fa fa-external-link"></Icon></Button> -->
            <Button type="text" @click="handleClose"><Icon custom="fa fa-times"></Icon></Button>
        </span>
    </header>
    <Content>
        <img class="img" v-if="image" :src="image" />
    </Content>
</div>
</template>

<script>
  import { ipcRenderer } from 'electron'
  import path from 'path'

  export default {
    name: 'image-view',
    component: {
    },
    mounted () {
        this.image = this.$route.params.imgpath;
        document.title = path.basename(this.image)
    },
    data () {
        return {
            image: '',
        }
    },
    watch: {
    },
    filters: {
    },
    computed: {
        imageName() {
            return this.image ? path.basename(this.image) : '';
        },
    },
    methods: {
        handleClose() {
            window.close();
        },

        handleOpen() {
            window.open(this.image);
        }
    }
  }
</script>
