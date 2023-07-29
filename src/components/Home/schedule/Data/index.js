export const DataTNHori = [
  {
    thu: 'HAI',
    ngay: '24',
  },
  {
    thu: 'BA',
    ngay: '25',
  },
  {
    thu: 'TƯ',
    ngay: '26',
  },
  {
    thu: 'NĂM',
    ngay: '27',
  },
  {
    thu: 'SÁU',
    ngay: '28',
  },
  {
    thu: 'BẢY',
    ngay: '29',
  },
  {
    thu: 'CN',
    ngay: '30',
  },
  {
    thu: 'HAI',
    ngay: '31',
  },
  {
    thu: 'BA',
    ngay: '32',
  },
  {
    thu: 'TƯ',
    ngay: '33',
  },
  {
    thu: 'NĂM',
    ngay: '34',
  },
  {
    thu: 'SÁU',
    ngay: '35',
  },
  {
    thu: 'BẢY',
    ngay: '36',
  },
  {
    thu: 'BẢY',
    ngay: '37',
  },
  {
    thu: 'CN',
    ngay: '38',
  },
];

const DataLHHAI = [
  {
    dateStart: '15:15',
    dateEnd: '17:15',
    subject: 'Môn: NodeJS và React Native',
    class: 'Lớp: 18TCLC_DT2',
    room: 'Phòng: T1102',
    teacher: 'GV: trungnd',
    next: require('../../../../../media/img/forward_25px.png'),
  },
  {
    dateStart: '15:15',
    dateEnd: '17:15',
    subject: 'Môn: NodeJS và ứng dụng',
    class: 'Lớp: 18TCLC_DT2',
    room: 'Phòng: T1102',
    teacher: 'GV: trungnd',
    next: require('../../../../../media/img/forward_25px.png'),
  },
  {
    dateStart: '15:15',
    dateEnd: '17:15',
    subject: 'Môn: Lập trình hướng đối tượng',
    class: 'Lớp: 18TCLC_DT2',
    room: 'Phòng: T1102',
    teacher: 'GV: trungnd',
    next: require('../../../../../media/img/forward_25px.png'),
  },
  {
    dateStart: '15:15',
    dateEnd: '17:15',
    subject: 'Môn: Lập trình hướng đối tượng',
    class: 'Lớp: 18TCLC_DT2',
    room: 'Phòng: T1102',
    teacher: 'GV: trungnd',
    next: require('../../../../../media/img/forward_25px.png'),
  },
];

DataTNHori.find(item => item.ngay === '24').dataLH = DataLHHAI;

const DataLHBA = [
  {
    dateStart: '15:15',
    dateEnd: '17:15',
    subject: 'Môn: NodeJS và React Native',
    class: 'Lớp: 18TCLC_DT2',
    room: 'Phòng: T1102',
    teacher: 'GV: trungnd',
    next: require('../../../../../media/img/forward_25px.png'),
  },
  {
    dateStart: '15:15',
    dateEnd: '17:15',
    subject: 'Môn: NodeJS và ứng dụng',
    class: 'Lớp: 18TCLC_DT2',
    room: 'Phòng: T1102',
    teacher: 'GV: trungnd',
    next: require('../../../../../media/img/forward_25px.png'),
  },
];

DataTNHori.find(item => item.ngay === '25').dataLH = DataLHBA;

const DataLHTU = [
  {
    dateStart: '13:00',
    dateEnd: '15:00',
    subject: 'Môn: Lập trình hướng đối tượng',
    class: 'Lớp: 18TCLC_DT2',
    room: 'Phòng: T1102',
    teacher: 'GV: trungnd',
    next: require('../../../../../media/img/forward_25px.png'),
  },
  {
    dateStart: '13:00',
    dateEnd: '15:00',
    subject: 'Môn: Lập trình hướng đối tượng',
    class: 'Lớp: 18TCLC_DT2',
    room: 'Phòng: T1102',
    teacher: 'GV: trungnd',
    next: require('../../../../../media/img/forward_25px.png'),
  },
  {
    dateStart: '13:00',
    dateEnd: '15:00',
    subject: 'Môn: Lập trình hướng đối tượng',
    class: 'Lớp: 18TCLC_DT2',
    room: 'Phòng: T1102',
    teacher: 'GV: trungnd',
    next: require('../../../../../media/img/forward_25px.png'),
  },
  {
    dateStart: '13:00',
    dateEnd: '15:00',
    subject: 'Môn: Lập trình hướng đối tượng',
    class: 'Lớp: 18TCLC_DT2',
    room: 'Phòng: T1102',
    teacher: 'GV: trungnd',
    next: require('../../../../../media/img/forward_25px.png'),
  },
];

DataTNHori.find(item => item.ngay === '26').dataLH = DataLHTU;

const DataLHNAM = [
  {
    dateStart: '13:00',
    dateEnd: '15:00',
    subject: 'Môn: Lập trình hướng đối tượng',
    class: 'Lớp: 18TCLC_DT2',
    room: 'Phòng: T1102',
    teacher: 'GV: trungnd',
    next: require('../../../../../media/img/forward_25px.png'),
  },
];

DataTNHori.find(item => item.ngay === '27').dataLH = DataLHNAM;
