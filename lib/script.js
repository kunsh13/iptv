
var forma = ".j";
var namez = "s";
var file = "on";

var infile = "0z22e30"+forma+namez+file;

//var ChInfo = document.getElementById("currentInfo");
const sectionA = document.querySelector('section');

/*create video placeholder*/
var mainelem = document.createElement('main');
sectionA.appendChild(mainelem);

var maindiv = document.createElement('div');
mainelem.appendChild(maindiv);
maindiv.setAttribute('id', 'myvideo');

/*create channel info bar*/
var currentInfo = document.createElement('div');
sectionA.appendChild(currentInfo);
currentInfo.setAttribute('id', 'currentInfo');

/*aside - search - filter round button and box*/
var asideelem = document.createElement('aside');
sectionA.appendChild(asideelem);

/*create search smart button*/
let buttelem = document.createElement('div');
asideelem.appendChild(buttelem);
buttelem.setAttribute('class', 'searchbutt');

/*create search box and filter list*/
let searchelem = document.createElement('div');
asideelem.appendChild(searchelem);
searchelem.setAttribute('class', 'searchbox');



var vidobj = document.getElementById('myvideo');
var chMenu = "menu";
var chnumb = "0";



/*Broken url of images*/
function onImgError(brokenImage){
    var tvglogo3 = "img/no-image.png";
        brokenImage.src = tvglogo3;
        brokenImage.onerror = "";
    return true;
}

$.get( infile, getlst );

