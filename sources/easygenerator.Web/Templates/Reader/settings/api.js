!function(){function t(){var t=$.ajax({url:T,cache:!1,type:"POST",contentType:"application/json",dataType:"json"}),e=$.ajax({url:h,cache:!1,contentType:"application/json",dataType:"json"}),n=$.ajax({url:w,cache:!1,contentType:"application/json",dataType:"json"});return $.when(n,t,e).done(function(t,e,n){d.manifest=a(t[0]),d.user=o(e[0]),d.settings=r(n[0]),d.isInited=!0})}function e(){if(!d.isInited)throw"Sorry, but you've tried to use api before it was initialized"}function n(){return e(),d.manifest}function i(){return e(),d.user}function s(){return e(),d.settings}function a(t){if(t&&t.languages&&t.languages.length>0)for(var e=0;e<t.languages.length;e++)t.languages[e].url=j+t.languages[e].url;return t}function o(t){var e={accessType:0},n=1;return t.subscription&&t.subscription.accessType&&t.subscription.accessType>=n&&new Date(t.subscription.expirationDate)>=new Date&&(e.accessType=t.subscription.accessType),e}function r(t){var e;return e=t.settings&&t.settings.length>0?JSON.parse(t.settings):{logo:{},xApi:{enabled:!0,selectedLrs:"default",lrs:{credentials:{}}},masteryScore:{}}}function c(t){return decodeURI((RegExp(t+"=(.+?)(&|$)").exec(location.search)||[,null])[1])}function u(t,e,n,i){return p(),$.post(h,{settings:t,extraSettings:e}).done(function(){g(n,!0)}).fail(function(){g(i,!1)}).always(function(){f()})}function p(){l({type:"freeze",data:{freezeEditor:!0}})}function f(){l({type:"freeze",data:{freezeEditor:!1}})}function l(t){var e=window.top;e.postMessage(t,e.location.href)}function g(t,e){l({type:"notification",data:{success:e||!0,message:t}})}var d={isInited:!1},y=location.protocol+"//"+location.host,T=y+"/api/identify",h=y+"/api/course/"+c("courseId")+"/template/"+c("templateId"),j=location.toString().substring(0,location.toString().indexOf("/settings/"))+"/",w=j+"manifest.json";window.egApi={init:t,getManifest:n,getUser:i,getSettings:s,saveSettings:u,sendNotificationToEditor:g}}();