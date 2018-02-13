import React from 'react'
import {Router, hashHistory} from 'dva/router'
import App from './routes/app'
import Loginpage from './routes/loginpage'

import cookie from 'react-cookies'
const axios = require('axios');



export default function ({ app}) {
  const routes = [

 {
  path: '/login',
   component: Loginpage,
   name:'loginpage',
   getIndexRoute(nextState, cb) {
       require.ensure([], require => {
           cb(null, {component: require('./routes/loginpage')})
       })
   },},
   {
       path: '/forgetpass',
      // component: Loginpage,
       name: '/forgetpass',
       getComponent(nextState, cb) {
           require.ensure([], require => {
               cb(null, require('./routes/forgetpass'))
           })
       }
   },
   {
       path: '/forgetusername',
      // component: Loginpage,
       name: '/forgetusername',
       getComponent(nextState, cb) {
           require.ensure([], require => {
               cb(null, require('./routes/forgetusername'))
           })
       }
   },
   {
       path: '/resetpassword',
      // component: Loginpage,
       name: '/resetpassword',
       getComponent(nextState, cb) {
           require.ensure([], require => {
               cb(null, require('./routes/resetpassword'))
           })
       }
   },
   {
       path: '/resetusername',
      // component: Loginpage,
       name: '/resetusername',
       getComponent(nextState, cb) {
           require.ensure([], require => {
               cb(null, require('./routes/resetusername'))
           })
       }
   },

     {
         path: '/',
         component: App,
         getIndexRoute(nextState, cb) {
             require.ensure([], require => {
                 cb(null, {component: require('./routes/dashboard_3')})
             })
         },


         childRoutes: [
           // {
           //    path: '/login',
           //    name: '/login',
           //     component: Loginpage,
           //    getComponent(nextState, cb) {
           //        require.ensure([], require => {
           //            cb(null, require('./routes/loginpage'))
           //        })
           //    }
           // },

             {
                 path: 'dashboard',
                 name: 'dashboard',
                 getComponent(nextState, cb) {
                     require.ensure([], require => {
                         cb(null, require('./routes/dashboard_3'))
                     })
                 }
             },
             {
                 path: '/admindashboard',
                 name: 'admindashboard',
                 getComponent(nextState, cb) {
                     require.ensure([], require => {
                         cb(null, require('./routes/admindashboard'))
                     })
                 }
             },
             {
                 path: '/alerts',
                 name: 'alerts',
                 getComponent(nextState, cb) {
                     require.ensure([], require => {
                         cb(null, require('./routes/alerts'))
                     })
                 }
             },

             {
                 path: 'customapi',
                 name: 'customapi',
                 getComponent(nextState, cb) {
                     require.ensure([], require => {
                         cb(null, require('./routes/customapi'))
                     })
                 }
             },
             // {
             //     path: 'dashboard_3',
             //     name: 'dashboard',
             //     getComponent(nextState, cb) {
             //         require.ensure([], require => {
             //             cb(null, require('./routes/dashboard_3'))
             //         })
             //     }
             // },
             // {
             //     path: 'dashboard_4',
             //     name: 'dashboard',
             //     getComponent(nextState, cb) {
             //         require.ensure([], require => {
             //             cb(null, require('./routes/dashboard_4'))
             //         })
             //     }
             // },
             {
                path: 'dynamicusers',
                name: 'dynamicusers',
                getComponent(nextState, cb) {
                    require.ensure([], require => {
                        cb(null, require('./routes/dynamicusers'))
                    })
                }
            },
             {
                 path: 'toggle',
                 name: 'toggle',
                 getComponent(nextState, cb) {
                     require.ensure([], require => {
                         cb(null, require('./routes/toggle'))
                     })
                 }
             },
             {
                 path: '/themes',
                 name: 'themes',
                 getComponent(nextState, cb) {
                     require.ensure([], require => {
                         cb(null, require('./routes/themes'))
                     })
                 }
             },
             {
                 path: 'profile',
                 name: 'profile',
                 getComponent(nextState, cb) {
                     require.ensure([], require => {
                         cb(null, require('./routes/profile'))
                     })
                 }
             },
             {
                 path: '/users',
                 name: 'users',
                 getComponent(nextState, cb) {
                     require.ensure([], require => {
                         cb(null, require('./routes/users'))
                     })
                 }
             },

             {
                 path: 'customers',
                 name: 'customers',
                 getComponent(nextState, cb) {
                     require.ensure([], require => {
                         cb(null, require('./routes/customers'))
                     })
                 }
             },
             {
                 path: '/devices',
                 name: 'devices',
                 getComponent(nextState, cb) {
                     require.ensure([], require => {
                         cb(null, require('./routes/devices'))
                     })
                 }
             },
             {
                 path: '/device',
                 name: 'device',
                 getComponent(nextState, cb) {
                     require.ensure([], require => {
                         cb(null, require('./routes/deviceuser'))
                     })
                 }
             },

             {
                 path: '/connect-device',
                 name: 'connectdevice',
                 getComponent(nextState, cb) {
                     require.ensure([], require => {
                         cb(null, require('./routes/connectdevice'))
                     })
                 }
             },
             {
                 path: '/groups',
                 name: 'groups',
                 getComponent(nextState, cb) {
                     require.ensure([], require => {
                         cb(null, require('./routes/groups'))
                     })
                 }
             },
             {
                 path: '/applications',
                 name: 'applications',
                 getComponent(nextState, cb) {
                     require.ensure([], require => {
                         cb(null, require('./routes/applications'))
                     })
                 }
             },

             {
                 path: '/item',
                 name: 'item',
                 getComponent(nextState, cb) {
                     require.ensure([], require => {
                         cb(null, require('./routes/useritems'))
                     })
                 }
             },
             {
                 path: '/items',
                 name: 'items',
                 getComponent(nextState, cb) {
                     require.ensure([], require => {
                         cb(null, require('./routes/items'))
                     })
                 }
             },

             {
                 path: '/triggers',
                 name: 'triggers',
                 getComponent(nextState, cb) {
                     require.ensure([], require => {
                         cb(null, require('./routes/triggers'))
                     })
                 }
             },
             {
                 path: '/user-triggers',
                 name: 'user-triggers',
                 getComponent(nextState, cb) {
                     require.ensure([], require => {
                         cb(null, require('./routes/usertriggers'))
                     })
                 }
             },

             {
                 path: '/companies',
                 name: 'companies',
                 getComponent(nextState, cb) {
                     require.ensure([], require => {
                         cb(null, require('./routes/companies'))
                     })
                 }
             },
             {
                 path: '/adddevices',
                 name: 'adddevices',
                 getComponent(nextState, cb) {
                     require.ensure([], require => {
                         cb(null, require('./routes/adddevices'))
                     })
                 }
             },
             {
                 path: '/viewdevices',
                 name: 'viewdevices',
                 getComponent(nextState, cb) {
                     require.ensure([], require => {
                         cb(null, require('./routes/viewdevices'))
                     })
                 }
             },
             {
                 path: '/devicedetail',
                 name: 'devicedetail',
                 getComponent(nextState, cb) {
                     require.ensure([], require => {
                         cb(null, require('./routes/userdevicedetails'))
                     })
                 }
             },

             {
                 path: '/devicedetails',
                 name: 'devicedetails',
                 getComponent(nextState, cb) {
                     require.ensure([], require => {
                         cb(null, require('./routes/devicedetails'))
                     })
                 }
             },

             {
                 path: '/events',
                 name: 'events',
                 getComponent(nextState, cb) {
                     require.ensure([], require => {
                         cb(null, require('./routes/events'))
                     })
                 }
             },
             {
                 path: 'hostsgroup',
                 name: 'hostsgroup',
                 getComponent(nextState, cb) {
                     require.ensure([], require => {
                         cb(null, require('./routes/hostsgroup'))
                     })
                 }
             },
             {
                 path: '/templates',
                 name: 'templates',
                 getComponent(nextState, cb) {
                     require.ensure([], require => {
                         cb(null, require('./routes/templates'))
                     })
                 }
             },


             // {
             //     path: 'layout/grid',
             //     name: 'layout/grid',
             //     getComponent(nextState, cb) {
             //         require.ensure([], require => {
             //             cb(null, require('./routes/layout/grid'))
             //         })
             //     }
             // }, {
             //     path: 'layout/grid-playground',
             //     name: 'layout/grid-playground',
             //     getComponent(nextState, cb) {
             //         require.ensure([], require => {
             //             cb(null, require('./routes/layout/grid-playground'))
             //         })
             //     }
             // }, {
             //     path: 'layout/layouts',
             //     name: 'layout/layouts',
             //     getComponent(nextState, cb) {
             //         require.ensure([], require => {
             //             cb(null, require('./routes/layout/layouts'))
             //         })
             //     }
             // }, {
             //     path: 'layout/card',
             //     name: 'layout/card',
             //     getComponent(nextState, cb) {
             //         require.ensure([], require => {
             //             cb(null, require('./routes/layout/card'))
             //         })
             //     }
             // }, {
             //     path: 'layout/menu',
             //     name: 'layout/menu',
             //     getComponent(nextState, cb) {
             //         require.ensure([], require => {
             //             cb(null, require('./routes/layout/menu'))
             //         })
             //     }
             // }, {
             //     path: 'layout/sidebar',
             //     name: 'layout/sidebar',
             //     getComponent(nextState, cb) {
             //         require.ensure([], require => {
             //             cb(null, require('./routes/layout/sidebar'))
             //         })
             //     }
             // }, {
             //     path: 'ui/ico',
             //     name: 'ui/ico',
             //     getComponent(nextState, cb) {
             //         require.ensure([], require => {
             //             cb(null, require('./routes/ui/ico'))
             //         })
             //     }
             // },
             //  {
             //     path: 'ui/input',
             //     name: 'ui/input',
             //     getComponent(nextState, cb) {
             //         require.ensure([], require => {
             //             cb(null, require('./routes/ui/input'))
             //         })
             //     }
             // }, {
             //     path: 'ui/search',
             //     name: 'ui/search',
             //     getComponent(nextState, cb) {
             //         require.ensure([], require => {
             //             cb(null, require('./routes/ui/search'))
             //         })
             //     }
             // }, {
             //     path: 'ui/button',
             //     name: 'ui/button',
             //     getComponent(nextState, cb) {
             //         require.ensure([], require => {
             //             cb(null, require('./routes/ui/button'))
             //         })
             //     }
             // }, {
             //     path: 'ui/breadcrumb',
             //     name: 'ui/breadcrumb',
             //     getComponent(nextState, cb) {
             //         require.ensure([], require => {
             //             cb(null, require('./routes/ui/breadcrumb'))
             //         })
             //     }
             // }, {
             //     path: 'ui/badge',
             //     name: 'ui/badge',
             //     getComponent(nextState, cb) {
             //         require.ensure([], require => {
             //             cb(null, require('./routes/ui/badge'))
             //         })
             //     }
             // }, {
             //     path: 'ui/tag',
             //     name: 'ui/tag',
             //     getComponent(nextState, cb) {
             //         require.ensure([], require => {
             //             cb(null, require('./routes/ui/tag'))
             //         })
             //     }
             // }, {
             //     path: 'ui/label',
             //     name: 'ui/label',
             //     getComponent(nextState, cb) {
             //         require.ensure([], require => {
             //             cb(null, require('./routes/ui/label'))
             //         })
             //     }
             // }, {
             //     path: 'ui/checkbox',
             //     name: 'ui/checkbox',
             //     getComponent(nextState, cb) {
             //         require.ensure([], require => {
             //             cb(null, require('./routes/ui/checkbox'))
             //         })
             //     }
             // }, {
             //     path: 'ui/radio',
             //     name: 'ui/radio',
             //     getComponent(nextState, cb) {
             //         require.ensure([], require => {
             //             cb(null, require('./routes/ui/radio'))
             //         })
             //     }
             // }, {
             //     path: 'ui/switch',
             //     name: 'ui/switch',
             //     getComponent(nextState, cb) {
             //         require.ensure([], require => {
             //             cb(null, require('./routes/ui/switch'))
             //         })
             //     }
             // }, {
             //     path: 'ui/timeline',
             //     name: 'ui/timeline',
             //     getComponent(nextState, cb) {
             //         require.ensure([], require => {
             //             cb(null, require('./routes/ui/timeline'))
             //         })
             //     }
             // },
             //  {
             //     path: 'ui/ImageGallery',
             //     name: 'ui/ImageGallery',
             //     getComponent(nextState, cb) {
             //         require.ensure([], require => {
             //             cb(null, require('./routes/ui/ImageGallery'))
             //         })
             //     }
             // },
             //  {
             //     path: 'ui/ImageGallery_normal',
             //     name: 'ui/ImageGallery_normal',
             //     getComponent(nextState, cb) {
             //         require.ensure([], require => {
             //             cb(null, require('./routes/ui/ImageGallery_normal'))
             //         })
             //     }
             // }, {
             //     path: 'ui/masonryInfinity',
             //     name: 'ui/masonryInfinity',
             //     getComponent(nextState, cb) {
             //         require.ensure([], require => {
             //             cb(null, require('./routes/ui/masonryInfinity'))
             //         })
             //     }
             // },  {
             //     path: 'ui/gradient',
             //     name: 'ui/gradient',
             //     getComponent(nextState, cb) {
             //         require.ensure([], require => {
             //             cb(null, require('./routes/ui/gradient'))
             //         })
             //     }
             // }, {
             //     path: 'app/calendar',
             //     name: 'app/calendar',
             //     getComponent(nextState, cb) {
             //         require.ensure([], require => {
             //             cb(null, require('./routes/app/calendar'))
             //         })
             //     }
             // }, {
             //     path: 'app/list',
             //     name: 'app/list',
             //     getComponent(nextState, cb) {
             //         require.ensure([], require => {
             //             cb(null, require('./routes/app/list'))
             //         })
             //     }
             // }, {
             //     path: 'app/tables',
             //     name: 'app/tables',
             //     getComponent(nextState, cb) {
             //         require.ensure([], require => {
             //             cb(null, require('./routes/app/tables'))
             //         })
             //     }
             // },
             // {
             //     path: 'app/widgets',
             //     name: 'app/widgets',
             //     getComponent(nextState, cb) {
             //         require.ensure([], require => {
             //             cb(null, require('./routes/app/widgets'))
             //         })
             //     }
             // }, {
             //     path: 'app/mediaPlayer',
             //     name: 'app/mediaPlayer',
             //     getComponent(nextState, cb) {
             //         require.ensure([], require => {
             //             cb(null, require('./routes/app/mediaPlayer'))
             //         })
             //     }
             // },
             //  {
             //     path: 'table/users',
             //     name: 'table/users',
             //     getComponent(nextState, cb) {
             //         require.ensure([], require => {
             //             cb(null, require('./routes/table/users'))
             //         })
             //     }
             // }, {
             //     path: 'table/advancedTable',
             //     name: 'table/advancedTable',
             //     getComponent(nextState, cb) {
             //         require.ensure([], require => {
             //             cb(null, require('./routes/table/advancedTable'))
             //         })
             //     }
             // }, {
             //     path: 'app/picture',
             //     name: 'app/picture',
             //     getComponent(nextState, cb) {
             //         require.ensure([], require => {
             //             cb(null, require('./routes/app/picture'))
             //         })
             //     }
             // }, {
             //     path: 'app/detail-switch',
             //     name: 'app/detail-switch',
             //     getComponent(nextState, cb) {
             //         require.ensure([], require => {
             //             cb(null, require('./routes/app/detail-switch'))
             //         })
             //     }
             // }, {
             //     path: 'chart/chart_1',
             //     name: 'chart/chart_1',
             //     getComponent(nextState, cb) {
             //         require.ensure([], require => {
             //             cb(null, require('./routes/chart/chart_1'))
             //         })
             //     }
             // },{
             //     path: 'chart/chart_2',
             //     name: 'chart/chart_2',
             //     getComponent(nextState, cb) {
             //         require.ensure([], require => {
             //             cb(null, require('./routes/chart/chart_2'))
             //         })
             //     }
             // },{
             //     path: 'chart/chart_3',
             //     name: 'chart/chart_3',
             //     getComponent(nextState, cb) {
             //         require.ensure([], require => {
             //             cb(null, require('./routes/chart/chart_3'))
             //         })
             //     }
             // }, {
             //     path: 'table/basic',
             //     name: 'table/basic',
             //     getComponent(nextState, cb) {
             //         require.ensure([], require => {
             //             cb(null, require('./routes/table/basic'))
             //         })
             //     }
             // }, {
             //     path: 'script/alert',
             //     name: 'script/alert',
             //     getComponent(nextState, cb) {
             //         require.ensure([], require => {
             //             cb(null, require('./routes/script/alert'))
             //         })
             //     }
             // }, {
             //     path: 'script/message',
             //     name: 'script/message',
             //     getComponent(nextState, cb) {
             //         require.ensure([], require => {
             //             cb(null, require('./routes/script/message'))
             //         })
             //     }
             // }, {
             //     path: 'script/modal',
             //     name: 'script/modal',
             //     getComponent(nextState, cb) {
             //         require.ensure([], require => {
             //             cb(null, require('./routes/script/modal'))
             //         })
             //     }
             // },
             // {
             //     path: 'script/modalEffect',
             //     name: 'script/modalEffect',
             //     getComponent(nextState, cb) {
             //         require.ensure([], require => {
             //             cb(null, require('./routes/script/modalEffect'))
             //         })
             //     }
             // }, {
             //     path: 'script/collapse',
             //     name: 'script/collapse',
             //     getComponent(nextState, cb) {
             //         require.ensure([], require => {
             //             cb(null, require('./routes/script/collapse'))
             //         })
             //     }
             // }, {
             //     path: 'script/notification',
             //     name: 'script/notification',
             //     getComponent(nextState, cb) {
             //         require.ensure([], require => {
             //             cb(null, require('./routes/script/notification'))
             //         })
             //     }
             // }, {
             //     path: 'script/popconfirm',
             //     name: 'script/popconfirm',
             //     getComponent(nextState, cb) {
             //         require.ensure([], require => {
             //             cb(null, require('./routes/script/popconfirm'))
             //         })
             //     }
             // }, {
             //     path: 'script/progress',
             //     name: 'script/progress',
             //     getComponent(nextState, cb) {
             //         require.ensure([], require => {
             //             cb(null, require('./routes/script/progress'))
             //         })
             //     }
             // }, {
             //     path: 'script/range',
             //     name: 'script/range',
             //     getComponent(nextState, cb) {
             //         require.ensure([], require => {
             //             cb(null, require('./routes/script/range'))
             //         })
             //     }
             // }, {
             //     path: 'script/spin',
             //     name: 'script/spin',
             //     getComponent(nextState, cb) {
             //         require.ensure([], require => {
             //             cb(null, require('./routes/script/spin'))
             //         })
             //     }
             // }, {
             //     path: 'script/carousel',
             //     name: 'script/carousel',
             //     getComponent(nextState, cb) {
             //         require.ensure([], require => {
             //             cb(null, require('./routes/script/carousel'))
             //         })
             //     }
             // }, {
             //     path: 'script/upload',
             //     name: 'script/upload',
             //     getComponent(nextState, cb) {
             //         require.ensure([], require => {
             //             cb(null, require('./routes/script/upload'))
             //         })
             //     }
             // }, {
             //     path: 'script/rate',
             //     name: 'script/rate',
             //     getComponent(nextState, cb) {
             //         require.ensure([], require => {
             //             cb(null, require('./routes/script/rate'))
             //         })
             //     }
             // }, {
             //     path: 'form/basicform',
             //     name: 'form/basicform',
             //     getComponent(nextState, cb) {
             //         require.ensure([], require => {
             //             cb(null, require('./routes/form/basicform'))
             //         })
             //     }
             // }, {
             //     path: 'form/advancedForm',
             //     name: 'form/advancedForm',
             //     getComponent(nextState, cb) {
             //         require.ensure([], require => {
             //             cb(null, require('./routes/form/advancedForm'))
             //         })
             //     }
             // },  {
             //     path: 'form/htmlEditor',
             //     name: 'form/htmlEditor',
             //     getComponent(nextState, cb) {
             //         require.ensure([], require => {
             //             cb(null, require('./routes/form/htmlEditor'))
             //         })
             //     }
             // },{
             //     path: 'table/ajaxTable',
             //     name: 'table/ajaxTable',
             //     getComponent(nextState, cb) {
             //         require.ensure([], require => {
             //             cb(null, require('./routes/table/ajaxTable'))
             //         })
             //     }
             // }, {
             //     path: 'table/table-playground',
             //     name: 'table/table-playground',
             //     getComponent(nextState, cb) {
             //         require.ensure([], require => {
             //             cb(null, require('./routes/table/table-playground'))
             //         })
             //     }
             // }, {
             //     path: 'animation/basicAnimation',
             //     name: 'animation/basicAnimation',
             //     getComponent(nextState, cb) {
             //         require.ensure([], require => {
             //             cb(null, require('./routes/animation/basicAnimation'))
             //         })
             //     }
             // }, {
             //     path: 'animation/advancedAnimation',
             //     name: 'animation/advancedAnimation',
             //     getComponent(nextState, cb) {
             //         require.ensure([], require => {
             //             cb(null, require('./routes/animation/advancedAnimation'))
             //         })
             //     }
             // },
             //  {
             //     path: 'animation/logoAnimation',
             //     name: 'animation/logoAnimation',
             //     getComponent(nextState, cb) {
             //         require.ensure([], require => {
             //             cb(null, require('./routes/animation/logoAnimation'))
             //         })
             //     }
             // },
             //  {
             //     path: 'animation/logoMotion',
             //     name: 'animation/logoMotion',
             //     getComponent(nextState, cb) {
             //         require.ensure([], require => {
             //             cb(null, require('./routes/animation/logoMotion'))
             //         })
             //     }
             // }, {
             //     path: 'script/dropdown',
             //     name: 'script/dropdown',
             //     getComponent(nextState, cb) {
             //         require.ensure([], require => {
             //             cb(null, require('./routes/script/dropdown'))
             //         })
             //     }
             // }, {
             //     path: 'script/steps',
             //     name: 'script/steps',
             //     getComponent(nextState, cb) {
             //         require.ensure([], require => {
             //             cb(null, require('./routes/script/steps'))
             //         })
             //     }
             // }, {
             //     path: 'script/tabs',
             //     name: 'script/tabs',
             //     getComponent(nextState, cb) {
             //         require.ensure([], require => {
             //             cb(null, require('./routes/script/tabs'))
             //         })
             //     }
             // }, {
             //     path: 'script/autoComplete',
             //     name: 'script/autoComplete',
             //     getComponent(nextState, cb) {
             //         require.ensure([], require => {
             //             cb(null, require('./routes/script/autoComplete'))
             //         })
             //     }
             // }, {
             //     path: 'script/cascader',
             //     name: 'script/cascader',
             //     getComponent(nextState, cb) {
             //         require.ensure([], require => {
             //             cb(null, require('./routes/script/cascader'))
             //         })
             //     }
             // }, {
             //     path: 'script/mention',
             //     name: 'script/mention',
             //     getComponent(nextState, cb) {
             //         require.ensure([], require => {
             //             cb(null, require('./routes/script/mention'))
             //         })
             //     }
             // }, {
             //     path: 'script/select',
             //     name: 'script/select',
             //     getComponent(nextState, cb) {
             //         require.ensure([], require => {
             //             cb(null, require('./routes/script/select'))
             //         })
             //     }
             // }, {
             //     path: 'script/popover',
             //     name: 'script/popover',
             //     getComponent(nextState, cb) {
             //         require.ensure([], require => {
             //             cb(null, require('./routes/script/popover'))
             //         })
             //     }
             // },
             //  {
             //     path: 'pages/blank',
             //     name: 'pages/blank',
             //     getComponent(nextState, cb) {
             //         require.ensure([], require => {
             //             cb(null, require('./routes/pages/blank'))
             //         })
             //     }
             // },
             //  {
             //     path: 'pages/profile',
             //     name: 'pages/profile',
             //     getComponent(nextState, cb) {
             //         require.ensure([], require => {
             //             cb(null, require('./routes/pages/profile'))
             //         })
             //     }
             // },
             //
             //  {
             //     path: 'pages/signup',
             //     name: 'pages/signup',
             //     getComponent(nextState, cb) {
             //         require.ensure([], require => {
             //             cb(null, require('./routes/pages/signup'))
             //         })
             //     }
             // },
             //  {
             //     path: 'pages/lockscreen',
             //     name: 'pages/lockscreen',
             //     getComponent(nextState, cb) {
             //         require.ensure([], require => {
             //             cb(null, require('./routes/pages/lockscreen'))
             //         })
             //     }
             // },{
             //     path: 'documentation',
             //     name: 'documentation',
             //     getComponent(nextState, cb) {
             //         require.ensure([], require => {
             //             cb(null, require('./routes/documentation'))
             //         })
             //     }
             // },
           {
                 path: '*',
                 name: 'error',
                 getComponent(nextState, cb) {
                     require.ensure([], require => {
                         cb(null, require('./routes/error'))
                     })
                 }
             }
         ]
     }
 ]

    return <Router history={hashHistory} routes={routes}/>
}
