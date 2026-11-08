import {test} from 'node:test';
import assert from 'node:assert/strict';
import {joystickIntent} from './touch-input.mjs';
test('dead zone and neutral input stop immediately',()=>{assert.deepEqual(joystickIntent(0,0),{x:0,z:0,sprint:false});assert.equal(joystickIntent(3,3).x,0);});
test('analog movement preserves direction and circular normalization',()=>{const slow=joystickIntent(15,0),walk=joystickIntent(40,0),diagonal=joystickIntent(100,-100);assert(slow.x>0&&slow.x<walk.x);assert(Math.abs(Math.hypot(diagonal.x,diagonal.z)-1)<1e-10);assert(diagonal.z<0);assert.equal(walk.sprint,false);assert.equal(diagonal.sprint,true);});
