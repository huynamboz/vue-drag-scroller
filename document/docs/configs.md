# Configs

<!-- There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. -->

Here is a list of all the configurations.

## General

### Example
  
```vue
<script setup>
import { ref } from 'vue'
const options = ref({
    startScroll: () => {
        console.log("start scroll");
    },
    endScroll: () => {
        console.log("end scroll");
    },
    speed: 1, // default is 1
    reverseDirection: false, // default is false
    hideScrollbar: false, // default is false
});
</script>

<template>
    <div v-drag-scroller="options">
    </div>
</template>
```

| Name | Description | Type | Default |
|--|--|--|--|
| startScroll | Trigger when start scroll | Function | null |
| endScroll | Trigger when end scroll | Function | null |
| speed | Speed of scroll | Number | 1 |
| hideScrollbar | Hide scrollbar | Boolean | false |
| reverseDirection | Reverse direction of scroll | Boolean | false |

## Binding value:
you can pass binding value to directive like this:
```vue
<template>
    <div v-drag-scroller.onlyX>
    </div>
</template>
```

```vue
<template>
    <div v-drag-scroller.disablechild>
    </div>
</template>
```
<!-- | drag-scroller-disable | Disable drag scroll in particular child | Boolean | false | -->
| Name | Description | Type | Default |
|--|--|--|--|
| disablechild | Disable drag scroll in all child | Boolean | false |
| onlyX | Only scroll in X axis | Boolean | false |
| onlyY | Only scroll in Y axis | Boolean | false |

Priority: disablechild > drag-scroller-disable > onlyX > onlyY
## Events (use in options):
| Name | Description |
|--|--|
| startScroll | Trigger when start scroll|
| endScroll | Trigger when end scroll|
| onScrolling | Trigger when drag and move mouse|
#### Example
```vue
<script setup>
const onScroll = (e) => {
  console.log("working",e);
};

const onEndScroll = (e) => {
  console.log("end scroll",e);
};

const options = {
    startScroll: onScroll,
    endScroll: onEndScroll,
};

</script>

// in component 
<template>
    <div v-drag-scroller="options">
    </div>
</template>
```