// var ghpages = require('gh-pages');
import ghpages from 'gh-pages';

ghpages.publish('docs/.vitepress/dist', {nojekyll: true});