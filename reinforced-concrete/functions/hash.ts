
// export const hashFile = async (filePath:string):Promise<string> => {
    
//     //write bytes to a file named filePath
//     const writeFile = await fetch(
//         "http://localhost:3000/api/writeFile",
//         {
//             method:"POST",
//             headers:{
//                 "Context-Type":"application/json"
//             },
//             body:JSON.stringify({
//                 url:filePath
//             })
//         }
//     );

//     //read bytes and hash
//     const hashReq = await fetch(
//         "http://localhost:3000/api/hash",
//         {
//             method:"GET",
//             headers:{
//                 "Content-Type":"application/json"
//             }
//         }
//     );

//     const { hash } = await hashReq.json();
//     // console.log(res)
//     return hash;
// }

import BigNumber from "bignumber.js";

export const PRIME = BigNumber('21888242871839275222246405745257275088548364400416034343698204186575808495617');

class RC_C {
    private rc_c: BigNumber[] = [
        BigNumber('15076621247038796463546536388455645247533585166935224652186869597094935191743'),
        BigNumber('3579259221799095199077260336270194554742847526752528156257968126314364958244'),
        BigNumber('613311662889120920104285733261989033539802140002946031677569857788209652563'),
        BigNumber('15730273895951322130718409308684685944990246690303686745129054861592039631490'),
        BigNumber('18432352615370250303107157377289575978407578893875113098383991492944972219406'),
        BigNumber('8476646748731750329589476617437853779240286764803431156542198698399882778519'),
        BigNumber('3162460562283394790140548263255294070431838975310070292925603933638415603807'),
        BigNumber('7326181578905141203162598484262369886430722433230408381950551054271982003315'),
        BigNumber('8460195617861190115512345451801547581565453672305894032114864099985224190746'),
        BigNumber('7620992540354058956535322847325381461112118349448467807916836028862665292168'),
        BigNumber('13370986614771578383675331506767179016944624335226086056723915804282234600019'),
        BigNumber('7888295481611059276724140008540043189873963352703685503611091958565445760079'),
        BigNumber('1001394508346731885746846321022528945463851723178522954717700282515966529864'),
        BigNumber('13577258703840084738921500725062049922893173456088280811197305311056881681745'),
        BigNumber('18214802219442801013237595610733631795961529326638519582232423297296396277190'),
        BigNumber('5685932213047232256326378498293671711844076887619689312055836409244304585118'),
        BigNumber('15946885924766495809393641618662576249761177953029714372346316490801097023146'),
        BigNumber('12369308268286028633862564061175585197972091413636115984861871307915830156387'),
        BigNumber('15535464355808775896041666729084297553002691712708616358764870219192537870029'),
        BigNumber('614326639303676207502920852426433598367417530945102586346180224543554627976'),
        BigNumber('20603132287571333146780873237269539491190995645002540836267602741431307014168'),
        BigNumber('7289653544912698532762678506543460868141173295316475741418808200042788537350'),
        BigNumber('1823252288818054785598466634098527068799577933334224899711356475284979711221'),
        BigNumber('18230668443720727058044704999018132137893156217774610338481485506218733316256')
    ];

    public get(index: number): BigNumber {
        return this.rc_c[index].mod(PRIME);
    }
}

class SI {
    private si: number[] = [
        673, 678, 667, 683, 680, 655,
        683, 683, 681, 683, 675, 668,
        675, 677, 680, 681, 669, 683,
        681, 677, 668, 654, 663, 666,
        656, 658, 651
    ];

    public get(index: number): number {
        return this.si[index];
    }

    public getAll(): number[] {
        return this.si;
    }
}

