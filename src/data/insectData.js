/** @typedef {import('@/types/insect').Insect} Insect */

/** @type {Record<string, Insect>} */
export const insectData = {
  mosquito: {
    id: 'mosquito',
    name: '모기',
    condition: '기온과 습도가 높고 주변에 고인 물이 있는 저녁과 밤에 활동이 늘어납니다.',
    sideEffects: '물린 부위에 가려움과 붓기가 생길 수 있으며 일부 모기종은 감염병을 매개할 수 있습니다.',
  },
  loveBug: {
    id: 'love-bug',
    name: '러브버그',
    condition: '기온이 빠르게 오르는 초여름의 습한 녹지 주변에서 많이 나타나며 불빛에 모일 수 있습니다.',
    sideEffects: '사람을 물거나 독성이 있지는 않지만 대량 출몰하면 생활 불편과 차량 오염을 유발할 수 있습니다.',
  },
  fruitFly: {
    id: 'fruit-fly',
    name: '초파리',
    condition: '따뜻하고 습한 환경에서 익은 과일, 음식물 쓰레기와 배수구 주변에 모입니다.',
    sideEffects: '음식 주변을 오가며 위생 문제와 불쾌감을 유발할 수 있습니다.',
  },
  cicada: {
    id: 'cicada',
    name: '매미',
    condition: '기온이 높은 여름철 맑은 낮에 나무가 많은 장소에서 활발하게 울고 활동합니다.',
    sideEffects: '인체에 직접적인 피해는 거의 없지만 큰 울음소리가 소음 불편을 줄 수 있습니다.',
  },
  dragonfly: {
    id: 'dragonfly',
    name: '잠자리',
    condition: '따뜻하고 바람이 약한 낮에 하천, 연못과 습지 주변에서 자주 관찰됩니다.',
    sideEffects: '사람에게 해를 주는 경우는 드물고 모기 같은 작은 곤충을 잡아먹습니다.',
  },
  moth: {
    id: 'moth',
    name: '나방',
    condition: '따뜻하고 습한 밤에 활동하며 건물 조명과 밝은 창문 주변에 모이는 경우가 많습니다.',
    sideEffects: '대부분 직접적인 피해는 없지만 일부 종류는 의류나 식품을 손상시킬 수 있습니다.',
  },
  chiggerMite: {
    id: 'chigger-mite',
    name: '털진드기(쯔쯔가무시 매개)',
    condition: '주로 9~11월 풀밭과 잡목 지역의 야외활동 중 접촉 위험이 높아집니다.',
    sideEffects: '감염된 털진드기 유충에 물리면 쯔쯔가무시증이 발생할 수 있어 야외활동 후 몸을 확인해야 합니다.',
  },
}
