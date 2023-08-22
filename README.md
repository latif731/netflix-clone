# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

/ _ drawer _/
.drawer {
    overflow: visible
}

.drawer .drawer-content-wrapper{
    width: 100%;
}

.drawer {
    position: fixed;
    z-index: 9999;
    transitions: width 0s ease 0.3s, height 0s ease 0.3s,
    transform 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86);
}

.drawer>\* {
    transition: transform 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86),
    opacity 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86),
    box-shadow 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86);
}

.drawer.drawer-open {
    transform: transform 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86);
}

.drawer .drawer-mask {
    background: #000
    opacity: 0;
    width: 100%
    height:0;
    position: absolute;
    top:0
    left:0;
    transition: opacity 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86),
    height 0s ease 0.3s;
}

.drawer-content-wrapper {
    position: absolute;
    background: #fff;
}

.drawer-content {
    overflow: auto;
    z-index: 1;
    position: relative
}

.drawer-handle {
    position: absolute;
    top: 72px;
    width: 41px;
    height: 40px;
    cursor: pointer;
    z-index: 0;
    text-align: center;
    line-height: 40px;
    font-size: 16px;
    display: none;
    justify-content: center;
    align-items: center;
    background: #fff;
}

.drawer-handle-icon {
    width: 14px;
    height: 2px;
    background: #333
    position: relative
    transition: transform 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86);
}

.drawer-handle-icon: before,
.drawer-handle-icon: after {
    content: '';
    display: block;
    position: absolute
    background: #333
    width: 100%;
    height: 2px;
    transition: transform 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86)
}

.drawer-handle-icon:before {
    top: -5px;
}

.drawer-handle-icon:after {
    top: 5px;
}

.drawer-left,
.drawer-right {
    width: 0%;
    height: 100%;
}

.drawer-left .drawer-content-wrapper,
.drawer-right .drawer-content-wrapper,
.drawer-left .drawer-content,
.drawer-right .drawer-content {
    height: 100%
}

.drawer-left .drawer-open,
.drawer-right .drawer-open {
    width: 100%
}

.drawer-left.drawer-open.no-mask,
.drawer-right.drawer-open.no-mask {
    width: 0%;
}

.drawer-left {
    top:0;
    left:0;
}

.drawer-left.drawer-handle {
    right: -40px;
    box-shadow: 2px 0 8px rgba(0, 0, 0, 0.15);
    border-radius: 0 4px 4px 0;
}

.drawer-left.drawer-open.drawer-content-wrapper {
    box-shadow: 2px 0 8px rgba(0, 0, 0, 0.15)
}

.drawer-right {
    top:0;
    left:0;
}

.drawer-right.drawer-content-wrapper {
    right:0;
}

.drawer-right.drawer-handle {
    right: -40px;
    box-shadow: -2px 0 8px rgba(0, 0, 0, 0.15);
    border-radius:  4px 0 0 4px ;
}

.drawer-right.drawer-open.drawer-content-wrapper {
    box-shadow: -2px 0 8px rgba(0, 0, 0, 0.15)
}


.drawer-right.drawer-open.no-mask {
    right: 1px;
    transform: translateX(1px) 
}

.drawer-top,
.drawer-bottom {
    width: 100%;
    height: 0%;
}

.drawer-top .drawer-content-wrapper,
.drawer-bottom .drawer-content-wrapper,
.drawer-top .drawer-content,
.drawer-bottom .drawer-content {
    width: 100%
}

.drawer-top .drawer-content,
drawer-bottom .drawer-content {
    height: 100%
}

.drawer-top.drawer-open,
.drawer-bottom.drawer-open {
    height: 100%;
}

.drawer-top.drawer-open.no-mask,
.drawer-bottom.drawer-open.no-mask {
    height: 0%
}

.drawer-top.drawer-handle,
.drawer-bottom.drawer-handle {
    left:50%
    margin-left: -20px
}

.drawer-top {
    top:0;
    left:0;
}

.drawer-top .drawer-handle {
    top:auto;
    bottom: -40px;
    box-shadow: 0 2px 8px rgba(0,0,0, 0.15);
    border-radius: 0 0 4px 4px;
}

.drawer-top.drawer-open.drawer-content-wrapper {
    box-shadow: 0 2px 8px rgba(0,0,0, 0.15);
}

.drawer-bottom {
    bottom: 0;
    left: 0;
}

.drawer-bottom.drawer-content-wrapper {
    bottom:0;
}

.drawer-bottom.drawer-handle {
    top: -40px;
    box-shadow: 0 -2px 8px rgba(0,0,0, 0.15);
    border-radius: 4px 4px 0 0;
}

.drawer-bottom.drawer-open.drawer-content-wrapper {
    box-shadow: 0 -2px 8px rgba(0,0,0, 0.15)
}

.drawer-bottom.drawer-open.no-mask {
    bottom: 1px;
    transform: translateY(1px);
}

.drawer.drawer-open.drawer-mask {
    opacity: 0.3;
    height: 100%;
    transition: opacity 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86);
}

.drawer.drawer-open.drawer-handle-icon {
    background: transparent;
}

.drawer.drawer-open.drawer-handle-icon:before {
    transform: translateY(5px) rotate(45deg)
}
.drawer.drawer-open.drawer-handle-icon:after {
    transform: translateY(5px) rotate(-45deg)
}

@media(min-width: 480px) {
    .drawer .drawer-content-wrapper{
        width:420px;
    }
}