import shallowEqual from './shallowEqual';
import diff from 'deep-diff';
const STATE_GROUP = 'state';
const PROPS_GROUP = 'props';

export default function shouldComponentUpdateDev(nextProps, nextState) {
  const shouldUpdateProps = !shallowEqual(this.props, nextProps);
  const shouldUpdateState = !shallowEqual(this.state, nextState);
  const shouldUpdate = shouldUpdateProps || shouldUpdateState;

  if (process.env.NODE_ENV !== 'development') return shouldUpdate;
  if (!shouldUpdate) return shouldUpdate;

  const displayName = this.constructor.name;

  console.group(displayName);
  console.group(PROPS_GROUP);
  console.log(`shouldUpdateProps: ${shouldUpdateProps}`);
  console.log(`diff: ${diff(this.props, nextProps)}`)
  console.groupEnd(PROPS_GROUP);
  console.group(STATE_GROUP);
  console.log(`shouldUpdateState: ${shouldUpdateState}`);
  console.log(`diff: ${diff(this.state, nextState)}`)
  console.groupEnd(STATE_GROUP);
  console.groupEnd(displayName);
}
