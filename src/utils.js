
function encodeUrlParams(data) {
  return Object.keys(data)
    .map(function(key) {
      return [key, data[key]].map(encodeURIComponent).join("=");
    })
    .join("&");
}

function upperFirst(str) {
  if (str.length === 0) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export { encodeUrlParams, upperFirst };