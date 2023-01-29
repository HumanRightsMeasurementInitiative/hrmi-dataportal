require('babel-register')({
  presets: ['es2015', 'react']
});

const Sitemap = require('react-router-sitemap').default;
const Routes = require('../../app/components/Routes').default;

console.log('test');

//new Sitemap(Routes).build('https://rightstracker.org').save('../../sitemap/sitemap.xml');