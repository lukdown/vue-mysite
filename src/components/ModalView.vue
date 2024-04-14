<template>
    <div class="modal">
        <div class="overlay" @click="$emit('close-modal')"></div>
        <div class="modal-card">
        <slot></slot>
        
        </div>
    </div>
</template>


<script>

export default {
    name: "ModalView",
    components: {},
    data() {
        return {};
    },
    methods: {},
};
</script>
<style>

</style>