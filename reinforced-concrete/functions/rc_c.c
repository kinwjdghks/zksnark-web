#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdint.h>
#include <stdbool.h>
#include <jansson.h>
#include <gmp.h>

#define BIT_RATE 508
#define BIT_RATEd 254
#define MAX_STATE_SIZE 100
mpz_t p_mpz;

int cnt = 0;

void concrete(mpz_t x1, mpz_t x2, mpz_t x3, int i) {
    const char* rc_c_str[24] = {
        "15076621247038796463546536388455645247533585166935224652186869597094935191743",
        "3579259221799095199077260336270194554742847526752528156257968126314364958244",
        "613311662889120920104285733261989033539802140002946031677569857788209652563",
        "15730273895951322130718409308684685944990246690303686745129054861592039631490",
        "18432352615370250303107157377289575978407578893875113098383991492944972219406",
        "8476646748731750329589476617437853779240286764803431156542198698399882778519",
        "3162460562283394790140548263255294070431838975310070292925603933638415603807",
        "7326181578905141203162598484262369886430722433230408381950551054271982003315",
        "8460195617861190115512345451801547581565453672305894032114864099985224190746",
        "7620992540354058956535322847325381461112118349448467807916836028862665292168",
        "13370986614771578383675331506767179016944624335226086056723915804282234600019",
        "7888295481611059276724140008540043189873963352703685503611091958565445760079",
        "1001394508346731885746846321022528945463851723178522954717700282515966529864",
        "13577258703840084738921500725062049922893173456088280811197305311056881681745",
        "18214802219442801013237595610733631795961529326638519582232423297296396277190",
        "5685932213047232256326378498293671711844076887619689312055836409244304585118",
        "15946885924766495809393641618662576249761177953029714372346316490801097023146",
        "12369308268286028633862564061175585197972091413636115984861871307915830156387",
        "15535464355808775896041666729084297553002691712708616358764870219192537870029",
        "614326639303676207502920852426433598367417530945102586346180224543554627976",
        "20603132287571333146780873237269539491190995645002540836267602741431307014168",
        "7289653544912698532762678506543460868141173295316475741418808200042788537350",
        "1823252288818054785598466634098527068799577933334224899711356475284979711221",
        "18230668443720727058044704999018132137893156217774610338481485506218733316256"
    };
    mpz_t temp_0, temp_1, temp_2, temp_3;
    mpz_init(temp_0);
    mpz_init(temp_1);
    mpz_init(temp_2);
    mpz_init(temp_3);
    
    mpz_add(temp_1,x1,x1);
    mpz_add(temp_1,temp_1,x2);
    mpz_add(temp_1,temp_1,x3);
    mpz_set_str(temp_0, rc_c_str[i], 10);
    mpz_add(temp_1, temp_1, temp_0);
    
    mpz_add(temp_2,x2,x2);
    mpz_add(temp_2,temp_2,x1);
    mpz_add(temp_2,temp_2,x3);
    mpz_set_str(temp_0, rc_c_str[i+1], 10);
    mpz_add(temp_2, temp_2, temp_0);
    
    mpz_add(temp_3,x3,x3);
    mpz_add(temp_3,temp_3,x1);
    mpz_add(temp_3,temp_3,x2);
    mpz_set_str(temp_0, rc_c_str[i+2], 10);
    mpz_add(temp_3, temp_3, temp_0);

    mpz_mod(temp_1, temp_1, p_mpz);
    mpz_mod(temp_2, temp_2, p_mpz);
    mpz_mod(temp_3, temp_3, p_mpz);

    mpz_set(x1,temp_1);
    mpz_set(x2,temp_2);
    mpz_set(x3,temp_3);
    if(cnt == 0){
        //gmp_printf("after concrete : \n%0.Zu\n%0.Zu\n%0.Zu\n\n", x1, x2, x3);
    }

    mpz_clear(temp_0);
    mpz_clear(temp_1);
    mpz_clear(temp_2);
    mpz_clear(temp_3);
}

