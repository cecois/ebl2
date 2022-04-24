<template>
  <div class="relative z-20 w-full h-24 px-8 pt-2 bg-white">
    <div id="home" class="container flex items-center justify-between h-full max-w-6xl mx-auto">
      <a href="#_" class="relative flex items-center inline-block h-5 h-full font-black">
        <img class="w-12" src="/static/favicon.svg" />
        <a href="/admin" class="ml-3 text-2xl font-black">EbL</a>
      </a>
      <div id="nav" class="absolute top-0 left-0 hidden block w-full mt-20 border-b border-gray-200 sm:border-none sm:px-5 sm:block sm:relative sm:mt-0 sm:px-0 sm:w-auto">
        <nav class="flex flex-col items-center py-3 bg-white border border-gray-100 sm:flex-row sm:bg-transparent sm:border-none sm:py-0">
          <!-- <a href="/" class="relative px-1 mb-1 mb-5 mr-0 text-base font-bold sm:mb-0 sm:mr-4 lg:mr-8">Home</a> -->
          <!--           <a href="#_" class="px-1 mb-1 mb-5 mr-0 text-base font-bold sm:mb-0 sm:mr-4 lg:mr-8">Pages</a>
          <a href="#_" class="px-1 mb-1 mb-5 mr-0 text-base font-bold sm:mb-0 sm:mr-4 lg:mr-8">Contact</a>
          <a href="#_" class="px-1 mb-1 mb-5 mr-0 text-base font-bold sm:mb-0 sm:mr-4 lg:mr-8">About</a> -->
          <!-- <a class="ml-6">brighton</a><span class="ml-3 mr-3"> | </span><a href="">brookline</a> -->
          <span class="" v-for="(_region,_regioni) in CONFIG._REGIONS"><a @click="region=_region.handle" :class="['app-link',_region.handle==PROPS.region?'copy-app-primary':'text-gray-500']" href="#">{{_region.handle}}</a><span class="text-gray-200" v-if="_regioni<(CONFIG._REGIONS.length-1)">&nbsp;|&nbsp;</span></span>
          <a @click.prevent="_COLLAPSED=!_COLLAPSED" href="#_" :class="['app-bt',!_COLLAPSED?'app-bt-disabled':'','relative','mb-5','sm:mb-0']">
            <!-- 
            <span class="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-black rounded"></span>
