import shallowEqual from './shallowEqual';
import shallowCompare from 'react-addons-shallow-compare';
import diff from 'deep-diff';
const STATE_GROUP = 'state';
const PROPS_GROUP = 'props';

const colorMap = {}

const newColor = () => {
  const r = Math.round(Math.random() * 255);
  const g = Math.round(Math.random() * 60);
  const b = Math.round(Math.random() * 60);
  return `rgb(${r}, ${g}, ${b})`;
}

export default function shouldComponentUpdateDev(nextProps, nextState) {

  const shouldUpdate = shallowCompare(this, nextProps, nextState);

  if (process.env.NODE_ENV !== 'development') return shouldUpdate;
  if (!shouldUpdate) return shouldUpdate;

  const displayName = this.constructor.name;
  let color = colorMap[displayName];
  if (!color) {
    color = colorMap[displayName] = newColor();
  }

  console.group(`%c ${displayName}`, `color: ${color}`);
  console.group(PROPS_GROUP);
  const shouldUpdateProps = !shallowEqual(this.props, nextProps);
  console.log(`shouldUpdateProps: ${shouldUpdateProps}`);
  console.log('diff: ', diff(this.props, nextProps));
  console.groupEnd(PROPS_GROUP);
  console.group(STATE_GROUP);
  const shouldUpdateState = !shallowEqual(this.state, nextState);
  console.log(`shouldUpdateState: ${shouldUpdateState}`);
  console.log('diff: ', diff(this.state, nextState));
  console.groupEnd(STATE_GROUP);
  console.groupEnd(displayName);
  return shouldUpdateProps || shouldUpdateState;
}