void bricks(mpz_t x1, mpz_t x2, mpz_t x3) {
    mpz_t temp_1, temp_2, temp_3, s0_sq, s0_sq_sq, s1_sq;
    mpz_init(temp_1);
    mpz_init(temp_2);
    mpz_init(temp_3);
    mpz_init(s0_sq);
    mpz_init(s0_sq_sq);
    mpz_init(s1_sq);
    
    mpz_mul(s0_sq,x1,x1);
    mpz_mod(s0_sq,s0_sq,p_mpz);

    mpz_mul(s0_sq_sq,s0_sq,s0_sq);
    mpz_mod(s0_sq_sq,s0_sq_sq,p_mpz);

    mpz_mul(temp_1,s0_sq_sq,x1);

    mpz_mul(s1_sq,x2,x2);
    mpz_mod(s1_sq,s1_sq,p_mpz);    

    mpz_add(temp_2,s0_sq,x1);
    mpz_add_ui(temp_2,temp_2,2);
    mpz_mul(temp_2,temp_2,x2);

    mpz_mul_ui(temp_3,x2,3);
    mpz_add_ui(temp_3,temp_3,4);
    mpz_add(temp_3,temp_3,s1_sq);
    mpz_mod(temp_3,temp_3,p_mpz);
    mpz_mul(temp_3,temp_3,x3);

    mpz_mod(temp_1, temp_1, p_mpz);
    mpz_mod(temp_2, temp_2, p_mpz);
    mpz_mod(temp_3, temp_3, p_mpz);

    mpz_set(x1,temp_1);
    mpz_set(x2,temp_2);
    mpz_set(x3,temp_3);

    if(cnt == 0){
        //gmp_printf("after brick : \n%0.Zu\n%0.Zu\n%0.Zu\n\n", x1, x2, x3);
    }

    mpz_clear(temp_1);
    mpz_clear(temp_2);
    mpz_clear(temp_3);
    mpz_clear(s0_sq);
    mpz_clear(s0_sq_sq);
    mpz_clear(s1_sq);
}

//for bars
void initialize_si_constants(mpz_t si_constants[27]) {
    int si_values[27] = {
        673, 678, 667, 683, 680, 655, 683, 683, 681, 683,
        675, 668, 675, 677, 680, 681, 669, 683, 681, 677,
        668, 654, 663, 666, 656, 658, 651
    };

    for (int i = 0; i < 27; i++) {
        mpz_init_set_ui(si_constants[i], si_values[i]);
    }
}

