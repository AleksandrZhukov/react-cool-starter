import serialize from 'serialize-javascript';
import { minify } from 'html-minifier';

export default (
  head: Object,
  assets: Object,
  htmlContent: string,
  initialState: Object,
  loadableStateTag: string
): string => {

  const renderScripts = () =>
    Object.keys(assets.javascript)
      .reverse() // Reverse scripts to get correct ordering
      .map(script => `<script src="${assets.javascript[script]}"></script>`)
      .join('');

  const renderCssLinks = () =>
    Object.keys(assets.styles)
      .reverse() // Reverse styles to get correct ordering
      .map(
        style =>
          `<link href="${
            assets.styles[style]
          }" media="screen, projection" rel="stylesheet" type="text/css">`
      )
      .join('');

  const html = `
    <!doctype html>
    <html ${head.htmlAttributes.toString()}>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <!--[if IE]>
          <meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1">
        <![endif]-->

        <link rel="apple-touch-icon" href="apple-touch-icon.png">
        <link rel="shortcut icon" href="/favicon.ico">

        ${head.title.toString()}
        ${head.base.toString()}
        ${head.meta.toString()}
        ${head.link.toString()}

        <!-- Insert bundled styles into <link> tag on production -->
        ${renderCssLinks()}

        <!-- Insert bundled styles into <style> tag on development -->
        <!-- I put all of the styles here to smoothen the flick -->
        ${
          // Object.keys(assets.styles).length === 0
          //   ? `
          //     <style>
          //       ${require('../../node_modules/normalize.css/normalize.css')
          //         ._style +
          //         // require('../containers/App/styles.module.css')._style +
          //         // require('../containers/Home/styles.scss')._style +
          //         // require('../containers/UserInfo/styles.scss')._style +
          //         // require('../containers/NotFound/styles.scss')._style +
          //         // require('../components/UserList/styles.module.scss')._style +
          //         // require('../components/UserCard/styles.module.scss')._style +
          //         // require('../components/ErrorDisplay/styles.module.scss')._style +
          //         // require('../components/Loading/styles.scss')._style
          //         require('../css/styles.css')._style +
          //         require('../pages/home/Home.css')._style +
          //         require('../pages/sign-in/SignIn.module.css')._style +
          //         require('../pages/sign-up/SignUp.module.css')._style +
          //         require('../layouts/AppLayout/AppLayout.module.css')._style +
          //         require('../layouts/AppLayout/components/Header/Header.module.css')
          //           ._style +
          //         require('../layouts/AppLayout/components/Footer/Footer.module.css')
          //           ._style +
          //         require('../layouts/PageLayout/PageLayout.module.css')._style}
          //     </style>
          //   `
          //   : ''
          ''
        }
      </head>
      
      <body>
        <!-- Insert the router, which passed from server-side -->
        <div id="react-view">${htmlContent}</div>

        <!-- Insert loadableState's script tag into page (loadable-components setup) -->
        ${loadableStateTag}

        <!-- Store the initial state into window -->
        <script>
          // Use serialize-javascript for mitigating XSS attacks. See the following security issues:
          // http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations
          window.__INITIAL_STATE__=${serialize(initialState)};
        </script>

        <!-- Insert bundled scripts into <script> tag -->
        ${renderScripts()}
      </body>
    </html>
  `;

  // html-minifier configuration, refer to "https://github.com/kangax/html-minifier" for more configuration
  const minifyConfig = {
    collapseWhitespace: true,
    removeComments: true,
    trimCustomFragments: true,
    minifyCSS: true,
    minifyJS: true,
    minifyURLs: true
  };

  // Minify html on production
  return __DEV__ ? html : minify(html, minifyConfig);
};
