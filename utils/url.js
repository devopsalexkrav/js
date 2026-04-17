function toAbsoluteUrl(baseURL, href) {
  return new URL(href, baseURL).toString();
}

function isOnlinerEcosystemUrl(value) {
  const url = new URL(value);
  return url.protocol.startsWith('http') && url.hostname.endsWith('onliner.by');
}

function hasAllowedPathname(value, allowedPathnames) {
  const url = new URL(value);
  return allowedPathnames.includes(url.pathname);
}

module.exports = {
  hasAllowedPathname,
  isOnlinerEcosystemUrl,
  toAbsoluteUrl
};
