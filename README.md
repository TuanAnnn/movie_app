# movie_app

- if you got a Warning by ViewPropStyle from ReactNative , please go to this link and fix that
- https://github.com/meliorence/react-native-snap-carousel/issues/923
- That warning because the newest Version ReactNative (0.72) not support to ViewPropStyle , if you wanna use ViewPropStyle , you must import it from 'deprecated-react-native-prop-types' instead of 'react-native'
- Fix:
- ./node_modules/react-native-snap-carousel/src/carousel/Carousel.js
./node_modules/react-native-snap-carousel/src/Pagination/Pagination.js
./node_modules/react-native-snap-carousel/src/Pagination/PaginationDot.js
./node_modules/react-native-snap-carousel/src/ParallaxImage/ParallaxImage.js
- edit
```
import { ... ,ViewPropTypes } from 'react-native';
```
- to
```
import { ... } from 'react-native';
import {ViewPropTypes} from 'deprecated-react-native-prop-types';
```
