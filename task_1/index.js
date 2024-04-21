import {encoded, translations} from './data.js'

function decode(e, t) {
    const uniqueIds = new Set();
    const decoded = 
    e.map((obj) => {
        for (let key in obj) {
            if(t.hasOwnProperty(obj[key])) {
                uniqueIds.add(obj[key])
                obj[key] = t[obj[key]]
            }
        }
        return obj;
    })

    return { uniqueIds: Array.from(uniqueIds), decoded }
}

const decoded = decode(encoded, translations);

console.log(decoded.decoded, decoded.uniqueIds);
