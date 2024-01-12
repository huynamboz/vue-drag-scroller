
# vue-drag-scroller

  

This package help you drag to scroll easier🌟

  

## How to install
**NPM**

    npm install vue-drag-scroller
**YARN**

    yarn add vue-drag-scroller

## Usage

Use with vue 3:
	**Register global:**
	
    import  { createApp }  from  'vue'
    import VueDragScroller from  "../src/index"
         
    import App from  './App.vue'
    
    const  app  =  createApp(App)
    app.use(VueDragScroller)
    app.mount('#app')
    
    /////in component
    <div v-drag-scroller >
    </div>

## Options

    <script  setup>
    const  onScroll  =  (e)  =>  {
    console.log("working"  ,e);
    };
    
    const  onEndScroll  =  (e)  =>  {
    console.log("end scroll"  ,e);
    };
    
    const  options  =  {
    startScroll: onScroll,
    endScroll: onEndScroll,
    };
    </script>

    /////in component
    <div v-drag-scroller="options" >
    </div>
    
