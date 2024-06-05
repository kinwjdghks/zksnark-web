pragma circom 2.1.0;

include "./decompose.circom";
include "./compose.circom";
include "./params.circom";
include "../../node_modules/circomlib/circuits/comparators.circom";

template RC_C(x)  {
	signal output out;
	var rc_c[24] = [
        15076621247038796463546536388455645247533585166935224652186869597094935191743,
        3579259221799095199077260336270194554742847526752528156257968126314364958244,
        613311662889120920104285733261989033539802140002946031677569857788209652563,
        15730273895951322130718409308684685944990246690303686745129054861592039631490,
        18432352615370250303107157377289575978407578893875113098383991492944972219406,
        8476646748731750329589476617437853779240286764803431156542198698399882778519,
        3162460562283394790140548263255294070431838975310070292925603933638415603807,
        7326181578905141203162598484262369886430722433230408381950551054271982003315,
        8460195617861190115512345451801547581565453672305894032114864099985224190746,
        7620992540354058956535322847325381461112118349448467807916836028862665292168,
        13370986614771578383675331506767179016944624335226086056723915804282234600019,
        7888295481611059276724140008540043189873963352703685503611091958565445760079,
        1001394508346731885746846321022528945463851723178522954717700282515966529864,
        13577258703840084738921500725062049922893173456088280811197305311056881681745,
        18214802219442801013237595610733631795961529326638519582232423297296396277190,
        5685932213047232256326378498293671711844076887619689312055836409244304585118,
        15946885924766495809393641618662576249761177953029714372346316490801097023146,
        12369308268286028633862564061175585197972091413636115984861871307915830156387,
        15535464355808775896041666729084297553002691712708616358764870219192537870029,
        614326639303676207502920852426433598367417530945102586346180224543554627976,
        20603132287571333146780873237269539491190995645002540836267602741431307014168,
        7289653544912698532762678506543460868141173295316475741418808200042788537350,
        1823252288818054785598466634098527068799577933334224899711356475284979711221,
        18230668443720727058044704999018132137893156217774610338481485506218733316256];
    out <== rc_c[x];
	
}

template SI() {
    signal output out[27];

    var si[27] = DIVISORS();

    for(var i=0; i<27; i++)
    {
        out[i] <== si[i];
    }
}

// BN256
function DIVISORS() {
    return [
        673, 678, 667, 683, 680, 655,
        683, 683, 681, 683, 675, 668,
        675, 677, 680, 681, 669, 683,
        681, 677, 668, 654, 663, 666,
        656, 658, 651
    ];
}


