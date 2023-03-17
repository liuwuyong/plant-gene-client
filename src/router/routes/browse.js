import { createRouter } from "vue-router"

export default [{
    path: 'browse',
    component: () => import('~/views/browse/Browse.vue'),
    children: [
        {
            name: 'browse',
            path: '',
            component: () => import('~/views/browse/BrowseIndex.vue')
        },
        {
            name: 'stresstype',
            path: 'stresstype',
            component: () => import('~/views/browse/browse-detail/StressType.vue'),
            children: [
                {
                    name: 'stresstypelist',
                    path:'',
                    component: () => import('~/views/browse/browse-detail/browse-detail-item/StreeTypeList.vue')
                },
                {
                    name: 'streetypelistdetail',
                    path: 'list',
                    component: () => import('~/views/browse/browse-detail/browse-detail-item/StressTypeListItem.vue')
                },
                {
                    name: 'geneoverview',
                    path: 'geneoverview',
                    component: () => import('~/views/browse/browse-detail/browse-detail-item/GeneOverview.vue')
                }
            ]
        },
        {
            name: 'expressionorgans',
            path: 'expressionorgans',
            component: () => import('~/views/browse/browse-detail/ExpressionOrgans.vue')
        },
        {
            name: 'genefamily',
            path: 'genefamily',
            component: () => import('~/views/browse/browse-detail/GeneFamily.vue')
        },
        {
            name: 'phenotypeinfluence',
            path: 'phenotypeinfluence',
            component: () => import('~/views/browse/browse-detail/PhenotypeInfluence.vue')
        },
        {
            name: 'species',
            path: 'species',
            component: () => import('~/views/browse/browse-detail/Species.vue')
        },
        {
            name: 'subcellularlocalization',
            path: 'subcellularlocalization',
            component: () => import('~/views/browse/browse-detail/SubcellularLocalization.vue')
        }
    ]
}]