class SBOX {
    private lut: number[] = [
        377, 222, 243, 537, 518, 373, 152, 435, 526, 352, 2, 410, 513, 545, 567, 354,
        405, 80, 233, 261, 49, 240, 568, 74, 131, 349, 146, 278, 330, 372, 43, 432,
        247, 583, 105, 203, 637, 307, 29, 597, 633, 198, 519, 95, 148, 62, 68, 312,
        616, 357, 234, 433, 154, 90, 163, 249, 101, 573, 447, 587, 494, 103, 608, 394,
        409, 73, 317, 305, 346, 562, 262, 313, 303, 550, 64, 102, 259, 400, 495, 572,
        238, 40, 612, 236, 586, 15, 361, 386, 138, 136, 107, 33, 190, 423, 176, 161,
        460, 35, 202, 589, 32, 160, 444, 517, 490, 515, 144, 195, 269, 332, 25, 308,
        192, 276, 623, 180, 626, 217, 329, 66, 392, 431, 12, 478, 67, 232, 258, 355,
        94, 191, 632, 181, 298, 1, 301, 79, 618, 523, 627, 484, 306, 610, 635, 619,
        544, 420, 408, 158, 328, 61, 406, 299, 442, 178, 625, 621, 497, 465, 574, 143,
        54, 57, 89, 322, 135, 96, 605, 599, 473, 97, 85, 133, 200, 93, 291, 525,
        529, 206, 614, 319, 196, 482, 17, 168, 70, 104, 441, 159, 364, 603, 78, 150,
        230, 116, 31, 630, 132, 69, 499, 532, 218, 492, 112, 505, 437, 333, 457, 456,
        439, 639, 398, 16, 436, 264, 450, 211, 241, 524, 294, 235, 126, 165, 527, 452,
        212, 157, 272, 208, 469, 611, 338, 83, 326, 151, 139, 607, 285, 585, 58, 14,
        193, 71, 440, 511, 542, 390, 470, 155, 413, 606, 142, 367, 371, 174, 5, 60,
        289, 297, 336, 370, 76, 209, 622, 453, 257, 555, 44, 430, 345, 335, 548, 459,
        47, 426, 591, 559, 417, 284, 552, 137, 277, 281, 463, 631, 350, 265, 323, 108,
        290, 169, 634, 609, 414, 130, 6, 166, 316, 207, 592, 280, 391, 274, 20, 300,
        593, 549, 3, 602, 418, 472, 419, 296, 41, 46, 615, 638, 388, 553, 282, 356,
        327, 462, 115, 325, 121, 399, 273, 334, 383, 488, 292, 55, 628, 9, 19, 601,
        496, 228, 201, 576, 374, 558, 153, 162, 341, 353, 84, 220, 461, 221, 547, 344,
        507, 577, 140, 485, 471, 11, 175, 13, 53, 543, 270, 120, 30, 584, 384, 368,
        397, 239, 4, 483, 620, 189, 522, 540, 510, 149, 245, 533, 283, 256, 369, 302,
        571, 128, 253, 448, 446, 183, 99, 438, 468, 42, 594, 487, 403, 23, 172, 340,
        106, 481, 251, 363, 295, 489, 474, 337, 87, 86, 246, 215, 376, 315, 415, 117,
        286, 600, 56, 145, 91, 358, 429, 411, 516, 310, 213, 598, 10, 395, 111, 506,
        237, 170, 512, 82, 147, 579, 402, 501, 343, 38, 434, 214, 314, 360, 77, 565,
        320, 385, 404, 199, 331, 351, 466, 596, 365, 231, 477, 604, 254, 268, 539, 424,
        167, 378, 491, 535, 141, 267, 177, 27, 546, 219, 556, 216, 451, 387, 28, 50,
        569, 255, 288, 156, 449, 379, 508, 528, 531, 624, 581, 554, 59, 171, 252, 0,
        595, 185, 51, 520, 575, 475, 113, 187, 194, 428, 500, 617, 188, 321, 179, 263,
        110, 467, 18, 401, 22, 164, 342, 21, 382, 381, 127, 52, 570, 45, 445, 36,
        534, 339, 98, 293, 244, 266, 629, 229, 122, 123, 48, 88, 225, 173, 100, 114,
        536, 636, 205, 34, 425, 502, 514, 304, 613, 530, 118, 75, 561, 582, 81, 480,
        92, 498, 464, 224, 479, 563, 223, 640, 521, 427, 503, 250, 375, 186, 72, 242,
        125, 380, 271, 204, 407, 366, 197, 119, 7, 493, 26, 109, 65, 359, 396, 311,
        309, 458, 134, 393, 557, 476, 324, 421, 275, 37, 39, 580, 184, 560, 8, 455,
        509, 422, 24, 287, 590, 182, 416, 318, 260, 578, 454, 389, 129, 566, 63, 486,
        541, 362, 210, 551, 348, 279, 538, 347, 504, 124, 564, 443, 412, 226, 227, 248,
        588, 641, 642, 643, 644, 645, 646, 647, 648, 649, 650, 651, 652, 653, 654, 655,
        656, 657, 658, 659, 660, 661, 662, 663, 664, 665, 666, 667, 668, 669, 670, 671,
        672, 673, 674, 675, 676, 677, 678, 679, 680, 681, 682
    ];

