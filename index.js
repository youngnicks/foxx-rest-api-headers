'use strict';

const _ = require('lodash');

function addApiHeaders(req, res, totalCount) {
  const currentPage = req.queryParams.page || 1;
  const perPage = req.queryParams.per_page || 30;
  const lastPage = Math.ceil(totalCount / perPage);

  // Build REST headers
  let params = Object.assign

  let paramString = Object.keys(_.omit(req.queryParams, 'page')).map(key => {
    return `${key}=${req.queryParams[key]}`
  }).join('&');

  if (paramString) paramString = '&' + paramString;

  let links = [];
  // First & prev pages
  if (currentPage > 1) {
    links.push(`<${req.path}?page=1${paramString}>; rel="first"`);
    links.push(`<${req.path}?page=${currentPage - 1}${paramString}>; rel="prev"`);
  }

  // Next and last pages
  if (currentPage < lastPage) {
    links.push(`<${req.path}?page=${currentPage + 1}${paramString}>; rel="next"`);
    links.push(`<${req.path}?page=${lastPage}${paramString}>; rel="last"`);
  }

  res.set('total_count', totalCount);
  res.set('link', links);
}

module.exports = addApiHeaders;