void initialize_sbox_lut(mpz_t sbox_lut[683]) {
    int sbox_values[683] = {
        377, 222, 243, 537, 518, 373, 152, 435, 526, 352, 2, 410, 513, 545, 567, 354, 405,
        80, 233, 261, 49, 240, 568, 74, 131, 349, 146, 278, 330, 372, 43, 432, 247, 583,
        105, 203, 637, 307, 29, 597, 633, 198, 519, 95, 148, 62, 68, 312, 616, 357, 234,
        433, 154, 90, 163, 249, 101, 573, 447, 587, 494, 103, 608, 394, 409, 73, 317, 305,
        346, 562, 262, 313, 303, 550, 64, 102, 259, 400, 495, 572, 238, 40, 612, 236, 586,
        15, 361, 386, 138, 136, 107, 33, 190, 423, 176, 161, 460, 35, 202, 589, 32, 160,
        444, 517, 490, 515, 144, 195, 269, 332, 25, 308, 192, 276, 623, 180, 626, 217, 329,
        66, 392, 431, 12, 478, 67, 232, 258, 355, 94, 191, 632, 181, 298, 1, 301, 79, 618,
        523, 627, 484, 306, 610, 635, 619, 544, 420, 408, 158, 328, 61, 406, 299, 442, 178,
        625, 621, 497, 465, 574, 143, 54, 57, 89, 322, 135, 96, 605, 599, 473, 97, 85, 133,
        200, 93, 291, 525, 529, 206, 614, 319, 196, 482, 17, 168, 70, 104, 441, 159, 364,
        603, 78, 150, 230, 116, 31, 630, 132, 69, 499, 532, 218, 492, 112, 505, 437, 333,
        457, 456, 439, 639, 398, 16, 436, 264, 450, 211, 241, 524, 294, 235, 126, 165, 527,
        452, 212, 157, 272, 208, 469, 611, 338, 83, 326, 151, 139, 607, 285, 585, 58, 14,
        193, 71, 440, 511, 542, 390, 470, 155, 413, 606, 142, 367, 371, 174, 5, 60, 289,
        297, 336, 370, 76, 209, 622, 453, 257, 555, 44, 430, 345, 335, 548, 459, 47, 426,
        591, 559, 417, 284, 552, 137, 277, 281, 463, 631, 350, 265, 323, 108, 290, 169,
        634, 609, 414, 130, 6, 166, 316, 207, 592, 280, 391, 274, 20, 300, 593, 549, 3,
        602, 418, 472, 419, 296, 41, 46, 615, 638, 388, 553, 282, 356, 327, 462, 115, 325,
        121, 399, 273, 334, 383, 488, 292, 55, 628, 9, 19, 601, 496, 228, 201, 576, 374,
        558, 153, 162, 341, 353, 84, 220, 461, 221, 547, 344, 507, 577, 140, 485, 471, 11,
        175, 13, 53, 543, 270, 120, 30, 584, 384, 368, 397, 239, 4, 483, 620, 189, 522,
        540, 510, 149, 245, 533, 283, 256, 369, 302, 571, 128, 253, 448, 446, 183, 99, 438,
        468, 42, 594, 487, 403, 23, 172, 340, 106, 481, 251, 363, 295, 489, 474, 337, 87,
        86, 246, 215, 376, 315, 415, 117, 286, 600, 56, 145, 91, 358, 429, 411, 516, 310,
        213, 598, 10, 395, 111, 506, 237, 170, 512, 82, 147, 579, 402, 501, 343, 38, 434,
        214, 314, 360, 77, 565, 320, 385, 404, 199, 331, 351, 466, 596, 365, 231, 477, 604,
        254, 268, 539, 424, 167, 378, 491, 535, 141, 267, 177, 27, 546, 219, 556, 216, 451,
        387, 28, 50, 569, 255, 288, 156, 449, 379, 508, 528, 531, 624, 581, 554, 59, 171,
        252, 0, 595, 185, 51, 520, 575, 475, 113, 187, 194, 428, 500, 617, 188, 321, 179,
        263, 110, 467, 18, 401, 22, 164, 342, 21, 382, 381, 127, 52, 570, 45, 445, 36, 534,
        339, 98, 293, 244, 266, 629, 229, 122, 123, 48, 88, 225, 173, 100, 114, 536, 636,
        205, 34, 425, 502, 514, 304, 613, 530, 118, 75, 561, 582, 81, 480, 92, 498, 464,
        224, 479, 563, 223, 640, 521, 427, 503, 250, 375, 186, 72, 242, 125, 380, 271, 204,
        407, 366, 197, 119, 7, 493, 26, 109, 65, 359, 396, 311, 309, 458, 134, 393, 557,
        476, 324, 421, 275, 37, 39, 580, 184, 560, 8, 455, 509, 422, 24, 287, 590, 182,
        416, 318, 260, 578, 454, 389, 129, 566, 63, 486, 541, 362, 210, 551, 348, 279, 538,
        347, 504, 124, 564, 443, 412, 226, 227, 248, 588, 641, 642, 643, 644, 645, 646,
        647, 648, 649, 650, 651, 652, 653, 654, 655, 656, 657, 658, 659, 660, 661, 662,
        663, 664, 665, 666, 667, 668, 669, 670, 671, 672, 673, 674, 675, 676, 677, 678,
        679, 680, 681, 682
    };

    for (int i = 0; i < 683; i++) {
        mpz_init_set_ui(sbox_lut[i], sbox_values[i]);
    }
}