    public get(index: number): number {
        return this.lut[index];
    }
}

class DecomposeElement {
    private si = new SI();

    public decompose(value: BigNumber): BigNumber[] {
        let state = new BigNumber(value);
        const result: BigNumber[] = [];
        const divisors = this.si.getAll();

        for (let i = 26; i >= 0; i--) {
            const divisor = new BigNumber(divisors[i]);
            const quotient = state.dividedToIntegerBy(divisor);
            const remainder = state.mod(divisor);
            result[i] = remainder;
            state = quotient;
        }

        return result;
    }
}

class Compose {
    private si = new SI();

    public compose(state: BigNumber[][]): BigNumber[] {
        const result: BigNumber[] = [];

        for (let j = 0; j < 3; j++) {
            let repr = BigNumber(state[j][0]);
            const siValues = this.si.getAll();

            for (let i = 1; i < 27; i++) {
                repr = repr.multipliedBy(siValues[i]).plus(state[j][i]).mod(PRIME);
            }

            result[j] = repr.mod(PRIME);
        }

        return result;
    }
}

class Bricks {
    public transform(state: BigNumber[]): BigNumber[] {
        const intermediateState: BigNumber[] = [];

        const s0_sq = state[0].pow(2).mod(PRIME);
        const s0_sq_sq = s0_sq.pow(2).mod(PRIME);
        const s0_out = s0_sq_sq.multipliedBy(state[0]).mod(PRIME);
        const s1_sq = state[1].pow(2).mod(PRIME);

        intermediateState[0] = s0_out;
        intermediateState[1] = s0_sq.plus(state[0]).plus(2).multipliedBy(state[1]).mod(PRIME);
        intermediateState[2] = s1_sq.plus(state[1].multipliedBy(3)).plus(4).multipliedBy(state[2]).mod(PRIME);

        return intermediateState;
    }
}

class Concrete {
    private rc = new RC_C();

    public transform(state: BigNumber[], index: number): BigNumber[] {
        const sum = state.reduce((a, b) => a.plus(b), new BigNumber(0)).mod(PRIME);
        return [
            sum.plus(state[0]).plus(this.rc.get(index)).mod(PRIME),
            sum.plus(state[1]).plus(this.rc.get(index + 1)).mod(PRIME),
            sum.plus(state[2]).plus(this.rc.get(index + 2)).mod(PRIME)
        ];
    }
}

class Bars {
    private decomposeElement = new DecomposeElement();
    private sbox = new SBOX();
    private compose = new Compose();

    public transform(state: BigNumber[]): BigNumber[] {
        const decomposed = state.map(value => this.decomposeElement.decompose(value));
        const sboxed = decomposed.map(row => row.map(value => new BigNumber(this.sbox.get(value.toNumber())).mod(PRIME)));
        return this.compose.compose(sboxed);
    }
}

class ReinforcedConcretePermutation {
    private bricks = new Bricks();
    private concrete = new Concrete();
    private bars = new Bars();

    public transform(state: BigNumber[]): BigNumber[] {
        let currentState = this.concrete.transform(state, 0);

        for (let i = 1; i <= 3; i++) {
            currentState = this.bricks.transform(currentState);
            currentState = this.concrete.transform(currentState, i * 3);
        }

        currentState = this.bars.transform(currentState);
        currentState = this.concrete.transform(currentState, 12);

        for (let i = 5; i <= 7; i++) {
            currentState = this.bricks.transform(currentState);
            currentState = this.concrete.transform(currentState, i * 3);
        }

        return currentState;
    }
}

export class ReinforcedConcreteHash {
    private Permutation = new ReinforcedConcretePermutation();

    private permutation(input: BigNumber[]): BigNumber[] {
        return this.Permutation.transform(input);
    }

    public spongeHash(chunks: string[], nonpadBitSize: number) {
        var output: BigNumber[] = [];
        for (var i=0; i<chunks.length; i+=2){
            const chunk1 = BigNumber(chunks[i]);
            const chunk2 = BigNumber(chunks[i + 1]);
            const thirdInput = i == 0 ? BigNumber(nonpadBitSize) : output[2];
            const input = [chunk1, chunk2, thirdInput];
            output = this.permutation(input);
        }
        return output[0];
    }

    public hash(chunks: string[], nonpadBitSize:number) {
        const chunk1 = BigNumber(chunks[0]);
        const chunk2 = BigNumber(chunks[1]);
        return this.permutation([chunk1, chunk2, BigNumber(nonpadBitSize)])[0];
    }

}

