Vue.component('poster', {
    props: {
        type: String,
        name: String,
        src: String,
        isaudio: Boolean,
        isvideo: Boolean
    },

    template: `
    <li @click="$emit('make-selection', type, src, name, isvideo, isaudio)"
    tabindex="0" class="thumb px-auto"
    @keyup.enter="$emit('make-selection', type, src, name, isvideo, isaudio)">
        <h3 class="h4 text">{{ type }}</h3>
        <img class="mt-3" :src="'images/' + src + '.jpg'" alt="poster">
        <h4 class="h6 text pt-2">{{ name }}</h4>
    </li>
    `
})

var vm = new Vue({

    el: "#mainApp",
    
    data: {
        playerCon: false,
        
        media: {
            paused: false,
            muted: false,
            active: false,
        },
    
        video: false,
    
        audio: false,
    
        mediaelements: [
            { type: "Movies", name: "Rashomon", src: "Rashomon", isvideo: true, isaudio: false},
            { type: "TV", name: "The Honeymooners", src: "Honeymooners", isvideo: true, isaudio: false},
            { type: "Songs", name: "Future - Life Is Good", src: "Future", isvideo: false, isaudio: true}
        ],
    
        mediatype: "",
    
        medianame: "",
    
        mediasrc: ""
    },

    methods: {

        updateProgress() {
            this.$refs.progress.value = this.$refs.mediaEl.currentTime / this.$refs.mediaEl.duration;
        },
    
        toggleCaptions() {
            let tt = (this.$refs.mediaEl).textTracks;
            for(var i=0; i < tt.length; i++) {
                if(tt[i].mode === "disabled") {
                    tt[i].mode = "showing";
                }
                else {
                    tt[i].mode = "disabled";
                }   
            }
        },

        setSrc(type, src, name, isvideo, isaudio) {
            this.playerCon = true;
            this.media.active = true;
            this.video = isvideo;
            this.audio = isaudio,
            this.media.paused = false;
            this.mediatype = type;
            this.medianame = name;
            this.mediasrc = src;
            this.$refs.mediaEl.load();
        },

        playPauseMedia() {
            if(this.$refs.mediaEl.paused){
                this.$refs.mediaEl.play();
                this.media.paused = !(this.media.paused);
            }
            else {
                this.$refs.mediaEl.pause();
                this.media.paused = !(this.media.paused);
            }
        },

        stopMedia() {
            this.$refs.mediaEl.pause();
            this.$refs.mediaEl.currentTime = 0;
            this.media.paused = false;
        },
    
        muteMedia() {
            this.$refs.mediaEl.muted = !(this.$refs.mediaEl.muted);
            this.media.muted = !(this.media.muted);
        },
    }
});