void SI(mpz_t si[27]) {
    int si_values[27] = {
        673, 678, 667, 683, 680, 655, 683, 683, 681, 683,
        675, 668, 675, 677, 680, 681, 669, 683, 681, 677,
        668, 654, 663, 666, 656, 658, 651
    };

    for (int i = 0; i < 27; i++) {
        mpz_init_set_ui(si[i], si_values[i]);
    }
}

void sbox(mpz_t state[3][27], mpz_t outState[3][27], mpz_t sbox_lut[683]) {
    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 27; j++) {
            mpz_set(outState[i][j], sbox_lut[mpz_get_ui(state[i][j])]);
        }
    }
}

void Compose(mpz_t state[3][27], mpz_t outState[3], mpz_t si[27]) {
    mpz_t repr[3][53];

    for (int j = 0; j < 3; j++) {
        for (int i = 0; i < 53; i++) {
            mpz_init(repr[j][i]);
        }
    }

    // Initialize SI constants if not already initialized
    SI(si);

    for (int j = 0; j < 3; j++) {
        mpz_set(repr[j][0], state[j][0]);

        for (int i = 1; i < 27; i++) {
            mpz_mul(repr[j][2*i-1], repr[j][2*i-2], si[i]);
            mpz_add(repr[j][2*i], repr[j][2*i-1], state[j][i]);
        }

        mpz_set(outState[j], repr[j][52]);
    }

    for (int j = 0; j < 3; j++) {
        for (int i = 0; i < 53; i++) {
            mpz_clear(repr[j][i]);
        }
    }
}

void DecomposeElement(mpz_t state, mpz_t outState[27], mpz_t divisors[27]) {
    mpz_t quotients[27], remainders[27], temp;

    for (int i = 0; i < 27; i++) {
        mpz_init(quotients[i]);
        mpz_init(remainders[i]);
    }
    mpz_init(temp);

    mpz_fdiv_qr(quotients[26], remainders[26], state, divisors[26]);
    mpz_set(outState[26], remainders[26]);

    for (int i = 25; i >= 0; i--) {
        if (i == 0) {
            mpz_set(outState[0], quotients[i + 1]);
        } else {
            mpz_fdiv_qr(quotients[i], remainders[i], quotients[i + 1], divisors[i]);
            mpz_set(outState[i], remainders[i]);
        }
    }

    for (int i = 0; i < 27; i++) {
        mpz_clear(quotients[i]);
        mpz_clear(remainders[i]);
    }
    mpz_clear(temp);
}

void Decompose(mpz_t state[3], mpz_t outState[3][27], mpz_t divisors[27]) {
    for (int i = 0; i < 3; i++) {
        DecomposeElement(state[i], outState[i], divisors);
    }
}

void Bars(mpz_t x1, mpz_t x2, mpz_t x3) {
    mpz_t decomposeOut[3][27], sboxOut[3][27];

    mpz_t state[3];
    mpz_t outState[3];
    mpz_t rc_constants[24];
    mpz_t si[27];
    mpz_t sbox_lut[683];
    
    for (int i = 0; i < 3; i++) {
        mpz_init(state[i]);
        mpz_init(outState[i]);
    }

    mpz_set(state[0], x1);
    mpz_set(state[1], x2);
    mpz_set(state[2], x3);
    
    initialize_si_constants(si);
    initialize_sbox_lut(sbox_lut);

    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 27; j++) {
            mpz_init(decomposeOut[i][j]);
            mpz_init(sboxOut[i][j]);
        }
    }

    Decompose(state, decomposeOut, si);  // Decompose 함수 호출
    sbox(decomposeOut, sboxOut, sbox_lut);  // sbox 함수 호출
    Compose(sboxOut, outState, si);  // Compose 함수 호출

    mpz_set(x1, outState[0]);
    mpz_set(x2, outState[1]);
    mpz_set(x3, outState[2]);

    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 27; j++) {
            mpz_clear(decomposeOut[i][j]);
            mpz_clear(sboxOut[i][j]);
        }
    }
}