<span @click="_COLLAPSED=!_COLLAPSED" class="relative inline-block w-full h-full px-3 py-1 text-base font-bold transition duration-100 bg-white border-2 border-black rounded fold-bold hover:bg-yellow-400 hover:text-gray-900">ClPsmaP</span>
            <MapIcon :class="['h-14','w-14']" />
 -->
          </a>
          <a href="/trace">
            <LightningBoltIcon class="ml-5 h-5 w-5 app-bt" />
          </a>
        </nav>
      </div>
      <div id="nav-mobile-btn" class="absolute top-0 right-0 z-50 block w-6 mt-8 mr-10 cursor-pointer select-none sm:hidden sm:mt-10">
        <span class="block w-full h-1 mt-2 duration-200 transform bg-gray-800 rounded-full sm:mt-1"></span>
        <span class="block w-full h-1 mt-1 duration-200 transform bg-gray-800 rounded-full"></span>
      </div>
    </div>
  </div>
  <!-- 

  
    #
    #
   ###    ##  # #   ##
   #  #  # #  ##   #  #
   #  # ###  ##   #   #
  #  #  #    #    #  #
  #  #   ##  #     ##
  
  
   -->
  <div :class="['relative','items-center','justify-center','w-full','w-screen','h-screen']">
    <InternalNav @set-panel="_setPanel" :panel="_PANEL" />
    <div class="container flex flex-col items-center justify-center h-full max-w-6xl pl-0 mx-auto -mt-24 sm:pl-8 xl:pl-0 md:flex-row md:justify-between">
      <div class="flex flex-col items-center w-5/6 md:items-start sm:w-1/2 lg:w-3/8 lg:mt-10">
        <div class="relative">
          <h1 class="relative mb-4 text-4xl font-black leading-none text-center text-black lg:text-5xl xl:text-6xl md:text-left">{{PROPS.region}}</h1>
          <div class="absolute top-0 right-0 hidden w-20 -mt-16 -mr-10 transform rotate-90 lg:block xl:-mr-8 xl:-mt-12" viewBox="0 0 89 96" xmlns="http://www.w3.org/2000/svg">
            <g transform="rotate(-80 49.934 46.34)" fill-rule="nonzero" fill="none">
              <path d="M57.5 74.93c0 4.239 3.451 7.676 7.708 7.676 4.256 0 7.707-3.437 7.707-7.677s-3.45-7.676-7.707-7.676-7.707 3.437-7.707 7.676zm10.277 0a2.564 2.564 0 01-2.569 2.558 2.564 2.564 0 01-2.57-2.559 2.564 2.564 0 012.57-2.559 2.564 2.564 0 012.569 2.56zM35.914 44.836c0-4.24-3.45-7.676-7.707-7.676-4.256 0-7.707 3.437-7.707 7.676 0 4.24 3.45 7.677 7.707 7.677s7.707-3.437 7.707-7.677zm-10.276 0a2.564 2.564 0 012.57-2.558 2.564 2.564 0 012.568 2.558 2.564 2.564 0 01-2.569 2.56 2.564 2.564 0 01-2.569-2.56z" fill="#9D45FF" />
              <ellipse fill="#2F36FF" cx="5.281" cy="49.345" rx="5.138" ry="5.118" />
              <path d="M60.656 26.976a2.564 2.564 0 002.57 2.559 2.564 2.564 0 002.568-2.56v-2.558a2.564 2.564 0 00-2.569-2.559 2.564 2.564 0 00-2.569 2.56v2.558zM63.225 9.064a2.564 2.564 0 00-2.569 2.559v2.559a2.564 2.564 0 002.57 2.558 2.564 2.564 0 002.568-2.558v-2.56a2.564 2.564 0 00-2.569-2.558zM70.932 16.74h-2.569a2.564 2.564 0 00-2.569 2.56 2.564 2.564 0 002.57 2.558h2.568a2.564 2.564 0 002.57-2.559 2.564 2.564 0 00-2.57-2.559zM58.087 16.74h-2.569a2.564 2.564 0 00-2.569 2.56 2.564 2.564 0 002.57 2.558h2.568a2.564 2.564 0 002.57-2.559 2.564 2.564 0 00-2.57-2.559zM91.068 44.466a2.564 2.564 0 00-2.421 2.7 2.564 2.564 0 002.69 2.431l2.555-.134a2.564 2.564 0 002.421-2.7 2.564 2.564 0 00-2.69-2.43l-2.555.133zM85.404 48.852a2.564 2.564 0 00-2.69-2.432l-2.556.134a2.564 2.564 0 00-2.42 2.7 2.564 2.564 0 002.69 2.431l2.555-.134a2.564 2.564 0 002.42-2.7zM88.24 42.85l-.134-2.565a2.564 2.564 0 00-2.69-2.432 2.564 2.564 0 00-2.421 2.7l.134 2.565a2.564 2.564 0 002.69 2.432 2.564 2.564 0 002.421-2.7zM91.78 55.198l-.134-2.566a2.564 2.564 0 00-2.69-2.431 2.564 2.564 0 00-2.42 2.7l.134 2.565a2.564 2.564 0 002.69 2.431 2.564 2.564 0 002.42-2.699z" fill="#FFCE27" />
              <path d="M61.132 60.396a2.564 2.564 0 002.569-2.559V44.99a2.564 2.564 0 00-2.57-2.559H48.234a2.564 2.564 0 00-2.57 2.56v12.847a2.564 2.564 0 002.57 2.56h12.899zm-10.33-12.848h7.76v7.73h-7.76v-7.73z" fill="#2F36FF" />
              <path d="M38.127 11.425a2.566 2.566 0 00-2.073-1.74l-7.54-1.093-3.363-6.804A2.676 2.676 0 0022.846.476c-.947 0-1.823.5-2.304 1.312l-3.378 6.804-7.54 1.093a2.566 2.566 0 00-2.076 1.74 2.552 2.552 0 00.647 2.623l5.454 5.297-1.284 7.48a2.554 2.554 0 001.017 2.512c.793.576 1.846.651 2.713.194l6.744-3.541 6.743 3.531a2.578 2.578 0 002.706-.194 2.554 2.554 0 001.022-2.503l-1.284-7.48 5.456-5.296a2.552 2.552 0 00.645-2.623zm-10.664 5.194a2.553 2.553 0 00-.74 2.262l.637 3.698-3.327-1.748a2.578 2.578 0 00-2.389 0l-3.34 1.745.638-3.697a2.553 2.553 0 00-.728-2.26l-2.7-2.617 3.728-.54a2.568 2.568 0 001.935-1.4l1.662-3.36 1.664 3.36a2.568 2.568 0 001.932 1.4l3.725.54-2.697 2.617z" fill="#FFCE27" />
            </g>
          </div>
        </div>
        <!--
   ######  ######  ##### ###### #####  ##   ##   #### ###### ### ###### ####
  ##   ## ##     ##       ##  ##   ## ###  ##  ##  ##  ##  ## ##  ##  ##  ##
  ##   ## ##    ##        ##  ##   ## #### ##  ##      ## ##   ## ##  ##
  ##  ##  ##### ##  ###   ##  ##   ## #######   #####  ## ##   ## ##   #####
  #####   ##    ##   ##   ##  ##   ## ## ####       ## ## ####### ##       ##
  ## ###  ##     ##  ##   ##  ##   ## ##  ###  ##   ## ## ##   ## ##  ##   ##
  ##  ### ######  ##### ###### #####  ##   ##   #####  ## ##   ## ##   #####

 -->
        <p class="my-3 text-base text-center text-gray-600 xl:text-xl md:text-left">
          <div v-if="Object.keys(META).length>0" v-for="_region in CONFIG._REGIONS.filter(r=>r.handle==region)" class="grid grid-cols-1 gap-4 font-light">
            <div>total length: <span class="font-bold">{{Math.round(META[_region.handle].totalLength )}}km</span>
            </div>
            <!-- ... -->
            <div>total count: <span class="font-bold">{{META[_region.handle].totalCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}</span></div>
            <div>completed length: <span class="font-bold">{{Math.round(META[_region.handle].doneLength)}}km</span></div>
            <div>completed count: <span class="font-bold">{{META[_region.handle].doneCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}</span></div>
            <!-- <div>notDonelength, {{META[_region.handle].notDoneLength}}</div> -->
          </div>
        </p>
        <!-- <a href="#_" class="relative mt-5">
          <span class="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-black rounded"></span>
          <span class="relative inline-block w-full h-full px-8 py-3 text-base font-bold bg-white border-2 border-black rounded hover:bg-yellow-400 xl:text-xl fold-bold">Signup Today!</span>
        </a> -->
      </div>
      <div class="flex flex-col items-end justify-center w-5/6 h-auto pl-0 pr-0 mt-10 sm:pl-20 sm:pr-8 xl:pr-0 md:mt-0 sm:w-2/3">
        <!-- HERO SVG IMAGE -->
        <div class="w-full h-auto" viewBox="0 0 273 190" xmlns="http://www.w3.org/2000/svg">
          <DoughnutChart :chartData="chartData()" />
          <div v-if="Object.keys(META).length>0" class="mt-6 text-2xl text-center text-gray-300">{{META[PROPS.region].donePct.toFixed(2)}}%</div>
        </div>
        <!-- END HERO SVG IMAGE -->
      </div>
    </div>
    <!-- CURVED SVG BORDER 
    <svg class="absolute bottom-0 w-full text-yellow-400 fill-current" viewBox="0 0 1400 50" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 0c309.151 33.333 542.484 50 700 50 157.516 0 390.849-16.667 700-50v50H0V0z" />
    </svg>
    -->
  </div>
  <!-- /hERo -->
  <!-- 

   ___      ___       __         _______
  |"  \    /"  |     /""\       |   __ "\
   \   \  //   |    /    \      (. |__) :)
   /\\  \/.    |   /' /\  \     |:  ____/
  |: \.        |  //  __'  \    (|  /
  |.  \    /:  | /   /  \\  \  /|__/ \
  |___|\__/|___|(___/    \___)(_______)
  

   -->
  <div id="map" :class="['relative','items-center','justify-center','w-full','w-screen','h-screen']">
    <InternalNav @set-panel="_setPanel" :panel="_PANEL" class="" />
    <div class="container flex flex-col items-center justify-center h-full max-w-6xl pl-0 mx-auto
 -mt-24 sm:pl-8 xl:pl-0 md:flex-row md:justify-between">
      <DashboardMap @set-centerline-name="_setCenterlineName" class="" @update-bounds="updateBounds" :bbox="calcedBounds()" :trackisogeo="trackIsoGeo()" :trackiso="_TRACKISO" :join="getActiveJoin()" :basemaps="CONFIG._BASEMAPS" :basemap="_BASEMAP" :styles="_STYLES" :solocenterlineobject="soloCenterLineObject()" :solocenterlinestring="_soloCenterlineName" />
      <div class="flex h-screen">
        <!-- <div class="m-auto">
          <h3><ArrowsExpandIcon class="h-10 w-10 nav-button" /></h3>
          <h3><PauseIcon class="h-10 w-10 nav-button" /></h3>
          <h3><PauseIcon class="h-10 w-10 nav-button" /></h3>
        </div> -->
      </div>
    </div>
    <!-- CURVED SVG BORDER -->
    <svg class="absolute bottom-0 w-full text-yellow-400 fill-current" viewBox="0 0 1400 50" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 0c309.151 33.333 542.484 50 700 50 157.516 0 390.849-16.667 700-50v50H0V0z" />
    </svg>
  </div>
  <!-- /map -->
  <!-- 

 
   @@@@@@ @@@@@@@ @@@@@@@  @@@@@@@@ @@@@@@@@ @@@@@@@  @@@@@@       @@@@@@  @@@  @@@ @@@@@@@@  @@@@@@  @@@@@@@
  !@@       @@!   @@!  @@@ @@!      @@!        @@!   !@@          @@!  @@@ @@!  @@@ @@!      @@!  @@@ @@!  @@@
   !@@!!    @!!   @!@!!@!  @!!!:!   @!!!:!     @!!    !@@!!       @!@!@!@! @!@!@!@! @!!!:!   @!@!@!@! @!@  !@!
      !:!   !!:   !!: :!!  !!:      !!:        !!:       !:!      !!:  !!! !!:  !!! !!:      !!:  !!! !!:  !!!
  ::.: :     :     :   : : : :: ::: : :: :::    :    ::.: :        :   : :  :   : : : :: :::  :   : : :: :  :
 

   -->
  <div id="streetsAhead" :class="['relative','w-full','px-8','py-20','bg-yellow-400','sm:py-32','md:py-40']">
    <InternalNav @set-panel="_setPanel" :panel="_PANEL" class="" />
    <div class="container flex flex-col items-center justify-center h-full max-w-6xl mx-auto sm:flex-row sm:justify-between">
      <div class="relative flex flex-col items-start justify-center w-full mb-10 sm:w-5/6 sm:w-1/3 sm:mb-0 sm:pr-10">
        <h2 class="mb-5 text-2xl font-black leading-tight xl:text-4xl">streets AHeaD <sup class="opacity-25 text-gray-400">{{PROPS.region}}</sup></h2>
        <p v-if="META[PROPS.region]" class="mb-8 font-light xl:text-xl md:max-w-lg">
          <ul v-if="META[PROPS.region].notDoneCount>0">
            <li><span class="font-bold">{{META[PROPS.region].notDoneCount}}</span> individual segments remaining</li>
            <li>...to the tune of <span class="font-bold">{{META[PROPS.region].notDoneLength.toFixed(2)}}km</span></li>
            <li>...which is <span class="font-bold">{{Math.round((META[PROPS.region].notDoneLength*100)/META[PROPS.region].totalLength)}}%</span> yet to complete</li>
            <li>...the longest of which is <span class="font-bold">{{META[PROPS.region].aheadLongest.name}}</span> &commat; <span class="font-bold">~{{META[PROPS.region].aheadLongest.length.toFixed(1)}}km</span></li>
          </ul>
          <ul v-else>if you have to ask, you're streets behind</ul>
        </p>
        <!-- <a href="#_" class="relative">
          <span class="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-black rounded"></span>
          <span class="relative inline-block w-full h-full px-5 py-3 text-lg font-bold transition duration-100 bg-white border-2 border-black rounded fold-bold hover:bg-yellow-500 hover:text-white">GET STARTED</span>
        </a> -->
      </div>
      <div class="relative flex flex-col items-center justify-center w-full -mr-0 sm:w-5/6 sm:w-2/3 sm:-mr-20">
        <div v-if="META[PROPS.region] && META[PROPS.region].notDoneCount>0" class="overflow-hidden border-2 border-black rounded-lg">
          <!-- <img src="https://cdn.devdojo.com/images/october2020/screenshot.png" alt="Screen shot of Flare" class="object-cover w-full h-full"> -->
          <div class="border p-2 text-xs font-thin">
            <span v-if="META[PROPS.region]" v-for="(uniq,uniqi) in META[PROPS.region].aheadUnique"><a :class="[_soloCenterlineName==uniq?'font-black':'']" @click.prevent="_setCenterlineName(uniq)" href="#">{{uniq}}</a> <span v-if="uniqi!==META[PROPS.region].aheadUnique.length-1">•&nbsp;</span> </span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!--
                                                                               _                               _
  | |_      _ _   __ _     __     | |__    ___
  |  _|    | '_| / _` |   / _|    | / /   (_-<
  _\__|   _|_|_  \__,_|   \__|_   |_\_\   /__/_
_|"""""|_|"""""|_|"""""|_|"""""|_|"""""|_|"""""|
"`-0-0-'"`-0-0-'"`-0-0-'"`-0-0-'"`-0-0-'"`-0-0-' 

-->
  <div id="tracks" class="relative w-full py-20 pb-20 overflow-hidden bg-white md:pt-40 md:pb-64">
    <InternalNav @set-panel="_setPanel" :panel="_PANEL" class="" />
    <!-- CURVED SVG BORDER INVERT -->
    <svg class="absolute top-0 w-full text-yellow-400 fill-current" viewBox="0 0 1400 50" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 50C309.151 16.667 542.484 0 700 0c157.516 0 390.849 16.667 700 50V0H0v50z" />
    </svg>
    <div class="container relative flex flex-col justify-between h-full max-w-6xl px-8 mx-auto xl:px-0">
      <h2 class="relative flex items-center self-start inline-block w-auto mb-20 text-4xl font-black">
                <!-- <span class="absolute inline-block w-full h-4 mt-3 -ml-2 bg-yellow-400"></span> -->
                <span class="relative">TrACKS</span>
                <sup class="opacity-25 text-gray-400">{{PROPS.region}}</sup>
            </h2>
      <div class="flex w-full h-full">
        <div class="w-full lg:w-1/3">
          <!-- Feature blocks first column -->
          <div class="flex flex-col w-full mb-10 sm:flex-row">
            <ul v-if="META[PROPS.region]">
              <li v-for="track in META[PROPS.region].tracks">
                <a :class="[_TRACKISO==track.track?'track-iso-copy':'','mr-3']" href="" @click.prevent="_TRACKISO=track.track">{{track.track}}</a>
                <span class="text-xs font-light text-gray-800">({{track.timestamp}})</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="hidden w-1/3 lg:block">
          <div class="absolute w-full w-screen max-w-3xl pl-12 -mt-56">
            <!-- <div class="absolute top-0 left-0 w-full h-full mt-2 ml-10 bg-gray-900 rounded-lg"></div> -->
            <div class="relative overflow-hidden ">
              <div v-if="_TRACKISO" class="p-4 text-center">
                <div class="text-2xl">{{_TRACKISO}}</div>
                <div class="font-light">{{trackIsoMeta().length.toFixed(1)}}km</div>
                <DashboardTrackThumb :trackisogeo="trackIsoGeo()" :styles="_STYLES" />
              </div>
              <!-- <img src="https://cdn.devdojo.com/images/october2020/screenshot2.png" alt="Screen shot of Flare's hero component" class="object-cover w-full h-full"> -->
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Blob SVG Border -->
    <svg class="absolute bottom-0 w-full text-gray-200 fill-current" viewBox="0 0 1400 74" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 24C87.243 11.422 173.12 5.133 257.633 5.133 468.305 5.133 578.027 74 700 74c136.015 0 290.882-96.208 481.234-68.867C1268.807 17.71 1341.73 24 1400 24v50H0V24z" />
    </svg>
  </div>
  <!-- End Features Section -->
  <!--
                                                                             o                                      o
              <|>                                    <|>
              / >                                    < >
    o__ __o/  \o__ __o       o__ __o     o       o    |
   /v     |    |     v\     /v     v\   <|>     <|>   o__/_
  />     / \  / \     <\   />       <\  < >     < >   |
  \      \o/  \o/      /   \         /   |       |    |
   o      |    |      o     o       o    o       o    o
   <\__  / \  / \  __/>     <\__ __/>    <\__ __/>    <\__


 -->
  <div id="about" class="relative w-full pt-24 pb-56 bg-gray-200">
    <InternalNav @set-panel="_setPanel" :panel="_PANEL" class="" />
    <div class="container relative flex flex-col justify-between h-full max-w-6xl px-8 mx-auto">
      <div class="flex flex-col justify-center w-full">
        <h2 class="relative flex items-center self-center inline-block w-auto mb-5 text-4xl font-black">
                    <!-- <span class="absolute inline-block w-full h-4 mt-3 -ml-2 bg-yellow-400"></span> -->
                    <span class="relative">abOUT thiS proJeCT</span>
                </h2>
        <!-- <p class="self-center mb-12 font-medium text-gray-600">Simple, Transparent Pricing for Everyone</p> -->
        <div class="flex flex-col md:flex-row">
          <!-- FEATURE 1 -->
          <div class="w-full md:w-1/3">
            <div class="flex flex-col items-center px-2 py-12 bg-white border-2 border-black rounded-lg lg:px-5 xl:px-12 mr-2">
              <div class="font-light"><span class="font-bold text-4xl">WHAt</span></div>
              <!-- <h4 class="flex items-center my-2 text-5xl font-black"><span class="mr-1 text-2xl font-light text-gray-800">$</span>48</h4> -->
              <span class="w-1/2 h-1 bg-app-primary"></span>
              <div class="font-light flex flex-col justify-start w-full px-2 py-2 mt-4">
                This is a dashboard, of sorts, for data we collect during our attempt to ride every single street in {{CONFIG._REGIONS.length>2?_pluck(CONFIG._REGIONS,'nom').join(', '):_pluck(CONFIG._REGIONS,'nom').join(' & ')}}.
              </div>
              <!-- <a href="#_" class="relative w-full text-center">
                <span class="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-yellow-500 rounded"></span>
                <span class="relative inline-block w-full h-full px-5 py-3 text-base font-bold bg-white border-2 border-black rounded fold-bold">Select This One</span>
              </a> -->
            </div>
          </div>
          <!-- End FEATURE 1 -->
          <!-- FEATURE 2-->
          <div class="w-full md:w-1/3">
            <div class="mr-2 flex flex-col items-center px-2 py-12 my-8 bg-white border-2 border-black rounded-lg lg:px-5 xl:px-12">
              <div class="font-light"><span class="font-bold text-4xl">WhO</span></div>
              <!-- <h4 class="flex items-center my-2 text-5xl font-black"><span class="mr-1 text-2xl font-light text-gray-800">$</span>98</h4> -->
              <span class="w-1/2 h-1 bg-app-map-iso"></span>
              <div class="flex flex-col justify-start w-full px-6 py-10 font-light">
                We are two white 40-somethings — midwesterners, originally — both vaguely in the field of information science. One of us rides a red Trek, the other a white Solé. Seems unlikely you would need to, but you're welcome to contact us at <a class="copy-app-primary app-link" href="" @click.prevent="contactUs()">pugolian+ebl﹫gmail.com</a>.
              </div>
              <!-- <a href="#_" class="relative w-full text-center">
                <span class="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-green-400 rounded"></span>
                <span class="relative inline-block w-full h-full px-5 py-3 text-base font-bold bg-white border-2 border-black rounded fold-bold">Select This One</span>
              </a> -->
            </div>
          </div>
          <!-- END FEATURE 2 -->
          <!-- FEATURE 3 -->
          <div class="w-full md:w-1/3">
            <div class="flex flex-col items-center px-2 py-12 ml-0 bg-white border-2 border-black rounded-lg lg:px-6 xl:px-12">
              <div class="font-light"><span class="font-bold text-4xl">WHY</span></div>
              <!-- <h4 class="flex items-center my-2 text-5xl font-black"><span class="mr-1 text-2xl font-light text-gray-800">$</span>68</h4> -->
              <span class="w-1/2 h-1 bg-app-track-iso"></span>
              <div class="flex flex-col text-center w-full px-6 py-10 font-light">
                &nbsp;
              </div>
              <!-- <a href="#_" class="relative w-full text-center">
                <span class="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-purple-500 rounded"></span>
                <span class="relative inline-block w-full h-full px-5 py-3 text-base font-bold bg-white border-2 border-black rounded fold-bold">Select This One</span>
              </a> -->
            </div>
          </div>
          <!-- END FEATURE 3 -->
        </div>
      </div>
    </div>
    <!-- Blob SVG Border -->
    <svg class="absolute bottom-0 w-full text-black fill-current" viewBox="0 0 1400 74" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 24C87.243 11.422 173.12 5.133 257.633 5.133 468.305 5.133 578.027 74 700 74c136.015 0 290.882-96.208 481.234-68.867C1268.807 17.71 1341.73 24 1400 24v50H0V24z" />
    </svg>
  </div>
  <footer class="px-4 pt-12 pb-8 text-white bg-black">
    <div class="container flex flex-col justify-between max-w-6xl mx-auto overflow-hidden lg:flex-row">
      <!--
      <a href="#_" class="relative flex items-center inline-block h-5 h-full font-black">
        <img class="w-2" src="/static/favicon.svg" />
         <a href="/" class="ml-3 text-2xl font-black">EbL</a> 
      </a>
       -->
      <!-- <div class="block w-2/3 mt-6 text-sm sm:flex lg:mt-0">
  <ul class="flex flex-col w-full p-0 font-thin text-left text-gray-700 list-none">
    <li class="inline-block px-3 py-2 font-medium tracking-wide text-white uppercase">Product</li>
    <li><a href="#_" class="inline-block px-3 py-2 text-gray-300 no-underline hover:text-white">Features</a></li>
    <li><a href="#_" class="inline-block px-3 py-2 text-gray-300 no-underline hover:text-white">Integrations</a></li>
    <li><a href="#_" class="inline-block px-3 py-2 text-gray-300 no-underline hover:text-white">Pricing</a></li>
    <li><a href="#_" class="inline-block px-3 py-2 text-gray-300 no-underline hover:text-white">FAQ</a></li>
  </ul>
  <ul class="flex flex-col w-full p-0 font-thin text-left text-gray-700 list-none">
    <li class="inline-block px-3 py-2 font-medium tracking-wide text-white uppercase">Company</li>
    <li><a href="#_" class="inline-block px-3 py-2 text-gray-300 no-underline hover:text-white">Privacy</a></li>
    <li><a href="#_" class="inline-block px-3 py-2 text-gray-300 no-underline hover:text-white">Terms of Service</a></li>
  </ul>
  <ul class="flex flex-col w-full p-0 font-thin text-left text-gray-700 list-none">
    <li class="inline-block px-3 py-2 font-medium tracking-wide text-white uppercase">TailwindCSS</li>
    <li><a href="https://devdojo.com/tailwindcss/templates" target="_blank" rel="noopener noreferrer" class="inline-block px-3 py-2 text-gray-300 no-underline hover:text-white">Templates</a></li>
    <li><a href="https://devdojo.com/tailwindcss/components" target="_blank" rel="noopener noreferrer" class="inline-block px-3 py-2 text-gray-300 no-underline hover:text-white">Components</a></li>
    <li><a href="https://devdojo.com/tails" target="_blank" rel="noopener noreferrer" class="inline-block px-3 py-2 text-gray-300 no-underline hover:text-white">Tails</a></li>
  </ul>
  <div class="flex flex-col w-full text-gray-700">
    <div class="inline-block px-3 py-2 font-medium tracking-wide text-white uppercase">Follow Us</div>
    <div class="flex justify-start pl-4 mt-2">
      <a class="flex items-center block mr-6 text-gray-300 no-underline hover:text-white" target="_blank" rel="noopener noreferrer" href="https://devdojo.com">
        <svg viewBox="0 0 24 24" class="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
          <path d="M23.998 12c0-6.628-5.372-12-11.999-12C5.372 0 0 5.372 0 12c0 5.988 4.388 10.952 10.124 11.852v-8.384H7.078v-3.469h3.046V9.356c0-3.008 1.792-4.669 4.532-4.669 1.313 0 2.686.234 2.686.234v2.953H15.83c-1.49 0-1.955.925-1.955 1.874V12h3.328l-.532 3.469h-2.796v8.384c5.736-.9 10.124-5.864 10.124-11.853z" />
        </svg>
      </a>
      <a class="flex items-center block mr-6 text-gray-300 no-underline hover:text-white" target="_blank" rel="noopener noreferrer" href="https://devdojo.com">
        <svg viewBox="0 0 24 24" class="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
          <path d="M23.954 4.569a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.691 8.094 4.066 6.13 1.64 3.161a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.061a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63a9.936 9.936 0 002.46-2.548l-.047-.02z" />
        </svg>
      </a>
      <a class="flex items-center block text-gray-300 no-underline hover:text-white" target="_blank" rel="noopener noreferrer" href="https://devdojo.com">
        <svg viewBox="0 0 24 24" class="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
        </svg>
      </a>
    </div>
  </div>
</div>
 -->
    </div>
    <!-- <div class="pt-4 pt-6 mt-10 text-center font-light text-sm text-gray-600 border-t border-gray-800"> ©2022 EBL Team. All rights reserved.</div> -->
  </footer>
  <!-- root -->
</template>

<script setup>
import CONFIG from '../CONFIG.json'
import { ref, reactive, onMounted, watch } from 'vue'
import { latLngBounds, latLng } from 'leaflet'
import * as turf from '@turf/turf'

import {
  LightningBoltIcon
} from '@heroicons/vue/outline'

import { useRoute, useRouter } from 'vue-router'
import DashboardMap from '/src/components/DashboardMap.vue'
import DashboardTrackThumb from '/src/components/DashboardTrackThumb.vue'
import InternalNav from '/src/components/InternalNav.vue'
import Brookline from '../assets/join_brookline.json'
import Brighton from '../assets/join_brighton.json'

/*

 oo
 
 dP .d8888b. .d8888b. 88d888b. .d8888b.
 88 88'  `"" 88'  `88 88'  `88 Y8ooooo.
 88 88.  ... 88.  .88 88    88       88
 dP `88888P' `88888P' dP    dP `88888P'

*/

import { PauseIcon } from '@heroicons/vue/solid'
import { MapIcon } from '@heroicons/vue/outline'
import { ArrowsExpandIcon } from '@heroicons/vue/outline'


/*
    __ __ __  ____ ____  ______ ____ ____   ____
   /  ]  |  |/    |    \|      |    |    \ /    |
  /  /|  |  |  o  |  D  )      ||  ||  _  |   __|
 /  / |  _  |     |    /|_|  |_||  ||  |  |  |  |
/   \_|  |  |  _  |    \  |  |  |  ||  |  |  |_ |
\     |  |  |  |  |  .  \ |  |  |  ||  |  |     |
 \____|__|__|__|__|__|\_| |__| |____|__|__|___,_|
*/

// import { Chart, DoughnutController, ArcElement, Tooltip } from 'chart.js';
import { Chart, registerables } from 'chart.js';
import { DoughnutChart } from 'vue-chart-3';
Chart.register(...registerables);

// pArT OF WORkArOuNd FOr THe FuKtuP rOUTINg FaIlUrE When pEriOds (deciMaLS) aRe PREseNt
const decodeBBOX = /\$/g;
const encodeBBOX = /\./g;

const META = {},
  PROPS = defineProps({ trackiso: String, region: String, basemap: String, collapsed: String, bbox: String, panel: String }),
  _STYLES = CONFIG._STYLES,
  ROUTE = useRoute(),
  ROUTER = useRouter();

// SOME We GonNA mUtAtE
const _BBOX = ref(PROPS.bbox.replace(decodeBBOX, '.')),
  _BASEMAP = ref(PROPS.basemap),
  _COLLAPSED = PROPS.collapsed == '$' ? ref(false) : ref(true),
  _TRACKISO = PROPS.trackiso !== '$' ? ref(decodeURI(PROPS.trackiso)) : ref(),
  _PANEL = ref(PROPS.panel);

// fOr thE DonE CHaRT
const chartData = () => {
  return {
    labels: ['Done', 'Not Done'],
    datasets: [{
      data: META[PROPS.region] ? [META[PROPS.region].doneLength, META[PROPS.region].notDoneLength] : [50, 50],
      backgroundColor: ["#000", CONFIG._STYLES.centerlinesDone.color],
    }, ],
  }
};

// Stack for iSOlAtIng/HIGHlIGhTiNg A gIveN ceNtErlINE BY CliCK/HoVeR oR, MorE LIKEly, sTReetS AHEAding:
const _soloCenterlineName = ref("Lake ST"),
  soloCenterLineObject = () => {
    let solo = {
      "type": "FeatureCollection",
      "features": null
    };
    let soloDone = {
      "type": "FeatureCollection",
      "features": null
    };
    switch (PROPS.region) {
      case 'brookline':
        // iF _solOcENterliNENAMe iS nuLL WE CaN Just PASS thrU aN EmpTy dUMmY array
        solo.features = !_soloCenterlineName.value ? [] : Brookline.features.filter(fea => fea.properties.name.toLowerCase() == _soloCenterlineName.value.toLowerCase());
        soloDone.features = solo.features.filter(fea => fea.properties.done == 'done');
        break;
      case 'brighton':
        // if _SoLOcEnTErliNENaME iS null we caN jusT PaSs ThRu An EMPty duMmy ArRay
        solo.features = !_soloCenterlineName.value ? [] : Brighton.features.filter(fea => fea.properties.name.toLowerCase() == _soloCenterlineName.value.toLowerCase());;
        soloDone.features = solo.features.filter(fea => fea.properties.done == 'done');;
        break;
    } //switch

    let meta = {
      length: solo ? turf.length(solo, { units: 'kilometers' }) : null,
      members_done_length: turf.length(soloDone, { units: 'kilometers' }),
      members_total: solo.features.length,
      members_done: solo.features.filter(fea => fea.properties.done == 'done').length,
      unit: 'km'
    }

    return { geom: solo, meta: meta };
  }, //SolOcENteRlINe()
  // soloCenterLineMeta = () => {
  //   return { length: soloCenterLine ? turf.length(soloCenterLine(), { units: 'kilometers' }) : null, members:partial: true, unit: 'km' };
  // },
  _setCenterlineName = (n) => _soloCenterlineName.value = n;


const _setPanel = (p) => {
  _PANEL.value = p
};

// CouPLeA LOCaL uNDeRSCOrey HACks
const _pluck = (arr, key) => arr.map(o => o[key])
const _pluckProperties = (arr, key) => arr.map(o => o.properties[key])
const _unique = (value, index, self) => self.indexOf(value) === index;
const _console = (msg) => console.log(`msg in console: ${msg}`)

const updateBounds = (bs) => {
    _BBOX.value = `${bs._southWest.lng},${bs._southWest.lat},${bs._northEast.lng},${bs._northEast.lat}`
  } //UpDATEBOUndS - emitTED, PRoLly

// StAtS ANd dEtAILs oN aN IsoLATeD ridE
const trackIsoMeta = () => {
    let track = trackIsoGeo();
    let time = META[PROPS.region] ? META[PROPS.region].tracks.find(t => t.track == _TRACKISO.value).timestamp : null
    return { timestamp: time, length: turf.length(track, { units: 'kilometers' }) }
  } //trACKIsOMEtazz
  ,
  trackIsoGeo = () => {
    // the centErlInEs GeOm fRoM A gIven ISOLated rIDE
    let iso = {
      "type": "FeatureCollection",
      "features": null
    };

    switch (PROPS.region) {
      case 'brookline':
        iso.features = Brookline.features.filter(fea => (fea.properties.ride == _TRACKISO.value && fea.properties.done == 'done'))
        break;
      case 'brighton':
        iso.features = Brighton.features.filter(fea => (fea.properties.ride == _TRACKISO.value && fea.properties.done == 'done'))
        break;
    }
    return iso;
  } //TrACKISogeO

// ImpORtAnt ONE hEre - ThiS DeLIveRS The joIN fOR the cURrEnT rEgIon
const getActiveJoin = () => {
    let join = null;
    switch (PROPS.region) {
      case 'brookline':
        join = Brookline;
        join.region = 'brookline'
        break;
      case 'brighton':
        join = Brighton;
        join.region = 'brighton'
        break;
    } //switch
    return join;
  } //gEtacTiVEjSoIn


// If we have A sTRING cOmiNG IN fROm the rOuter we HAve To hOnoR iT - OtHERwiSe We'Ll snAP to THe ACtivE rEgIOn OR, if there IS onE, ThE aCtIVe TRacKiSo
const calcedBounds = () => {

    let b = null;

    switch (true) {
      case (PROPS.bbox.indexOf(',') >= 0): //THeRE ARe cOMmas in THAT sTRIng (I.e. A passED BBox)
        b = _BBOX.value.split(","); //arRaYIFy ThE incomiNG BBoX StRInG
        break;
      case (PROPS.trackiso !== '$'): //isn't juSt THe '$' (nUlL) plaCeHolder
        b = turf.bbox(trackIsoGeo()); //BBOx The isOLated TRack's gEOM
        break;
      default:
        b = turf.bbox(getActiveJoin()); //bBOx THe ChoIcE mAde BY geTACTIvEJoIn FUnC
    } //swItch
    return b;
  } //CALcEDBOunds

// sOme SumMARY sTufF tHAt WE dON't WaNnA haFTA caLL consTaNtly
const setRegionMeta = () => {

    CONFIG._REGIONS.forEach(r => {

      let doneAudit = DONEAUDIT(r.handle);
      let notdonelength = turf.length(doneAudit.notDones, { units: 'kilometers' });

      let longest = { name: null, length: 0 };
      doneAudit.notDones.features.forEach(fea => {
        let fleng = turf.length(fea);
        longest = fleng > longest.length ? { name: fea.properties.name, length: fleng } : longest;
      })

      META[r.handle] = {
        totalCount: doneAudit.totalCount,
        totalLength: _totallength(r.handle),
        doneCount: (doneAudit.totalCount - doneAudit.notDones.features.length),
        notDoneCount: doneAudit.notDones.features.length,
        doneLength: doneAudit.doneLength,
        notDoneLength: notdonelength,
        donePct: ((doneAudit.doneLength * 100) / _totallength(r.handle)),
        aheadUnique: _pluckProperties(doneAudit.notDones.features, 'name').filter(_unique),
        aheadLongest: longest,
        tracks: _pluckProperties(doneAudit.dones.features.filter(f => f.properties.timestamp !== null), 'ride').filter(_unique)
          .map(t => {
            // t Is ThE RidE NAmE bUt we aLsO waNT A tiMEStAMP
            let time = doneAudit.dones.features.find(f => f.properties.ride == t).properties.timestamp;

            let ttime = new Date(time);

            let timeString = `${ttime.getFullYear()}.${ttime.toLocaleString('default', { month: 'short' })}.${ttime.getDate()}`

            return {
              track: t,
              timestamp: timeString
            }
          }).sort((a, b) => (a.track > b.track) ? 1 : -1)
      }
    })
  } //setreGiONMEtA

// DoNe/NoT Done brEaKdOwN
const DONEAUDIT = (r) => {
    let totalCount = null;
    let notDones = {
      "type": "FeatureCollection",
      "features": null
    };
    let dones = {
      "type": "FeatureCollection",
      "features": null
    };

    switch (r) {
      case 'brookline':
        totalCount = Brookline.features.length
        dones.features = Brookline.features.filter(fea => fea.properties.done == 'done')
        notDones.features = Brookline.features.filter(fea => fea.properties.done !== 'done')
        break;
      case 'brighton':
        totalCount = Brighton.features.length
        dones.features = Brighton.features.filter(fea => fea.properties.done == 'done')
        notDones.features = Brighton.features.filter(fea => fea.properties.done !== 'done')
        break;
    }
    let doneLength = turf.length(dones, { units: 'kilometers' })
    return { dones: dones, notDones: notDones, totalCount: totalCount, doneLength: doneLength }
  } //DONEAUDIT

// UtilitY fOr RETURniNg aGGregaTed leNGTHS
const _totallength = (r) => {
    let length = 0;
    switch (r) {
      case 'brookline':
        length = turf.length(Brookline, { units: 'kilometers' })
        break;
      case 'brighton':
        length = turf.length(Brighton, { units: 'kilometers' })
        break;
    }
    return length;
  } //tOtaLLenGTH

const contactUs = () => window.open("mailto:pugolian+ebl﹫gmail.com?subject=EBL%20contact".replace('﹫', '@'));

// ofT-calLeD ROute SetTINg
const _SETROUTE = () => {
  let r = {
    title: "Dashboard",
    params: {
      region: PROPS.region,
      basemap: _BASEMAP.value,
      panel: _PANEL.value,
      bbox: _BBOX.value.replace(encodeBBOX, '$'),
      collapsed: _COLLAPSED.value ? '$$' : '$',
      trackiso: _TRACKISO.value ? encodeURI(_TRACKISO.value) : '$'
    }
  };
  ROUTER.push(r);
}

/*
                          ______
                         / ____ `.
 _   __  __   _   .---.  `'  __) |
[ \ [  ][  | | | / /__\\ _  |__ '.
 \ \/ /  | \_/ |,| \__.,| \____) |
  \__/   '.__.'_/ '.__.' \______.'
*/
onMounted(() => {
  setRegionMeta();
  _SETROUTE();
  _setCenterlineName(null); //total HAck Bc SomETHInG WASN'T WAITinG FOr sOmethINg TO Load AND I'M LAZy aND This woRKs
})
watch(() => [PROPS.region], (newp, oldp) => {
  _TRACKISO.value = false;
})
watch(() => [PROPS.region, _COLLAPSED.value, _TRACKISO.value, _BBOX.value, _PANEL.value], (newp, oldp) => {
  _SETROUTE();
})
</script>
<!-- @import url("https://overpass-30e2.kxcdn.com/overpass.css");
body {
  font-family: 'overpass';
  font-weight: 800;
} -->

<style lang="scss">
/* SCSS HEX */

$brand-primary: #fbbf24ff;
$map-iso: #ff720eff;
$track-iso:hsla(202, 66%, 39%, 1);
$brand-grey: #595959ff;
$magic-mint: #b4edd2ff;
$powder-blue: #a0cfd3ff;
.app-link {
  &:hover {
    color: $track-iso;
  }
}

.bg-app-primary {
  background-color: $brand-primary;
}

.copy-app-primary {
  color: $brand-primary;
}

.bg-app-map-iso {
  background-color: $map-iso;
}

.bg-app-track-iso {
  background-color: $track-iso;
}

.app-bt {
  color: black;
  &:hover {
    cursor: pointer;
    color: rgba($brand-grey, .5)
  }
  &:active {
    color: $brand-primary;
  }
}

.app-bt-disabled {
  color: $brand-grey;
}

.track-iso-copy {
  color: $track-iso;
}
</style>
