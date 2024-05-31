pragma circom 2.1.0;

template Bricks() {
    signal input state[3]; //s_0, s_1, s_2
    signal output outState[3];
    signal intermediateState[3];

    signal s0_sq <== state[0] * state[0]; 
    signal s0_sq_sq <== s0_sq * s0_sq; 
    signal s0_out <== s0_sq_sq * state[0];
    signal s1_sq <== state[1] * state[1];

    //BN256
    intermediateState[0] <== s0_out;
    intermediateState[1] <== ((s0_sq + state[0]) + 2) * state[1]; //alpha_1 = 1, beta_1 = 2
    intermediateState[2] <== (s1_sq + (3 * state[1]) + 4) * state[2]; //alpha_2 = 3, beta_2 = 4

    outState <== intermediateState;
}
