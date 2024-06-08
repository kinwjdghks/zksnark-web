pragma circom 2.1.0;

include "./bricks.circom";
include "./concrete.circom";
include "./bars.circom";

template ReinforcedConcretePermutation(ii) {
    signal input state[3];
    signal output hash[3];
    var i = ii;
    
    component bricks[8];
    component concrete[8];

    concrete[0] = Concrete(0);
    concrete[0].state <== state;

    for(var i=1; i<=3; i++) {
        bricks[i] = Bricks();
        bricks[i].state <== concrete[i - 1].outState;

        concrete[i] = Concrete(i * 3);
        concrete[i].state <== bricks[i].outState;
    }

    component bars = Bars();
    bars.state <== concrete[3].outState;

    concrete[4] = Concrete(12);
    concrete[4].state <== bars.outState;

    for(var i=5; i<=7; i++) {
        bricks[i] = Bricks();
        bricks[i].state <== concrete[i - 1].outState;

        concrete[i] = Concrete(i * 3);
        concrete[i].state <== bricks[i].outState;
    }

    hash <== concrete[7].outState;
    
}

template ReinforcedConcreteHash() {
    var max = 100;
    signal input state[max][2];
    signal input nonpadBitSize;
    signal output hash;

    signal stateBuffer[3];
    stateBuffer[0] <== state[0][0];
    stateBuffer[1] <== state[0][1];
    stateBuffer[2] <== nonpadBitSize;

    component rc[max];
    rc[0] = ReinforcedConcretePermutation(0);
    rc[0].state[0] <== stateBuffer[0];
    rc[0].state[1] <== stateBuffer[1];
    rc[0].state[2] <== stateBuffer[2];

    for (var i = 1; i < max; i++) {
        rc[i] = ReinforcedConcretePermutation(i);
        rc[i].state[0] <== rc[i-1].hash[0] + state[i][0];
        rc[i].state[1] <== rc[i-1].hash[1] + state[i][1];
        rc[i].state[2] <== rc[i-1].hash[2];
    }

    hash <== rc[max-1].hash[0];
}