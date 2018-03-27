<!--
  Warning: this is an automatically generated documentation.
  To change the contents of this file, edit the doc comments
  in /lib/FullTab.js
-->

# FullTab

A Tab with a label and an icon.

## Props

### animationDuration

Type: `Number`

The duration of the animation between active and inactive.


Default: `160`

### animationEasing

Type: `Function`

The easing function of the animation between active and inactive.


Default: `easings.easeInOut`

### badgeAnimation

Type: `Function`

Defines the animation of the badge from active to inactive. Receives the
animation progress (`AnimatedValue` between 0 and 1), needs to return a
style object.
See also: https://facebook.github.io/react-native/docs/animations.html#interpolation


Default:  
```js
progress => ({
  transform: [
    {
      scale: progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0.9, 1]
      })
    }
  ]
})
```

### badgeSlotStyle

Type: `ViewPropTypes.style`

Extends the style of the badge's wrapping View.



### iconAnimation

Type: `Function`

Defines the animation of the icon from active to inactive. Receives the
animation progress (`AnimatedValue` between 0 and 1), needs to return a
style object.
See also: https://facebook.github.io/react-native/docs/animations.html#interpolation


Default:  
```js
progress => ({
  transform: [
    {
      translateY: progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -2]
      })
    }
  ],
  opacity: progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0.8, 1]
  })
})
```

### isActive
**Required.**  
Type: `Boolean`

If `true`, the tab is visually active.



### label
**Required.**  
Type: `String`

The text of the label.



### labelAnimation

Type: `Function`

Defines the animation of the label from active to inactive. Receives the
animation progress (`AnimatedValue` between 0 and 1), needs to return a
style object.
See also: https://facebook.github.io/react-native/docs/animations.html#interpolation


Default:  
```js
progress => ({
  transform: [
    {
      scale: progress.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 1.12]
      })
    },
    {
      translateY: progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -1]
      })
    }
  ],
  opacity: progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0.8, 1]
  })
})
```

### labelProps

Type: `Object`

Useful to add more props to the Text component of the label.


Default: `{ numberOfLines: 1 }`

### labelStyle

Type: `Text.propTypes.style`

Extends the style of the label.



### renderBadge

Type: `Function`

The render prop to render the badge. Arguments: `({ isActive })`



### renderIcon
**Required.**  
Type: `Function`

The render prop to render the icon. Arguments: `({ isActive })`



### showBadge

Type: `Boolean`

If `true`, the badge will be rendered.


Default: `false`

### style

Type: `ViewPropTypes.style`

Extends the style of the tab's view.



