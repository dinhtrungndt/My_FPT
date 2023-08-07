import {getMonHoc} from '../../homeService';

export const DataTNHori = [
  {
    thu: 'HAI',
    ngay: '7',
  },
  {
    thu: 'BA',
    ngay: '8',
  },
  {
    thu: 'TƯ',
    ngay: '9',
  },
  {
    thu: 'NĂM',
    ngay: '10',
  },
  {
    thu: 'SÁU',
    ngay: '11',
  },
  {
    thu: 'BẢY',
    ngay: '12',
  },
  {
    thu: 'CN',
    ngay: '13',
  },
  {
    thu: 'HAI',
    ngay: '14',
  },
  {
    thu: 'BA',
    ngay: '15',
  },
  {
    thu: 'TƯ',
    ngay: '16',
  },
  {
    thu: 'NĂM',
    ngay: '17',
  },
  {
    thu: 'SÁU',
    ngay: '18',
  },
  {
    thu: 'BẢY',
    ngay: '19',
  },
  {
    thu: 'CN',
    ngay: '20',
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

DataTNHori.find(item => item.ngay === '7').dataLH = DataLHHAI;

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

DataTNHori.find(item => item.ngay === '8').dataLH = DataLHBA;

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

DataTNHori.find(item => item.ngay === '9').dataLH = DataLHTU;

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

DataTNHori.find(item => item.ngay === '10').dataLH = DataLHNAM;
