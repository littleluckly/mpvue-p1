<template>
    <div class="welcome">
        <div class="main">
            <div @click="linkToCounter">
                <p class="quote">“向蜗居在深圳的奋斗者致敬!”</p>
                <p class="author" style="text-align:right;">———鲁迅</p>
            </div>
        </div>
    </div>
</template>

<script>
import card from '@/components/card'
import globalStore from '../../../stores/index'
export default {
    data() {
        return {
            motto: 'Hello miniprograme',
            userInfo: {
                nickName: 'mpvue',
                avatarUrl: 'http://mpvue.com/assets/logo.png'
            }
        }
    },
    computed: {
        count() {
            return globalStore.state.count
        }
    },
    components: {
        card
    },

    methods: {
        clickHandle(ev) {
            console.log('clickHandle:', ev)
            // throw {message: 'custom test'}
        },
        linkToCounter() {
            const url = '../counter/main?id=1'
            mpvue.switchTab({ url })
        }
    },

    created() {
        // let app = getApp()
    }
}
</script>
 
 <style>
.welcome {
    height: 100vh;
    background: url('https://img.tukuppt.com/bg_grid/00/06/38/oOn0Y9E4ID.jpg!/fh/350') no-repeat center center;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
}

.main {
    padding: 1em;
    background: hsla(0, 0%, 100%, 0.25) border-box;
    /*隐藏多余的模糊元素*/
    overflow: hidden;
    border-radius: 0.3em;
    box-shadow: 0 0 0 1px hsla(0, 0%, 100%, 0.3) inset, 0 0.5em 1em rgba(0, 0, 0, 0.6);
    text-shadow: 0 1px 1px hsla(0, 0%, 100%, 0.3);
    animation: show 1s ease fill-mode;
}

.main::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    /*设置负值的外边距是为了消除边缘模糊消失*/
    margin: -30px;
    z-index: -1;
    -webkit-filter: blur(10px);
    filter: blur(10px);
}
@keyframes show {
    from {
        opacity: 0;
    }
    to {
        width: 1;
    }
}
@keyframes typing {
    from {
        width: 0;
    }
    to {
        width: 100%;
    }
}

@keyframes hidden-border {
    from {
        border-color: rgba(0, 0, 0, 1);
    }
    to {
        border-color: rgba(0, 0, 0, 0);
    }
}

.quote {
    font-size: 18px;
    font-family: Consolas;
    border-right: 2px solid;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    animation: typing 5s steps(16, end), hidden-border 0.5s ease-in 4.6s forwards;
}
.author {
    display: inline-block;
    float: right;
    font-size: 18px;
    font-family: Consolas;
    /* border-right: 2px solid; */
    width: 0;
    white-space: nowrap;
    overflow: hidden;
    animation: typing 2s steps(16, end) 5s forwards;
    /* animation-fill-mode: forwards; */
}
</style>