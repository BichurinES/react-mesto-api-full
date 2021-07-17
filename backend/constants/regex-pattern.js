/* eslint-disable no-useless-escape */

module.exports.defaultUrlPattern = /https?:\/\/[\w\-.]+\.[a-zа-я]{2,}(\/[\w\-._~:\/?#\[\]@!$&'"()*+,;=]+)?(#$)?/gm;
module.exports.joiUrlPattern = /https?:\/\/[\w\-.]+\.[a-zа-я]{2,}(\/[\w\-._~:\/?#\[\]@!$&'"()*+,;=]+)?(#$)?/m;
module.exports.authPattern = /jwt=/m;
