# XRP Kids Robotics — FRC Student Instructor Guide

## Your job

You are the coach, not the programmer.

Let the younger student decide what the robot should do and help them turn that idea into blocks.

## The four important blocks

### Drive forward
Moves forward the specified number of inches.

### Drive backward
Moves backward the specified number of inches.

### Turn left
Turns left the specified number of degrees.

### Turn right
Turns right the specified number of degrees.

The robot uses its wheel encoders for distance and its gyro/IMU for turns. You do not need to teach the student how those sensors work unless they ask.

## A good teaching pattern

Ask:

> What do you want the robot to do?

Then:

> Which block would do that?

Then:

> What number should we put in it?

Before running:

> What do you predict the robot will do?

After running:

> What happened? Was it what you expected?

This turns the activity into programming and debugging without requiring syntax.

## If the robot behaves incorrectly

Check these in order:

1. Is the robot pointed in the intended starting direction?
2. Is the robot on a surface where the wheels can grip?
3. Is the requested distance reasonable?
4. Is the requested angle reasonable?
5. Does the same command behave consistently when run by itself?

Do not start changing software settings unless the same error can be reproduced.

## Suggested first test

Run:

```text
Drive forward 12 inches
```

Then:

```text
Turn right 90 degrees
```

Then:

```text
Drive forward 12 inches
```

Once those work, try the square challenge.

## Safety

Keep the robot on the floor or test surface.

Be ready to remove power if a robot behaves unexpectedly.

Do not put hands or feet in the robot's path while it is running.
