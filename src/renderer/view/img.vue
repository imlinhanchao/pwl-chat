<style lang="less" scoped>
.layout {
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
            max-width: calc(100vw - 140px);
            display: inline-block;
        }
    }
    .control {
        i {
            font-size: 1.5em;
        }
    }
}
.img-content {
    display: flex;
    overflow: auto;
}
.img {
    max-width: calc(100vw - 50px); max-height: calc(100vh - 80px);
    margin: auto;
}
</style>

<template>
<div class="layout">
    <header class="drag">
        <h1 class="drag"> <img src='../assets/icon.png' />
        <span id="win-title" class="drag" :title="imageName">{{ imageName }}</span></h1>
        <span class="control no-drag">
            <Button type="text" @click="handleOpen"><Icon custom="fa fa-external-link"></Icon></Button>
            <Button type="text" @click="handleClose"><Icon custom="fa fa-times"></Icon></Button>
        </span>
    </header>
    <Content class="img-content no-drag" ref="content">
        <img @load="loadHandle" ref="img" class="img" v-if="image" :src="image" @wheel="wheelHandle" :style="{ width: width + 'px', maxWidth, maxHeight, margin }"/>
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
        document.title = path.basename(this.image);

    },
    data () {
        return {
            image: '',
            width: undefined,
            maxWidth: undefined,
            maxHeight: undefined,
            margin: 'auto'
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
        realWidth() {
            return this.$refs['img'].width;
        },
        containWidth() {
            return this.$refs['content'].$el.offsetWidth;
        }
    },
    methods: {
        loadHandle() {
            this.width = this.realWidth
        },
        handleClose() {
            window.close();
        },

        handleOpen() {
            window.open(this.image);
        },
        wheelHandle(ev) {
            if (ev.deltaY > 0 && this.maxWidth < 20) return;
            this.maxWidth = this.maxHeight = 'none';
            this.width = Math.max(20, (this.width - ev.deltaY))
            this.margin = 'auto ' + (this.containWidth - this.width) / 2 + 'px'
        }
    }
  }
</script>
