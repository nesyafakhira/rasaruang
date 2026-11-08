<template id="menu-card-tpl">
    <div class="col">
        <article class="card rr-card h-100">
            <img class="card-img-top" loading="lazy" decoding="async" width="400" height="300" alt="">
            <div class="card-body d-flex flex-column">
                <span class="badge rr-badge-soft align-self-start mb-2" data-category></span>
                <h2 class="h5" data-name></h2>
                <small class="text-secondary mb-3" data-spice></small>
                <div class="mt-auto">
                    <strong class="d-block mb-2" data-price></strong>
                    <div class="d-flex gap-2">
                        <a class="btn btn-outline-dark btn-sm flex-fill" data-detail>Detail</a>
                        <button type="button" class="btn btn-primary btn-sm flex-fill" data-add>Tambah</button>
                    </div>
                </div>
            </div>
        </article>
    </div>
</template>
