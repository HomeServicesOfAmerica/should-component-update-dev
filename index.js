import shallowEqual from './shallowEqual';
import shallowCompare from 'react-addons-shallow-compare';
import diff from 'deep-diff';
const STATE_GROUP = 'state';
const PROPS_GROUP = 'props';

export default function shouldComponentUpdateDev(nextProps, nextState) {

  if (process.env.NODE_ENV !== 'development') {
    return shallowCompare(this, nextProps, nextState);
  }

  const displayName = this.constructor.name;

  console.group(displayName);
  console.group(PROPS_GROUP);
  const shouldUpdateProps = !shallowEqual(this.props, nextProps);
  console.log(`shouldUpdateProps: ${shouldUpdateProps}`);
  console.log(`diff: ${diff(this.props, nextProps)}`)
  console.groupEnd(PROPS_GROUP);
  console.group(STATE_GROUP);
  const shouldUpdateState = !shallowEqual(this.state, nextState);
  console.log(`shouldUpdateState: ${shouldUpdateState}`);
  console.log(`diff: ${diff(this.state, nextState)}`);
  console.groupEnd(STATE_GROUP);
  console.groupEnd(displayName);
  return shouldUpdateProps || shouldUpdateState;
}
