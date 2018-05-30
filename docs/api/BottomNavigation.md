<!--
  Warning: this is an automatically generated documentation.
  To change the contents of this file, edit the doc comments
  in /lib/BottomNavigation.js
-->

# BottomNavigation

The BottomNavigation renders all tabs and takes care of running animations.

It uses a [render prop](https://reactjs.org/docs/render-props.html) to
render the tabs, so you can easily customize them without clunky
configurations.

This library includes multiple configurable Tabs which you can use inside
the `renderTab` prop. You can also build and use your own tabs.

You can use the BottomNavigation as an uncontrolled or a controlled
component by using the prop `activeTab`. If you set `activeTab`, the
BottomNavigation will switch to controlled mode. If a tab is pressed, it
will only become active if you update the value for `activeTab`.
You receive tab presses through the prop `onTabPress={(newTab) => ...}`.
`newTab` is the tab object, you can get its key with `newTab.key`.
See also: https://reactjs.org/docs/forms.html#controlled-components

If you use it as an uncontrolled component, the tab will automatically
become active once it's pressed. `onTabPress` will also be called, so you
can change to another screen.

## Props

### activeTab

Type: `Union<Number | String>`

The identifier of the currently active tab. If you set this, the
Bottom navigation will become a controlled component.



### onTabPress

Type: `Function`

The called function when a tab was pressed. Useful to change the active
tab when you use the Bottom navigation as controlled component. Has
the tab object of the pressed tab and the currently active tab as
as parameters.
Arguments: `(newTab, oldTab)`



### renderTab
**Required.**  
Type: `Function`

The render prop to render a tab. Arguments: `({ isActive, tab })`



### style

Type: `ViewPropTypes.style`

Extends the style of the root view.



### tabs
**Required.**  
Type: `Array[]<Shape>`

The config of all tabs. Each item will be called in `renderTab`.



### tabs[].barColor

Type: `String`

The background color of the bottom navigation bar.



### tabs[].key
**Required.**  
Type: `Union<Number | String>`

A unique identifier for a tab.



### tabs[].pressColor

Type: `String`

The color of the touch feedback.



### tabs[].pressSize

Type: `Number`

The diameter of the expanded touch feedback.



### useLayoutAnimation

Type: `Boolean`

If `true`, a LayoutAnimation will be triggered when the active tab
changes. Necessary to get nice animations when using
[ShiftingTab](ShiftingTab.md).



### viewportHeight

Type: `Number`

(experimental, android only) If you pass the height of the viewport, it
will check if android soft navigation is enabled and configure the
BottomNavigation so it looks nice behind the navigation bar.



