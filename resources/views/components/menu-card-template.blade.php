<template id="menu-card-tpl">
    <div class="col">
        <article class="card rr-card h-100">
            <img class="card-img-top" loading="lazy" decoding="async" width="400" height="300" alt="">
            <div class="card-body d-flex flex-column">
                <span class="badge rr-badge-soft align-self-start mb-2" data-category></span>
                <h2 class="h5" data-name></h2>
                <small class="text-secondary mb-3" data-spice></small>
                <div class="mt-auto d-flex justify-content-between align-items-center">
                    <strong data-price></strong>
                    <button type="button" class="btn btn-primary btn-sm" data-add>Tambah</button>
                </div>
            </div>
        </article>
    </div>
</template>