void permutation(mpz_t x1, mpz_t x2, mpz_t x3){    
    for(int i = 0; i < 3 ; i++){
        concrete(x1, x2, x3, 3*i);
        bricks(x1, x2, x3);
    }
    concrete(x1, x2, x3, 3*3);
    Bars(x1, x2, x3);
    for(int i = 4; i < 7 ; i++){
        concrete(x1, x2, x3, 3*i);
        bricks(x1, x2, x3);
    }
    concrete(x1, x2, x3, 3*7);
}

void boolArrayToMpz(mpz_t result, const bool *array) {
    mpz_set_ui(result, 0);  // 결과를 0으로 초기화
    for (size_t i = 0; i < BIT_RATEd; i++) {
        if (array[i]) {
            mpz_setbit(result, BIT_RATEd - 1 - i);  // 배열의 i번째 비트가 1이면 해당 위치의 비트를 1로 설정
        }
    }
}

void pfAdd(mpz_t x1, mpz_t x2, mpz_t x3){
    mpz_add(x1, x2, x3);
    mpz_mod(x1, x1, p_mpz);
}

void spongeFunction(bool **data, size_t rounds, size_t nonpad_bit_size) {
    bool* output = calloc(BIT_RATE * 2, sizeof(bool));

    mpz_t x1, x2, x3, m1, m2;
    mpz_init(x1);
    mpz_init(x2);
    mpz_init(x3);
    mpz_init(m1);
    mpz_init(m2);
    mpz_set_ui(m1, 0);
    mpz_set_ui(m2, 0);

    mpz_import(x3, 1, -1, sizeof(size_t), 0, 0, &nonpad_bit_size);

    pfAdd(x1, x1, m1);
    
    for(int i = 0; i < rounds ; i++){
        boolArrayToMpz(m1, data[0]+i*BIT_RATE);
        boolArrayToMpz(m2, data[0]+i*BIT_RATE + BIT_RATEd);
        pfAdd(x1, x1, m1);
        pfAdd(x2, x2, m2);
        permutation(x1, x2, x3);
        
    }

    //print hex
    gmp_printf("%0.ZX\n", x1);
    gmp_printf("%0.ZX\n", x2);

    for (size_t i = 0; i < BIT_RATEd; i++) {
        output[i] = mpz_tstbit(x1, BIT_RATEd - 1 - i);
        output[i+BIT_RATEd] = mpz_tstbit(x2, BIT_RATEd - 1 - i); 
    }
    permutation(x1, x2, x3);

    //print hex 
    gmp_printf("%0.ZX\n", x1);
    gmp_printf("%0.ZX", x2);

    for (size_t i = 0; i < BIT_RATEd; i++) {
        output[i+BIT_RATE] = mpz_tstbit(x1, BIT_RATEd - 1 - i);
        output[i+BIT_RATE+BIT_RATEd] = mpz_tstbit(x2, BIT_RATEd - 1 - i); 
    } 
    
    //print biy array by 8
    for(int j = 0; j < 4; j++){
        printf("\n\n00");
        for (size_t i = j * BIT_RATEd; i < j * BIT_RATEd + BIT_RATEd; ++i) {
            printf("%d", output[i]);
            if ((i + 1 + (j+1)*2) % 8 == 0) printf(" ");
        }
    }

    //print bit array
    printf("\n\n");
    for (size_t i = 0; i < 2 * BIT_RATE; ++i) {
        printf("%d", output[i]);
    }

    printf("\n\nhash complete\n");
    mpz_clear(x1);
    mpz_clear(x2);
    mpz_clear(x3);
    free(output);
}

