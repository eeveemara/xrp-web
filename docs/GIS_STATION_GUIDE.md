# Running a table at Girls in STEAM

Read these 2 first. They're the lesson.

| Read this | For |
|---|---|
| [KIDS_ROBOTICS_STUDENT_GUIDE.md](KIDS_ROBOTICS_STUDENT_GUIDE.md) | how to coach a kid without doing it for them |
| [KIDS_ROBOTICS_CHALLENGES.md](KIDS_ROBOTICS_CHALLENGES.md) | the 5 challenges, in order |

This page is just what to click. Nothing to install:

**https://eeveemara.github.io/xrp-web/**

```mermaid
flowchart TD
    A([Open the site in Chrome or Edge]) --> B[Robot on and cable in]
    B --> C[Click CONNECT XRP]
    C --> D{Update available showing}
    D -->|yes| E[Get a software team member]
    D -->|no| F[Switch to Bluetooth]
    F --> G[New Blockly file]
    G --> H[Kid does the challenges]
    H --> I[Robot on the green square]
    I --> J[Click RUN]
    J --> K{Reached the red square}
    K -->|not yet| L[Change a number]
    L --> I
    K -->|yes| M([Done])

    classDef step fill:#ffe0ef,stroke:#e32a7f,color:#3d0f52
    classDef ask fill:#efe3ff,stroke:#7b3bc9,color:#3d0f52
    classDef kid fill:#fff6c9,stroke:#e0a800,color:#3d0f52
    classDef good fill:#dff7ee,stroke:#0e8577,color:#0b3d36
    class A,B,C,F,G step
    class D,K ask
    class H,I,J,L kid
    class E,M good
```

Pink is you. Yellow is the kid.

## Before the kids sit down

1. Open the link in Chrome or Edge and bookmark it. The first time, a **Change Log** box pops up. Close it.

   ![The Change Log box with the X in its top right corner](images/gis/station-1-change-log.png)

   ![The site right after it loads, with CONNECT XRP at the top](images/gis/station-2-home.png)

2. Turn the robot on and plug in the USB cable.

   ![The XRP board with the ON and OFF power switch circled, next to the USB port](images/gis/station-3-power-switch.jpg)

3. Click **CONNECT XRP**, then **USB Connection**.

   ![The Connections box with Bluetooth Connection and USB Connection](images/gis/station-4-connect.png)

   In Chrome's pop-up the robot shows up as something like `Board in FS mode - Board CDC (COM3)`. Pick it and click **Connect**.

   ![Chrome's pop-up with the robot listed as Board in FS mode - Board CDC (COM3)](images/gis/station-5-pick-robot.png)

4. The robot's ID shows up in the top bar. If **Update available** is there too, the firmware is old. Get someone on software, or see [XRP_FIRMWARE.md](XRP_FIRMWARE.md).

   ![The top bar after connecting: the robot's ID, Switch to Bluetooth, and RUN](images/gis/station-6-connected.png)

## Getting rid of the cable

### With Bluetooth

Click **Switch to Bluetooth** and do what the box says. **Continue** doesn't work until the cable is out. When Chrome asks, pick your robot's ID and click **Pair**.

![The Switch to Bluetooth box with its 3 steps and the Cancel and Continue buttons](images/gis/station-7-bluetooth.png)

Reloading the page drops the connection. Reconnect with **CONNECT XRP**, then **Bluetooth Connection**.

### Without Bluetooth

Leave the cable in for now and use the power switch trick in "The robot remembers" below.

## Starting a program for a kid

**File**, then **New File**. Set **File Type** to **Blockly File**, type a name, and click **Submit**.

![The New File box with File Type set to Blockly File and sam typed in Filename](images/gis/station-8-new-file.png)

Now it's their turn. Try really hard not to take the mouse.

## The challenges, on the screen

What each challenge in [KIDS_ROBOTICS_CHALLENGES.md](KIDS_ROBOTICS_CHALLENGES.md) looks like. Some kids have never used a mouse, so show them click and drag first.

### Challenge 1: Move the robot

1. Click **XRP Movement**.

   ![The four XRP Movement blocks: Drive forward, Drive backward, Turn left, Turn right](images/gis/blocks-movement.png)

2. Drag **Drive forward** onto the dots.

   ![A Drive forward 12 inches block sitting on the dots](images/gis/challenge-1-forward.png)

3. Robot down, hands off, **RUN**.

   ![The green RUN button at the top right of the screen](images/gis/run.png)

   It turns into **STOP** while the robot is going.

   ![The red STOP button, in the same spot RUN was](images/gis/stop.png)

4. Click the number and type 24.

   ![The Drive forward block after typing 24](images/gis/challenge-1-number.png)

### Challenge 2: Go and come back

Drag **Drive backward** under the first block. A gray shadow shows where it'll snap.

![A Drive backward block held under Drive forward, with a gray shadow where it will snap](images/gis/challenge-2-almost.png)

Let go. Blocks run top to bottom.

![Drive forward 12 inches and Drive backward 12 inches snapped together](images/gis/challenge-2-snapped.png)

### Challenge 3: Make a turn

![Drive forward 12 inches, Turn right 90 degrees and Drive forward 12 inches in one stack](images/gis/challenge-3-turn.png)

Left and right are the robot's, not the kid's. The trash can in the corner deletes a block, and **Ctrl+Z** undoes.

### Challenge 4: Make a square

Click **Loops** and drag **repeat** out.

![The repeat block in the Loops group](images/gis/blocks-loops.png)

Then drag the other blocks inside it.

![A repeat 4 times block with Drive forward 18 inches and Turn right 90 degrees inside it](images/gis/challenge-4-square.png)

### Challenge 5: Navigate the course

This is the printed [Robot Challenge handout](Robot_Challenge.pdf).

### The other 2 blocks

**Basic** has **Sleep**, which waits for the number of seconds you put in it, and **Stop motors**. The challenges don't use them.

![The Sleep and Stop motors blocks in the Basic group](images/gis/blocks-basic.png)

The Python behind the blocks is in [KIDS_ROBOTICS_EVENT.md](KIDS_ROBOTICS_EVENT.md).

## Running it

For the course, the robot starts on the green square.

Hands off before **RUN**. The gyro calibrates for about 1 second at the start, and if the robot gets bumped then, every turn comes out wrong.

## The robot remembers

The robot saves the last program it ran and runs it again every time it's switched on, no laptop needed. So it can take off across the table when you flip the switch.

```mermaid
flowchart LR
    A[Click RUN] --> B[Robot saves the program]
    B --> C[Switch off]
    C --> D[Switch on]
    D --> E([It drives right away])
    F[Robot was just flashed] --> G[Nothing saved]
    G --> H([It sits still])

    classDef step fill:#ffe0ef,stroke:#e32a7f,color:#3d0f52
    classDef warn fill:#ffd9d9,stroke:#d9263f,color:#5a0b17
    classDef good fill:#dff7ee,stroke:#0e8577,color:#0b3d36
    class A,B,C,D,F,G step
    class E warn
    class H good
```

Turn robots on while they're on the floor, or hold them with the wheels in the air.

It's also how you do the course without Bluetooth:

1. Cable in, wheels off the ground, click **RUN** once.
2. Unplug the cable.
3. Put the robot on the green square.
4. Switch it off, then back on, and let go.

## When the next group shows up

Make a new file so they start blank.

Turn robots off between groups.

Swap the batteries when the app says they're low, or the robot drives short and turns weird.