//BN256
function SBOX(i) {
    var lut[683] = [
        377,
        222,
        243,
        537,
        518,
        373,
        152,
        435,
        526,
        352,
        2,
        410,
        513,
        545,
        567,
        354,
        405,
        80,
        233,
        261,
        49,
        240,
        568,
        74,
        131,
        349,
        146,
        278,
        330,
        372,
        43,
        432,
        247,
        583,
        105,
        203,
        637,
        307,
        29,
        597,
        633,
        198,
        519,
        95,
        148,
        62,
        68,
        312,
        616,
        357,
        234,
        433,
        154,
        90,
        163,
        249,
        101,
        573,
        447,
        587,
        494,
        103,
        608,
        394,
        409,
        73,
        317,
        305,
        346,
        562,
        262,
        313,
        303,
        550,
        64,
        102,
        259,
        400,
        495,
        572,
        238,
        40,
        612,
        236,
        586,
        15,
        361,
        386,
        138,
        136,
        107,
        33,
        190,
        423,
        176,
        161,
        460,
        35,
        202,
        589,
        32,
        160,
        444,
        517,
        490,
        515,
        144,
        195,
        269,
        332,
        25,
        308,
        192,
        276,
        623,
        180,
        626,
        217,
        329,
        66,
        392,
        431,
        12,
        478,
        67,
        232,
        258,
        355,
        94,
        191,
        632,
        181,
        298,
        1,
        301,
        79,
        618,
        523,
        627,
        484,
        306,
        610,
        635,
        619,
        544,
        420,
        408,
        158,
        328,
        61,
        406,
        299,
        442,
        178,
        625,
        621,
        497,
        465,
        574,
        143,
        54,
        57,
        89,
        322,
        135,
        96,
        605,
        599,
        473,
        97,
        85,
        133,
        200,
        93,
        291,
        525,
        529,
        206,
        614,
        319,
        196,
        482,
        17,
        168,
        70,
        104,
        441,
        159,
        364,
        603,
        78,
        150,
        230,
        116,
        31,
        630,
        132,
        69,
        499,
        532,
        218,
        492,
        112,
        505,
        437,
        333,
        457,
        456,
        439,
        639,
        398,
        16,
        436,
        264,
        450,
        211,
        241,
        524,
        294,
        235,
        126,
        165,
        527,
        452,
        212,
        157,
        272,
        208,
        469,
        611,
        338,
        83,
        326,
        151,
        139,
        607,
        285,
        585,
        58,
        14,
        193,
        71,
        440,
        511,
        542,
        390,
        470,
        155,
        413,
        606,
        142,
        367,
        371,
        174,
        5,
        60,
        289,
        297,
        336,
        370,
        76,
        209,
        622,
        453,
        257,
        555,
        44,
        430,
        345,
        335,
        548,
        459,
        47,
        426,
        591,
        559,
        417,
        284,
        552,
        137,
        277,
        281,
        463,
        631,
        350,
        265,
        323,
        108,
        290,
        169,
        634,
        609,
        414,
        130,
        6,
        166,
        316,
        207,
        592,
        280,
        391,
        274,
        20,
        300,
        593,
        549,
        3,
        602,
        418,
        472,
        419,
        296,
        41,
        46,
        615,
        638,
        388,
        553,
        282,
        356,
        327,
        462,
        115,
        325,
        121,
        399,
        273,
        334,
        383,
        488,
        292,
        55,
        628,
        9,
        19,
        601,
        496,
        228,
        201,
        576,
        374,
        558,
        153,
        162,
        341,
        353,
        84,
        220,
        461,
        221,
        547,
        344,
        507,
        577,
        140,
        485,
        471,
        11,
        175,
        13,
        53,
        543,
        270,
        120,
        30,
        584,
        384,
        368,
        397,
        239,
        4,
        483,
        620,
        189,
        522,
        540,
        510,
        149,
        245,
        533,
        283,
        256,
        369,
        302,
        571,
        128,
        253,
        448,
        446,
        183,
        99,
        438,
        468,
        42,
        594,
        487,
        403,
        23,
        172,
        340,
        106,
        481,
        251,
        363,
        295,
        489,
        474,
        337,
        87,
        86,
        246,
        215,
        376,
        315,
        415,
        117,
        286,
        600,
        56,
        145,
        91,
        358,
        429,
        411,
        516,
        310,
        213,
        598,
        10,
        395,
        111,
        506,
        237,
        170,
        512,
        82,
        147,
        579,
        402,
        501,
        343,
        38,
        434,
        214,
        314,
        360,
        77,
        565,
        320,
        385,
        404,
        199,
        331,
        351,
        466,
        596,
        365,
        231,
        477,
        604,
        254,
        268,
        539,
        424,
        167,
        378,
        491,
        535,
        141,
        267,
        177,
        27,
        546,
        219,
        556,
        216,
        451,
        387,
        28,
        50,
        569,
        255,
        288,
        156,
        449,
        379,
        508,
        528,
        531,
        624,
        581,
        554,
        59,
        171,
        252,
        0,
        595,
        185,
        51,
        520,
        575,
        475,
        113,
        187,
        194,
        428,
        500,
        617,
        188,
        321,
        179,
        263,
        110,
        467,
        18,
        401,
        22,
        164,
        342,
        21,
        382,
        381,
        127,
        52,
        570,
        45,
        445,
        36,
        534,
        339,
        98,
        293,
        244,
        266,
        629,
        229,
        122,
        123,
        48,
        88,
        225,
        173,
        100,
        114,
        536,
        636,
        205,
        34,
        425,
        502,
        514,
        304,
        613,
        530,
        118,
        75,
        561,
        582,
        81,
        480,
        92,
        498,
        464,
        224,
        479,
        563,
        223,
        640,
        521,
        427,
        503,
        250,
        375,
        186,
        72,
        242,
        125,
        380,
        271,
        204,
        407,
        366,
        197,
        119,
        7,
        493,
        26,
        109,
        65,
        359,
        396,
        311,
        309,
        458,
        134,
        393,
        557,
        476,
        324,
        421,
        275,
        37,
        39,
        580,
        184,
        560,
        8,
        455,
        509,
        422,
        24,
        287,
        590,
        182,
        416,
        318,
        260,
        578,
        454,
        389,
        129,
        566,
        63,
        486,
        541,
        362,
        210,
        551,
        348,
        279,
        538,
        347,
        504,
        124,
        564,
        443,
        412,
        226,
        227,
        248,
        588,
        641,
        642,
        643,
        644,
        645,
        646,
        647,
        648,
        649,
        650,
        651,
        652,
        653,
        654,
        655,
        656,
        657,
        658,
        659,
        660,
        661,
        662,
        663,
        664,
        665,
        666,
        667,
        668,
        669,
        670,
        671,
        672,
        673,
        674,
        675,
        676,
        677,
        678,
        679,
        680,
        681,
        682
    ];
    return lut[i];
}