void spongeFunction2(mpz_t state[MAX_STATE_SIZE][2], size_t rounds, size_t nonpad_bit_size) {
    mpz_t x1, x2, x3;

    mpz_init(x1);
    mpz_init(x2);
    mpz_init(x3);
    mpz_set_ui(x1, 0);
    mpz_set_ui(x2, 0);
    mpz_set_ui(x3, 0);
    
    pfAdd(x1, x1, state[0][0]);
    pfAdd(x2, x2, state[0][1]);

    mpz_import(x3, 1, -1, sizeof(size_t), 0, 0, &nonpad_bit_size);

    permutation(x1, x2, x3);
    cnt++;     
    
    
    for(int i = 1; i < rounds ; i++){     
        pfAdd(x1, x1, state[i][0]);
        pfAdd(x2, x2, state[i][1]);       
        permutation(x1, x2, x3);      
    }

    //print hex
    gmp_printf("%0.Zu\n", x1);
    //gmp_printf("myHash in hexa: %0.Zx\n", x1);
    

    mpz_clear(x1);
    mpz_clear(x2);
    mpz_clear(x3);
}

int main(int argc, char *argv[])
{
    size_t bit_size, nonpad_bit_size;

    // JSON 파일 열기
    FILE *file = fopen("input.json", "r");
    if (!file) {
        perror("Cannot open input.json");
        return 1;
    }

    // JSON 파싱
    json_error_t error;
    json_t *root = json_loadf(file, 0, &error);
    fclose(file);

    if (!root) {
        fprintf(stderr, "error: on line %d: %s\n", error.line, error.text);
        return 1;
    }

    // state 배열 파싱
    json_t *state_array = json_object_get(root, "state");
    if (!json_is_array(state_array)) {
        fprintf(stderr, "error: state is not an array\n");
        json_decref(root);
        return 1;
    }

    mpz_t state[MAX_STATE_SIZE][2];
    size_t state_size = json_array_size(state_array);

    if (state_size > MAX_STATE_SIZE) {
        fprintf(stderr, "error: state size exceeds maximum allowed size\n");
        json_decref(root);
        return 1;
    }

    for (size_t i = 0; i < state_size; i++) {
        json_t *pair = json_array_get(state_array, i);
        if (!json_is_array(pair) || json_array_size(pair) != 2) {
            fprintf(stderr, "error: invalid state pair at index %zu\n", i);
            json_decref(root);
            return 1;
        }

        json_t *value1 = json_array_get(pair, 0);
        json_t *value2 = json_array_get(pair, 1);

        if (!json_is_string(value1) || !json_is_string(value2)) {
            fprintf(stderr, "error: state values are not strings at index %zu\n", i);
            json_decref(root);
            return 1;
        }

        const char *str_value1 = json_string_value(value1);
        const char *str_value2 = json_string_value(value2);

        mpz_init(state[i][0]);
        mpz_init(state[i][1]);


        //input base 변환은 여기서
        if (mpz_set_str(state[i][0], str_value1, 10) != 0 || mpz_set_str(state[i][1], str_value2, 10) != 0) {
            fprintf(stderr, "error: invalid number string at index %zu\n", i);
            json_decref(root);
            return 1;
        }
    }

    // nonpadBitSize 파싱
    json_t *nonpadBitSize_json = json_object_get(root, "nonpadBitSize");
    if (!json_is_integer(nonpadBitSize_json)) {
        fprintf(stderr, "error: nonpadBitSize is not an integer\n");
        json_decref(root);
        return 1;
    }

    // JSON에서 정수 값을 가져옴
    json_int_t nonpadBitSize_val = json_integer_value(nonpadBitSize_json);

    // 정수 값을 size_t 타입으로 변환
    size_t nonpadBitSize = (size_t)nonpadBitSize_val;

    // nonpadBitSize 출력
    //printf("nonpadBitSize = %zu\n", nonpadBitSize);

    //BN254 prime
    mpz_init_set_str(p_mpz, "21888242871839275222246405745257275088548364400416034343698204186575808495617", 10);

    spongeFunction2(state, MAX_STATE_SIZE, nonpadBitSize);

    // 메모리 해제
    for (size_t i = 0; i < state_size; i++) {
        mpz_clear(state[i][0]);
        mpz_clear(state[i][1]);
    }
    json_decref(root);
    return 0;
}