<template>
    <div id="wrap">
        <TheHeader/>
        <div id="main-container" class="container main-container">
            <router-view/>
        </div>
        <TheFooter/>
    </div>
</template>

<script>
import TheHeader from '@/components/layouts/TheHeader'
import TheFooter from '@/components/layouts/TheFooter'

export default {
    name: "App",
    components: {
        TheHeader,
        TheFooter
    }
};
</script>

<style lang="scss">
$container-large-desktop: 1200px;
$btn-primary-bg: #00b5ad;
$btn-primary-border: #00b5ad;
$label-primary-bg: #00b5ad;
$pagination-active-bg: #00b5ad;
$pagination-active-border: #00b5ad;
$pagination-color: #00b5ad;
$input-border-focus: #00b5ad;
$link-color: #12c4c5;
$link-hover-color: #22ddde;

// scss 变量
$icon-font-path: "~bootstrap-sass/assets/fonts/bootstrap/";
$fa-font-path: "~font-awesome/fonts/";

// 表明webpack 对css路径别名进行处理，此处的~别名表示 node_modules/
@import "~bootstrap-sass/assets/stylesheets/_bootstrap";
@import "~font-awesome/scss/font-awesome";
@import '~simplemde/dist/simplemde.min.css';
@import '~highlight.js/styles/paraiso-dark.css';
@import "~animate.css/animate.min.css";

@import "./styles/main";
@import "./styles/extra";
</style>
