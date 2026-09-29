# XRP Kids Robotics Event

This Team 5962 version of XRPWeb adds a simplified Blockly mode for outreach events.

## What the kids see

With `XRP_KIDS_MODE = true` in `src/components/blockly/xrp_blockly_configs.ts`, the Blockly toolbox contains only:

- **XRP Movement**
  - Drive forward ___ inches
  - Drive backward ___ inches
  - Turn left ___ degrees
  - Turn right ___ degrees
- **Loops**
  - Repeat ___ times
- **Basic**
  - Sleep ___ seconds
  - Stop motors

The movement blocks deliberately hide motor effort, encoder counts, gyro readings, and other low-level details.

## How the movement blocks work

The blocks generate calls to the existing XRPLib `DifferentialDrive` class:

- Forward: `differentialDrive.straight(abs(inches) * 2.54)`
- Backward: `differentialDrive.straight(-abs(inches) * 2.54)`
- Left: `differentialDrive.turn(-abs(degrees))`
- Right: `differentialDrive.turn(abs(degrees))`

XRPLib's `straight()` uses the wheel encoders and its `turn()` uses the IMU by default. The Blockly layer does not implement its own PID or sensor-control algorithm.

The conversion from inches to centimeters is done in the generated Python because XRPLib's drivetrain API uses centimeters.

## Switching back to the full XRP toolbox

Edit:

`src/components/blockly/xrp_blockly_configs.ts`

Change:

```ts
export const XRP_KIDS_MODE = true;
```

to:

```ts
export const XRP_KIDS_MODE = false;
```

Restart the development server after changing it.

## Recommended event workflow

1. Install/use the current XRP firmware and matching XRPLib.
2. Build XRPWeb.
3. Connect one XRP and run a 12-inch forward test.
4. Measure actual travel.
5. Test 24 inches.
6. Test left and right 90-degree turns.
7. Test a four-block square.
8. Only after the movement is reliable, give the interface to younger students.

## Important

The current XRPLib drivetrain defaults already contain the encoder/IMU control logic. Do not add a second PID or encoder-control layer unless testing shows a specific need.

The event code intentionally uses the library defaults so that future XRPLib updates can be adopted without rewriting the custom blocks.
