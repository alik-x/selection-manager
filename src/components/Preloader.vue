<template>
  <div class="preloader">
    <div class="preloader-wrapper small active">
      <div class="spinner-layer">
        <div class="circle-clipper left">
          <div class="circle"></div>
        </div>
        <div class="gap-patch">
          <div class="circle"></div>
        </div>
        <div class="circle-clipper right">
          <div class="circle"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.preloader {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: 1;
  min-height: 150px;
}
</style>
