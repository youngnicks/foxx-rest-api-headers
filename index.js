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

  let links = [];
  // First & prev pages
  if (currentPage > 1) {
    links.push(`${req.path}?${paramString}&page=1; rel=first`);
    links.push(`${req.path}?${paramString}&page=${currentPage - 1}; rel=prev`);
  }

  // Next and last pages
  if (currentPage < lastPage) {
    links.push(`${req.path}?${paramString}&page=${currentPage + 1}; rel=next`);
    links.push(`${req.path}?${paramString}&page=${lastPage}; rel=last`);
  }

  res.set('total_count', totalCount);
  res.set('link', links);
}

module.exports = addApiHeaders;