template sbox() {
    signal input state[3][27];
    signal output outState[3][27];

    for(var i=0; i<3; i++) {
        for(var j=0; j<27; j++) {
            outState[i][j] <-- SBOX(state[i][j]);
        }
    }
}

template Bars() {
    signal input state[3];
    signal output outState[3];

    // decompose
    component decompose = Decompose();
    decompose.state <== state;

    component sbox = sbox();
    sbox.state <== decompose.outState;

    component compose = Compose();
    compose.state <== sbox.outState;

    outState <== compose.outState;
}

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

 template Compose(){
	signal input state[3][27];
	signal output outState[3]; 

	component si = SI();
	signal repr[3][53];

	for (var j=0; j<3; j++ ){
		repr[j][0] <== state[j][0];

		for (var i = 1; i<27; i++){
			repr[j][2*i-1] <== repr[j][2*i-2] * si.out[i];
			repr[j][2*i] <== repr[j][2*i-1] + state[j][i];
		}

		outState[j] <== repr[j][52];
	}
 }

template Concrete(i) {
	signal input state[3];
	signal output outState[3];

	component rcConstantA = RC_C(i);
	component rcConstantB = RC_C(i+1);
	component rcConstantC = RC_C(i+2);

	signal sum <== state[0] + state[1] + state[2]; 

	outState[0] <== sum + state[0] + rcConstantA.out;
	outState[1] <== sum + state[1] + rcConstantB.out;
	outState[2] <== sum + state[2] + rcConstantC.out;

}
template DecomposeElement() {
    signal input state;
    signal output outState[27];

    signal divisors[27] <== DIVISORS();
    signal remainders[27];
    signal rangeChecks[27];
    signal quotients[27];

    quotients[26] <-- state \ divisors[26];
    remainders[26] <-- state % divisors[26];
    outState[26] <== remainders[26];
    quotients[26] * divisors[26] + remainders[26] === state;
    remainders[26] === state - quotients[26] * divisors[26];
    rangeChecks[0] <== LessThan(10)([remainders[26], divisors[26]]);
    rangeChecks[0] === 1;


    for(var i=25; i>=0; i--) {
        if (i == 0) {
            outState[0] <== quotients[i + 1];
        } else {
            quotients[i] <-- quotients[i + 1] \ divisors[i];
            remainders[i] <-- quotients[i + 1] % divisors[i];
            outState[i] <== remainders[i];
            quotients[i] * divisors[i] + remainders[i] === quotients[i + 1];
        }
    }

    for(var i = 1; i<27; i++) {
            // all divisors are 10 bits
            // TODO: check if this is really necessary given that 
            // the remainder will always < divisor, for a dividend
            // that a user cannot derive
            rangeChecks[i] <== LessThan(10)([remainders[i], divisors[i]]);
            rangeChecks[i] === 1;
    }
}

template Decompose() {
    signal input state[3];
    signal output outState[3][27];

    for(var i=0; i<3; i++) {
        outState[i] <== DecomposeElement()(state[i]);
    }
}


template ReinforcedConcretePermutation() {
    signal input state[3];
    signal output hash[3];

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
    signal input state[2];
    signal input nonpadBitSize;
    signal output hash;

    component rc = ReinforcedConcretePermutation();
    rc.state[0] <== state[0];
    rc.state[1] <== state[1];
    rc.state[2] <== nonpadBitSize;

    hash <== rc.hash[0];
}