function getlst( getchnl ) {

   // alert('Total: ' + getchnl.length + ' Channels found')

    /*Generate thumbnails for right Menu*/
    let chTitle = "";
    $.each(getchnl, newMenu );

    function newMenu(i, item) {
        if ( i % getchnl.length ) {
        chTitle += "<li data-chnum="+ i +" data-name='"+ item[0] +"' class='mychnl "+ item[1] +" 'tabindex="+ i +"><div class='thumbimg'><img src=" + item[2] + " onerror='onImgError(this)' width='100%' height='100%'></div></li>";}

    }

    /*create search box and filter list*/
    var navelem = document.createElement('nav');
    sectionA.appendChild(navelem);

    let newmenu = document.createElement('ul');
    navelem.appendChild(newmenu);
    newmenu.setAttribute('id', chMenu);

    document.getElementById(chMenu).innerHTML = chTitle;



    /*Check browser history*/
    let browserMemory = localStorage.getItem('ChHistory2');
    
    if (browserMemory !== null) { chnumb = browserMemory;} //alert('No Browser History. Ch no. -'+chnumb);
    else { chnumb = chnumb }//alert('Yes Browser History. Ch no. -'+chnumb);
 

    /*Right Menu click on thumbnails*/
    var myUl = document.getElementById(chMenu);
    var myLi = myUl.querySelectorAll("LI");

    myLi.forEach(item => {

        /*Find and make yellow active channel */
        var chnumber = item.getAttribute('data-chNum');
        var chname = item.getAttribute('data-name');

        if ( chnumb == chnumber ){
         
            item.classList.add("active");
            channelInfo(chnumb,getchnl,chname);
            channelInfoHide();
            item.focus();
            //$(this).trigger( 'enter' );


        }




        /*Click channel */
        item.addEventListener('click', function() {
            myChannel(item,chnumber,getchnl,chname);
        })

    })

    sourceFormat(chnumb);
    setBGimg(chnumb);
    //setActiveCh(chnumb);
    //navMidscroll();












    
    function myChannel(item,chnumber,getchnl,chname){
            //alert(chnumber);
            //alert(chnumb);
            
            removeActive();
            removeHtml5Video();
            removeiframeVideo();

            item.classList.add("active");
            localStorage.setItem('ChHistory2', chnumber);

            /*Show title*/
            //ChInfo.innerHTML = chname;

            var boxZ = document.querySelector(".searchbox");
            boxZ.classList.remove('show');
            boxZ.classList.add('hide');

            //document.getElementById('currentInfo').classList.add('hide');
            //$(".searchbox").addClass('hidden');
            //$(".not-found").remove();
          

            channelInfo(chnumber,getchnl,chname);
            sourceFormat(chnumber);
            setBGimg(chnumber);
            //navMidscroll();
            channelInfoHide();
    }
    
    keyNavigation();


    /*Keyboard /remote Navigation*/
    function keyNavigation(){

        //var focusable = document.querySelector("[tabindex]");
        var focusable = document.querySelector("LI");


        focusable.addEventListener("keypress", function(event) {

        // Prevent default behaviour
        event.preventDefault();
            
        if (event.key === 'Enter') {
            alert(' enterrrr ');
           // ctrl.innerHTML = 'Enter is pressed';
        }
        else if (event.key === 'ArrowDown'){
            alert('ARO DWN');
                //ctrl.innerHTML = 'ArrowDown is pressed';
            }
                    
            //  alert('ok');
        });


        
/*
    document.addEventListener('keydown', function(event) {

        if(event.which === 49){
        var myUlb = document.getElementById(chMenu);
        var myLib = myUlb.querySelectorAll("LI");

            document.getElementById(chMenu).classList.add('active');
            alert('aaj tak');

        }

        else if(event.which === 52){

            alert('abp');

        }
    });
*/


    }








    
    /*Channel Info text*/
    function channelInfo(chnumb,getchnl,chname){
        var infoTip = document.getElementById("currentInfo");
        infoTip.innerHTML = '<ul><li>'+chname+'</li><li>'+ chnumb +' / '+ getchnl.length +' Channels</li></ul><span></span>';

        document.title = chname;
        googleAnalytics();
    }

    /*Channel Info text hide*/
    function channelInfoHide(){
        document.getElementById('currentInfo').classList.remove('hide');
        setTimeout(function(){
            document.getElementById('currentInfo').classList.add('hide');
          },10000) 
    }

    /*Set video background image*/
    function setBGimg(chnumb){
        vidobj.setAttribute("style", "background-image:url('"+ getchnl[chnumb][2] +"')" );
    }

    /*Keep active channel in middle of the screen*/
    function navMidscroll(){ 
        // document.querySelector('.active').scrollIntoView({block:'center',inline:'center',behavior:'auto'});
        const active = document.querySelector('.active');
        if (active) {
            active.scrollIntoView({block:'center',inline:'center',behavior:'auto'});
          }
    }

    function sourceFormat(chnumb){

        navMidscroll();

        if (getchnl[chnumb][3].indexOf('.m3u8') !== -1) 
                {var srctype = "application/x-mpegURL";
                html5Video(chnumb,srctype); }


        else if (getchnl[chnumb][3].indexOf('.mpd') !== -1) 
                {var srctype = "application/dash+xml";
                html5Video(chnumb,srctype); }
                
        else if(getchnl[chnumb][3].indexOf('youtube') !== -1)
                 { iframeVideo(chnumb) }

        else {var srctype = "audio/mp3";
                html5Video(chnumb,srctype); } 

    }

/*Start to create virtual video*/
function html5Video(chnumb,srctype) {

		vidobj.setAttribute("style", "background-image:url('"+ getchnl[chnumb][2] +"')" );
                
        var videlem = document.createElement('video');
            vidobj.appendChild(videlem);	
            
            videlem.setAttribute('id', 'vidZ');
            videlem.setAttribute('preload', 'auto');
            videlem.setAttribute('autoplay', 'true');
            videlem.setAttribute('loop', 'true');
            videlem.setAttribute('tabindex', '-1');
            videlem.setAttribute('playsinline', 'playsinline');
            videlem.setAttribute('playsinline', 'true');
            videlem.setAttribute('controls', 'true');
            videlem.setAttribute('muted', 'false');
            videlem.setAttribute('class', 'video-js video-bgimg vjs-fill vjs-fluid vjs-theme-fantasy vjs-theme-city vjs-theme-forest vjs-theme-sea');
           // videlem.innerHTML ('<p class="vjs-no-js">JavaScript not enable</p>');

            //videlem.setAttribute("title", getchnl[chnumb][0]);
            //videlem.setAttribute("poster", getchnl[chnumb][2]);
            //videlem.setAttribute("style", "background-image:url('"+ getchnl[chnumb][2] +"')" );



        //     var video = videojs("vid1");
        // video.src(url);
            
     var vidsrc = document.createElement('source');
            videlem.appendChild(vidsrc);
            //vidsrc.readyPlayer;
            //vidsrc.setAttribute("src");
           // vidsrc.setAttribute('type' );
          vidsrc.setAttribute("src", getchnl[chnumb][3]);
           //vidsrc.setAttribute('type', 'application/x-mpegURL');
           //vidsrc.setAttribute('type', 'audio/mp3' );
           vidsrc.setAttribute('type', srctype );

        //    video.src({
        //     type: 'video/mp4',
        //     src: 'https://example.com/myvideo.mp4'
        //   });

        //https://videojs.com/guides/options/



        let options =  {
                
            liveui:true,
            liveTracker:true, 
            muted:false,
            loadingSpinner: true,
            bigPlayButton: true,
            language: "en",
            "fluid": true,
            fill: true,
            responsive: true,
            playbackRates: [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2],
            fluid: true,
            errorDisplay: true,
            html5: {
                //hls: { overrideNative: true}
                vhs: { withCredentials: true },
                nativeAudioTracks: true,
                nativeVideoTracks: true,
                nativeTextTracks: true
              },
           // plugins: { httpSourceSelector:{default: 'auto'} },
           // httpSourceSelector:{default: 'auto'}


            //nativeControlsForTouch:true,
            // width: "auto",
            //height:"auto",
            //controlBar: false,
            //playToggle: true,
            //captionsButton: true,
            //chaptersButton: true,
            //subtitlesButton: true,
            //remainingTimeDisplay: true,
            //progressControl: {seekBar: true},
           // fullscreenToggle: true,
            //playbackRateMenuButton: true,

            //"poster": getchnl[chnumb][2],

        };



        var player = videojs(videlem,
            {
                liveui:true,
                liveTracker:true, 
                muted:false,
                loadingSpinner: true,
                bigPlayButton: true,
                language: "en",
                "fluid": true,
                fill: true,
                responsive: true,
                playbackRates: [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2],
                fluid: true,
                errorDisplay: true,
            }); 
        player.fill(true);
        player.play();

        //player.on(['loadstart', 'play', 'playing', 'firstplay', 'pause', 'ended', 'adplay', 'adplaying', 'adfirstplay', 'adpause', 'adended', 'contentplay', 'contentplaying', 'contentfirstplay', 'contentpause', 'contentended', 'contentupdate', 'loadeddata', 'loadedmetadata'], function(e) { console.warn('VIDEOJS player event: ',  e.type); });



        // let hlsrc = {
        //     src: getchnl[chnumb][3],
        //     type: srctype
        //     };

        // let hlsrc1 = {
        //     src: 'https://aajtaklive-amd.akamaized.net/hls/live/2014416/aajtak/aajtaklive/live_720p/chunk.m3u8',
        //     type: 'application/x-mpegURL' };


        // let readyPlayer = function () { 	this.src(hlsrc1); 	};
        // var player = videojs( videlem, options, readyPlayer ); 

        // player.src({ //working
        //     src: getchnl[chnumb][3],
        //     type: srctype
        // })



       // player.error();
        //player.error(null);
       // player.ErrorDisplay();
        //player.ModalDialog(;)
        //player.readyPlayer();
        player.fill(true);
        //player.qualityLevels();
        //player.httpSourceSelector({ default: 'auto' });

        //https://npmmirror.com/package/videojs-max-quality-selector
        player.maxQualitySelector({
            'autoLabel': 'Auto ',
           //'showBitrates': true,
            //'defaultQuality': 2
          });        
        player.play();





//https://github.com/ctd1500/videojs-hotkeys
// initialize the plugin
videojs('vidZ').ready(function() {


    //alert('ok');
    this.hotkeys({
    volumeStep: 0.1,
    seekStep: 5,
    enableMute: true,
    enableFullscreen: true,
    enableNumbers: false,
    enableVolumeScroll: true,
    enableHoverScroll: true,

    // Mimic VLC seek behavior, and default to 5.
    seekStep: function(e) {
        if (e.ctrlKey && e.altKey) {return 5*60;}
            else if (e.ctrlKey) {return 60;} 
            else if (e.altKey) {return 10;} 
            else {return 5;}
    },

    // Enhance existing simple hotkey with a complex hotkey
    fullscreenKey: function(e) {
        // fullscreen with the F key or Ctrl+Enter
        return ((e.which === 70) || (e.ctrlKey && e.which === 13));
    },

    // Custom Keys
    customKeys: {

        // Add new simple hotkey
        simpleKey: {
        key: function(e) {
            // Toggle something with S Key
            return (e.which === 83);
        },
        handler: function(player, options, e) {
            // Example
            if ( player.paused() )  { player.play(); } 
                            else    { player.pause(); }
            }
        },

        // Add new complex hotkey
        complexKey: {
        key: function(e) {
            // Toggle something with CTRL + D Key
            // return (e.ctrlKey && e.which === 77);//Mute
            return (e.which === 77);//Mute
        },
        handler: function(player, options, event) {
            // Example
            if (options.enableMute) { player.muted(!player.muted()); }
            }
        },

        // Override number keys example from https://github.com/ctd1500/videojs-hotkeys/pull/36
        numbersKey: {
        key: function(event) {
            // Override number keys
            return ((event.which > 47 && event.which < 59) || (event.which > 95 && event.which < 106));
        },
        handler: function(player, options, event) {
            // Do not handle if enableModifiersForNumbers set to false and keys are Ctrl, Cmd or Alt
            if (options.enableModifiersForNumbers || !(event.metaKey || event.ctrlKey || event.altKey)) {
                var sub = 48;
                if (event.which > 95) { sub = 96; }
                var number = event.which - sub;
                player.currentTime(player.duration() * number * 0.1);
            }
        }
        },

        emptyHotkey: { }, //Empty 

        withoutKey: {
        handler: function(player, options, event) { console.log('withoutKey handler'); }
        },

        withoutHandler: { key: function(e) { return true; } },

        malformedKey: {
        key: function() {  console.log('I have a malformed customKey. The Key function must return a boolean.'); },

        handler: function(player, options, event) { } //Empty 
        }
    }
    });
});



}
/*End to create virtual video*/


    function iframeVideo(chnumb){
    
        var iframelem = document.createElement('iframe');
            vidobj.appendChild(iframelem);	
            iframelem.setAttribute('id', 'vidZ');
            iframelem.setAttribute('frameborder', '0');
            iframelem.setAttribute('width', '100%');
            iframelem.setAttribute('height', '100%');
            iframelem.setAttribute('allowfullscreen', '0');
            iframelem.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
            vidobj.setAttribute("style", "background-image:url('"+ getchnl[chnumb][2] +"')" );
            iframelem.setAttribute("src", getchnl[chnumb][3]);
    }
    
    function removeHtml5Video() {
    
        if ( vidobj.getElementsByTagName('video').length > 0) {
            var videoElement = document.getElementById('vidZ_html5_api');
            videoElement.pause();
            videoElement.removeAttribute('src');
            vidobj.innerHTML = '';
            videoElement.remove();
        }
    }
        
    function removeiframeVideo() {
        if ( vidobj.getElementsByTagName('iframe').length > 0) {
            var videoElement = document.getElementById('vidZ');
            vidobj.innerHTML = '';
            videoElement.remove();
        }
    }
    
    function removeActive() {
        var getMenu = document.getElementById(chMenu);
        var getList = getMenu.querySelectorAll("LI");

        getList.forEach(function(elem) {
            elem.classList.remove("active");
        });
    }









    var searchbox = ".searchbox";
    var set = "#menu li";
    var get = "#inptbx";
    var catUl = "#filterList li";

    /*toggle search button*/
    buttelem.addEventListener('click',function(){

        var box = document.querySelector(searchbox);
        box.classList.toggle("show");
        box.classList.remove("hide");



        searchelem.innerHTML = '<span><input type="text" id="inptbx" autocomplete="off" placeholder="Search..."></span><ul id="filterList"><li>Welcome</li><li>News</li><li>Regional</li><li>Lifestyle</li><li>Fun</li><li>Music</li><li>Movies</li><li>Internet Radio</li></ul>';

        var divHide = document.getElementById('currentInfo');
        // var isMobileVersion = document.getElementsByClassName('-mobile');
        // var IsHidden = divHide.getAttribute('class').contain('hide');
        //var IsHidden = divHide.getElementsByClassName('hide');

        var IsHidden = divHide.classList.contains('hide');

        // if (IsHidden.length > 0) { divHide.classList.add('hide');
        //alert('hide'); 
        //   }

        if ( IsHidden.length > 0 ) { 
            // alert('yes hide exist');
            divHide.classList.add('hide');
        }

        else {
                //alert('No - toggle'); 
                divHide.classList.toggle('hide'); 
            //alert('toggle');
        }

        navMidscroll();
        filterKeyword();
        $(".not-found").remove();

        /*Jquery keyword search*/
        $(get).select().val("").keyup( KeySearch );
        $(set).show();
        $(catUl).removeClass('filterChannel');
    });

    function KeySearch() {

        filterString = $(get).val().toLowerCase();

        if (filterString.length < 1) {  $(set).slideDown(); }
        else {


        var noItems = $('<li class="nochnl">No channel found</li>')

          $(set).each(function() {
            var keyword = $(this).data("name").toLowerCase().indexOf(filterString) == -1;
            var dataname = $(this).data("name");

            if ( keyword ) {  $(this).hide();  }
                      else {  $(this).show();  }

            if (keyword != dataname ) {
            //if ( dataname.indexOf(filterString) ) {
                   // $(set).parent().append(noItems);
                    }
            else {
                //alert('delete this');
                $(".nochnl").remove();
                noItems.detach();
            }

            
          });

        }

      }
    
    function filterKeyword() {
        
        $(catUl).click(function(e) {
        $(catUl).removeClass('filterChannel');
        $(this).addClass('filterChannel');
        //e.classList.add("filterChannel");

        navMidscroll();
        filterStr = $(this).text().toLowerCase().replace(/\s/g, '');
    
        if (filterStr.length < 1)  {   $(set).show(); }
        else {
            $(set).each(function() {
                    var catWord = $(this).attr("class").toLowerCase().indexOf(filterStr) == -1;
                    
                    if ( catWord ) {   $(this).hide();     }
                              else {   $(this).show();   }
            });
            }
        });
    }




    function googleAnalytics()   {

        /*Global site tag (gtag.js) - Google Analytics*/
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-QS1SK8MHZR');

        /*Google Tag Manager*/
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-W98STVB');



        }


}
